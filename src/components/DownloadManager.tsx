import React, { useState } from 'react';
import { 
  DownloadCloud, 
  FileText, 
  Eye, 
  Trash2, 
  Archive, 
  CheckCircle2, 
  AlertCircle, 
  Search,
  Filter,
  Share2
} from 'lucide-react';
import JSZip from 'jszip';
import { KhatianRecord, generateKhatianPDF, downloadKhatianFile } from '../utils/pdfGenerator';
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

interface DownloadManagerProps {
  downloads: DownloadItem[];
  onPreview: (record: KhatianRecord) => void;
  onClear: () => void;
  onRemoveItem: (id: string) => void;
}

export const DownloadManager: React.FC<DownloadManagerProps> = ({
  downloads,
  onPreview,
  onClear,
  onRemoveItem,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isZipping, setIsZipping] = useState(false);
  const [zipProgress, setZipProgress] = useState(0);

  const filteredDownloads = downloads.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.khatianNo.includes(term) ||
      item.fileName.toLowerCase().includes(term) ||
      item.record.mouza.toLowerCase().includes(term) ||
      item.record.surveyType.toLowerCase().includes(term)
    );
  });

  const handleDownloadAllZip = async () => {
    if (downloads.length === 0) return;
    setIsZipping(true);
    setZipProgress(10);

    try {
      const zip = new JSZip();
      const folder = zip.folder('Bangladesh_Khatian_PDFs');

      for (let i = 0; i < downloads.length; i++) {
        const item = downloads[i];
        if (item.status === 'completed') {
          const pdfBlob = await generateKhatianPDF(item.record);
          folder?.file(item.fileName, pdfBlob);
        }
        setZipProgress(Math.round(((i + 1) / downloads.length) * 80) + 10);
      }

      // Add a manifest text file
      const manifestContent = `========================================================
বাংলাদেশ ভূমি মন্ত্রণালয় ই-পর্চা ব্যাচ ডাউনলোড রিপোর্ট
Generated via eporchia.gov.bd Automated Scraper
========================================================
মোট খতিয়ান সংখ্যা: ${downloads.length}টি
ডাউনলোড তারিখ: ${new Date().toLocaleString('bn-BD')}
ফাইল তালিকা:
${downloads.map((d, idx) => `${idx + 1}. [${d.record.surveyType}] খতিয়ান #${d.khatianNo} (${d.record.mouza}, ${d.record.upazila}) -> ${d.fileName}`).join('\n')}
========================================================`;

      folder?.file('Download_Summary_Report.txt', manifestContent);

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Land_Ministry_Khatian_Batch_${Date.now()}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch (err) {
      console.error('Failed to generate ZIP:', err);
    } finally {
      setIsZipping(false);
      setZipProgress(0);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Batch ZIP Action */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <DownloadCloud className="w-5 h-5 text-emerald-400" />
              খতিয়ান ডাউনলোড হাব ও ফাইল ম্যানেজার
            </h2>
            <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-semibold">
              মোট সংরক্ষিত: {downloads.length}টি
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            অটোমেশনের মাধ্যমে সংগৃহীত খতিয়ানগুলো প্রিভিউ দেখুন, একক পিডিএফ নামান অথবা এক ক্লিকে সম্পূর্ণ ব্যাচের জিপ (ZIP) সংরক্ষণ করুন।
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {downloads.length > 0 && (
            <button
              onClick={onClear}
              className="px-3 py-2 text-xs text-slate-400 hover:text-red-400 hover:bg-slate-800/80 rounded-xl border border-slate-800 transition flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>তালিকা মুছুন</span>
            </button>
          )}

          <button
            onClick={handleDownloadAllZip}
            disabled={downloads.length === 0 || isZipping}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs sm:text-sm font-semibold transition shadow-lg shadow-emerald-950/50 disabled:opacity-50"
          >
            <Archive className="w-4 h-4" />
            <span>{isZipping ? `জিপ তৈরি হচ্ছে... (${zipProgress}%)` : 'সবগুলো এক ক্লিকে ZIP ডাউনলোড'}</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="খতিয়ান নং, মৌজা বা ফাইল দিয়ে ফিল্টার..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
          />
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            সফল: <strong className="text-slate-200">{downloads.filter(d => d.status === 'completed').length}</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-400"></span>
            ব্যর্থ: <strong className="text-slate-200">{downloads.filter(d => d.status === 'failed').length}</strong>
          </span>
        </div>
      </div>

      {/* Downloads Table or Empty View */}
      {downloads.length === 0 ? (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto mb-4">
            <DownloadCloud className="w-8 h-8" />
          </div>
          <h3 className="text-base font-semibold text-slate-200">এখনো কোনো খতিয়ান ডাউনলোড করা হয়নি</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-6">
            'ড্যাশবোর্ড ও স্ক্র্যাপার' ট্যাবে যান, আপনার বিভাগ, জেলা, উপজেলা এবং খতিয়ান রেঞ্জ নির্বাচন করে 'অটোমেশন শুরু করুন' চাপুন।
          </p>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4 font-semibold">খতিয়ান নং</th>
                  <th className="py-3 px-4 font-semibold">এলাকা ও মৌজা</th>
                  <th className="py-3 px-4 font-semibold">জরিপ টাইপ</th>
                  <th className="py-3 px-4 font-semibold">মালিক ও হিস্যা</th>
                  <th className="py-3 px-4 font-semibold">জমির পরিমাণ</th>
                  <th className="py-3 px-4 font-semibold">ফাইল নাম</th>
                  <th className="py-3 px-4 font-semibold text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {filteredDownloads.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="font-mono font-bold text-slate-100 text-sm">
                          #{item.khatianNo}
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-200">{item.record.mouza}</div>
                      <div className="text-[11px] text-slate-500">
                        {item.record.upazila}, {item.record.district} (জে.এল {item.record.jlNo})
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {item.record.surveyType}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-300">
                        {item.record.owners[0]?.name || 'তথ্য নেই'}
                      </div>
                      {item.record.owners.length > 1 && (
                        <div className="text-[10px] text-slate-500">
                          + আরও {item.record.owners.length - 1} জন সহ-মালিক
                        </div>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-mono text-emerald-400 font-medium">
                        {item.record.totalArea}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-mono text-[11px] text-slate-400 truncate max-w-[200px] block" title={item.fileName}>
                        {item.fileName}
                      </span>
                      <span className="text-[10px] text-slate-600 block">{item.fileSize} • {item.downloadedAt}</span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onPreview(item.record)}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition"
                          title="পরচা প্রিভিউ দেখুন"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => downloadKhatianFile(item.record, item.fileName)}
                          className="p-1.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white rounded-lg transition border border-emerald-500/30"
                          title="পিডিএফ সেভ করুন"
                        >
                          <DownloadCloud className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded-lg transition"
                          title="তালিকা থেকে সরান"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
