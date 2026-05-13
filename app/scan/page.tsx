"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const analysisSteps = [
  "Scanning Raw Data...",
  "AI Processing...",
  "Risk Check...",
];

const iotCards = [
  { id: "IoT1", label: "온도", value: "87℃", state: "주의", tone: "border-yellow-300/40 bg-yellow-950/25 text-yellow-100" },
  { id: "IoT2", label: "진동", value: "2.8Hz", state: "주의", tone: "border-yellow-300/40 bg-yellow-950/25 text-yellow-100" },
  { id: "IoT3", label: "압력", value: "7.6bar", state: "정상", tone: "border-green-300/40 bg-green-950/20 text-green-100" },
  { id: "IoT4", label: "부식", value: "0.14", state: "위험", tone: "border-red-300/40 bg-red-950/30 text-red-100" },
  { id: "IoT5", label: "가스", value: "31ppm", state: "정상", tone: "border-green-300/40 bg-green-950/20 text-green-100" },
];

const insights = [
  "구조 안정성: 양호",
  "효율 저하 감지",
  "정비 예상: 23일 후",
];

export default function ScanPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [isAnalysisComplete, setIsAnalysisComplete] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const videoElement = videoRef.current;

    async function startCamera() {
      if (!navigator.mediaDevices?.getUserMedia) {
        setIsCameraReady(false);
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
          audio: false,
        });

        if (!isMounted) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;

        if (videoElement) {
          videoElement.srcObject = stream;
          await videoElement.play().catch(() => undefined);
        }

        setIsCameraReady(true);
      } catch {
        setIsCameraReady(false);
      }
    }

    startCamera();

    return () => {
      isMounted = false;
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;

      if (videoElement) {
        videoElement.srcObject = null;
      }
    };
  }, []);

  useEffect(() => {
    const stepTimer = window.setInterval(() => {
      setAnalysisStep((currentStep) =>
        Math.min(currentStep + 1, analysisSteps.length - 1),
      );
    }, 1650);

    const completeTimer = window.setTimeout(() => {
      setIsAnalysisComplete(true);
      window.clearInterval(stepTimer);
    }, 5000);

    return () => {
      window.clearInterval(stepTimer);
      window.clearTimeout(completeTimer);
    };
  }, []);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#020617] text-white">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className={`absolute inset-0 h-full w-full object-cover ${
          isCameraReady ? "opacity-100" : "opacity-0"
        }`}
      />

      {!isCameraReady && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_40%,rgba(34,211,238,0.12),transparent_26%),linear-gradient(135deg,#020617_0%,#0f172a_45%,#020617_100%)]">
          <div className="absolute left-[8%] top-[28%] h-10 w-[84%] -rotate-6 rounded-full border border-slate-400/15 bg-gradient-to-r from-slate-900 via-slate-600 to-slate-950 shadow-2xl" />
          <div className="absolute bottom-[24%] right-[-10%] h-12 w-[92%] rotate-10 rounded-full border border-cyan-200/15 bg-gradient-to-r from-slate-950 via-slate-600 to-slate-950" />
          <div className="absolute left-[22%] top-[8%] h-[86%] w-8 rotate-2 rounded-full border border-slate-300/15 bg-gradient-to-b from-slate-500 via-slate-800 to-slate-950" />
          <div className="absolute right-[18%] top-[14%] h-[72%] w-7 -rotate-3 rounded-full border border-slate-300/15 bg-gradient-to-b from-slate-500 via-slate-800 to-slate-950" />
        </div>
      )}

      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.035)_1px,transparent_1px)] bg-[size:100%_24px]" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[16vw] rounded-r-[55%] border-r border-cyan-200/10 bg-[radial-gradient(ellipse_at_left,rgba(34,211,238,0.1),transparent_64%)] backdrop-blur-[0.4px]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[16vw] rounded-l-[55%] border-l border-cyan-200/10 bg-[radial-gradient(ellipse_at_right,rgba(34,211,238,0.1),transparent_64%)] backdrop-blur-[0.4px]" />

      <Link
        href="/"
        className="absolute left-4 top-4 z-30 rounded-full border border-cyan-200/15 bg-black/15 px-2.5 py-1 text-[10px] font-semibold text-cyan-100/65 backdrop-blur transition hover:border-cyan-200/45 hover:bg-cyan-300/10 hover:text-cyan-100"
      >
        ← Main
      </Link>

      <div
        className={`absolute right-4 top-3 z-20 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[9px] font-semibold text-slate-200 backdrop-blur transition-opacity duration-700 lg:right-6 lg:top-5 lg:px-4 lg:py-1.5 lg:text-xs ${
          isAnalysisComplete ? "opacity-80" : "opacity-35"
        }`}
      >
        {isCameraReady ? "LIVE" : "FALLBACK"}
      </div>

      <div
        className={`absolute left-4 bottom-10 z-20 space-y-1 text-[8px] font-semibold tracking-[0.14em] text-cyan-100/85 transition-opacity duration-700 lg:left-6 lg:bottom-16 lg:space-y-1.5 lg:text-[10px] ${
          isAnalysisComplete ? "opacity-70" : "opacity-25"
        }`}
      >
        <p>MODE: AR VIEW</p>
        <p>LINK: ACTIVE</p>
      </div>

      <div
        className={`absolute right-4 bottom-10 z-20 text-[8px] font-semibold tracking-[0.14em] text-cyan-100/85 transition-opacity duration-700 lg:right-6 lg:bottom-16 lg:text-[10px] ${
          isAnalysisComplete ? "opacity-70" : "opacity-25"
        }`}
      >
        AI STATUS: {isAnalysisComplete ? "COMPLETE" : "ANALYZING"}
      </div>

      <div
        className={`pointer-events-none absolute inset-4 z-10 border border-cyan-200/16 transition-opacity duration-700 lg:inset-6 ${
          isAnalysisComplete ? "opacity-55" : "opacity-15"
        }`}
      />
      <div
        className={`pointer-events-none absolute left-4 top-4 z-10 h-12 w-12 border-l-2 border-t-2 border-cyan-200/80 transition-opacity duration-700 lg:left-6 lg:top-6 lg:h-16 lg:w-16 ${
          isAnalysisComplete ? "opacity-60" : "opacity-20"
        }`}
      />
      <div
        className={`pointer-events-none absolute right-4 top-4 z-10 h-12 w-12 border-r-2 border-t-2 border-cyan-200/80 transition-opacity duration-700 lg:right-6 lg:top-6 lg:h-16 lg:w-16 ${
          isAnalysisComplete ? "opacity-60" : "opacity-20"
        }`}
      />
      <div
        className={`pointer-events-none absolute bottom-4 left-4 z-10 h-12 w-12 border-b-2 border-l-2 border-cyan-200/80 transition-opacity duration-700 lg:bottom-6 lg:left-6 lg:h-16 lg:w-16 ${
          isAnalysisComplete ? "opacity-60" : "opacity-20"
        }`}
      />
      <div
        className={`pointer-events-none absolute bottom-4 right-4 z-10 h-12 w-12 border-b-2 border-r-2 border-cyan-200/80 transition-opacity duration-700 lg:bottom-6 lg:right-6 lg:h-16 lg:w-16 ${
          isAnalysisComplete ? "opacity-60" : "opacity-20"
        }`}
      />

      <div
        className={`pointer-events-none absolute left-1/2 top-1/2 z-10 h-[42vh] max-h-[260px] min-h-[130px] w-[58vw] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-cyan-200/25 shadow-[0_0_24px_rgba(34,211,238,0.1)] transition-opacity duration-700 ${
          isAnalysisComplete ? "opacity-45" : "opacity-28"
        }`}
      >
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-cyan-200/20" />
        <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-cyan-200/20" />
        {!isAnalysisComplete && (
          <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 animate-pulse bg-cyan-200/80 shadow-[0_0_14px_rgba(34,211,238,0.55)]" />
        )}
        <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200/80 shadow-[0_0_12px_rgba(34,211,238,0.45)]" />
      </div>

      <div
        className={`absolute left-1/2 top-[18%] z-20 w-[min(68vw,320px)] -translate-x-1/2 rounded-full border border-cyan-200/18 bg-black/28 px-4 py-1.5 text-center shadow-[0_0_18px_rgba(34,211,238,0.08)] backdrop-blur transition-all duration-500 sm:top-[16%] ${
          isAnalysisComplete
            ? "-translate-y-2 opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <span className="text-xs font-bold text-cyan-100/90 sm:text-sm">
          {analysisSteps[analysisStep]}
        </span>
      </div>

      <section
        className={`pointer-events-none absolute inset-x-5 top-[12%] z-20 grid h-[70vh] grid-cols-[0.55fr_1.75fr_0.82fr] gap-2 overflow-hidden text-cyan-50 transition-opacity duration-500 lg:inset-x-10 lg:top-[15%] lg:h-[68vh] lg:grid-cols-[0.8fr_1.55fr_0.95fr] lg:gap-3 ${
          isAnalysisComplete ? "opacity-100" : "opacity-0"
        }`}
      >
          <aside
            className={`grid content-start gap-1.5 transition-all delay-300 duration-700 lg:gap-2 ${
              isAnalysisComplete
                ? "translate-x-0 opacity-100"
                : "-translate-x-3 opacity-0"
            }`}
          >
            {iotCards.map((card) => (
              <div
                key={card.id}
                className={`rounded-md border px-2 py-1.5 backdrop-blur-md lg:rounded-lg lg:px-2.5 lg:py-2 ${card.tone}`}
              >
                <div className="flex items-center justify-between gap-1 text-[8px] font-bold lg:gap-2 lg:text-[9px]">
                  <span>{card.id}</span>
                  <span>{card.state}</span>
                </div>
                <div className="mt-0.5 flex items-end justify-between gap-1 lg:mt-1 lg:gap-2">
                  <p className="text-[10px] text-white/80 lg:text-xs">{card.label}</p>
                  <p className="text-sm font-black text-white lg:text-base">{card.value}</p>
                </div>
              </div>
            ))}
          </aside>

          <section
            className={`relative overflow-hidden rounded-xl border border-cyan-200/25 bg-slate-950/34 p-3 shadow-[0_0_28px_rgba(34,211,238,0.1)] backdrop-blur-md transition-all duration-700 lg:rounded-2xl lg:p-4 ${
              isAnalysisComplete
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-3 scale-[0.98] opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_45%,rgba(239,68,68,0.24),transparent_18%),radial-gradient(circle_at_66%_38%,rgba(250,204,21,0.18),transparent_18%),radial-gradient(circle_at_48%_66%,rgba(34,211,238,0.16),transparent_20%)]" />
            <div className="relative">
              <p className="text-[8px] font-bold tracking-[0.2em] text-cyan-300 lg:text-[10px] lg:tracking-[0.24em]">
                AR DASHBOARD
              </p>
              <h1 className="mt-0.5 text-base font-bold text-white/95 lg:mt-1 lg:text-xl">
                통합 상태
              </h1>
              <p className="mt-1 text-xl font-black text-yellow-100/95 lg:mt-2 lg:text-2xl">
                전체 상태: 주의
              </p>
              <p className="mt-0.5 text-[10px] text-cyan-50/65 lg:mt-1 lg:text-xs">
                이상 징후 감지
              </p>

              <div className="mt-2 h-[35vh] max-h-[150px] rounded-lg border border-cyan-200/20 bg-black/20 p-2 lg:mt-4 lg:h-[26vh] lg:max-h-none lg:rounded-xl lg:p-3">
                <div className="relative h-full overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(90deg,rgba(8,47,73,0.48),rgba(15,23,42,0.54)),radial-gradient(circle_at_22%_42%,rgba(239,68,68,0.58),transparent_16%),radial-gradient(circle_at_56%_35%,rgba(250,204,21,0.46),transparent_15%),radial-gradient(circle_at_72%_68%,rgba(34,197,94,0.3),transparent_18%)]">
                  <div className="absolute left-[12%] top-[45%] h-3 w-[78%] rounded-full bg-cyan-100/20" />
                  <div className="absolute left-[28%] top-[20%] h-[62%] w-3 rounded-full bg-cyan-100/20" />
                  <div className="absolute right-[24%] top-[24%] h-[58%] w-3 rounded-full bg-cyan-100/20" />
                  <div className="absolute left-[20%] top-[36%] h-4 w-4 rounded-full bg-red-400 shadow-[0_0_16px_rgba(248,113,113,0.55)]" />
                  <div className="absolute left-[54%] top-[31%] h-3.5 w-3.5 rounded-full bg-yellow-300 shadow-[0_0_14px_rgba(250,204,21,0.48)]" />
                  <div className="absolute right-[22%] bottom-[24%] h-3.5 w-3.5 rounded-full bg-green-300 shadow-[0_0_12px_rgba(74,222,128,0.42)]" />
                </div>
              </div>
            </div>
          </section>

          <aside
            className={`flex flex-col gap-2 transition-all delay-500 duration-700 lg:gap-3 ${
              isAnalysisComplete
                ? "translate-x-0 opacity-100"
                : "translate-x-3 opacity-0"
            }`}
          >
            <div className="rounded-xl border border-cyan-200/20 bg-slate-950/35 p-2.5 backdrop-blur-md lg:rounded-2xl lg:p-3">
              <p className="text-[8px] font-bold tracking-[0.18em] text-cyan-300 lg:text-[10px] lg:tracking-[0.22em]">
                AI INSIGHT
              </p>
              <div className="mt-2 space-y-1.5 text-[10px] lg:mt-3 lg:space-y-2 lg:text-xs">
                {insights.map((item) => (
                  <p key={item} className="border-b border-white/10 pb-1.5 lg:pb-2">
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-yellow-300/25 bg-yellow-950/20 p-2.5 text-yellow-100 backdrop-blur-md lg:rounded-2xl lg:p-3">
              <p className="text-[8px] font-bold tracking-[0.18em] lg:text-[10px] lg:tracking-[0.22em]">
                ACTION
              </p>
              <p className="mt-1 text-sm font-black text-white lg:mt-2 lg:text-lg">
                펌프 2 점검
              </p>
              <p className="mt-0.5 text-[10px] opacity-80 lg:mt-1 lg:text-xs">
                우선순위 높음
              </p>
            </div>
          </aside>
      </section>

      <div
        className={`absolute bottom-3 left-1/2 z-20 max-w-[88vw] -translate-x-1/2 rounded-full border border-cyan-200/20 bg-black/30 px-3 py-1.5 text-center text-[10px] font-semibold text-cyan-50/85 shadow-[0_0_16px_rgba(34,211,238,0.08)] backdrop-blur transition-all duration-700 lg:bottom-6 lg:px-4 lg:py-2 lg:text-sm ${
          isAnalysisComplete ? "opacity-85" : "opacity-60"
        }`}
      >
        {isAnalysisComplete
          ? "Raw Data → Action AR"
          : "Raw Data 인식 중"}
      </div>
    </main>
  );
}
