import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  Settings, 
  MapPin, 
  ListOrdered, 
  Sliders, 
  Gauge, 
  ShieldCheck, 
  Sparkles, 
  Eye, 
  FolderDown, 
  FileCheck2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { GEO_DATA, SURVEY_TYPES, Division, District, Upazila, Union, Mouza } from '../data/geoData';

export interface CrawlerConfig {
  divisionId: string;
  districtId: string;
  upazilaId: string;
  unionId: string;
  mouzaId: string;
  surveyType: string;
  inputMode: 'range' | 'list';
  rangeStart: number;
  rangeEnd: number;
  customList: string;
  headless: boolean;
  throttleDelay: number;
  autoSolveCaptcha: boolean;
  pauseForManualCaptcha: boolean;
}

interface CrawlerDashboardProps {
  config: CrawlerConfig;
  setConfig: React.Dispatch<React.SetStateAction<CrawlerConfig>>;
  isRunning: boolean;
  isPaused: boolean;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  progress: {
    current: number;
    total: number;
    currentKhatian: string;
    successCount: number;
    failedCount: number;
    statusText: string;
  };
}

export const CrawlerDashboard: React.FC<CrawlerDashboardProps> = ({
  config,
  setConfig,
  isRunning,
  isPaused,
  onStart,
  onPause,
  onResume,
  onStop,
  progress,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Cascading selections
  const currentDivision = GEO_DATA.find((d) => d.id === config.divisionId) || GEO_DATA[0];
  const currentDistrict = currentDivision.districts.find((d) => d.id === config.districtId) || currentDivision.districts[0];
  const currentUpazila = currentDistrict.upazilas.find((u) => u.id === config.upazilaId) || currentDistrict.upazilas[0];
  const currentUnion = currentUpazila.unions.find((u) => u.id === config.unionId) || currentUpazila.unions[0];
  const currentMouza = currentUnion.mouzas.find((m) => m.id === config.mouzaId) || currentUnion.mouzas[0];

  const handleDivisionChange = (divId: string) => {
    const div = GEO_DATA.find((d) => d.id === divId) || GEO_DATA[0];
    const dist = div.districts[0];
    const upz = dist.upazilas[0];
    const un = upz.unions[0];
    const mz = un.mouzas[0];
    setConfig((prev) => ({
      ...prev,
      divisionId: div.id,
      districtId: dist.id,
      upazilaId: upz.id,
      unionId: un.id,
      mouzaId: mz.id,
    }));
  };

  const handleDistrictChange = (distId: string) => {
    const dist = currentDivision.districts.find((d) => d.id === distId) || currentDivision.districts[0];
    const upz = dist.upazilas[0];
    const un = upz.unions[0];
    const mz = un.mouzas[0];
    setConfig((prev) => ({
      ...prev,
      districtId: dist.id,
      upazilaId: upz.id,
      unionId: un.id,
      mouzaId: mz.id,
    }));
  };

  const handleUpazilaChange = (upzId: string) => {
    const upz = currentDistrict.upazilas.find((u) => u.id === upzId) || currentDistrict.upazilas[0];
    const un = upz.unions[0];
    const mz = un.mouzas[0];
    setConfig((prev) => ({
      ...prev,
      upazilaId: upz.id,
      unionId: un.id,
      mouzaId: mz.id,
    }));
  };

  const handleUnionChange = (unId: string) => {
    const un = currentUpazila.unions.find((u) => u.id === unId) || currentUpazila.unions[0];
    const mz = un.mouzas[0];
    setConfig((prev) => ({
      ...prev,
      unionId: un.id,
      mouzaId: mz.id,
    }));
  };

  const percent = progress.total > 0 ? Math.round((progress.current / progress.total) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Real-time Progress Bar & Status Banner when running */}
      {(isRunning || progress.total > 0) && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${isRunning ? (isPaused ? 'bg-amber-400' : 'bg-emerald-400 animate-ping') : 'bg-slate-600'}`}></div>
              <div>
                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <span>{progress.statusText}</span>
                  {progress.currentKhatian && (
                    <span className="text-xs font-mono bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                      খতিয়ান #{progress.currentKhatian}
                    </span>
                  )}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  মৌজা: {currentMouza.name} (জে.এল {currentMouza.jlNo}) • জরিপ: {config.surveyType}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div>
                <span className="text-slate-500 block text-[10px]">অগ্রগতি</span>
                <span className="text-emerald-400 font-bold text-sm">{progress.current} / {progress.total} ({percent}%)</span>
              </div>
              <div className="h-6 w-px bg-slate-800"></div>
              <div>
                <span className="text-slate-500 block text-[10px]">সফল</span>
                <span className="text-emerald-300 font-bold">{progress.successCount}টি</span>
              </div>
              <div className="h-6 w-px bg-slate-800"></div>
              <div>
                <span className="text-slate-500 block text-[10px]">ব্যর্থ</span>
                <span className="text-red-400 font-bold">{progress.failedCount}টি</span>
              </div>
            </div>
          </div>

          {/* Progress Track */}
          <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800 relative">
            <div
              className={`h-full transition-all duration-300 ${
                isPaused
                  ? 'bg-amber-500'
                  : 'bg-gradient-to-r from-emerald-600 via-teal-500 to-green-400'
              }`}
              style={{ width: `${percent}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Main Control Layout: Form & Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Geographic & Khatian Selection */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Geographic Hierarchy */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wide">
                  ১. এলাকা ও মৌজা নির্বাচন (Geographic Location)
                </h2>
              </div>
              <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                জে.এল নং: <strong className="text-emerald-400 font-mono">{currentMouza.jlNo}</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Division */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">বিভাগ (Division)</label>
                <select
                  disabled={isRunning}
                  value={config.divisionId}
                  onChange={(e) => handleDivisionChange(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition disabled:opacity-50"
                >
                  {GEO_DATA.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.nameEn})
                    </option>
                  ))}
                </select>
              </div>

              {/* District */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">জেলা (District)</label>
                <select
                  disabled={isRunning}
                  value={config.districtId}
                  onChange={(e) => handleDistrictChange(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition disabled:opacity-50"
                >
                  {currentDivision.districts.map((dist) => (
                    <option key={dist.id} value={dist.id}>
                      {dist.name} ({dist.nameEn})
                    </option>
                  ))}
                </select>
              </div>

              {/* Upazila */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">উপজেলা / সার্কেল</label>
                <select
                  disabled={isRunning}
                  value={config.upazilaId}
                  onChange={(e) => handleUpazilaChange(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition disabled:opacity-50"
                >
                  {currentDistrict.upazilas.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.nameEn})
                    </option>
                  ))}
                </select>
              </div>

              {/* Union */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">ইউনিয়ন / পৌরসভা</label>
                <select
                  disabled={isRunning}
                  value={config.unionId}
                  onChange={(e) => handleUnionChange(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition disabled:opacity-50"
                >
                  {currentUpazila.unions.map((un) => (
                    <option key={un.id} value={un.id}>
                      {un.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mouza */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  মৌজা নির্বাচন (Mouza & J.L. No)
                </label>
                <select
                  disabled={isRunning}
                  value={config.mouzaId}
                  onChange={(e) => setConfig((prev) => ({ ...prev, mouzaId: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition disabled:opacity-50"
                >
                  {currentUnion.mouzas.map((mz) => (
                    <option key={mz.id} value={mz.id}>
                      {mz.name} (জে.এল {mz.jlNo})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Card 2: Survey Type & Khatian Range Selection */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ListOrdered className="w-4 h-4 text-emerald-400" />
                <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wide">
                  ২. খতিয়ানের ধরন ও নম্বর তালিকা (Survey & Khatian List)
                </h2>
              </div>
            </div>

            {/* Survey Type Pills */}
            <div className="mb-5">
              <label className="block text-xs font-medium text-slate-400 mb-2">
                খতিয়ানের ধরন (জরিপ টাইপ):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {SURVEY_TYPES.map((type) => {
                  const isSelected = config.surveyType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      disabled={isRunning}
                      onClick={() => setConfig((prev) => ({ ...prev, surveyType: type.id }))}
                      className={`p-2 rounded-xl text-xs font-semibold text-center transition border ${
                        isSelected
                          ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-950/60'
                          : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:bg-slate-800/60'
                      } disabled:opacity-50`}
                    >
                      <div>{type.name.split(' ')[0]}</div>
                      <div className="text-[10px] opacity-75 font-normal mt-0.5">{type.id}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input Mode Toggle: Range vs Custom List */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-slate-300">খতিয়ান ইনপুট মোড:</span>
                <div className="flex bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-xs">
                  <button
                    type="button"
                    disabled={isRunning}
                    onClick={() => setConfig((prev) => ({ ...prev, inputMode: 'range' }))}
                    className={`px-3 py-1 rounded-md transition ${
                      config.inputMode === 'range' ? 'bg-emerald-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    ক্রমিক রেঞ্জ (Range)
                  </button>
                  <button
                    type="button"
                    disabled={isRunning}
                    onClick={() => setConfig((prev) => ({ ...prev, inputMode: 'list' }))}
                    className={`px-3 py-1 rounded-md transition ${
                      config.inputMode === 'list' ? 'bg-emerald-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    কাস্টম তালিকা (List)
                  </button>
                </div>
              </div>

              {config.inputMode === 'range' ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">শুরুর খতিয়ান নং</label>
                      <input
                        type="number"
                        min="1"
                        disabled={isRunning}
                        value={config.rangeStart}
                        onChange={(e) => setConfig((prev) => ({ ...prev, rangeStart: Number(e.target.value) || 1 }))}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-slate-100 focus:outline-none focus:border-emerald-500 disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">শেষের খতিয়ান নং</label>
                      <input
                        type="number"
                        min={config.rangeStart}
                        disabled={isRunning}
                        value={config.rangeEnd}
                        onChange={(e) => setConfig((prev) => ({ ...prev, rangeEnd: Number(e.target.value) || 1 }))}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-slate-100 focus:outline-none focus:border-emerald-500 disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Preset quick buttons */}
                  <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400">
                    <span>দ্রুত প্রিসেট:</span>
                    <button
                      type="button"
                      disabled={isRunning}
                      onClick={() => setConfig((p) => ({ ...p, rangeStart: 1, rangeEnd: 10 }))}
                      className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-emerald-400 transition"
                    >
                      ১-১০ (টেস্ট)
                    </button>
                    <button
                      type="button"
                      disabled={isRunning}
                      onClick={() => setConfig((p) => ({ ...p, rangeStart: 1, rangeEnd: 25 }))}
                      className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-emerald-400 transition"
                    >
                      ১-২৫
                    </button>
                    <button
                      type="button"
                      disabled={isRunning}
                      onClick={() => setConfig((p) => ({ ...p, rangeStart: 1, rangeEnd: 50 }))}
                      className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-emerald-400 transition"
                    >
                      ১-৫০
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    কমা দিয়ে আলাদা করা খতিয়ান তালিকা:
                  </label>
                  <textarea
                    rows={2}
                    disabled={isRunning}
                    value={config.customList}
                    onChange={(e) => setConfig((prev) => ({ ...prev, customList: e.target.value }))}
                    placeholder="যেমন: ১২, ৪৫, ৭৮, ১০২, ২০৫"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs font-mono text-slate-100 focus:outline-none focus:border-emerald-500 transition disabled:opacity-50"
                  />
                  <span className="text-[10px] text-slate-500">
                    যেকোনো সংখ্যক খতিয়ান নম্বর কমা দিয়ে লিখুন।
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel: Automation Settings & Execution Controls */}
        <div className="lg:col-span-4 space-y-6">
          {/* Execution Action Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-emerald-400" />
                  <span>কন্ট্রোল প্যানেল (Execution)</span>
                </h3>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                  Playwright V1.45
                </span>
              </div>

              {/* Status summary */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 mb-5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>টার্গেট মৌজা:</span>
                  <span className="font-semibold text-slate-200">{currentMouza.name}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>জরিপ ধরন:</span>
                  <span className="font-semibold text-emerald-400">{config.surveyType}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>মোট খতিয়ান কিউ:</span>
                  <span className="font-semibold text-slate-200 font-mono">
                    {config.inputMode === 'range'
                      ? Math.max(0, config.rangeEnd - config.rangeStart + 1)
                      : config.customList.split(',').filter((s) => s.trim()).length}টি
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>ফাইল নেমিং ফরম্যাট:</span>
                  <span className="font-mono text-[10px] text-slate-400 truncate max-w-[170px]" title={`${currentDistrict.name}_${currentUpazila.name}_Khatian_No.pdf`}>
                    {currentDistrict.name}_{currentUpazila.name}_Khatian_No.pdf
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {!isRunning ? (
                <button
                  type="button"
                  onClick={onStart}
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold py-3.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2.5 transition shadow-lg shadow-emerald-950/60 active:scale-[0.99]"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>অটোমেশন শুরু করুন (Start Download)</span>
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {isPaused ? (
                    <button
                      type="button"
                      onClick={onResume}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>চালিয়ে যান (Resume)</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={onPause}
                      className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold py-3 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
                    >
                      <Pause className="w-4 h-4 fill-current" />
                      <span>পজ (Pause)</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={onStop}
                    className="bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 font-bold py-3 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
                  >
                    <Square className="w-4 h-4 fill-current" />
                    <span>বাতিল (Stop)</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Automation & Captcha Configuration Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5 uppercase">
                <Settings className="w-3.5 h-3.5 text-emerald-400" />
                <span>অটোমেশন সেটিংস ও ক্যাপচা মোড</span>
              </h4>
            </div>

            {/* Headless Toggle */}
            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="font-medium text-slate-200 block">হেডলেস মোড (Headless)</span>
                <span className="text-[10px] text-slate-400">
                  {config.headless ? 'ব্যাকগ্রাউন্ডে চলবে (দ্রুত)' : 'ব্রাউজার উইন্ডো স্ক্রিনে দেখা যাবে'}
                </span>
              </div>
              <button
                type="button"
                disabled={isRunning}
                onClick={() => setConfig((p) => ({ ...p, headless: !p.headless }))}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition ${
                  config.headless ? 'bg-emerald-600' : 'bg-slate-700'
                } disabled:opacity-50`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                    config.headless ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Auto Solve Math Captcha */}
            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="font-medium text-slate-200 block">ম্যাথ ক্যাপচা অটো-সলভার</span>
                <span className="text-[10px] text-slate-400">৭+৫ যোগফল নিজে থেকেই সমাধান করবে</span>
              </div>
              <button
                type="button"
                disabled={isRunning}
                onClick={() => setConfig((p) => ({ ...p, autoSolveCaptcha: !p.autoSolveCaptcha }))}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition ${
                  config.autoSolveCaptcha ? 'bg-emerald-600' : 'bg-slate-700'
                } disabled:opacity-50`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                    config.autoSolveCaptcha ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Pause for Manual Captcha */}
            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="font-medium text-slate-200 block">ম্যানুয়াল ক্যাপচায় পজ (Pause)</span>
                <span className="text-[10px] text-slate-400">জটিল ক্যাপচা আসলে স্ক্রিনে সময় দেবে</span>
              </div>
              <button
                type="button"
                disabled={isRunning}
                onClick={() => setConfig((p) => ({ ...p, pauseForManualCaptcha: !p.pauseForManualCaptcha }))}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition ${
                  config.pauseForManualCaptcha ? 'bg-emerald-600' : 'bg-slate-700'
                } disabled:opacity-50`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                    config.pauseForManualCaptcha ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Throttle Delay Slider */}
            <div className="pt-2 border-t border-slate-800">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">সার্ভার ডিলে (IP Block Protection):</span>
                <span className="font-mono text-emerald-400 font-bold">
                  {(config.throttleDelay / 1000).toFixed(1)} সেকেন্ড
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="4000"
                step="250"
                disabled={isRunning}
                value={config.throttleDelay}
                onChange={(e) => setConfig((p) => ({ ...p, throttleDelay: Number(e.target.value) }))}
                className="w-full accent-emerald-500 bg-slate-800 rounded-lg cursor-pointer disabled:opacity-50"
              />
              <span className="text-[10px] text-slate-500 block mt-1">
                সরকারি সার্ভারে রেট-লিমিট এড়াতে ১.৫ - ২.০ সেকেন্ড ডিলে আদর্শ।
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
