import React, { useState } from 'react';
import { 
  FolderTree, 
  FileCode, 
  Copy, 
  Check, 
  Download, 
  FolderArchive, 
  Terminal,
  ExternalLink,
  Code2
} from 'lucide-react';
import { CODE_TEMPLATES, CodeFile } from '../data/codeTemplates';
import JSZip from 'jszip';
import confetti from 'canvas-confetti';

export const SourceCodeHub: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<CodeFile>(CODE_TEMPLATES[0]);
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSingle = () => {
    const blob = new Blob([selectedFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedFile.name.split(' ')[0];
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadFullProjectZip = async () => {
    setIsExporting(true);
    try {
      const zip = new JSZip();

      CODE_TEMPLATES.forEach((file) => {
        zip.file(file.path, file.content);
      });

      // Add default .env
      zip.file(
        '.env.example',
        `# Bangladesh Land Ministry Automation Configuration\nPORT=3000\nOUTPUT_DIR=./downloads\nHEADLESS=false\nTHROTTLE_DELAY_MS=2000\n`
      );

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'eporchia-khatian-downloader-nextjs-playwright.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err) {
      console.error('Failed to create project ZIP:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-emerald-400" />
              কমপ্লিট সোর্স কোড ও স্ক্রিপ্টস রিপোজিটরি
            </h2>
            <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">
              Next.js 14 + Playwright
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            আপনার লোকাল মেশিনে বা সার্ভারে চালানোর জন্য প্রয়োজনীয় সমস্ত ফাইল (API রুট, স্ক্র্যাপার কোর, CLI স্ক্রিপ্ট এবং কনফিগ)।
          </p>
        </div>

        <button
          onClick={handleDownloadFullProjectZip}
          disabled={isExporting}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs sm:text-sm font-semibold transition shadow-lg shadow-emerald-950/50"
        >
          <FolderArchive className="w-4 h-4" />
          <span>{isExporting ? 'জিপ প্রস্তুত হচ্ছে...' : 'সম্পূর্ণ প্রজেক্ট ZIP ডাউনলোড'}</span>
        </button>
      </div>

      {/* Code Explorer Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left File Tree */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">
            <FolderTree className="w-4 h-4 text-emerald-400" />
            <span>প্রজেক্ট স্ট্রাকচার (Folder Structure)</span>
          </div>

          <div className="space-y-1.5">
            {CODE_TEMPLATES.map((file) => {
              const isSelected = selectedFile.path === file.path;
              return (
                <button
                  key={file.path}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-left p-2.5 rounded-xl transition flex items-start gap-3 ${
                    isSelected
                      ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 shadow-md'
                      : 'hover:bg-slate-800/60 border border-transparent text-slate-300'
                  }`}
                >
                  <FileCode className={`w-4 h-4 shrink-0 mt-0.5 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`} />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold font-mono truncate">{file.path}</div>
                    <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{file.description}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
            <div className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>এক ক্লিকে ফাইল এক্সপোর্ট</span>
            </div>
            <p>প্রতিটি ফাইলের কোড উপরে 'কপি' বা 'ডাউনলোড' করা যাবে।</p>
          </div>
        </div>

        {/* Right Code Viewer */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
          {/* File Tab Header */}
          <div className="bg-slate-950/90 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-mono font-semibold text-slate-200">{selectedFile.path}</span>
              <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded uppercase font-mono">
                {selectedFile.language}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'কপি হয়েছে!' : 'কোড কপি'}</span>
              </button>

              <button
                onClick={handleDownloadSingle}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white rounded-lg text-xs font-medium transition border border-emerald-500/30"
              >
                <Download className="w-3.5 h-3.5" />
                <span>ফাইল সেভ</span>
              </button>
            </div>
          </div>

          {/* Description banner */}
          <div className="bg-slate-950/40 px-4 py-2 text-xs text-slate-400 border-b border-slate-800/60 font-sans">
            {selectedFile.description}
          </div>

          {/* Code Window */}
          <div className="bg-black/90 p-4 overflow-x-auto max-h-[600px] text-xs font-mono text-slate-300 leading-relaxed select-text">
            <pre>
              <code>{selectedFile.content}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
