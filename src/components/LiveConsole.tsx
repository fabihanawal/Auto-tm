import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Trash2, 
  Copy, 
  Check, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  ArrowDown, 
  Calculator,
  Lock,
  PauseCircle
} from 'lucide-react';

export interface LogEntry {
  id: string;
  timestamp: string;
  type: 'info' | 'step' | 'captcha' | 'success' | 'warning' | 'error';
  message: string;
  details?: string;
}

interface LiveConsoleProps {
  logs: LogEntry[];
  onClearLogs: () => void;
  pendingCaptcha: {
    question: string;
    suggestedAnswer: number;
    khatianNo: string;
  } | null;
  onSolveCaptcha: (answer: string) => void;
  isRunning: boolean;
}

export const LiveConsole: React.FC<LiveConsoleProps> = ({
  logs,
  onClearLogs,
  pendingCaptcha,
  onSolveCaptcha,
  isRunning,
}) => {
  const [filter, setFilter] = useState<'all' | 'captcha' | 'success' | 'error'>('all');
  const [copied, setCopied] = useState(false);
  const [manualInput, setManualInput] = useState('');
  const [autoScroll, setAutoScroll] = useState(true);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoScroll && logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, autoScroll]);

  useEffect(() => {
    if (pendingCaptcha) {
      setManualInput(pendingCaptcha.suggestedAnswer.toString());
    }
  }, [pendingCaptcha]);

  const handleCopy = () => {
    const text = logs.map((l) => `[${l.timestamp}] [${l.type.toUpperCase()}] ${l.message}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredLogs = logs.filter((log) => {
    if (filter === 'all') return true;
    if (filter === 'captcha') return log.type === 'captcha';
    if (filter === 'success') return log.type === 'success';
    if (filter === 'error') return log.type === 'error' || log.type === 'warning';
    return true;
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-full shadow-xl">
      {/* Console Header */}
      <div className="bg-slate-950/80 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
          </div>
          <span className="text-xs font-semibold text-slate-300 ml-2 flex items-center gap-1.5 font-mono">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            Playwright Execution Terminal
          </span>
          {isRunning && (
            <span className="flex items-center gap-1 text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              Streaming Live
            </span>
          )}
        </div>

        {/* Filter Chips & Action Buttons */}
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-[11px]">
            <button
              onClick={() => setFilter('all')}
              className={`px-2 py-1 rounded transition ${filter === 'all' ? 'bg-slate-800 text-slate-100 font-medium' : 'text-slate-400 hover:text-slate-200'}`}
            >
              All ({logs.length})
            </button>
            <button
              onClick={() => setFilter('captcha')}
              className={`px-2 py-1 rounded transition ${filter === 'captcha' ? 'bg-slate-800 text-amber-400 font-medium' : 'text-slate-400 hover:text-amber-300'}`}
            >
              Captcha
            </button>
            <button
              onClick={() => setFilter('success')}
              className={`px-2 py-1 rounded transition ${filter === 'success' ? 'bg-slate-800 text-emerald-400 font-medium' : 'text-slate-400 hover:text-emerald-300'}`}
            >
              Success
            </button>
            <button
              onClick={() => setFilter('error')}
              className={`px-2 py-1 rounded transition ${filter === 'error' ? 'bg-slate-800 text-red-400 font-medium' : 'text-slate-400 hover:text-red-300'}`}
            >
              Errors
            </button>
          </div>

          <button
            onClick={handleCopy}
            disabled={logs.length === 0}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition disabled:opacity-40"
            title="কপি করুন"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            onClick={onClearLogs}
            disabled={logs.length === 0}
            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition disabled:opacity-40"
            title="লগ ক্লিয়ার করুন"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Captcha Pause Banner if needed */}
      {pendingCaptcha && (
        <div className="bg-amber-950/80 border-b border-amber-600/50 p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  ক্যাপচা সমাধান প্রয়োজন (Captcha Verification)
                </span>
                <span className="text-[10px] bg-amber-500/20 text-amber-200 px-1.5 py-0.5 rounded">
                  খতিয়ান #{pendingCaptcha.khatianNo}
                </span>
              </div>
              <p className="text-xs text-amber-100/90 mt-0.5">
                পোর্টাল গাণিতিক ক্যাপচা: <strong className="text-white text-sm bg-black/40 px-2 py-0.5 rounded font-mono">{pendingCaptcha.question}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              className="bg-slate-950 border border-amber-500/60 rounded-lg px-3 py-1.5 text-sm font-mono text-center text-white focus:outline-none focus:ring-2 focus:ring-amber-500 w-24"
              placeholder="উত্তর"
            />
            <button
              onClick={() => onSolveCaptcha(manualInput)}
              className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold px-4 py-1.5 rounded-lg text-xs transition flex items-center gap-1.5 shadow"
            >
              <Check className="w-4 h-4" />
              <span>নিশ্চিত করুন</span>
            </button>
          </div>
        </div>
      )}

      {/* Terminal Output Body */}
      <div className="flex-1 bg-black/80 p-4 font-mono text-xs overflow-y-auto space-y-2 select-text">
        {filteredLogs.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-600 py-12">
            <Terminal className="w-8 h-8 mb-2 opacity-50" />
            <p>কোনো লগ এন্ট্রি পাওয়া যায়নি।</p>
            <p className="text-[11px] text-slate-700 mt-1">
              বামের কন্ট্রোল প্যানেল থেকে 'অটোমেশন শুরু করুন' চাপলে লাইভ ইভেন্ট দেখা যাবে।
            </p>
          </div>
        ) : (
          filteredLogs.map((log) => {
            let badgeColor = 'text-slate-400 bg-slate-800/60 border-slate-700';
            let textColor = 'text-slate-300';

            if (log.type === 'step') {
              badgeColor = 'text-sky-400 bg-sky-950/60 border-sky-800';
              textColor = 'text-sky-200';
            } else if (log.type === 'captcha') {
              badgeColor = 'text-amber-400 bg-amber-950/60 border-amber-800';
              textColor = 'text-amber-200';
            } else if (log.type === 'success') {
              badgeColor = 'text-emerald-400 bg-emerald-950/60 border-emerald-800';
              textColor = 'text-emerald-200 font-medium';
            } else if (log.type === 'warning') {
              badgeColor = 'text-yellow-400 bg-yellow-950/60 border-yellow-800';
              textColor = 'text-yellow-200';
            } else if (log.type === 'error') {
              badgeColor = 'text-red-400 bg-red-950/60 border-red-800';
              textColor = 'text-red-300 font-semibold';
            }

            return (
              <div key={log.id} className="flex items-start gap-2.5 leading-relaxed group hover:bg-slate-900/40 p-0.5 rounded">
                <span className="text-slate-600 select-none text-[10px] w-16 shrink-0 pt-0.5 font-mono">
                  {log.timestamp}
                </span>
                <span className={`px-1.5 py-0.2 rounded border text-[10px] font-semibold uppercase tracking-wider shrink-0 ${badgeColor}`}>
                  {log.type}
                </span>
                <div className="flex-1 min-w-0">
                  <span className={`${textColor} break-all`}>{log.message}</span>
                  {log.details && (
                    <div className="mt-1 text-[11px] text-slate-500 bg-slate-950/60 p-2 rounded border border-slate-800/80 font-mono">
                      {log.details}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
        <div ref={logEndRef} />
      </div>

      {/* Terminal Footer Info */}
      <div className="bg-slate-950/90 px-4 py-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-3">
          <span>ইঞ্জিন: Chromium v124 (Playwright)</span>
          <span>•</span>
          <span>রেট-লিমিট ট্র্যাকার: অ্যাক্টিভ</span>
        </div>
        <button
          onClick={() => setAutoScroll(!autoScroll)}
          className={`flex items-center gap-1 hover:text-slate-300 transition ${autoScroll ? 'text-emerald-400' : 'text-slate-500'}`}
        >
          <ArrowDown className="w-3 h-3" />
          <span>অটো স্ক্রল {autoScroll ? 'অন' : 'অফ'}</span>
        </button>
      </div>
    </div>
  );
};
