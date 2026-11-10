import React, { useState } from 'react';
import { 
  Cpu, 
  CheckCircle2, 
  HelpCircle, 
  RefreshCw, 
  Calculator, 
  ArrowRight,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { banglaToEnglishDigits, solveMathCaptchaText } from '../data/codeTemplates';

export const CaptchaLab: React.FC = () => {
  const sampleChallenges = [
    '৭ + ৫ = ?',
    '১২ - ৪ = ?',
    '৮ + ৯ = ?',
    '১৫ + ৭ = ?',
    '25 + 14 = ?',
    '৯ * ৩ = ?',
    '১৮ - ৬ = ?',
    '১০ + ২০ = ?',
  ];

  const [currentChallenge, setCurrentChallenge] = useState(sampleChallenges[0]);
  const [customInput, setCustomInput] = useState('');
  const [testResult, setTestResult] = useState<{
    original: string;
    normalized: string;
    answer: number | null;
  }>(() => {
    const raw = sampleChallenges[0];
    const norm = banglaToEnglishDigits(raw);
    const ans = solveMathCaptchaText(raw);
    return { original: raw, normalized: norm, answer: ans };
  });

  const runTest = (text: string) => {
    setCurrentChallenge(text);
    const norm = banglaToEnglishDigits(text);
    const ans = solveMathCaptchaText(text);
    setTestResult({
      original: text,
      normalized: norm,
      answer: ans,
    });
  };

  const handleRandomize = () => {
    const rand = sampleChallenges[Math.floor(Math.random() * sampleChallenges.length)];
    runTest(rand);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInput.trim()) {
      runTest(customInput.trim());
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-emerald-400" />
              ই-পর্চা ক্যাপচা হ্যান্ডলিং ও টেস্ট ল্যাব
            </h2>
            <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full font-mono">
              Regex & Numeral Parser Engine
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            eporchia.gov.bd পোর্টালের সাধারণ বাংলা গণিত ক্যাপচা স্বয়ংক্রিয়ভাবে সমাধান এবং জটিল ক্যাপচায় ইউজার ইন্টারভেনশন যাচাই করুন।
          </p>
        </div>

        <button
          onClick={handleRandomize}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition border border-slate-700"
        >
          <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
          <span>র‍্যান্ডম ক্যাপচা লোড করুন</span>
        </button>
      </div>

      {/* Interactive Testing Playground */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Input & Presets */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-5">
          <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-emerald-400" />
            <span>ক্যাপচা চ্যালেঞ্জ নির্বাচন</span>
          </h3>

          <div className="space-y-2">
            <label className="text-xs text-slate-400 font-medium">নমুনা ক্যাপচা চ্যালেঞ্জ থেকে বেছে নিন:</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {sampleChallenges.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => runTest(item)}
                  className={`p-2 rounded-xl text-xs font-mono font-bold transition border ${
                    currentChallenge === item
                      ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500/60 shadow'
                      : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:bg-slate-800/60'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleCustomSubmit} className="space-y-2 pt-2 border-t border-slate-800">
            <label className="text-xs text-slate-400 font-medium">অথবা আপনার পছন্দের গাণিতিক ক্যাপচা লিখুন:</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="যেমন: ২৫ + ১৫ = ?"
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-semibold transition"
              >
                টেস্ট
              </button>
            </div>
          </form>

          {/* Visual Captcha Box Preview */}
          <div className="mt-4 p-4 rounded-xl bg-amber-50/5 border border-amber-500/20 text-center">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-2 font-medium">
              পোর্টাল সিমুলেটেড ক্যাপচা বক্স
            </span>
            <div className="inline-block bg-slate-950 border-2 border-dashed border-amber-500/50 px-6 py-3 rounded-xl font-mono text-xl sm:text-2xl font-black text-amber-300 shadow-inner tracking-widest">
              {testResult.original}
            </div>
          </div>
        </div>

        {/* Right: Engine Analysis Results */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>ইঞ্জিন এক্সিকিউশন ও রেজাল্ট</span>
            </h3>

            <div className="space-y-4">
              {/* Step 1: Normalization */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <div className="text-[11px] font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                  ধাপ ১: বাংলা সংখ্যা থেকে ইংরেজি সংখ্যা নরমালাইজেশন
                </div>
                <div className="font-mono text-xs text-sky-300 bg-black/40 p-2 rounded">
                  '{testResult.original}' → '{testResult.normalized}'
                </div>
              </div>

              {/* Step 2: Regex & Arithmetic Operation */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <div className="text-[11px] font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  ধাপ ২: গাণিতিক সমীকরণ সমাধান (Arithmetic Solver)
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 font-mono text-xs text-slate-300 bg-black/40 p-2 rounded">
                    প্যাটার্ন: (\d+)\s*([+\\-*])\s*(\d+)
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                  <div className="bg-emerald-600 text-slate-950 font-black font-mono text-base px-4 py-1.5 rounded-lg shadow">
                    {testResult.answer !== null ? testResult.answer : 'ত্রুটি'}
                  </div>
                </div>
              </div>

              {/* Result Status */}
              <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                testResult.answer !== null
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  : 'bg-red-950/40 border-red-500/40 text-red-300'
              }`}>
                {testResult.answer !== null ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-semibold text-xs">
                    {testResult.answer !== null
                      ? 'স্বয়ংক্রিয় সমাধান সফল (Auto-Solved)'
                      : 'স্বয়ংক্রিয়ভাবে পড়া যায়নি (Manual Fallback Triggered)'}
                  </div>
                  <p className="text-[11px] mt-0.5 opacity-80">
                    {testResult.answer !== null
                      ? `Playwright স্ক্রিপ্টটি ইনপুট ফিল্ডে সরাসরি '${testResult.answer}' টাইপ করে সার্চ সম্পন্ন করবে।`
                      : 'স্ক্রিপ্টটি সাময়িকভাবে পজ নেবে এবং headless: false মোডে ব্যবহারকারীকে ক্যাপচা সমাধানের সুযোগ দেবে।'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 border-t border-slate-800 pt-3 mt-4">
            পদ্ধতি: Unicode Bengali Numerals Conversion (০-৯) + Regular Expression Pattern Matcher.
          </div>
        </div>
      </div>
    </div>
  );
};
