"""Add OAuth account table for social logins

Revision ID: c1b8f2d6b4f1
Revises: b389592974f8
Create Date: 2024-12-12 10:00:00.000000

"""

from typing import Sequence, Union

import fastapi_users_db_sqlalchemy
import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "c1b8f2d6b4f1"
down_revision: Union[str, None] = "b389592974f8"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "oauth_account",
        sa.Column("id", fastapi_users_db_sqlalchemy.generics.GUID(), nullable=False),
        sa.Column("oauth_name", sa.String(length=100), nullable=False),
        sa.Column("access_token", sa.String(length=1024), nullable=False),
        sa.Column("expires_at", sa.Integer(), nullable=True),
        sa.Column("refresh_token", sa.String(length=1024), nullable=True),
        sa.Column("account_id", sa.String(length=320), nullable=False),
        sa.Column("account_email", sa.String(length=320), nullable=False),
        sa.Column("user_id", fastapi_users_db_sqlalchemy.generics.GUID(), nullable=False),
        sa.ForeignKeyConstraint(
            ["user_id"], ["user.id"], ondelete="cascade"
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        "ix_oauth_account_oauth_name", "oauth_account", ["oauth_name"], unique=False
    )
    op.create_index(
        "ix_oauth_account_account_id", "oauth_account", ["account_id"], unique=False
    )


def downgrade() -> None:
    op.drop_index("ix_oauth_account_account_id", table_name="oauth_account")
    op.drop_index("ix_oauth_account_oauth_name", table_name="oauth_account")
    op.drop_table("oauth_account")
