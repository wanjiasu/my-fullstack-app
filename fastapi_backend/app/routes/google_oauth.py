from typing import Dict, List, Tuple
from urllib.parse import urlencode

import jwt
from fastapi import APIRouter, Depends, Query, Request, status
from fastapi.responses import RedirectResponse
from fastapi_users.authentication.strategy import Strategy
from fastapi_users.exceptions import UserAlreadyExists
from fastapi_users.jwt import decode_jwt
from fastapi_users.manager import BaseUserManager
from fastapi_users.router.common import ErrorCode
from fastapi_users.router.oauth import (
    OAuth2AuthorizeResponse,
    STATE_TOKEN_AUDIENCE,
    generate_state_token,
)
from httpx_oauth.integrations.fastapi import OAuth2AuthorizeCallback
from httpx_oauth.oauth2 import OAuth2Token

from app.config import settings
from app.users import (
    AUTH_URL_PATH,
    auth_backend,
    get_user_manager,
    google_oauth_client,
)

router = APIRouter(prefix=f"/{AUTH_URL_PATH}/google", tags=["auth"])

CALLBACK_ROUTE_NAME = "oauth:google.callback"
CALLBACK_EXTERNAL_URL = f"{settings.BACKEND_BASE_URL.rstrip('/')}/{AUTH_URL_PATH}/google/callback"
STATE_SECRET = settings.GOOGLE_OAUTH_STATE_SECRET or settings.ACCESS_SECRET_KEY
DEFAULT_SCOPES = settings.GOOGLE_OAUTH_SCOPES
SUCCESS_PATH = settings.GOOGLE_SUCCESS_REDIRECT_PATH
FAILURE_PATH = settings.GOOGLE_FAILURE_REDIRECT_PATH
STATE_ERROR_CODE = "OAUTH_INVALID_STATE"
TOKEN_EXCHANGE_ERROR_CODE = "OAUTH_TOKEN_EXCHANGE_ERROR"


oauth2_authorize_callback = OAuth2AuthorizeCallback(
    google_oauth_client, redirect_url=CALLBACK_EXTERNAL_URL
)


def _build_frontend_url(path: str, params: Dict[str, str] | None = None) -> str:
    cleaned_path = path if path.startswith("/") else f"/{path}"
    base_url = settings.FRONTEND_URL.rstrip("/")
    query = urlencode(params or {})
    return f"{base_url}{cleaned_path}{'?' + query if query else ''}"


@router.get(
    "/authorize",
    name="oauth:google.authorize",
    response_model=OAuth2AuthorizeResponse,
)
async def authorize(request: Request, scopes: List[str] = Query(None)) -> OAuth2AuthorizeResponse:
    authorize_redirect_url = CALLBACK_EXTERNAL_URL
    requested_scopes = scopes or DEFAULT_SCOPES

    state_data: Dict[str, str] = {}
    state = generate_state_token(
        state_data,
        STATE_SECRET,
        settings.GOOGLE_OAUTH_STATE_TTL,
    )

    authorization_url = await google_oauth_client.get_authorization_url(
        authorize_redirect_url,
        state,
        requested_scopes,
    )

    return OAuth2AuthorizeResponse(authorization_url=authorization_url)


@router.get(
    "/callback",
    name=CALLBACK_ROUTE_NAME,
)
async def callback(
    request: Request,
    access_token_state: Tuple[OAuth2Token, str] = Depends(oauth2_authorize_callback),
    user_manager: BaseUserManager = Depends(get_user_manager),
    strategy: Strategy = Depends(auth_backend.get_strategy),
):
    token, state = access_token_state

    try:
        account_id, account_email = await google_oauth_client.get_id_email(
            token["access_token"]
        )
    except Exception:
        return RedirectResponse(
            _build_frontend_url(
                FAILURE_PATH, {"error": TOKEN_EXCHANGE_ERROR_CODE}
            ),
            status_code=status.HTTP_302_FOUND,
        )

    if account_email is None:
        return RedirectResponse(
            _build_frontend_url(
                FAILURE_PATH, {"error": ErrorCode.OAUTH_NOT_AVAILABLE_EMAIL.value}
            ),
            status_code=status.HTTP_302_FOUND,
        )

    try:
        decode_jwt(state, STATE_SECRET, [STATE_TOKEN_AUDIENCE])
    except jwt.DecodeError:
        return RedirectResponse(
            _build_frontend_url(FAILURE_PATH, {"error": STATE_ERROR_CODE}),
            status_code=status.HTTP_302_FOUND,
        )

    try:
        user = await user_manager.oauth_callback(
            google_oauth_client.name,
            token["access_token"],
            account_id,
            account_email,
            token.get("expires_at"),
            token.get("refresh_token"),
            request,
            associate_by_email=settings.GOOGLE_ASSOCIATE_BY_EMAIL,
            is_verified_by_default=settings.GOOGLE_IS_VERIFIED_BY_DEFAULT,
        )
    except UserAlreadyExists:
        return RedirectResponse(
            _build_frontend_url(
                FAILURE_PATH, {"error": ErrorCode.OAUTH_USER_ALREADY_EXISTS.value}
            ),
            status_code=status.HTTP_302_FOUND,
        )

    if not user.is_active:
        return RedirectResponse(
            _build_frontend_url(
                FAILURE_PATH, {"error": ErrorCode.LOGIN_BAD_CREDENTIALS.value}
            ),
            status_code=status.HTTP_302_FOUND,
        )

    token_value = await strategy.write_token(user)
    query_params = {
        "access_token": token_value,
        "token_type": "bearer",
        "provider": google_oauth_client.name,
        "user_id": str(user.id),
    }

    response = RedirectResponse(
        _build_frontend_url(SUCCESS_PATH, query_params),
        status_code=status.HTTP_302_FOUND,
    )
    await user_manager.on_after_login(user, request, response)
    return response
