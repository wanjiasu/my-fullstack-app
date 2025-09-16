import Link from "next/link";
import { User, ChevronDown, LogOut, Settings, User as UserIcon } from "lucide-react";
import { logout } from "@/components/actions/logout-action";

interface UserMenuProps {
  user: {
    id: string;
    email: string;
    is_active: boolean;
    is_superuser: boolean;
    is_verified: boolean;
  };
}

export function UserMenu({ user }: UserMenuProps) {
  return (
    <div className="relative group">
      <button className="flex items-center gap-2 glass rounded-xl px-4 py-2 text-sm hover:bg-white/10 transition-colors">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 grid place-items-center">
          <UserIcon className="w-4 h-4 text-white" />
        </div>
        <span className="hidden sm:inline max-w-24 truncate">{user.email}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {/* Dropdown Menu */}
      <div className="absolute right-0 mt-2 w-48 glass rounded-xl shadow-soft border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none group-hover:pointer-events-auto">
        <div className="p-2">
          <div className="px-3 py-2 border-b border-white/10 mb-2">
            <p className="text-sm font-medium truncate">{user.email}</p>
            <p className="text-xs text-white/60">
              {user.is_verified ? "已验证" : "未验证"} • {user.is_superuser ? "管理员" : "用户"}
            </p>
          </div>
          
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-white/10 transition-colors"
          >
            <Settings className="w-4 h-4" />
            控制面板
          </Link>
          
          <form action={logout} className="mt-1">
            <button
              type="submit"
              className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              退出登录
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
