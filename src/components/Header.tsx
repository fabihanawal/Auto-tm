import React from 'react';
import { 
  Layers, 
  Terminal, 
  DownloadCloud, 
  Code2, 
  BookOpen, 
  Cpu, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export type ActiveTab = 'dashboard' | 'downloads' | 'code' | 'guide' | 'captcha';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  downloadCount: number;
  isRunning: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  downloadCount,
  isRunning,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/60">
        <div className="flex items-center gap-3">
          {/* BD Emblem Representation */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-600 to-green-900 border-2 border-emerald-400/40 flex items-center justify-center shadow-lg shadow-emerald-950/40 relative">
            <span className="text-amber-300 font-bold text-xs font-serif">ভূমি</span>
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-600 border border-slate-900"></div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-100 tracking-tight flex items-center gap-2">
                ই-পর্চা খতিয়ান ও নামজারি অটো-ডাউনলোডার
                <span className="text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  v2.4 Playwright Core
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
              <span>বাংলাদেশ ভূমি মন্ত্রণালয়</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300">eporchia.gov.bd & land.gov.bd</span>
              <span className="text-slate-600">•</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> সিকিউর অটোমেশন ইঞ্জিন
              </span>
            </p>
          </div>
        </div>

        {/* Live Status & Official Links */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`}></span>
              <span className="font-medium text-slate-200">
                {isRunning ? 'অটোমেশন স্ক্র্যাপ চলছে...' : 'রেডি (Ready)'}
              </span>
            </div>
            <div className="h-3 w-px bg-slate-800 mx-1"></div>
            <span className="text-slate-400">ডাউনলোড: <strong className="text-emerald-400">{downloadCount}টি</strong></span>
          </div>

          <a
            href="https://eporchia.gov.bd"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 bg-slate-800/80 hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700/60 transition"
          >
            <span>eporchia.gov.bd</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 scrollbar-none" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>ড্যাশবোর্ড ও স্ক্র্যাপার</span>
          </button>

          <button
            onClick={() => setActiveTab('downloads')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap relative ${
              activeTab === 'downloads'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <DownloadCloud className="w-4 h-4" />
            <span>ডাউনলোড হাব ও ZIP এক্সপোর্ট</span>
            {downloadCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-emerald-500 text-slate-950 rounded-full text-[10px] font-bold">
                {downloadCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
              activeTab === 'code'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>সোর্স কোড ও স্ক্রিপ্টস</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
              activeTab === 'guide'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>গিটহাব ও লোকাল রান গাইড</span>
          </button>

          <button
            onClick={() => setActiveTab('captcha')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
              activeTab === 'captcha'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>ক্যাপচা ল্যাব ও টেস্ট</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
