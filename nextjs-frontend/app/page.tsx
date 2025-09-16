import Link from "next/link";
import { 
  Zap, 
  Percent, 
  TrendingUp, 
  Users, 
  Crown, 
  ShieldCheck, 
  Activity, 
  Star, 
  LineChart, 
  Globe2, 
  ArrowRight, 
  Ticket,
  Link2
} from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { UserMenu } from "@/components/UserMenu";

export default async function Home() {
  const user = await getCurrentUser();
  return (
    <div className="min-h-screen text-slate-100 bg-gradient-to-b from-bg1 via-bg2 to-bg1">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur bg-bg1/70 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 grid place-items-center font-black">AI</div>
            <div className="font-semibold">SmartBet Hub</div>
            <span className="text-xs px-2 py-0.5 rounded chip ml-2 hidden sm:inline">MVP</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/70">
            <Link href="#ai" className="hover:text-white">AI 预测</Link>
            <Link href="#odds" className="hover:text-white">赔率对比</Link>
            <Link href="#promos" className="hover:text-white">羊毛中心</Link>
            <Link href="#scores" className="hover:text-white">比分&赛程</Link>
            <Link href="#social" className="hover:text-white">加入社群</Link>
          </nav>
          <div className="flex items-center gap-2">
            {user ? (
              <UserMenu user={user} />
            ) : (
              <>
                <Link href="/login" className="hidden sm:inline-flex rounded-xl px-4 py-2 text-sm glass">登录</Link>
                <Link href="/register" className="rounded-xl px-4 py-2 text-sm bg-white text-bg1 font-semibold">注册</Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0" 
          style={{ background: "radial-gradient(ellipse at top, rgba(99,102,241,.25), transparent 60%)" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 py-14 lg:py-20 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              下注之前，先看 <span className="grad-text">AI 怎么说</span>
            </h1>
            <p className="mt-4 text-white/70 max-w-xl">
              一站式 <b>AI 预测</b>、<b>赔率对比</b> 与 <b>羊毛福利</b> 聚合。东南亚 & 南美玩家的智能下注第一入口。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="#ai" className="rounded-xl px-4 py-2 text-sm bg-white text-bg1 font-semibold inline-flex items-center gap-2">
                <Zap className="w-4 h-4" /> 立即查看今日 AI Picks
              </Link>
              <Link href="#promos" className="rounded-xl px-4 py-2 text-sm glass inline-flex items-center gap-2">
                <Percent className="w-4 h-4" /> 进入羊毛中心
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl chip"><TrendingUp className="w-5 h-5" /></div>
                <div>
                  <div className="text-xs opacity-70">近7日命中率*</div>
                  <div className="text-base font-semibold">63%</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl chip"><Users className="w-5 h-5" /></div>
                <div>
                  <div className="text-xs opacity-70">私域用户</div>
                  <div className="text-base font-semibold">3,214</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl chip"><Crown className="w-5 h-5" /></div>
                <div>
                  <div className="text-xs opacity-70">覆盖渠道</div>
                  <div className="text-base font-semibold">8+</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl chip"><ShieldCheck className="w-5 h-5" /></div>
                <div>
                  <div className="text-xs opacity-70">风控模型</div>
                  <div className="text-base font-semibold">Beta</div>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-white/40 mt-2">*示例数据，仅作展示</p>
          </div>

          {/* AI Pick Card */}
          <div id="ai" className="glass rounded-2xl shadow-soft p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                <span className="text-sm opacity-80">今日 AI 重点</span>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-300">信心 87%</span>
            </div>
            <h3 className="text-xl font-bold mb-1">Liverpool vs. Man United</h3>
            <div className="text-sm text-white/60 mb-4">开赛时间：22:00 GMT+7</div>

            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="rounded-xl chip p-3 text-center">
                <div className="text-xs opacity-60">主胜</div>
                <div className="text-2xl font-bold">62%</div>
              </div>
              <div className="rounded-xl chip p-3 text-center">
                <div className="text-xs opacity-60">平局</div>
                <div className="text-2xl font-bold">21%</div>
              </div>
              <div className="rounded-xl chip p-3 text-center">
                <div className="text-xs opacity-60">客胜</div>
                <div className="text-2xl font-bold">17%</div>
              </div>
            </div>

            <div className="rounded-xl border border-indigo-400/20 p-4" style={{ background: "rgba(99,102,241,.12)" }}>
              <div className="text-xs opacity-70">推荐盘口 · FT 1X2</div>
              <div className="text-lg font-semibold mt-1">Home</div>
              <p className="text-sm text-white/70 mt-2">AI 参考近期 xG（2.1 vs 1.2）与高压迫抢回率。市场高估德比波动；主胜具备价值。</p>
            </div>

            <div className="mt-5 flex gap-3">
              <Link href="#ai" className="rounded-xl px-4 py-2 text-sm bg-white text-bg1 font-semibold inline-flex items-center gap-2">
                <Star className="w-4 h-4" /> 更多 AI Picks
              </Link>
              <Link href="#ai" className="rounded-xl px-4 py-2 text-sm glass inline-flex items-center gap-2">
                <LineChart className="w-4 h-4" /> 历史命中
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Odds Comparator */}
      <section id="odds" className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
            <LineChart className="w-5 h-5" /> 赔率对比（示例）
          </h2>
          <div className="hidden md:flex items-center gap-2">
            <input placeholder="搜索赛事 / 联赛" className="glass rounded-xl px-3 py-2 text-sm outline-none" />
            <button className="rounded-xl px-4 py-2 text-sm bg-white text-bg1 font-semibold">搜索</button>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2"><Globe2 className="w-4 h-4" /><span className="font-semibold">GG.bet</span></div>
              <span className="text-xs px-2 py-1 rounded-full chip">100% up to $100</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl chip p-3"><div className="text-[10px] opacity-60">主胜</div><div className="font-bold">1.78</div></div>
              <div className="rounded-xl chip p-3"><div className="text-[10px] opacity-60">平局</div><div className="font-bold">3.90</div></div>
              <div className="rounded-xl chip p-3"><div className="text-[10px] opacity-60">客胜</div><div className="font-bold">4.40</div></div>
            </div>
            <Link href="#" className="w-full mt-4 rounded-xl px-4 py-2 text-center block bg-white text-bg1 font-semibold inline-flex items-center justify-center gap-2">通过我们去下注 <ArrowRight className="w-4 h-4" /></Link>
          </div>

          {/* Card 2 */}
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2"><Globe2 className="w-4 h-4" /><span className="font-semibold">1xBet</span></div>
              <span className="text-xs px-2 py-1 rounded-full chip">$30 free bet</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl chip p-3"><div className="text-[10px] opacity-60">主胜</div><div className="font-bold">1.80</div></div>
              <div className="rounded-xl chip p-3"><div className="text-[10px] opacity-60">平局</div><div className="font-bold">3.85</div></div>
              <div className="rounded-xl chip p-3"><div className="text-[10px] opacity-60">客胜</div><div className="font-bold">4.35</div></div>
            </div>
            <Link href="#" className="w-full mt-4 rounded-xl px-4 py-2 text-center block bg-white text-bg1 font-semibold inline-flex items-center justify-center gap-2">通过我们去下注 <ArrowRight className="w-4 h-4" /></Link>
          </div>

          {/* Card 3 */}
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2"><Globe2 className="w-4 h-4" /><span className="font-semibold">Parimatch</span></div>
              <span className="text-xs px-2 py-1 rounded-full chip">10% cashback</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl chip p-3"><div className="text-[10px] opacity-60">主胜</div><div className="font-bold">1.76</div></div>
              <div className="rounded-xl chip p-3"><div className="text-[10px] opacity-60">平局</div><div className="font-bold">3.95</div></div>
              <div className="rounded-xl chip p-3"><div className="text-[10px] opacity-60">客胜</div><div className="font-bold">4.50</div></div>
            </div>
            <Link href="#" className="w-full mt-4 rounded-xl px-4 py-2 text-center block bg-white text-bg1 font-semibold inline-flex items-center justify-center gap-2">通过我们去下注 <ArrowRight className="w-4 h-4" /></Link>
          </div>

          {/* Card 4 */}
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2"><Globe2 className="w-4 h-4" /><span className="font-semibold">Thunderpick</span></div>
              <span className="text-xs px-2 py-1 rounded-full chip">Crypto bonus +10%</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl chip p-3"><div className="text-[10px] opacity-60">主胜</div><div className="font-bold">1.79</div></div>
              <div className="rounded-xl chip p-3"><div className="text-[10px] opacity-60">平局</div><div className="font-bold">3.88</div></div>
              <div className="rounded-xl chip p-3"><div className="text-[10px] opacity-60">客胜</div><div className="font-bold">4.42</div></div>
            </div>
            <Link href="#" className="w-full mt-4 rounded-xl px-4 py-2 text-center block bg-white text-bg1 font-semibold inline-flex items-center justify-center gap-2">通过我们去下注 <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      {/* Promotions */}
      <section id="promos" className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2"><Ticket className="w-5 h-5" /> 羊毛中心 · 今日福利</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl glass p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs px-2 py-1 rounded chip">Esports</span>
              <span className="text-sm opacity-80 font-semibold">GG.bet</span>
            </div>
            <div className="mt-3 text-lg font-bold">100% 首充加赠</div>
            <p className="text-sm text-white/70 mt-1">注册即享，电竞专属</p>
            <Link href="#" className="w-full mt-4 rounded-xl px-4 py-2 text-center block glass">领取</Link>
          </div>

          <div className="rounded-2xl glass p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs px-2 py-1 rounded chip">Football</span>
              <span className="text-sm opacity-80 font-semibold">1xBet</span>
            </div>
            <div className="mt-3 text-lg font-bold">$30 免费注单</div>
            <p className="text-sm text-white/70 mt-1">新客福利，支持串关</p>
            <Link href="#" className="w-full mt-4 rounded-xl px-4 py-2 text-center block glass">领取</Link>
          </div>

          <div className="rounded-2xl glass p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs px-2 py-1 rounded chip">All Sports</span>
              <span className="text-sm opacity-80 font-semibold">Parimatch</span>
            </div>
            <div className="mt-3 text-lg font-bold">10% 现金返还</div>
            <p className="text-sm text-white/70 mt-1">周赛累计返利</p>
            <Link href="#" className="w-full mt-4 rounded-xl px-4 py-2 text-center block glass">参加</Link>
          </div>

          <div className="rounded-2xl glass p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs px-2 py-1 rounded chip">Crypto</span>
              <span className="text-sm opacity-80 font-semibold">Thunderpick</span>
            </div>
            <div className="mt-3 text-lg font-bold">+10% 加密充值</div>
            <p className="text-sm text-white/70 mt-1">USDT/ETH 即时到账</p>
            <Link href="#" className="w-full mt-4 rounded-xl px-4 py-2 text-center block glass">充值</Link>
          </div>
        </div>
      </section>

      {/* Scores */}
      <section id="scores" className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2"><Activity className="w-5 h-5" /> 实时比分 & 赛程</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="glass rounded-2xl p-5">
            <div className="text-xs opacity-70 mb-2">THA League 1</div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">Buriram Utd</div>
                <div className="font-semibold">BG Pathum</div>
              </div>
              <div className="text-right">
                <div className="text-sm opacity-70">LIVE 31&apos;</div>
                <div className="text-xl font-bold">1 - 0</div>
                <div className="text-xs opacity-60 mt-1">19:00</div>
              </div>
            </div>
            <Link href="#" className="w-full mt-4 rounded-xl px-4 py-2 text-center block glass">查看盘口</Link>
          </div>

          <div className="glass rounded-2xl p-5">
            <div className="text-xs opacity-70 mb-2">Brazil Serie A</div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">Flamengo</div>
                <div className="font-semibold">Palmeiras</div>
              </div>
              <div className="text-right">
                <div className="text-sm opacity-70">Today</div>
                <div className="text-xl font-bold">-</div>
                <div className="text-xs opacity-60 mt-1">07:30</div>
              </div>
            </div>
            <Link href="#" className="w-full mt-4 rounded-xl px-4 py-2 text-center block glass">查看盘口</Link>
          </div>

          <div className="glass rounded-2xl p-5">
            <div className="text-xs opacity-70 mb-2">LoL LLA</div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">INF</div>
                <div className="font-semibold">EST</div>
              </div>
              <div className="text-right">
                <div className="text-sm opacity-70">Bo5</div>
                <div className="text-xl font-bold">-</div>
                <div className="text-xs opacity-60 mt-1">17:00</div>
              </div>
            </div>
            <Link href="#" className="w-full mt-4 rounded-xl px-4 py-2 text-center block glass">查看盘口</Link>
          </div>
        </div>
      </section>

      {/* Social / Agents */}
      <section id="social" className="max-w-7xl mx-auto px-4 py-12">
        <div className="glass rounded-2xl p-6 md:p-8 grid lg:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-2xl font-bold flex items-center gap-2"><Link2 className="w-5 h-5" /> 加入社群 & 代理计划</h3>
            <p className="text-white/70 mt-2">Line / Telegram / WhatsApp 一键加入，获取每日 AI 预测与独家福利。成为代理可获得分佣、专属内容包与私域运营支持。</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="#" className="rounded-xl px-4 py-2 text-sm bg-white text-bg1 font-semibold">加入玩家社群</Link>
              <Link href="#" className="rounded-xl px-4 py-2 text-sm glass">申请成为代理</Link>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="rounded-2xl chip p-4 text-center border border-white/10">
              <div className="text-xs opacity-60">玩家福利</div>
              <div className="text-lg font-bold mt-1">每日羊毛</div>
            </div>
            <div className="rounded-2xl chip p-4 text-center border border-white/10">
              <div className="text-xs opacity-60">AI 预测</div>
              <div className="text-lg font-bold mt-1">胜率 & 趋势</div>
            </div>
            <div className="rounded-2xl chip p-4 text-center border border-white/10">
              <div className="text-xs opacity-60">代理支持</div>
              <div className="text-lg font-bold mt-1">内容+分佣</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-8 text-sm text-white/60">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 grid place-items-center font-black">AI</div>
              <span>SmartBet Hub</span>
              <span className="text-xs chip px-2 py-0.5 rounded">Beta</span>
            </div>
            <div className="flex gap-5">
              <Link className="hover:text-white" href="#ai">AI 预测</Link>
              <Link className="hover:text-white" href="#odds">赔率对比</Link>
              <Link className="hover:text-white" href="#promos">羊毛中心</Link>
              <Link className="hover:text-white" href="#scores">比分</Link>
              <Link className="hover:text-white" href="#social">社群</Link>
            </div>
          </div>
          <div className="text-[11px] mt-4 opacity-60">本页面为产品原型，所有数据为示例。请遵循当地法律与责任博彩规范（18+）。</div>
        </div>
      </footer>
    </div>
  );
}
