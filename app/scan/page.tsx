"use client";

import { useEffect, useRef, useState } from "react";

const analysisSteps = [
  "Scanning Raw Dataset...",
  "AI Processing...",
  "Risk Classification...",
];

const resultCards = [
  {
    title: "부식 위험",
    primary: "잔여 수명 15일",
    action: "7일 이내 교체 권장",
    position: "left-[7%] top-[30%]",
    tone: "border-red-300/55 bg-red-950/50 text-red-100 shadow-[0_0_28px_rgba(248,113,113,0.2)]",
    label: "RISK",
  },
  {
    title: "고온 위험",
    primary: "냉각 장치 즉시 점검",
    action: "작업 구간 열원 확인",
    position: "right-[8%] top-[25%]",
    tone: "border-red-300/55 bg-red-950/50 text-red-100 shadow-[0_0_28px_rgba(248,113,113,0.2)]",
    label: "RISK",
  },
  {
    title: "진동 주의",
    primary: "설비 고정 상태 확인",
    action: "다음 점검 주기 단축",
    position: "right-[15%] bottom-[22%]",
    tone: "border-yellow-300/55 bg-yellow-950/40 text-yellow-100 shadow-[0_0_28px_rgba(250,204,21,0.16)]",
    label: "CAUTION",
  },
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

      <div className="absolute inset-0 bg-black/18" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.06)_1px,transparent_1px)] bg-[size:100%_24px]" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[18vw] rounded-r-[55%] border-r border-cyan-200/10 bg-[radial-gradient(ellipse_at_left,rgba(34,211,238,0.16),transparent_62%)] backdrop-blur-[0.4px]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[18vw] rounded-l-[55%] border-l border-cyan-200/10 bg-[radial-gradient(ellipse_at_right,rgba(34,211,238,0.16),transparent_62%)] backdrop-blur-[0.4px]" />

      <div className="absolute left-4 top-3 z-20 rounded-full border border-cyan-200/25 bg-black/30 px-3 py-1.5 text-[10px] font-semibold tracking-[0.12em] text-cyan-100 backdrop-blur sm:left-6 sm:top-5 sm:px-4 sm:py-2 sm:text-xs">
        Invisible to Visible | AR Glass View
      </div>

      <div className="absolute right-4 top-3 z-20 rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-[10px] font-semibold text-slate-200 backdrop-blur sm:right-6 sm:top-5 sm:px-4 sm:py-2 sm:text-xs">
        {isCameraReady ? "LIVE CAMERA" : "FALLBACK VIEW"}
      </div>

      <div className="absolute left-4 bottom-12 z-20 space-y-1.5 text-[9px] font-semibold tracking-[0.14em] text-cyan-100/85 sm:left-6 sm:bottom-16 sm:text-[10px]">
        <p>MODE: AR DATA VIEW</p>
        <p>SENSOR LINK: ACTIVE</p>
      </div>

      <div className="absolute right-4 bottom-12 z-20 text-[9px] font-semibold tracking-[0.14em] text-cyan-100/85 sm:right-6 sm:bottom-16 sm:text-[10px]">
        AI STATUS: {isAnalysisComplete ? "COMPLETE" : "ANALYZING"}
      </div>

      <div className="pointer-events-none absolute inset-4 z-10 border border-cyan-200/16 sm:inset-6" />
      <div className="pointer-events-none absolute left-4 top-4 z-10 h-12 w-12 border-l-2 border-t-2 border-cyan-200/80 sm:left-6 sm:top-6 sm:h-16 sm:w-16" />
      <div className="pointer-events-none absolute right-4 top-4 z-10 h-12 w-12 border-r-2 border-t-2 border-cyan-200/80 sm:right-6 sm:top-6 sm:h-16 sm:w-16" />
      <div className="pointer-events-none absolute bottom-4 left-4 z-10 h-12 w-12 border-b-2 border-l-2 border-cyan-200/80 sm:bottom-6 sm:left-6 sm:h-16 sm:w-16" />
      <div className="pointer-events-none absolute bottom-4 right-4 z-10 h-12 w-12 border-b-2 border-r-2 border-cyan-200/80 sm:bottom-6 sm:right-6 sm:h-16 sm:w-16" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[42vh] max-h-[260px] min-h-[130px] w-[58vw] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-cyan-200/35 shadow-[0_0_36px_rgba(34,211,238,0.18)]">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-cyan-200/20" />
        <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-cyan-200/20" />
        {!isAnalysisComplete && (
          <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.9)] animate-pulse" />
        )}
        <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.8)]" />
      </div>

      {!isAnalysisComplete && (
        <div className="absolute left-1/2 top-[18%] z-20 w-[min(72vw,360px)] -translate-x-1/2 rounded-full border border-cyan-200/25 bg-black/38 px-4 py-2 text-center shadow-[0_0_28px_rgba(34,211,238,0.14)] backdrop-blur sm:top-[16%]">
          <span className="text-xs font-bold text-cyan-100 sm:text-sm">
            {analysisSteps[analysisStep]}
          </span>
        </div>
      )}

      {isAnalysisComplete &&
        resultCards.map((card) => (
          <article
            key={card.title}
            className={`absolute z-20 w-36 rounded-xl border p-3 opacity-100 backdrop-blur-md transition-all duration-700 sm:w-44 sm:p-4 ${card.position} ${card.tone}`}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-[9px] font-bold tracking-[0.18em] opacity-80 sm:text-[10px]">
                {card.label}
              </p>
              <span className="h-2 w-2 rounded-full bg-current shadow-[0_0_12px_currentColor]" />
            </div>
            <h2 className="mt-2 text-sm font-bold text-white sm:text-base">
              {card.title}
            </h2>
            <p className="mt-1 text-base font-black leading-tight text-white sm:text-lg">
              {card.primary}
            </p>
            <p className="mt-2 text-[10px] leading-4 opacity-85 sm:text-xs">
              {card.action}
            </p>
          </article>
        ))}

      <div className="absolute bottom-4 left-1/2 z-20 max-w-[88vw] -translate-x-1/2 rounded-full border border-cyan-200/25 bg-black/38 px-4 py-2 text-center text-[11px] font-semibold text-cyan-50 shadow-[0_0_24px_rgba(34,211,238,0.14)] backdrop-blur sm:bottom-6 sm:text-sm">
        {isAnalysisComplete
          ? "복잡한 Raw Data가 즉시 행동 가능한 정보로 전환되었습니다."
          : "현장 Raw Data를 인식하는 중..."}
      </div>
    </main>
  );
}
