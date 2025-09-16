"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/components/actions/login-action";
import { useActionState } from "react";
import { SubmitButton } from "@/components/ui/submitButton";
import { FieldError, FormError } from "@/components/ui/FormError";
import { ArrowLeft } from "lucide-react";

export default function Page() {
  const [state, dispatch] = useActionState(login, undefined);
  return (
    <div className="min-h-screen text-slate-100 bg-gradient-to-b from-bg1 via-bg2 to-bg1 flex items-center justify-center px-4">
      {/* Background gradient effect */}
      <div 
        className="absolute inset-0 opacity-30" 
        style={{ background: "radial-gradient(ellipse at center, rgba(99,102,241,.15), transparent 70%)" }}
      />
      
      <div className="relative w-full max-w-md">
        {/* Header with back button */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
          
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 grid place-items-center font-black text-lg">AI</div>
            <div className="text-2xl font-bold">SmartBet Hub</div>
          </div>
        </div>

        {/* Login Form */}
        <form action={dispatch} className="glass rounded-2xl shadow-soft p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">欢迎回来</h1>
            <p className="text-white/70">登录您的账户，继续您的智能下注之旅</p>
          </div>

          <div className="space-y-6">
            <div>
              <Label htmlFor="username" className="text-sm font-medium text-white/90 mb-2 block">
                用户名
              </Label>
              <Input
                id="username"
                name="username"
                type="email"
                placeholder="请输入您的邮箱"
                required
                className="glass rounded-xl px-4 py-3 text-white placeholder:text-white/50 border-white/10 focus:border-indigo-400 bg-transparent"
              />
              <FieldError state={state} field="username" />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium text-white/90 mb-2 block">
                密码
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="请输入您的密码"
                required
                className="glass rounded-xl px-4 py-3 text-white placeholder:text-white/50 border-white/10 focus:border-indigo-400 bg-transparent"
              />
              <FieldError state={state} field="password" />
              <div className="text-right mt-2">
                <Link
                  href="/password-recovery"
                  className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  忘记密码？
                </Link>
              </div>
            </div>

            <div className="pt-4">
              <SubmitButton text="登录" />
            </div>

            <FormError state={state} />

            <div className="text-center pt-4 border-t border-white/10">
              <p className="text-white/70 text-sm">
                还没有账户？{" "}
                <Link
                  href="/register"
                  className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
                >
                  立即注册
                </Link>
              </p>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-white/40">
            登录即表示您同意我们的服务条款和隐私政策
          </p>
        </div>
      </div>
    </div>
  );
}