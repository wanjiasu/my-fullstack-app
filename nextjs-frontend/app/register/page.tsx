"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState, useMemo } from "react";
import { ArrowLeft } from "lucide-react";

import { register } from "@/components/actions/register-action";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submitButton";
import { FieldError, FormError } from "@/components/ui/FormError";
import { GoogleAuthButton } from "@/components/ui/google-auth-button";

const GOOGLE_ERROR_MESSAGES: Record<string, string> = {
  OAUTH_NOT_AVAILABLE_EMAIL: "无法从 Google 获取邮箱信息，无法完成注册。",
  OAUTH_USER_ALREADY_EXISTS: "该 Google 账户已在系统中注册。",
  LOGIN_BAD_CREDENTIALS: "该账户已被禁用或不可用。",
  OAUTH_INVALID_STATE: "Google 登录校验失败，请重试。",
  OAUTH_TOKEN_EXCHANGE_ERROR: "Google 登录过程中出现问题，请重试。",
  OAUTH_AUTHORIZE_FAILED: "无法跳转到 Google 授权页面，请稍后再试。",
  OAUTH_CONFIG_ERROR: "Google 登录配置缺失，请联系管理员。",
  OAUTH_CALLBACK_MISSING_TOKEN: "未获取到登录凭证，请重新尝试。",
};

export default function Page() {
  const [state, dispatch] = useActionState(register, undefined);
  const searchParams = useSearchParams();

  const googleErrorMessage = useMemo(() => {
    const errorCode = searchParams.get("error");
    if (!errorCode) return null;
    return (
      GOOGLE_ERROR_MESSAGES[errorCode] || "Google 注册失败，请稍后再试。"
    );
  }, [searchParams]);

  return (
    <div className="min-h-screen text-slate-100 bg-gradient-to-b from-bg1 via-bg2 to-bg1 flex items-center justify-center px-4">
      {/* Background gradient effect */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(99,102,241,.15), transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-md">
        {/* Header with back button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>

          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 grid place-items-center font-black text-lg">
              AI
            </div>
            <div className="text-2xl font-bold">SmartBet Hub</div>
          </div>
        </div>

        {/* Register Form */}
        <form action={dispatch} className="glass rounded-2xl shadow-soft p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">加入我们</h1>
            <p className="text-white/70">创建您的账户，开启智能下注新体验</p>
          </div>

          {googleErrorMessage ? (
            <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
              {googleErrorMessage}
            </div>
          ) : null}

          <div className="space-y-6">
            <div>
              <Label
                htmlFor="email"
                className="text-sm font-medium text-white/90 mb-2 block"
              >
                邮箱地址
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="请输入您的邮箱"
                required
                className="glass rounded-xl px-4 py-3 text-white placeholder:text-white/50 border-white/10 focus:border-indigo-400 bg-transparent"
              />
              <FieldError state={state} field="email" />
            </div>

            <div>
              <Label
                htmlFor="password"
                className="text-sm font-medium text-white/90 mb-2 block"
              >
                密码
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="请设置您的密码"
                required
                className="glass rounded-xl px-4 py-3 text-white placeholder:text-white/50 border-white/10 focus:border-indigo-400 bg-transparent"
              />
              <FieldError state={state} field="password" />
              <p className="text-xs text-white/50 mt-2">
                密码至少包含8个字符，建议包含数字和特殊字符
              </p>
            </div>

            <div className="pt-4 space-y-4">
              <SubmitButton text="创建账户" />
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/40">
                <span className="flex-1 h-px bg-white/10" />
                <span>或</span>
                <span className="flex-1 h-px bg-white/10" />
              </div>
              <GoogleAuthButton label="通过 Google 注册" />
            </div>

            <FormError state={state} />

            {/* Features highlight */}
            <div
              className="rounded-xl border border-indigo-400/20 p-4 mt-6"
              style={{ background: "rgba(99,102,241,.08)" }}
            >
              <h3 className="text-sm font-semibold mb-2">注册即享受：</h3>
              <ul className="text-xs text-white/70 space-y-1">
                <li>• 每日免费 AI 预测推荐</li>
                <li>• 实时赔率对比功能</li>
                <li>• 独家羊毛福利信息</li>
                <li>• 专业数据分析工具</li>
              </ul>
            </div>

            <div className="text-center pt-4 border-t border-white/10">
              <p className="text-white/70 text-sm">
                已有账户？{" "}
                <Link
                  href="/login"
                  className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
                >
                  立即登录
                </Link>
              </p>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-white/40">
            注册即表示您同意我们的{" "}
            <Link href="#" className="underline hover:text-white/60">
              服务条款
            </Link>{" "}
            和{" "}
            <Link href="#" className="underline hover:text-white/60">
              隐私政策
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
