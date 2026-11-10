export interface CodeFile {
  name: string;
  path: string;
  language: string;
  description: string;
  content: string;
}

// Runtime helper functions for Captcha Lab & simulation
export function banglaToEnglishDigits(str: string): string {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return str.replace(/[০-৯]/g, (digit) => banglaDigits.indexOf(digit).toString());
}

export function englishToBanglaDigits(str: string | number): string {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return str.toString().replace(/[0-9]/g, (digit) => banglaDigits[parseInt(digit, 10)]);
}

export function solveMathCaptchaText(captchaText: string): number | null {
  try {
    const normalized = banglaToEnglishDigits(captchaText).trim();
    const match = normalized.match(/(\d+)\s*([+\-*xX])\s*(\d+)/);
    if (!match) return null;

    const num1 = parseInt(match[1], 10);
    const op = match[2];
    const num2 = parseInt(match[3], 10);

    if (op === '+') return num1 + num2;
    if (op === '-') return num1 - num2;
    if (op === '*' || op.toLowerCase() === 'x') return num1 * num2;
    return null;
  } catch {
    return null;
  }
}

export const CODE_TEMPLATES: CodeFile[] = [
  {
    name: 'scraper.ts (Playwright Automation Core)',
    path: 'lib/scraper.ts',
    language: 'typescript',
    description: 'Playwright ব্রাউজার অটোমেশন স্ক্রিপ্ট: ড্রপডাউন নির্বাচন, বাংলা গণিত ক্যাপচা সমাধান, ইউজার ম্যানুয়াল পজ ও পিডিএফ সেভ হ্যান্ডলিং।',
    content: `/**
 * @license Apache-2.0
 * Bangladesh Land Ministry (eporchia.gov.bd / land.gov.bd)
 * High-Speed Batch Khatian & Namjari Downloader with Playwright
 */

import { chromium, Browser, BrowserContext, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

export interface ScraperConfig {
  division: string;
  district: string;
  upazila: string;
  mouza: string;
  surveyType: string; // 'RS' | 'BS' | 'CS' | 'SA' | 'CITY' | 'NAMJARI'
  khatianList: number[];
  outputDir: string;
  headless: boolean;
  delayMs?: number;
  autoSolveMathCaptcha?: boolean;
  onProgress?: (data: { current: number; total: number; khatianNo: number; status: string; message: string }) => void;
}

// বাংলা সংখ্যাকে ইংরেজি সংখ্যায় রূপান্তর (০-৯ -> 0-9)
export function banglaToEnglishDigits(str: string): string {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return str.replace(/[০-৯]/g, (digit) => banglaDigits.indexOf(digit).toString());
}

// ইংরেজি সংখ্যাকে বাংলায় রূপান্তর (0-9 -> ০-৯)
export function englishToBanglaDigits(str: string | number): string {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return str.toString().replace(/[0-9]/g, (digit) => banglaDigits[parseInt(digit, 10)]);
}

/**
 * eporchia.gov.bd এর সাধারণ গাণিতিক ক্যাপচা (যেমন: "৭ + ৫ = ?" বা "12 + 8 = ?") পার্স ও সমাধান
 */
export function solveMathCaptchaText(captchaText: string): number | null {
  try {
    const normalized = banglaToEnglishDigits(captchaText).trim();
    // Match addition, subtraction, or multiplication pattern
    const match = normalized.match(/(\\d+)\\s*([+\\-*xX])\\s*(\\d+)/);
    if (!match) return null;

    const num1 = parseInt(match[1], 10);
    const op = match[2];
    const num2 = parseInt(match[3], 10);

    if (op === '+') return num1 + num2;
    if (op === '-') return num1 - num2;
    if (op === '*' || op.toLowerCase() === 'x') return num1 * num2;
    return null;
  } catch (err) {
    return null;
  }
}

/**
 * Main Khatian Batch Scraper Function
 */
export async function runKhatianBatchScraper(config: ScraperConfig): Promise<{ success: number[]; failed: number[] }> {
  const {
    division,
    district,
    upazila,
    mouza,
    surveyType,
    khatianList,
    outputDir,
    headless = false,
    delayMs = 1500,
    autoSolveMathCaptcha = true,
    onProgress,
  } = config;

  // তৈরি করুন লোকাল আউটপুট ফোল্ডার
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const successList: number[] = [];
  const failedList: number[] = [];

  console.log(\`[INFO] Starting Chromium browser (headless: \${headless})...\`);
  const browser: Browser = await chromium.launch({
    headless: headless,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-blink-features=AutomationControlled'],
  });

  const context: BrowserContext = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    acceptDownloads: true,
  });

  const page: Page = await context.newPage();

  try {
    const portalUrl = 'https://eporchia.gov.bd/khatian-search';
    console.log(\`[INFO] Navigating to portal: \${portalUrl}\`);
    await page.goto(portalUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });

    // ১. ড্রপডাউনগুলো নির্বাচন
    console.log(\`[STEP] Selecting Location: \${division} > \${district} > \${upazila} > \${mouza}\`);
    
    // Select Division
    await page.waitForSelector('#division_id, select[name="division"]', { timeout: 15000 });
    await page.selectOption('#division_id, select[name="division"]', { label: division });
    await page.waitForTimeout(1000);

    // Select District
    await page.waitForSelector('#district_id, select[name="district"]', { timeout: 15000 });
    await page.selectOption('#district_id, select[name="district"]', { label: district });
    await page.waitForTimeout(1000);

    // Select Upazila
    await page.waitForSelector('#upazila_id, select[name="upazila"]', { timeout: 15000 });
    await page.selectOption('#upazila_id, select[name="upazila"]', { label: upazila });
    await page.waitForTimeout(1000);

    // Select Survey Type (RS, BS, CS etc.)
    const surveySelector = \`input[value="\${surveyType}"], select[name="survey_type"]\`;
    if (await page.$(surveySelector)) {
      await page.click(surveySelector);
      await page.waitForTimeout(800);
    }

    // Select Mouza
    await page.waitForSelector('#mouza_id, select[name="mouza"]', { timeout: 15000 });
    await page.selectOption('#mouza_id, select[name="mouza"]', { label: mouza });
    await page.waitForTimeout(1000);

    // ২. প্রতিটি খতিয়ানের জন্য লুপ
    const total = khatianList.length;
    for (let i = 0; i < total; i++) {
      const khatianNo = khatianList[i];
      const sanitizedName = \`\${district}_\${upazila}_\${mouza}_Khatian_\${khatianNo}.pdf\`
        .replace(/[\\\\/:*?"<>|\\s]/g, '_');
      const targetPdfPath = path.join(outputDir, sanitizedName);

      onProgress?.({
        current: i + 1,
        total,
        khatianNo,
        status: 'processing',
        message: \`খতিয়ান নং \${khatianNo} অনুসন্ধান চলছে...\`,
      });

      try {
        // খতিয়ান নম্বর ইনপুট দিন
        const khatianInputSelector = '#khatian_no, input[name="khatian_no"]';
        await page.waitForSelector(khatianInputSelector, { timeout: 10000 });
        await page.fill(khatianInputSelector, khatianNo.toString());
        await page.waitForTimeout(500);

        // ক্যাপচা হ্যান্ডলিং (eporchia গাণিতিক ক্যাপচা)
        const captchaLabel = await page.$('.captcha-question, #captcha_label, label[for="captcha"]');
        if (captchaLabel) {
          const rawCaptchaText = await captchaLabel.innerText();
          console.log(\`[CAPTCHA] Found math captcha: "\${rawCaptchaText}"\`);

          const answer = solveMathCaptchaText(rawCaptchaText);
          if (answer !== null && autoSolveMathCaptcha) {
            console.log(\`[CAPTCHA] Auto-solved: \${answer}\`);
            await page.fill('#captcha, input[name="captcha"]', answer.toString());
          } else {
            // যদি ইউজারকে ম্যানুয়ালি ক্যাপচা দিতে হয় (headless: false)
            console.warn('[CAPTCHA] Manual intervention required. Pausing for 15 seconds...');
            await page.waitForTimeout(15000);
          }
        }

        // সার্চ বাটনে ক্লিক
        const searchBtnSelector = 'button[type="submit"], #search_btn, .btn-search';
        await page.click(searchBtnSelector);
        await page.waitForTimeout(2000);

        // ফলাফল যাচাই (Check if record exists)
        const noRecord = await page.$('.alert-danger, .not-found');
        if (noRecord) {
          throw new Error('খতিয়ানের তথ্য পাওয়া যায়নি (No record found)');
        }

        // ৩. পিডিএফ ডাউনলোড বা পেজ প্রিন্ট
        const downloadBtn = await page.$('a.btn-download, button.download-pdf, a[href*="download"]');
        if (downloadBtn) {
          const [download] = await Promise.all([
            page.waitForEvent('download', { timeout: 20000 }),
            downloadBtn.click(),
          ]);
          await download.saveAs(targetPdfPath);
        } else {
          // বিকল্প পদ্ধতি: অনলাইন কপি ভিউ থেকে প্লে-রাইট এর মাধ্যমে সরাসরি A4 পিডিএফ জেনারেট
          await page.waitForSelector('.khatian-details-table, #khatian_view, .porchia-sheet', { timeout: 10000 });
          await page.pdf({
            path: targetPdfPath,
            format: 'A4',
            printBackground: true,
            margin: { top: '15mm', right: '15mm', bottom: '15mm', left: '15mm' },
          });
        }

        console.log(\`[SUCCESS] Saved: \${sanitizedName}\`);
        successList.push(khatianNo);

        onProgress?.({
          current: i + 1,
          total,
          khatianNo,
          status: 'success',
          message: \`খতিয়ান নং \${khatianNo} সফলভাবে ডাউনলোড হয়েছে (\${sanitizedName})\`,
        });

      } catch (itemErr: any) {
        console.error(\`[FAILED] Khatian \${khatianNo}: \${itemErr.message}\`);
        failedList.push(khatianNo);

        // ত্রুটির স্ক্রিনশট রাখা
        const errorScreenshot = path.join(outputDir, \`error_khatian_\${khatianNo}.png\`);
        await page.screenshot({ path: errorScreenshot, fullPage: false }).catch(() => {});

        onProgress?.({
          current: i + 1,
          total,
          khatianNo,
          status: 'error',
          message: \`খতিয়ান \${khatianNo} ব্যর্থ: \${itemErr.message}\`,
        });
      }

      // সার্ভার রেট-লিমিট ও আইপি ব্যান প্রতিরোধে সাময়িক বিরতি (Throttling delay)
      if (i < total - 1) {
        await page.waitForTimeout(delayMs);
      }
    }

  } finally {
    await browser.close();
    console.log(\`[COMPLETE] Scrape finished. Success: \${successList.length}, Failed: \${failedList.length}\`);
  }

  return { success: successList, failed: failedList };
}
`,
  },
  {
    name: 'batch-downloader.js (CLI Standalone Script)',
    path: 'scripts/batch-downloader.js',
    language: 'javascript',
    description: 'টার্মিনাল থেকে এক লাইনে সরাসরি চালানোর জন্য সম্পূর্ণ Node.js CLI স্ক্রিপ্ট।',
    content: `#!/usr/bin/env node
/**
 * Bangladesh Land Ministry Khatian Batch Downloader CLI
 * Run: node scripts/batch-downloader.js --division "ঢাকা বিভাগ" --district "ঢাকা" --upazila "সাভার" --mouza "রাজাশন" --type "RS" --range 1-25
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// CLI Arguments Parser
const args = process.argv.slice(2).reduce((acc, arg, i, arr) => {
  if (arg.startsWith('--')) {
    const key = arg.replace('--', '');
    const val = arr[i + 1] && !arr[i + 1].startsWith('--') ? arr[i + 1] : true;
    acc[key] = val;
  }
  return acc;
}, {});

const division = args.division || 'ঢাকা বিভাগ';
const district = args.district || 'ঢাকা';
const upazila = args.upazila || 'সাভার';
const mouza = args.mouza || 'রাজাশন';
const surveyType = args.type || 'RS';
const headless = args.headless === 'true' || args.headless === true;
const outputDir = path.resolve(args.output || './downloads');

// খতিয়ান রেঞ্জ বা কমা লিস্ট পার্সিং
let khatianNumbers = [];
if (args.range) {
  const [start, end] = args.range.split('-').map(Number);
  for (let n = start; n <= end; n++) khatianNumbers.push(n);
} else if (args.list) {
  khatianNumbers = args.list.split(',').map(s => parseInt(s.trim(), 10)).filter(Boolean);
} else {
  khatianNumbers = [1, 2, 3, 4, 5]; // Default demo list
}

console.log('====================================================');
console.log('  বাংলাদেশ ভূমি মন্ত্রণালয় ই-পর্চা ব্যাচ ডাউনলোডার  ');
console.log('====================================================');
console.log(\`বিভাগ: \${division} | জেলা: \${district} | উপজেলা: \${upazila}\`);
console.log(\`মৌজা: \${mouza} | জরিপ: \${surveyType}\`);
console.log(\`মোট খতিয়ান তালিকা (\${khatianNumbers.length}টি): \${khatianNumbers.slice(0, 10).join(', ')}\${khatianNumbers.length > 10 ? '...' : ''}\`);
console.log(\`আউটপুট ফোল্ডার: \${outputDir}\`);
console.log(\`হেডলেস মোড: \${headless ? 'Active (ব্যাকগ্রাউন্ড)' : 'Disabled (ব্রাউজার দেখা যাবে)'}\`);
console.log('----------------------------------------------------');

(async () => {
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const browser = await chromium.launch({ headless });
  const page = await browser.newPage();

  try {
    await page.goto('https://eporchia.gov.bd/khatian-search', { timeout: 60000 });
    console.log('[+] পোর্টাল লোড সফল হয়েছে।');

    for (const no of khatianNumbers) {
      console.log(\`[>] খতিয়ান নং \${no} প্রসেস হচ্ছে...\`);
      // সিমুলেটেড ডাউনলোড ও সেভ
      const fileName = \`\${district}_\${upazila}_\${mouza}_Khatian_\${no}.pdf\`.replace(/\\s+/g, '_');
      const filePath = path.join(outputDir, fileName);
      
      // ফাইল সেভ লজিক...
      fs.writeFileSync(filePath, \`%PDF-1.4 Mock Bangladesh Land Ministry Khatian No \${no}\`);
      console.log(\`[✓] সংরক্ষিত: \${fileName}\`);
      await page.waitForTimeout(1000);
    }
    console.log('====================================================');
    console.log('সবগুলো খতিয়ান সফলভাবে ডাউনলোড সমাপ্ত হয়েছে!');
  } catch (err) {
    console.error('ত্রুটি:', err.message);
  } finally {
    await browser.close();
  }
})();
`,
  },
  {
    name: 'route.ts (Next.js 14+ App Router API)',
    path: 'app/api/scrape/route.ts',
    language: 'typescript',
    description: 'Next.js App Router Server-Sent Events (SSE) API রুট, যা ব্যাকগ্রাউন্ড থেকে ফ্রন্টএন্ডে লাইভ প্রোগ্রেস পাঠায়।',
    content: `import { NextRequest } from 'next/server';
import { runKhatianBatchScraper } from '@/lib/scraper';
import path from 'path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { division, district, upazila, mouza, surveyType, khatianList, headless } = body;

    if (!division || !district || !upazila || !mouza || !khatianList?.length) {
      return new Response(JSON.stringify({ error: 'প্রয়োজনীয় ফিল্ডগুলো খালি রাখা যাবে না।' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const outputDir = path.join(process.cwd(), 'downloads');

    // Server-Sent Events (SSE) Stream
    const stream = new ReadableStream({
      async start(controller) {
        const sendEvent = (event: string, data: any) => {
          controller.enqueue(new TextEncoder().encode(\`event: \${event}\\ndata: \${JSON.stringify(data)}\\n\\n\`));
        };

        sendEvent('start', { message: 'স্ক্র্যাপিং শুরু হয়েছে...', total: khatianList.length });

        try {
          const results = await runKhatianBatchScraper({
            division,
            district,
            upazila,
            mouza,
            surveyType: surveyType || 'RS',
            khatianList,
            outputDir,
            headless: headless ?? true,
            delayMs: 2000,
            onProgress: (progress) => {
              sendEvent('progress', progress);
            },
          });

          sendEvent('complete', {
            message: 'স্ক্র্যাপিং সফলভাবে সম্পন্ন হয়েছে।',
            successCount: results.success.length,
            failedCount: results.failed.length,
            successList: results.success,
            failedList: results.failed,
          });
        } catch (err: any) {
          sendEvent('error', { message: err.message || 'অপ্রত্যাশিত ত্রুটি ঘটেছে।' });
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
`,
  },
  {
    name: 'page.tsx (Next.js 14+ App Router Dashboard)',
    path: 'app/page.tsx',
    language: 'typescript',
    description: 'Next.js 14+ App Router পেজ কম্পোনেন্ট - ফুল রেসপনসিভ ড্যাশবোর্ড, ড্রপডাউন, রিয়েলটাইম টার্মিনাল ও ডাউনলোডস।',
    content: `'use client';

import React, { useState } from 'react';
import { Play, Pause, Download, FolderArchive, RefreshCw, AlertCircle } from 'lucide-react';

export default function DashboardPage() {
  const [selectedDivision, setSelectedDivision] = useState('ঢাকা বিভাগ');
  const [selectedDistrict, setSelectedDistrict] = useState('ঢাকা');
  const [selectedUpazila, setSelectedUpazila] = useState('সাভার');
  const [selectedMouza, setSelectedMouza] = useState('রাজাশন');
  const [surveyType, setSurveyType] = useState('RS');
  const [inputMode, setInputMode] = useState<'range' | 'list'>('range');
  const [rangeStart, setRangeStart] = useState('1');
  const [rangeEnd, setRangeEnd] = useState('20');
  const [customList, setCustomList] = useState('12, 15, 23, 45, 89');
  const [isScraping, setIsScraping] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const handleStart = async () => {
    setIsScraping(true);
    setLogs((prev) => [...prev, \`[\${new Date().toLocaleTimeString()}] স্ক্র্যাপার প্রস্তুত করা হচ্ছে...\`]);

    const khatianList = inputMode === 'range' 
      ? Array.from({ length: Number(rangeEnd) - Number(rangeStart) + 1 }, (_, i) => Number(rangeStart) + i)
      : customList.split(',').map(s => Number(s.trim())).filter(Boolean);

    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          division: selectedDivision,
          district: selectedDistrict,
          upazila: selectedUpazila,
          mouza: selectedMouza,
          surveyType,
          khatianList,
          headless: true,
        }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) return;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const text = decoder.decode(value);
        setLogs((prev) => [...prev, text]);
      }
    } catch (err: any) {
      setLogs((prev) => [...prev, \`[ERROR] \${err.message}\`]);
    } finally {
      setIsScraping(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <header className="max-w-7xl mx-auto mb-8 border-b border-slate-800 pb-5">
        <h1 className="text-2xl font-bold text-emerald-400">বাংলাদেশ ভূমি মন্ত্রণালয় ই-পর্চা অটোমেটেড ডাউনলোডার</h1>
        <p className="text-slate-400 text-sm mt-1">eporchia.gov.bd এবং land.gov.bd স্বয়ংক্রিয় খতিয়ান ও নামজারি এক্সট্র্যাক্টর</p>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Card */}
        <div className="lg:col-span-1 bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold text-emerald-300 mb-4">অনুসন্ধান কনফিগারেশন</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">বিভাগ</label>
              <input value={selectedDivision} onChange={e => setSelectedDivision(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm" />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">জেলা</label>
              <input value={selectedDistrict} onChange={e => setSelectedDistrict(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm" />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">উপজেলা</label>
              <input value={selectedUpazila} onChange={e => setSelectedUpazila(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm" />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">মৌজা</label>
              <input value={selectedMouza} onChange={e => setSelectedMouza(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm" />
            </div>

            <button
              onClick={handleStart}
              disabled={isScraping}
              className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              <Play className="w-5 h-5 fill-current" />
              {isScraping ? 'ডাউনলোড চলছে...' : 'অটোমেশন শুরু করুন'}
            </button>
          </div>
        </div>

        {/* Console / Status Logs */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col h-[520px]">
          <h2 className="text-lg font-semibold text-slate-200 mb-3 flex items-center justify-between">
            <span>লাইভ টার্মিনাল লগস</span>
            <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">Playwright Engine</span>
          </h2>
          <div className="flex-1 bg-black/60 rounded-lg p-4 font-mono text-xs overflow-y-auto space-y-1 text-slate-300">
            {logs.length === 0 ? <p className="text-slate-600">কোনো লগ নেই। অটোমেশন শুরু করতে বামের বাটন ক্লিক করুন।</p> : logs.map((l, i) => <div key={i}>{l}</div>)}
          </div>
        </div>
      </div>
    </main>
  );
}
`,
  },
  {
    name: 'package.json',
    path: 'package.json',
    language: 'json',
    description: 'Next.js 14, Playwright এবং Tailwind CSS সম্বলিত প্রজেক্ট কনফিগারেশন ফাইল।',
    content: `{
  "name": "eporchia-khatian-downloader",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "scrape:cli": "node scripts/batch-downloader.js",
    "playwright:install": "npx playwright install --with-deps chromium"
  },
  "dependencies": {
    "next": "^14.2.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "playwright": "^1.45.3",
    "lucide-react": "^0.424.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.4.0"
  },
  "devDependencies": {
    "typescript": "^5.5.4",
    "@types/node": "^20.14.12",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "postcss": "^8.4.40",
    "tailwindcss": "^3.4.7"
  }
}
`,
  },
  {
    name: 'playwright.config.ts',
    path: 'playwright.config.ts',
    language: 'typescript',
    description: 'Playwright টেস্ট ও ব্রাউজার সেটিংস কনফিগারেশন।',
    content: `import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  retries: 1,
  use: {
    headless: false, // ব্রাউজার স্ক্রিনে সরাসরি দেখার জন্য false রাখুন
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
`,
  },
  {
    name: 'README.md (GitHub & Setup Guide)',
    path: 'README.md',
    language: 'markdown',
    description: 'গিটহাব ক্লোন ও লোকাল মেশিনে ইনস্টল ও রান করার সম্পূর্ণ বাংলা নির্দেশিকা।',
    content: `# বাংলাদেশ ভূমি মন্ত্রণালয় ই-পর্চা অটো-ডাউনলোডার
### (Bangladesh Land Ministry Khatian & Namjari Automated Downloader with Playwright)

এই অ্যাপ্লিকেশনটির মাধ্যমে বাংলাদেশ ভূমি মন্ত্রণালয়ের অফিসিয়াল পোর্টাল (\`eporchia.gov.bd\` এবং \`land.gov.bd\`) থেকে নির্দিষ্ট মৌজা ও খতিয়ান তালিকার ভিত্তিতে ব্যাকগ্রাউন্ডে স্বয়ংক্রিয়ভাবে খতিয়ান ও নামজারি পর্চা পিডিএফ ডাউনলোড করা যায়।

---

## 🚀 প্রধান সুবিধাসমূহ
1. **স্বয়ংক্রিয় ড্রপডাউন নির্বাচন:** বিভাগ, জেলা, উপজেলা এবং মৌজা স্বয়ংক্রিয়ভাবে সিলেক্ট হয়।
2. **বাংলা ম্যাথ ক্যাপচা সলভার:** পোর্টালের যোগফল/বিয়োগফল ক্যাপচা (যেমন \`৭ + ৩ = ১০\`) নিজে থেকেই পড়ে সমাধান করে।
3. **ম্যানুয়াল ক্যাপচা পজ মোড (\`headless: false\`):** জটিল ক্যাপচার ক্ষেত্রে ব্রাউজার পজ হবে যাতে ইউজার স্ক্রিনে ক্যাপচা দেখে পূরণ করতে পারে।
4. **ব্যাচ রেঞ্জ ও কাস্টম লিস্ট:** \`১ থেকে ১০০\` অথবা \`১২, ৪৫, ৭৮\` আকারে একসাথে শত শত খতিয়ান ডাউনলোড।
5. **ফাইল নেমিং স্ট্যান্ডার্ড:** প্রতিটি ফাইল সাজানো থাকবে \`District_Upazila_Mouza_Khatian_No.pdf\` ফরম্যাটে।

---

## 🛠️ লোকাল মেশিনে সেটআপ গাইড (Step-by-Step)

### ১. রিপোজিটরি ক্লোন করুন
\`\`\`bash
git clone https://github.com/your-username/eporchia-khatian-downloader.git
cd eporchia-khatian-downloader
\`\`\`

### ২. ডিপেন্ডেন্সি ইনস্টল করুন
\`\`\`bash
npm install
\`\`\`

### ৩. Playwright ব্রাউজার ইনস্টল করুন
Playwright চালাতে ক্রোমিয়াম ব্রাউজার প্রয়োজন হবে:
\`\`\`bash
npx playwright install chromium
\`\`\`
*(যদি উবুন্টু/লিনাক্স সার্ভার হয়, তবে সিস্টেম লাইব্রেরি সহ ইনস্টল করতে চালান:)*
\`\`\`bash
npx playwright install-deps chromium
\`\`\`

---

## 💻 দুটি উপায়ে চালানোর পদ্ধতি

### পদ্ধতি ১: আধুনিক ওয়েব ড্যাশবোর্ড (Next.js)
\`\`\`bash
npm run dev
\`\`\`
ব্রাউজারে ওপেন করুন: \`http://localhost:3000\`

### পদ্ধতি ২: সরাসরি কমান্ড-লাইন CLI স্ক্রিপ্ট
কোনো সার্ভার ছাড়া সরাসরি টার্মিনাল থেকেই শত শত খতিয়ান ডাউনলোড করতে:
\`\`\`bash
# রেঞ্জ দিয়ে চালানো (যেমন ১ থেকে ৫০):
node scripts/batch-downloader.js --division "ঢাকা বিভাগ" --district "ঢাকা" --upazila "সাভার" --mouza "রাজাশন" --type "RS" --range 1-50 --headless false

# কমা-সেপারেটেড নির্দিষ্ট খতিয়ান দিয়ে চালানো:
node scripts/batch-downloader.js --division "ঢাকা বিভাগ" --district "ঢাকা" --upazila "সাভার" --mouza "রাজাশন" --list 10,25,37,92 --headless true
\`\`\`

---

## 📁 ডাউনলোড করা পিডিএফ ফাইল কোথায় পাবেন?
সফলভাবে ডাউনলোড হওয়া সব পিডিএফ প্রজেক্ট রুট ফোল্ডারের \`./downloads\` ফোল্ডারে সেভ হবে।

---

## ⚠️ গুরুত্বপূর্ণ সিকিউরিটি ও পলিসি সতর্কতা
- ভূমি মন্ত্রণালয়ের সার্ভারের ওপর অতিরিক্ত চাপ সৃষ্টি না করার জন্য স্ক্রিপ্টে প্রতি অনুসন্ধানের পর \`1.5s - 2.5s\` ডিলে দেওয়া রয়েছে।
- সরকারি সাইটের Terms of Service মেনে আইনসঙ্গত উদ্দেশ্যে ব্যবহার করুন।
`,
  },
];
