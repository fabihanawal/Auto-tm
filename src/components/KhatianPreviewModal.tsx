import React from 'react';
import { X, Printer, Download, CheckCircle, ShieldCheck } from 'lucide-react';
import { KhatianRecord, downloadKhatianFile } from '../utils/pdfGenerator';

interface KhatianPreviewModalProps {
  record: KhatianRecord | null;
  onClose: () => void;
}

export const KhatianPreviewModal: React.FC<KhatianPreviewModalProps> = ({ record, onClose }) => {
  if (!record) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    downloadKhatianFile(record);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Modal Top Control Bar */}
        <div className="bg-slate-800/90 px-6 py-4 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            <div>
              <h2 className="text-base font-semibold text-slate-100 flex items-center gap-2">
                অনলাইন খতিয়ান / পর্চা প্রিভিউ (Online Khatian Copy)
                <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">
                  নং {record.khatianNo}
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {record.division} • {record.district} • {record.upazila} • {record.mouza} (জে.এল {record.jlNo})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium transition shadow-sm"
              title="পিডিএফ ডাউনলোড করুন"
            >
              <Download className="w-3.5 h-3.5" />
              <span>পিডিএফ ডাউনলোড</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-xs font-medium transition"
              title="প্রিন্ট করুন"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>প্রিন্ট</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition"
              title="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Authentic BD Porchia Sheet View */}
        <div className="p-6 sm:p-8 bg-white text-slate-900 overflow-y-auto max-h-[75vh]">
          <div className="border-4 border-double border-emerald-900 p-6 rounded-lg relative bg-amber-50/20">
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
              <span className="text-7xl font-bold text-emerald-950 rotate-[-30deg]">
                eporchia.gov.bd
              </span>
            </div>

            {/* Header */}
            <div className="text-center border-b-2 border-emerald-900/40 pb-4 mb-4">
              <div className="flex justify-between items-start text-[11px] text-slate-600 mb-1">
                <span>বাংলাদেশ ফরম নং ৫৪৬৩ (সংশোধিত)</span>
                <span>স্বত্বলিপি / অনলাইন কপি</span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-emerald-900 tracking-wide font-serif">
                গণপ্রজাতন্ত্রী বাংলাদেশ সরকার
              </h1>
              <h2 className="text-sm font-semibold text-slate-700">
                ভূমি মন্ত্রণালয় • ভূমি রেকর্ড ও জরিপ অধিদপ্তর
              </h2>
              <div className="mt-2 inline-block bg-emerald-800 text-white text-xs px-4 py-1 rounded font-semibold tracking-wider">
                {record.surveyType} খতিয়ান / পরচা
              </div>
            </div>

            {/* Geographic & Khatian Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 border border-slate-300 p-3 rounded text-xs mb-5">
              <div>
                <span className="text-slate-500 block">বিভাগ:</span>
                <span className="font-semibold text-slate-900">{record.division}</span>
              </div>
              <div>
                <span className="text-slate-500 block">জেলা:</span>
                <span className="font-semibold text-slate-900">{record.district}</span>
              </div>
              <div>
                <span className="text-slate-500 block">উপজেলা / সার্কেল:</span>
                <span className="font-semibold text-slate-900">{record.upazila}</span>
              </div>
              <div>
                <span className="text-slate-500 block">মৌজা ও জে.এল নং:</span>
                <span className="font-semibold text-slate-900">{record.mouza} (জে.এল {record.jlNo})</span>
              </div>
              <div>
                <span className="text-slate-500 block">জরিপের ধরন:</span>
                <span className="font-semibold text-emerald-800">{record.surveyType}</span>
              </div>
              <div>
                <span className="text-slate-500 block">ইউনিয়ন:</span>
                <span className="font-semibold text-slate-900">{record.union}</span>
              </div>
              <div className="col-span-2 bg-emerald-100/60 p-1.5 rounded border border-emerald-300/80 flex items-center justify-between">
                <span className="text-emerald-900 font-bold">খতিয়ান নম্বর:</span>
                <span className="text-base font-black text-red-600 font-mono">{record.khatianNo}</span>
              </div>
            </div>

            {/* Section 1: Owners Table */}
            <div className="mb-5">
              <div className="bg-emerald-900 text-white text-xs font-semibold px-3 py-1.5 rounded-t flex items-center justify-between">
                <span>১. স্বত্বাধিকারী / মালিকগণের বিবরণ</span>
                <span className="text-[10px] opacity-80">বাংলাদেশ প্রজাস্বত্ব আইন</span>
              </div>
              <table className="w-full border-collapse border border-slate-300 text-xs">
                <thead className="bg-slate-100 text-slate-800">
                  <tr>
                    <th className="border border-slate-300 p-1.5 text-center w-10">নং</th>
                    <th className="border border-slate-300 p-1.5 text-left">মালিকের নাম ও পিতা/স্বামীর নাম</th>
                    <th className="border border-slate-300 p-1.5 text-left">ঠিকানা / সাং</th>
                    <th className="border border-slate-300 p-1.5 text-right w-24">অংশ (হিস্যা)</th>
                  </tr>
                </thead>
                <tbody>
                  {record.owners.map((owner, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="border border-slate-300 p-1.5 text-center font-mono">{idx + 1}</td>
                      <td className="border border-slate-300 p-1.5 font-medium">
                        {owner.name} <span className="text-slate-500 text-[11px]">({owner.fatherOrHusband})</span>
                      </td>
                      <td className="border border-slate-300 p-1.5 text-slate-700">{owner.address}</td>
                      <td className="border border-slate-300 p-1.5 text-right font-mono font-semibold text-emerald-800">{owner.share}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Section 2: Dag & Plots Table */}
            <div className="mb-5">
              <div className="bg-emerald-900 text-white text-xs font-semibold px-3 py-1.5 rounded-t">
                ২. দাগ অনুযায়ী জমির শ্রেণি ও দখলীয় খতিয়ানের পরিমাণ
              </div>
              <table className="w-full border-collapse border border-slate-300 text-xs">
                <thead className="bg-slate-100 text-slate-800">
                  <tr>
                    <th className="border border-slate-300 p-1.5 text-center">দাগ নং</th>
                    <th className="border border-slate-300 p-1.5 text-left">জমির শ্রেণি (নাল/বাড়ি/ভিটি)</th>
                    <th className="border border-slate-300 p-1.5 text-right">দাগের মোট পরিমাণ</th>
                    <th className="border border-slate-300 p-1.5 text-right">অত্র খতিয়ানের হিস্যা ও পরিমাণ</th>
                  </tr>
                </thead>
                <tbody>
                  {record.plots.map((plot, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="border border-slate-300 p-1.5 text-center font-mono font-bold text-slate-800">
                        {plot.dagNo}
                      </td>
                      <td className="border border-slate-300 p-1.5 text-slate-800">{plot.landType}</td>
                      <td className="border border-slate-300 p-1.5 text-right font-mono">{plot.plotArea}</td>
                      <td className="border border-slate-300 p-1.5 text-right font-mono font-medium text-emerald-800">
                        {plot.khatianShareArea}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-emerald-50/70 font-semibold text-emerald-950">
                    <td colSpan={3} className="border border-slate-300 p-2 text-right">
                      অত্র খতিয়ানের মোট জমির পরিমাণ:
                    </td>
                    <td className="border border-slate-300 p-2 text-right font-mono text-sm text-emerald-900 font-bold">
                      {record.totalArea}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Verification Footer & Official Stamp */}
            <div className="border border-slate-300 rounded p-3 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
              <div className="space-y-1">
                <p className="flex items-center gap-1 text-emerald-800 font-semibold">
                  <ShieldCheck className="w-4 h-4" /> সরকারি অনলাইন পোর্টাল (eporchia.gov.bd) থেকে সংগৃহীত।
                </p>
                <p>ট্র্যাকিং ইউআইডি: <span className="font-mono font-semibold text-slate-800">{record.qrId}</span></p>
                <p>ইস্যু ও ডাউনলোড তারিখ: <span className="font-medium text-slate-800">{record.issueDate}</span></p>
              </div>

              {/* Stamp Circle */}
              <div className="w-20 h-20 border-2 border-dashed border-emerald-800 rounded-full flex flex-col items-center justify-center text-[9px] text-emerald-900 font-bold text-center leading-tight">
                <span>ভূমি রেকর্ড</span>
                <span className="text-[10px] text-red-600">★ ডিজিটাল ★</span>
                <span>স্বাক্ষরিত কপি</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
