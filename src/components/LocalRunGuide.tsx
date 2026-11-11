import React, { useState } from 'react';
import { 
  BookOpen, 
  Terminal, 
  GitBranch, 
  Server, 
  CheckCircle2, 
  Copy, 
  Check, 
  AlertTriangle, 
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  Cpu
} from 'lucide-react';

interface CommandBlockProps {
  command: string;
  comment?: string;
}

const CommandBlock: React.FC<CommandBlockProps> = ({ command, comment }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-black/90 border border-slate-800 rounded-xl p-3 my-2 font-mono text-xs text-emerald-300 relative group">
      {comment && <div className="text-slate-500 mb-1 select-none font-sans text-[11px]">{comment}</div>}
      <div className="pr-10 select-text break-all">{command}</div>
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 p-1.5 text-slate-500 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-md transition"
        title="কমান্ড কপি করুন"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
};

export const LocalRunGuide: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">
              গিটহাব ও লোকাল মেশিন ডেপ্লয়মেন্ট গাইডলাইন
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              বাংলাদেশ ভূমি মন্ত্রণালয়ের ই-পর্চা অটোমেটেড ডাউনলোডার স্ক্রিপ্ট নিজের কম্পিউটারে বা ভিপিএস (VPS) সার্ভারে চালানোর ধাপসমূহ
            </p>
          </div>
        </div>
      </div>

      {/* Step 1: GitHub Push */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <GitBranch className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base font-bold text-slate-200">
            ১. গিটহাবে (GitHub) কোড পুশ করার নির্দেশিকা
          </h3>
        </div>
        <p className="text-xs text-slate-400 mb-4 leading-relaxed">
          আপনার লোকাল ফোল্ডারে গিট ইনিশিয়ালাইজ করে নিচের কমান্ডগুলোর মাধ্যমে নতুন গিটহাব রিপোজিটরিতে কোড আপলোড করুন:
        </p>

        <CommandBlock
          comment="# ১. গিট ইনিট ও রিমোট রিপোজিটরি যুক্ত করুন"
          command="git init
git add .
git commit -m 'Initial commit: ePorchia automated khatian downloader with Playwright'
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/eporchia-khatian-downloader.git
git push -u origin main"
        />

        <div className="mt-3 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-400 flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>
            <strong>টিপস:</strong> নিশ্চিত করুন <code className="text-emerald-300">.gitignore</code> এ <code className="text-emerald-300">node_modules</code>, <code className="text-emerald-300">downloads/</code> এবং <code className="text-emerald-300">.env</code> ফাইল বাদ দেওয়া আছে।
          </span>
        </div>
      </section>

      {/* Step 2: Local Installation */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <Terminal className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base font-bold text-slate-200">
            ২. লোকাল মেশিনে (Windows / Mac / Linux) ইনস্টলেশন
          </h3>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          প্রজেক্টটি চালানোর জন্য আপনার কম্পিউটারে <strong>Node.js 18+ বা 20+</strong> ইনস্টল থাকতে হবে।
        </p>

        <CommandBlock
          comment="# রিপোজিটরি ক্লোন করুন এবং প্যাকেজ ইনস্টল করুন"
          command="git clone https://github.com/YOUR_USERNAME/eporchia-khatian-downloader.git
cd eporchia-khatian-downloader
npm install"
        />

        <CommandBlock
          comment="# Playwright এর ক্রোমিয়াম ব্রাউজার ইঞ্জিন ডাউনলোড করুন"
          command="npx playwright install chromium"
        />

        <div className="mt-4 p-4 rounded-xl bg-amber-950/30 border border-amber-600/30 text-amber-200 text-xs">
          <div className="font-semibold flex items-center gap-2 mb-1 text-amber-300">
            <AlertTriangle className="w-4 h-4" />
            <span>উবুন্টু / লিনাক্স সার্ভারের জন্য স্পেশাল কমান্ড:</span>
          </div>
          <p className="mb-2 text-slate-300">
            লিনাক্সে ক্রোমিয়াম চালানোর জন্য প্রয়োজনীয় ওএস লাইব্রেরি (libasound, libgbm, nss ইত্যাদি) ইনস্টল করতে চালান:
          </p>
          <CommandBlock
            command="sudo npx playwright install-deps chromium"
          />
        </div>
      </section>

      {/* Step 3: Running Modes */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <Server className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base font-bold text-slate-200">
            ৩. দুটি উপায়ে অ্যাপ্লিকেশনটি চালানোর নিয়ম
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Web UI */}
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
            <h4 className="text-sm font-semibold text-emerald-300 flex items-center gap-1.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              পদ্ধতি ক: ইন্টারঅ্যাক্টিভ ওয়েব ড্যাশবোর্ড
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              ব্রাউজারে সুন্দর ড্যাশবোর্ড থেকে রিয়েল-টাইম প্রোগ্রেস বার ও লগ দেখে ডাউনলোড করতে:
            </p>
            <CommandBlock
              command="npm run dev"
            />
            <p className="text-[11px] text-slate-500 mt-2">
              এরপর ব্রাউজারে প্রবেশ করুন: <span className="text-slate-300">http://localhost:3000</span>
            </p>
          </div>

          {/* CLI Runner */}
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
            <h4 className="text-sm font-semibold text-sky-300 flex items-center gap-1.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-sky-400"></span>
              পদ্ধতি খ: সুপারফাস্ট টার্মিনাল সিএলআই (CLI)
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              কোনো ব্রাউজার ইন্টারফেস ছাড়াই সরাসরি ব্যাকগ্রাউন্ডে হাজার খতিয়ান ব্যাচ ডাউনলোড করতে:
            </p>
            <CommandBlock
              command="node scripts/batch-downloader.js --division 'ঢাকা বিভাগ' --district 'ঢাকা' --upazila 'সাভার' --mouza 'রাজাশন' --range 1-50 --headless false"
            />
            <p className="text-[11px] text-slate-500 mt-2">
              <code className="text-emerald-400">--headless false</code> দিলে ব্রাউজারে স্বয়ংক্রিয় কার্যক্রম লাইভ দেখা যাবে।
            </p>
          </div>
        </div>
      </section>

      {/* Step 4: Production Best Practices */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base font-bold text-slate-200">
            ৪. প্রডাকশন বেস্ট প্র্যাকটিস ও ক্যাপচা স্ট্রেটেজি
          </h3>
        </div>

        <div className="space-y-3 text-xs text-slate-300">
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <h5 className="font-semibold text-slate-100 mb-1">ক. রেট লিমিট ও ডিলে পলিসি (Rate Limiting)</h5>
            <p className="text-slate-400 leading-relaxed">
              ভূমি মন্ত্রণালয়ের সার্ভার সাধারণত প্রতি মিনিটে একটানা অতি দ্রুত রিকোয়েস্ট পাঠালে সাময়িকভাবে আইপি ব্লক করতে পারে। তাই আমাদের স্ক্রিপ্টে প্রতি খতিয়ান ডাউনলোডের মাঝে <code className="text-emerald-400">delayMs: 1500 - 2500</code> দেওয়া রয়েছে। এটি পরিবর্তন করতে <code className="text-emerald-400">lib/scraper.ts</code> ফাইলের ডিলে প্যারামিটার কনফিগার করুন।
            </p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <h5 className="font-semibold text-slate-100 mb-1">খ. বাংলা ও ইংরেজি গণিত ক্যাপচা সমাধান</h5>
            <p className="text-slate-400 leading-relaxed">
              স্ক্রিপ্টে স্বয়ংক্রিয়ভাবে বাংলা সংখ্যা <code className="text-emerald-400">০-৯</code> কে ইংরেজি সংখ্যা <code className="text-emerald-400">0-9</code> এ রূপান্তর করে যোগফল বা বিয়োগফল নির্ণয়ের ইঞ্জিন অন্তর্নির্মিত রয়েছে। জটিল ক্ষেত্রে <code className="text-emerald-400">headless: false</code> মোড রেখে ইউজারকে স্ক্রিনে ১৫ সেকেন্ডের ম্যানুয়াল পজ প্রদান করা হয়।
            </p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <h5 className="font-semibold text-slate-100 mb-1">গ. সার্ভার ব্যাকগ্রাউন্ড প্রসেস ম্যানেজার (PM2)</h5>
            <p className="text-slate-400 leading-relaxed">
              সার্ভারে ২৪/৭ সার্ভিস চালু রাখতে PM2 ব্যবহার করতে পারেন:
            </p>
            <CommandBlock
              command="npm install -g pm2
pm2 start npm --name 'eporchia-scraper' -- start
pm2 logs eporchia-scraper"
            />
          </div>
        </div>
      </section>

      {/* Step 5: Vercel vs VPS vs Docker Deployment Guide */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <Server className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <span>৫. ভারসেলে (Vercel) ডিপ্লয় সংক্রান্ত গুরুত্বপূর্ণ নির্দেশনা ও সমাধান</span>
            <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-mono">
              FAQ
            </span>
          </h3>
        </div>

        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-600/30 text-xs text-amber-200/90 mb-4 leading-relaxed">
          <strong className="text-amber-300 block mb-1">সরাসরি ভারসেলে (Vercel) ডিপ্লয় করলে কী হবে?</strong>
          ভারসেল (Vercel) হচ্ছে একটি <strong>Serverless Platform</strong>। সরাসরি ভারসেলে ডিপ্লয় করলে সাধারণ Next.js ফ্রন্টএন্ড সুন্দরভাবে চলবে, কিন্তু সার্ভারলেস ফাংশনে <strong>Playwright Chromium ব্রাউজার সরাসরি ব্যাকগ্রাউন্ডে চলতে পারবে না</strong>। এর ৩টি মূল কারণ:
          <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-300">
            <li><strong>টাইমআউট লিমিট:</strong> ভারসেলের ফ্রি অ্যাকাউন্টে ফাংশন টাইমআউট সর্বোচ্চ ১০-১৫ সেকেন্ড (প্রো অ্যাকাউন্টে ৬০ সেকেন্ড)। ৫০-১০০টি খতিয়ান স্ক্র্যাপ করতে কয়েক মিনিট সময় প্রয়োজন হয়, ফলে ভারসেল টাইমআউট হয়ে রিকোয়েস্ট কেটে যাবে।</li>
            <li><strong>হেভি ব্রাউজার সাইজ:</strong> সম্পূর্ণ ক্রোমিয়াম ব্রাউজার সাইজ প্রায় ৩০০+ MB, যা ভারসেলের সার্ভারলেস সাইজ লিমিট (২৫০ MB) ছাড়িয়ে যায়।</li>
            <li><strong>ফাইল স্টোরেজ:</strong> ভারসেলে লোকাল ডিস্কে ফাইল সেভ করা যায় না (Ephemeral read-only)।</li>
          </ul>
        </div>

        <h4 className="text-sm font-semibold text-emerald-400 mb-2">তাহলে কীভাবে চালাবেন? (৩টি সহজ সমাধান):</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
          {/* Solution 1: Local Machine */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded uppercase font-semibold">
                পদ্ধতি ১ (সবচেয়ে সেরা)
              </span>
              <h5 className="font-bold text-slate-200 mt-2 mb-1">নিজের কম্পিউটার / ল্যাপটপ</h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                বাংলাদেশি ব্রডব্যান্ড আইপি দিয়ে নিজের কম্পিউটারে টার্মিনাল বা <code className="text-emerald-300">npm run dev</code> দিয়ে চালানো সবচেয়ে নিরাপদ ও দ্রুত। ক্যাপচা ম্যানুয়ালি পূরণ করা যায় এবং আইপি ব্লক হয় না।
              </p>
            </div>
            <div className="mt-3 text-[11px] text-emerald-400 font-mono">খরচ: সম্পূর্ণ ফ্রি</div>
          </div>

          {/* Solution 2: Docker on Render / Railway */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] bg-sky-500/20 text-sky-400 px-2 py-0.5 rounded uppercase font-semibold">
                পদ্ধতি ২ (ক্লাউড ডকার)
              </span>
              <h5 className="font-bold text-slate-200 mt-2 mb-1">Render / Railway / Fly.io</h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                ভারসেলের বদলে <strong>Render.com</strong> বা <strong>Railway.app</strong>-এ Dockerfile সহ ডিপ্লয় করলে ব্যাকগ্রাউন্ডে ক্রোমিয়াম ও ফুল-টাইম সার্ভার কোনো টাইমআউট ছাড়াই চলবে।
              </p>
            </div>
            <div className="mt-3 text-[11px] text-sky-400 font-mono">Docker Support: ১০০% রেডি</div>
          </div>

          {/* Solution 3: Browserless for Vercel */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded uppercase font-semibold">
                পদ্ধতি ৩ (ভারসেল + ব্রাউজারলেস)
              </span>
              <h5 className="font-bold text-slate-200 mt-2 mb-1">Vercel + Browserless.io</h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                যদি ফ্রন্টএন্ড ভারসেলেই রাখতে চান, তবে রিমোট ক্লাউড ব্রাউজার হিসেবে <code className="text-purple-300">browserless.io</code> এর WebSocket CDP কানেক্ট করতে হবে:
              </p>
            </div>
            <div className="mt-3 text-[11px] text-purple-400 font-mono">chromium.connectOverCDP(...)</div>
          </div>
        </div>
      </section>
    </div>
  );
};
