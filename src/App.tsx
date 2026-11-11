/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Header, ActiveTab } from './components/Header';
import { CrawlerDashboard, CrawlerConfig } from './components/CrawlerDashboard';
import { LiveConsole, LogEntry } from './components/LiveConsole';
import { DownloadManager } from './components/DownloadManager';
import { SourceCodeHub } from './components/SourceCodeHub';
import { LocalRunGuide } from './components/LocalRunGuide';
import { CaptchaLab } from './components/CaptchaLab';
import { KhatianPreviewModal } from './components/KhatianPreviewModal';
import { GEO_DATA } from './data/geoData';
import { 
  KhatianRecord, 
  createMockKhatianRecord, 
  generateKhatianPDF 
} from './utils/pdfGenerator';
import confetti from 'canvas-confetti';

interface DownloadItem {
  id: string;
  khatianNo: string;
  record: KhatianRecord;
  fileName: string;
  fileSize: string;
  downloadedAt: string;
  status: 'completed' | 'failed';
}

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  // Crawler Configuration - Pre-configured with Naogaon district, Rajshahi Division
  const [config, setConfig] = useState<CrawlerConfig>({
    divisionId: 'rajshahi_div',
    districtId: 'naogaon_dist',
    upazilaId: 'naogaon_sadar',
    unionId: 'naogaon_pauro',
    mouzaId: 'ng_m1',
    isCustomMouza: false,
    customMouzaName: '',
    customJlNo: '',
    surveyType: 'RS',
    inputMode: 'range',
    rangeStart: 1,
    rangeEnd: 15,
    customList: '12, 15, 24, 45, 88, 102',
    headless: false,
    throttleDelay: 1500,
    autoSolveCaptcha: true,
    pauseForManualCaptcha: false,
  });

  // Execution state
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [previewRecord, setPreviewRecord] = useState<KhatianRecord | null>(null);

  // Progress metrics
  const [progress, setProgress] = useState({
    current: 0,
    total: 0,
    currentKhatian: '',
    successCount: 0,
    failedCount: 0,
    statusText: 'অটোমেশন প্রস্তুত',
  });

  // Logs state
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: 'init-1',
      timestamp: new Date().toLocaleTimeString(),
      type: 'info',
      message: 'ই-পর্চা প্লে-রাইট অটোমেশন সিস্টেম সফলভাবে লোড হয়েছে। নওগাঁ জেলার ১১টি উপজেলা ও মৌজা ডেটাবেস প্রস্তুত।',
      details: 'টার্গেট: রাজশাহী বিভাগ > নওগাঁ জেলা | ইঞ্জিন: Chromium Engine',
    },
  ]);

  // Captcha interruption state
  const [pendingCaptcha, setPendingCaptcha] = useState<{
    question: string;
    suggestedAnswer: number;
    khatianNo: string;
  } | null>(null);

  // Downloads collection
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);

  // Refs for pause/stop control during async loop
  const stopRequestedRef = useRef(false);
  const pauseRequestedRef = useRef(false);
  const captchaResolverRef = useRef<((value: boolean) => void) | null>(null);

  const addLog = (
    type: 'info' | 'step' | 'captcha' | 'success' | 'warning' | 'error',
    message: string,
    details?: string
  ) => {
    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        timestamp: new Date().toLocaleTimeString(),
        type,
        message,
        details,
      },
    ]);
  };

  // Resolve current active selection names
  const getSelectedNames = () => {
    const div = GEO_DATA.find((d) => d.id === config.divisionId) || GEO_DATA[0];
    const dist = div.districts.find((d) => d.id === config.districtId) || div.districts[0];
    const upz = dist.upazilas.find((u) => u.id === config.upazilaId) || dist.upazilas[0];
    const un = upz.unions.find((u) => u.id === config.unionId) || upz.unions[0];
    const allUpzMouzas = upz.unions.flatMap((union) => union.mouzas);
    const mz = allUpzMouzas.find((m) => m.id === config.mouzaId) || allUpzMouzas[0] || {
      name: 'মৌজা',
      jlNo: '০১',
    };

    const finalMouzaName = config.isCustomMouza && config.customMouzaName?.trim()
      ? config.customMouzaName.trim()
      : mz.name;

    const finalJlNo = config.isCustomMouza && config.customJlNo?.trim()
      ? config.customJlNo.trim()
      : mz.jlNo;

    return {
      division: div.name,
      district: dist.name,
      upazila: upz.name,
      union: un.name,
      mouza: finalMouzaName,
      jlNo: finalJlNo,
    };
  };

  // Helper wait function
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // Handler: Start Automation
  const handleStart = async () => {
    stopRequestedRef.current = false;
    pauseRequestedRef.current = false;
    setIsRunning(true);
    setIsPaused(false);

    const geo = getSelectedNames();

    // Prepare khatian queue
    let queue: number[] = [];
    if (config.inputMode === 'range') {
      const start = Math.min(config.rangeStart, config.rangeEnd);
      const end = Math.max(config.rangeStart, config.rangeEnd);
      for (let i = start; i <= end; i++) {
        queue.push(i);
      }
    } else {
      queue = config.customList
        .split(',')
        .map((s) => parseInt(s.trim(), 10))
        .filter((n) => !isNaN(n));
    }

    if (queue.length === 0) {
      addLog('error', 'খতিয়ান তালিকা খালি! দয়া করে সঠিক রেঞ্জ বা কমা-সেপারেটেড তালিকা দিন।');
      setIsRunning(false);
      return;
    }

    setProgress({
      current: 0,
      total: queue.length,
      currentKhatian: queue[0].toString(),
      successCount: 0,
      failedCount: 0,
      statusText: 'ব্রাউজার ওপেন হচ্ছে...',
    });

    addLog('info', `অটোমেশন শুরু হচ্ছে: মোট ${queue.length}টি খতিয়ান প্রসেস করা হবে।`);
    addLog(
      'step',
      `Chromium লঞ্চ হচ্ছে (headless: ${config.headless})...`,
      `টার্গেট: ${geo.division} > ${geo.district} > ${geo.upazila} > ${geo.mouza} (জে.এল ${geo.jlNo})`
    );

    await sleep(800);

    addLog('step', 'ভূমি মন্ত্রণালয় পোর্টাল ওপেন: https://eporchia.gov.bd/khatian-search');
    await sleep(600);

    addLog('step', `ড্রপডাউন নির্বাচন সম্পন্ন: বিভাগ (${geo.division}), জেলা (${geo.district}), উপজেলা (${geo.upazila}), মৌজা (${geo.mouza}), জরিপ (${config.surveyType})`);
    await sleep(600);

    let successes = 0;
    let failures = 0;

    for (let i = 0; i < queue.length; i++) {
      if (stopRequestedRef.current) {
        addLog('warning', 'ব্যবহারকারী কর্তৃক অটোমেশন প্রক্রিয়া বাতিল করা হয়েছে।');
        break;
      }

      // Handle pause loop
      while (pauseRequestedRef.current) {
        setProgress((p) => ({ ...p, statusText: 'অটোমেশন সাময়িক স্থগিত (Paused)' }));
        await sleep(500);
        if (stopRequestedRef.current) break;
      }
      if (stopRequestedRef.current) break;

      const khatianNo = queue[i].toString();
      setProgress((p) => ({
        ...p,
        current: i + 1,
        currentKhatian: khatianNo,
        statusText: `খতিয়ান #${khatianNo} প্রসেস হচ্ছে...`,
      }));

      addLog('info', `[${i + 1}/${queue.length}] খতিয়ান #${khatianNo} অনুসন্ধান চলছে...`);
      await sleep(400);

      // Math Captcha simulation
      const numA = Math.floor(Math.random() * 8) + 2;
      const numB = Math.floor(Math.random() * 8) + 1;
      const mathQuestion = `${numA} + ${numB} = ?`;
      const correctAnswer = numA + numB;

      // Trigger manual captcha intervention if requested or occasional demo check
      if (config.pauseForManualCaptcha && (i === 1 || i % 6 === 5)) {
        addLog('captcha', `ক্যাপচা ইন্টারসেপশন: পোর্টাল গাণিতিক ক্যাপচা সনাক্ত হয়েছে ("${mathQuestion}")`);
        setPendingCaptcha({
          question: mathQuestion,
          suggestedAnswer: correctAnswer,
          khatianNo,
        });

        // Wait for user to confirm in UI
        await new Promise<boolean>((resolve) => {
          captchaResolverRef.current = resolve;
        });

        setPendingCaptcha(null);
        addLog('success', `ক্যাপচা সমাধান নিশ্চিত: ${correctAnswer} ইনপুট করা হয়েছে।`);
      } else if (config.autoSolveCaptcha) {
        addLog('captcha', `স্বয়ংক্রিয় ম্যাথ ক্যাপচা সলভার: "${mathQuestion}" সনাক্ত -> সমাধান: ${correctAnswer}`);
        await sleep(300);
      }

      // Check if khatian exists or simulated error (1 out of 15)
      const isRecordFound = !(khatianNo === '99' || (i > 0 && i % 14 === 13));

      if (isRecordFound) {
        // Generate authentic record and filename
        const record = createMockKhatianRecord(
          khatianNo,
          geo.division,
          geo.district,
          geo.upazila,
          geo.union,
          geo.mouza,
          geo.jlNo,
          config.surveyType
        );

        const sanitizedFileName = `${geo.district}_${geo.upazila}_${geo.mouza}_Khatian_${khatianNo}.pdf`
          .replace(/[\s/]/g, '_');

        const newItem: DownloadItem = {
          id: Math.random().toString(36).substring(2, 9),
          khatianNo,
          record,
          fileName: sanitizedFileName,
          fileSize: `${(Math.random() * 0.4 + 1.1).toFixed(1)} MB`,
          downloadedAt: new Date().toLocaleTimeString(),
          status: 'completed',
        };

        setDownloads((prev) => [newItem, ...prev]);
        successes++;
        setProgress((p) => ({ ...p, successCount: successes }));

        addLog(
          'success',
          `খতিয়ান #${khatianNo} সফলভাবে ডাউনলোড ও সেভ হয়েছে।`,
          `ফাইল: ${sanitizedFileName} | দাগ সংখ্যা: ${record.plots.length}টি | জমির পরিমাণ: ${record.totalArea}`
        );
      } else {
        failures++;
        setProgress((p) => ({ ...p, failedCount: failures }));
        addLog(
          'error',
          `খতিয়ান #${khatianNo} পাওয়া যায়নি (No record found on portal)`,
          `ত্রুটি স্ক্রিনশট সেভ করা হয়েছে: error_khatian_${khatianNo}.png`
        );
      }

      // Throttling delay
      if (i < queue.length - 1 && !stopRequestedRef.current) {
        await sleep(config.throttleDelay);
      }
    }

    setIsRunning(false);
    setIsPaused(false);
    setProgress((p) => ({
      ...p,
      statusText: stopRequestedRef.current
        ? 'অটোমেশন বাতিল হয়েছে'
        : `সমাপ্ত! সফল: ${successes}টি, ব্যর্থ: ${failures}টি`,
    }));

    if (successes > 0 && !stopRequestedRef.current) {
      addLog('success', `ব্যাচ অটোমেশন সমাপ্ত! মোট ${successes}টি খতিয়ান সফলভাবে প্রস্তুত।`);
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  };

  const handlePause = () => {
    pauseRequestedRef.current = true;
    setIsPaused(true);
    addLog('warning', 'অটোমেশন সাময়িক স্থগিত (Paused) করা হয়েছে।');
  };

  const handleResume = () => {
    pauseRequestedRef.current = false;
    setIsPaused(false);
    addLog('info', 'অটোমেশন পুনরায় চালু (Resumed) করা হয়েছে।');
  };

  const handleStop = () => {
    stopRequestedRef.current = true;
    pauseRequestedRef.current = false;
    if (captchaResolverRef.current) {
      captchaResolverRef.current(false);
      setPendingCaptcha(null);
    }
    setIsPaused(false);
    setIsRunning(false);
    addLog('warning', 'অটোমেশন বন্ধ করার সিগন্যাল পাঠানো হয়েছে।');
  };

  const handleSolveCaptcha = (answer: string) => {
    if (captchaResolverRef.current) {
      captchaResolverRef.current(true);
    }
  };

  const handleClearLogs = () => {
    setLogs([]);
  };

  const handleClearDownloads = () => {
    setDownloads([]);
  };

  const handleRemoveDownloadItem = (id: string) => {
    setDownloads((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        downloadCount={downloads.length}
        isRunning={isRunning}
      />

      {/* Main Tab Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <CrawlerDashboard
              config={config}
              setConfig={setConfig}
              isRunning={isRunning}
              isPaused={isPaused}
              onStart={handleStart}
              onPause={handlePause}
              onResume={handleResume}
              onStop={handleStop}
              progress={progress}
            />

            {/* Live Terminal Console below controls */}
            <div className="h-[420px] rounded-2xl overflow-hidden shadow-2xl">
              <LiveConsole
                logs={logs}
                onClearLogs={handleClearLogs}
                pendingCaptcha={pendingCaptcha}
                onSolveCaptcha={handleSolveCaptcha}
                isRunning={isRunning}
              />
            </div>
          </div>
        )}

        {activeTab === 'downloads' && (
          <DownloadManager
            downloads={downloads}
            onPreview={(record) => setPreviewRecord(record)}
            onClear={handleClearDownloads}
            onRemoveItem={handleRemoveDownloadItem}
          />
        )}

        {activeTab === 'code' && <SourceCodeHub />}

        {activeTab === 'guide' && <LocalRunGuide />}

        {activeTab === 'captcha' && <CaptchaLab />}
      </main>

      {/* Khatian Preview Modal */}
      <KhatianPreviewModal
        record={previewRecord}
        onClose={() => setPreviewRecord(null)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>ই-পর্চা খতিয়ান ও নামজারি অটো-ডাউনলোডার • বাংলাদেশ ভূমি মন্ত্রণালয় অটোমেশন সিস্টেম</span>
          <span className="text-[11px] text-slate-600">
            Powered by Node.js, Next.js App Router, Playwright & Tailwind CSS
          </span>
        </div>
      </footer>
    </div>
  );
}
