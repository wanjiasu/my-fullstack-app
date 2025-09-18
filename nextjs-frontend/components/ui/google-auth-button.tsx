"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface GoogleAuthButtonProps {
  label?: string;
}

export function GoogleAuthButton({ label = "使用 Google 登录" }: GoogleAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    window.location.href = "/api/auth/google/authorize";
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full flex items-center justify-center gap-3 bg-white text-slate-900 hover:bg-slate-100"
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <FcGoogle className="h-5 w-5" />
      )}
      <span>{isLoading ? "跳转中..." : label}</span>
    </Button>
  );
}
