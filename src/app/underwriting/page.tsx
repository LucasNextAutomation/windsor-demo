"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Copy,
  Download,
  BookOpen,
  Check,
  RotateCcw,
  ScanSearch,
  Building2,
  MapPin,
  Ruler,
  Landmark,
  DollarSign,
  Layers,
  Calendar,
  Play,
  Clock,
  Settings2,
  FileText,
  ExternalLink,
} from "lucide-react";
import {
  MOCK_MEMO_SECTIONS,
  MOCK_PROCESSING_STEPS,
  STEP_DELAYS,
  MOCK_EXTRACTED_FIELDS,
  EXECUTION_HISTORY,
} from "@/data/mock-memo";

interface StepState {
  id: string;
  label: string;
  status: "pending" | "active" | "done";
}

const EXTRACTED_DISPLAY = [
  { key: "assetName", label: "Asset", icon: Building2 },
  { key: "location", label: "Location", icon: MapPin },
  { key: "assetType", label: "Type", icon: ScanSearch },
  { key: "units", label: "Units", icon: Layers },
  { key: "sqft", label: "Size", icon: Ruler },
  { key: "yearBuilt", label: "Year Built", icon: Calendar },
  { key: "historicStatus", label: "Historic Status", icon: Landmark },
  { key: "estimatedValue", label: "Est. Value", icon: DollarSign },
] as const;

export default function UnderwritingPage() {
  const [file, setFile] = useState<File | null>(null);
  const [context, setContext] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [showExtracted, setShowExtracted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [isExample, setIsExample] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [steps, setSteps] = useState<StepState[]>(
    MOCK_PROCESSING_STEPS.map((s) => ({ ...s, status: "pending" as const }))
  );
  const [elapsed, setElapsed] = useState(0);
  const [copied, setCopied] = useState(false);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const processingRef = useRef<HTMLDivElement>(null);
  const extractedRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleFileChange = useCallback((files: FileList | null) => {
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      handleFileChange(e.dataTransfer.files);
    },
    [handleFileChange]
  );

  const startProcessing = useCallback(() => {
    setSubmitted(true);
    setProcessing(true);
    setShowResults(false);
    setShowExtracted(false);
    setElapsed(0);
    setSteps(
      MOCK_PROCESSING_STEPS.map((s) => ({ ...s, status: "pending" as const }))
    );

    setTimeout(() => {
      processingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);

    timerRef.current = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);

    let cumulativeDelay = 0;
    STEP_DELAYS.forEach((delay, i) => {
      setTimeout(() => {
        setSteps((prev) =>
          prev.map((s, idx) =>
            idx === i ? { ...s, status: "active" } : s
          )
        );
      }, cumulativeDelay);

      cumulativeDelay += delay;

      setTimeout(() => {
        setSteps((prev) =>
          prev.map((s, idx) =>
            idx === i ? { ...s, status: "done" } : s
          )
        );
        if (MOCK_PROCESSING_STEPS[i].id === "extract") {
          setShowExtracted(true);
          setTimeout(() => {
            extractedRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
          }, 100);
        }
      }, cumulativeDelay);
    });

    setTimeout(() => {
      if (timerRef.current) clearInterval(timerRef.current);
      setProcessing(false);
      setShowResults(true);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }, cumulativeDelay + 400);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      startProcessing();
    },
    [startProcessing]
  );

  const handleTryExample = useCallback(() => {
    setIsExample(true);
    startProcessing();
  }, [startProcessing]);

  const viewPastResult = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsExample(true);
    setSubmitted(true);
    setProcessing(false);
    setShowExtracted(true);
    setShowResults(true);
    setElapsed(47);
    setSteps(
      MOCK_PROCESSING_STEPS.map((s) => ({ ...s, status: "done" as const }))
    );
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  }, []);

  const resetAnalyzer = useCallback(() => {
    setSubmitted(false);
    setProcessing(false);
    setShowResults(false);
    setShowExtracted(false);
    setFile(null);
    setContext("");
    setIsExample(false);
    setSteps(
      MOCK_PROCESSING_STEPS.map((s) => ({ ...s, status: "pending" as const }))
    );
    setElapsed(0);
    setSourcesOpen(false);
    setCopied(false);
    if (timerRef.current) clearInterval(timerRef.current);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleCopy = useCallback(() => {
    const memoText = MOCK_MEMO_SECTIONS.map(
      (s) => `## ${s.title}\n${s.html.replace(/<[^>]+>/g, "")}`
    ).join("\n\n");
    navigator.clipboard.writeText(memoText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-[#1a365d]/10 flex items-center justify-center">
              <ScanSearch className="h-5 w-5 text-[#1a365d]" />
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[2px] text-[#1a365d]">
                Windsor Deal Analyzer
              </p>
              <h1 className="text-2xl font-bold text-gray-900">
                Deal Analyzer
              </h1>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-1 max-w-2xl">
            Upload an offering memo or CIM — AI agents extract deal parameters, run parallel analysis, and generate a full IC-ready summary
          </p>
        </motion.header>

        <div className="max-w-[780px]">
          {/* ─── EXECUTION HISTORY ─── */}
          <div className="mb-4">
            <button
              onClick={() => setHistoryOpen((prev) => !prev)}
              className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-all ${
                historyOpen
                  ? "border-[#1a365d]/30 bg-[#1a365d]/[0.03]"
                  : "border-gray-200 bg-white hover:border-[#1a365d]/20"
              }`}
            >
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-[#1a365d]" />
                <span className="font-medium text-gray-900">Recent Analyses</span>
                <span className="rounded-full bg-[#1a365d]/10 px-2 py-0.5 text-[10px] font-semibold text-[#1a365d]">
                  {EXECUTION_HISTORY.length}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                {historyOpen ? "Hide" : "Show"} history
              </span>
            </button>
            {historyOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="mt-1 overflow-hidden rounded-xl border border-gray-200 bg-white"
              >
                <div className="divide-y divide-gray-100">
                  {EXECUTION_HISTORY.map((exec) => (
                    <button
                      key={exec.id}
                      type="button"
                      onClick={() => {
                        if (exec.id === 42) {
                          setHistoryOpen(false);
                          viewPastResult();
                        }
                      }}
                      className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                        exec.id === 42
                          ? "bg-[#1a365d]/[0.04] cursor-pointer hover:bg-[#1a365d]/[0.08]"
                          : "opacity-60 cursor-default"
                      }`}
                    >
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 text-[10px] font-bold text-gray-500">
                        #{exec.id}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900 truncate">
                            {exec.name}
                          </span>
                          <span className="flex-shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">
                            {exec.type}
                          </span>
                          {exec.id === 42 && (
                            <span className="flex-shrink-0 rounded-full bg-[#1a365d]/10 px-2 py-0.5 text-[10px] font-semibold text-[#1a365d]">
                              View Results
                            </span>
                          )}
                        </div>
                        <div className="mt-0.5 text-[11px] text-gray-500">
                          {exec.date} · {exec.agents} agents · {exec.status}
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <Check className="h-4 w-4 text-emerald-500" />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* ─── UPLOAD FORM ─── */}
          <div className={`glass-card p-8 ${submitted ? "opacity-50 pointer-events-none" : ""} transition-opacity`}>
            <form onSubmit={handleSubmit}>
              {/* Upload Zone */}
              <div
                onDragEnter={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => !isExample && fileInputRef.current?.click()}
                className={`relative mb-5 cursor-pointer rounded-xl border-[1.5px] border-dashed p-10 text-center transition-all ${
                  dragOver
                    ? "border-[#1a365d] bg-[#1a365d]/[0.03]"
                    : file || isExample
                      ? "border-[#1a365d]/40 bg-[#1a365d]/[0.02]"
                      : "border-gray-300 hover:border-[#1a365d]/50"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(e) => handleFileChange(e.target.files)}
                  className="hidden"
                />
                {isExample ? (
                  <>
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1a365d]/10">
                      <Building2 className="h-6 w-6 text-[#1a365d]" />
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      Example: Former Delco Building — Confidential Information Memorandum
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      28 pages — Adaptive Reuse, Dayton OH (CBRE Midwest)
                    </p>
                  </>
                ) : file ? (
                  <>
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1a365d]/10">
                      <ScanSearch className="h-6 w-6 text-[#1a365d]" />
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {file.name}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {(file.size / 1048576).toFixed(1)} MB — Ready to analyze
                    </p>
                  </>
                ) : (
                  <>
                    <Upload className="mx-auto mb-3 h-10 w-10 text-gray-400" />
                    <p className="mb-1 text-sm font-medium text-gray-900">
                      Upload CIM or Offering Memo
                    </p>
                    <p className="text-xs text-gray-500">
                      PDF, PNG, or JPG — up to 20 MB
                    </p>
                    <p className="mt-3 text-[11px] text-gray-400">
                      The AI will automatically extract deal parameters, run market/asset/investment analysis, and generate a full IC-ready summary
                    </p>
                  </>
                )}
              </div>

              {/* Optional context */}
              <div className="mb-5">
                <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-gray-500">
                  Additional Context <span className="normal-case tracking-normal font-normal">(optional)</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g., Adaptive reuse target near Fire Blocks District. Check HTC eligibility and compare to Huffman Lofts comp."
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#1a365d]/40"
                />
              </div>

              <button
                type="submit"
                disabled={!file}
                className="w-full rounded-xl bg-[#1a365d] py-3.5 text-[15px] font-semibold tracking-wide text-white shadow-lg shadow-[#1a365d]/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:bg-[#1a365d]/90 disabled:translate-y-0 disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed"
              >
                Analyze CIM
              </button>
            </form>

            {/* Try Example — outside the form */}
            {!submitted && (
              <>
                <div className="mt-5 flex items-center gap-3">
                  <div className="h-px flex-1 bg-gray-200" />
                  <span className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
                    or
                  </span>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>
                <button
                  type="button"
                  onClick={handleTryExample}
                  className="mt-4 flex w-full items-center justify-center gap-2.5 rounded-xl border-[1.5px] border-[#1a365d]/30 py-3.5 text-[15px] font-semibold text-[#1a365d] transition-all hover:-translate-y-0.5 hover:border-[#1a365d]/60 hover:bg-[#1a365d]/[0.04] hover:shadow-lg hover:shadow-[#1a365d]/10"
                >
                  <Play className="h-4 w-4" />
                  Try with Former Delco Building CIM
                </button>
                <p className="mt-2.5 text-center text-[11px] text-gray-400">
                  See how it works with a real adaptive reuse CIM — no upload needed
                </p>
              </>
            )}
          </div>

          {/* ─── PROCESSING PIPELINE ─── */}
          {submitted && (
            <motion.div
              ref={processingRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-6 scroll-mt-24"
            >
              <div className="glass-card p-6">
                {/* Stats Bar */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h2 className="text-sm font-semibold text-gray-900">
                      Processing Pipeline
                    </h2>
                    <div className="flex items-center gap-3 text-[11px] text-gray-500">
                      <span className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#1a365d]" />
                        3 AI Agents
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                        {MOCK_PROCESSING_STEPS.length} Pipeline Stages
                      </span>
                    </div>
                  </div>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs tabular-nums text-gray-500">
                    {formatTime(elapsed)}
                  </span>
                </div>
                <ul className="space-y-0">
                  {steps.map((step) => (
                    <li
                      key={step.id}
                      className={`flex items-center gap-3 border-b border-gray-100 py-2.5 text-sm last:border-b-0 transition-colors ${
                        step.status === "active"
                          ? "text-gray-900"
                          : step.status === "done"
                            ? "text-emerald-600"
                            : "text-gray-400"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 flex-shrink-0 rounded-full transition-colors ${
                          step.status === "active"
                            ? "animate-pulse-dot bg-[#1a365d]"
                            : step.status === "done"
                              ? "bg-emerald-500"
                              : "bg-gray-200"
                        }`}
                      />
                      {step.label}
                      {step.status === "done" && (
                        <Check className="ml-auto h-4 w-4 text-emerald-500" />
                      )}
                    </li>
                  ))}
                </ul>

                {/* Extracted Deal Info */}
                {showExtracted && (
                  <motion.div
                    ref={extractedRef}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.4 }}
                    className="mt-4 overflow-hidden border-t border-gray-200 pt-4"
                  >
                    <div className="mb-3 flex items-center gap-1.5 text-xs font-medium text-[#1a365d]">
                      <ScanSearch className="h-3.5 w-3.5" />
                      Extracted from CIM (28 pages)
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {EXTRACTED_DISPLAY.map(({ key, label, icon: Icon }) => (
                        <motion.div
                          key={key}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: EXTRACTED_DISPLAY.findIndex(d => d.key === key) * 0.06 }}
                          className="rounded-lg border border-gray-200 bg-gray-50 p-2.5"
                        >
                          <div className="mb-1 flex items-center gap-1 text-[10px] uppercase tracking-wider text-gray-500">
                            <Icon className="h-3 w-3" />
                            {label}
                          </div>
                          <div className="text-xs font-semibold text-gray-900 leading-tight">
                            {MOCK_EXTRACTED_FIELDS[key]}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {!showResults && processing && (
                  <div className="mt-3 text-center text-xs text-gray-500">
                    Generating your IC memo...
                  </div>
                )}
                {showResults && (
                  <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-emerald-600">
                    <Check className="h-3.5 w-3.5" />
                    Analysis complete — {formatTime(elapsed)}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ─── RESULTS ─── */}
          {showResults && (
            <motion.div
              ref={resultsRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 scroll-mt-24"
            >
              <div className="glass-card p-8">
                {/* Results Header */}
                <div className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b border-gray-200 pb-5">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      IC Memo
                    </h2>
                    <p className="mt-1 text-[11px] text-gray-500">
                      {MOCK_EXTRACTED_FIELDS.assetName} &mdash;{" "}
                      {MOCK_EXTRACTED_FIELDS.location} &mdash;{" "}
                      Generated in {formatTime(elapsed)} &mdash; 3 parallel agents
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {isExample && (
                      <a
                        href="/examples/delco-building-cim.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-md border border-[#1a365d]/30 bg-[#1a365d]/[0.06] px-3 py-1.5 text-xs font-medium text-[#1a365d] transition-all hover:border-[#1a365d] hover:bg-[#1a365d]/[0.1]"
                      >
                        <FileText className="h-3.5 w-3.5" />
                        View Original CIM
                        <ExternalLink className="h-3 w-3 opacity-60" />
                      </a>
                    )}
                    <button
                      onClick={() => setSourcesOpen((prev) => !prev)}
                      className={`flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs transition-all ${
                        sourcesOpen
                          ? "border-[#1a365d] bg-[#1a365d]/[0.08] text-[#1a365d]"
                          : "border-gray-200 bg-gray-50 text-gray-500 hover:border-[#1a365d] hover:text-gray-700"
                      }`}
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      Sources
                    </button>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-500 transition-all hover:border-[#1a365d] hover:text-gray-700"
                    >
                      {copied ? (
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                      {copied ? "Copied" : "Copy"}
                    </button>
                    <button className="flex items-center gap-1.5 rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-500 transition-all hover:border-[#1a365d] hover:text-gray-700">
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </button>
                  </div>
                </div>

                {/* Source Legend */}
                <div className="mb-5 flex flex-wrap gap-4 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5">
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                    <span className="h-2 w-2 rounded-sm bg-purple-400" />
                    CIM Page Ref
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                    <span className="h-2 w-2 rounded-sm bg-[#1a365d]" />
                    Web / Market Source
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                    <span className="h-2 w-2 rounded-sm bg-pink-500" />
                    Modeled / Estimated
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                    <span className="h-2 w-2 rounded-sm bg-amber-400" />
                    Action Required
                  </div>
                </div>

                {/* Customization Banner */}
                <div className="mb-5 flex items-center gap-2.5 rounded-lg border border-[#1a365d]/15 bg-[#1a365d]/[0.03] px-4 py-2.5">
                  <Settings2 className="h-4 w-4 flex-shrink-0 text-[#1a365d]" />
                  <p className="text-[11px] text-gray-500">
                    Each section below is <strong className="text-[#1a365d]">fully customizable</strong> — adjust analysis depth, focus areas, risk framework, or output format to match your investment criteria.
                  </p>
                </div>

                {/* Sources Panel */}
                {sourcesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="mb-5 overflow-hidden"
                  >
                    <div className="rounded-xl border border-[#1a365d]/10 bg-[#1a365d]/[0.02] p-4">
                      <h3 className="mb-3 flex items-center gap-1.5 text-[13px] font-semibold text-[#1a365d]">
                        <BookOpen className="h-4 w-4" />
                        All Sources Referenced
                      </h3>
                      <ul className="space-y-2">
                        {[
                          { type: "CIM", color: "#7c6fc4", label: "CIM Pages 2-16", detail: "Former Delco Building — Confidential Information Memorandum (CBRE Midwest)" },
                          { type: "WEB", color: "#1a365d", label: "CoStar Multifamily Analytics 2026", detail: "Vacancy, rent, absorption, pipeline data — Downtown Dayton submarket" },
                          { type: "WEB", color: "#1a365d", label: "Ohio SHPO Historic Guidelines", detail: "Secretary of Interior Standards — rehabilitation requirements" },
                          { type: "WEB", color: "#1a365d", label: "Walk Score — Dayton, OH", detail: "walkscore.com — 401 E Monument Ave score: 82" },
                          { type: "WEB", color: "#1a365d", label: "Census / BLS — Demographics", detail: "Population, income, employment — Montgomery County" },
                          { type: "WEB", color: "#1a365d", label: "WPAFB Economic Impact Analysis 2025", detail: "$18.4B annual impact, 30,000+ civilian & military personnel" },
                          { type: "MODEL", color: "#db2777", label: "Pro Forma & Return Analysis", detail: "48-unit adaptive reuse — 4 financing structures modeled" },
                          { type: "MODEL", color: "#db2777", label: "HTC Syndication & Capital Stack", detail: "20% Federal + 25% Ohio State — $5.67M credit equity" },
                          { type: "GAP", color: "#f59e0b", label: "Phase I ESA — NOT COMPLETED", detail: "Environmental clearance required before acquisition commitment" },
                        ].map((source, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-[13px]"
                          >
                            <span
                              className="flex-shrink-0 rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                              style={{
                                backgroundColor: `color-mix(in srgb, ${source.color} 15%, transparent)`,
                                color: source.color,
                              }}
                            >
                              {source.type}
                            </span>
                            <span className="text-gray-900">
                              {source.label}
                            </span>
                            <span className="ml-auto hidden text-xs text-gray-500 sm:block">
                              {source.detail}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}

                {/* Memo Content */}
                <div className="memo-paper">
                  <h1>
                    IC Memo — {MOCK_EXTRACTED_FIELDS.assetName}
                  </h1>
                  <div
                    style={{
                      marginBottom: 28,
                      padding: "16px 20px",
                      border: "1px solid #d0d5dd",
                      borderLeft: "3px solid #002060",
                      background: "#f8f9fc",
                      borderRadius: "0 4px 4px 0",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        color: "#002060",
                        marginBottom: 10,
                      }}
                    >
                      Contents
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "6px 16px",
                      }}
                    >
                      {MOCK_MEMO_SECTIONS.map((section) => (
                        <a
                          key={section.id}
                          href={`#memo-${section.id}`}
                          style={{
                            fontSize: 12,
                            color: "#4472C4",
                            textDecoration: "none",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {section.title}
                        </a>
                      ))}
                    </div>
                  </div>

                  {MOCK_MEMO_SECTIONS.map((section) => (
                    <div key={section.id} id={`memo-${section.id}`}>
                      <h2>
                        {section.title}
                        {section.customizable && (
                          <span className="customize-badge">
                            <Settings2 style={{ width: 10, height: 10 }} />
                            Customizable
                          </span>
                        )}
                      </h2>
                      <div
                        dangerouslySetInnerHTML={{ __html: section.html }}
                      />
                    </div>
                  ))}
                </div>

                {/* New Deal Button */}
                <button
                  onClick={resetAnalyzer}
                  className="mt-6 flex items-center gap-2 rounded-lg border border-gray-200 px-5 py-2.5 text-[13px] text-gray-500 transition-all hover:border-[#1a365d] hover:text-gray-700"
                >
                  <RotateCcw className="h-4 w-4" />
                  Analyze another deal
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
