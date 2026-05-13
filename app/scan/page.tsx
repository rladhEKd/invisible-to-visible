"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const columns = [
  "설비ID",
  "온도",
  "진동",
  "압력",
  "부식률",
  "가스농도",
  "측정시간",
];

const rows = [
  ["PIPE-A17", "91.4°C", "2.1mm/s", "8.4bar", "12.1%", "18ppm", "09:12:04"],
  ["PUMP-03", "74.8°C", "4.3mm/s", "7.8bar", "8.7%", "21ppm", "09:12:08"],
  ["VALVE-B2", "68.2°C", "1.8mm/s", "10.9bar", "7.2%", "16ppm", "09:12:12"],
  ["LINE-SW4", "82.7°C", "2.7mm/s", "8.9bar", "19.4%", "28ppm", "09:12:16"],
  ["TANK-09", "71.3°C", "1.4mm/s", "6.5bar", "6.1%", "14ppm", "09:12:20"],
  ["DUCT-C1", "86.0°C", "2.2mm/s", "9.1bar", "10.8%", "19ppm", "09:12:24"],
  ["PIPE-B08", "79.5°C", "3.1mm/s", "5.6bar", "13.2%", "25ppm", "09:12:28"],
  ["PUMP-11", "73.6°C", "3.7mm/s", "7.2bar", "9.4%", "17ppm", "09:12:32"],
  ["VALVE-D7", "88.9°C", "2.0mm/s", "8.0bar", "11.0%", "23ppm", "09:12:36"],
  ["LINE-F22", "69.7°C", "1.9mm/s", "9.8bar", "15.8%", "31ppm", "09:12:40"],
  ["PIPE-C31", "77.1°C", "2.6mm/s", "8.2bar", "8.9%", "18ppm", "09:12:44"],
  ["COMP-02", "84.4°C", "4.8mm/s", "7.5bar", "12.6%", "26ppm", "09:12:48"],
  ["LINE-K14", "72.0°C", "1.6mm/s", "11.3bar", "7.7%", "15ppm", "09:12:52"],
  ["PIPE-H05", "90.2°C", "3.4mm/s", "8.7bar", "20.5%", "34ppm", "09:12:56"],
  ["VALVE-A9", "67.9°C", "2.3mm/s", "6.1bar", "6.8%", "20ppm", "09:13:00"],
  ["PUMP-07", "81.6°C", "3.9mm/s", "9.4bar", "10.2%", "24ppm", "09:13:04"],
  ["LINE-M30", "76.8°C", "2.4mm/s", "8.6bar", "14.9%", "29ppm", "09:13:08"],
  ["PIPE-Z12", "93.1°C", "5.0mm/s", "5.4bar", "18.1%", "37ppm", "09:13:12"],
];

const alertCells = new Set([
  "91.4°C",
  "4.3mm/s",
  "10.9bar",
  "19.4%",
  "5.6bar",
  "88.9°C",
  "31ppm",
  "4.8mm/s",
  "11.3bar",
  "90.2°C",
  "20.5%",
  "93.1°C",
  "5.0mm/s",
  "5.4bar",
  "18.1%",
  "37ppm",
]);

const warningCells = new Set([
  "82.7°C",
  "86.0°C",
  "13.2%",
  "3.7mm/s",
  "15.8%",
  "84.4°C",
  "26ppm",
  "3.9mm/s",
  "14.9%",
  "29ppm",
]);

function getCellClass(cell: string) {
  if (alertCells.has(cell)) {
    return "bg-red-500/15 text-red-200 ring-1 ring-inset ring-red-300/30";
  }

  if (warningCells.has(cell)) {
    return "bg-yellow-300/12 text-yellow-100 ring-1 ring-inset ring-yellow-300/25";
  }

  return "text-slate-300";
}

export default function ScanPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

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
    return () => {
      if (scanTimeoutRef.current) {
        clearTimeout(scanTimeoutRef.current);
      }
    };
  }, []);

  function handleScan() {
    if (isScanning) return;

    setIsScanning(true);
    scanTimeoutRef.current = setTimeout(() => {
      router.push("/analyzing");
    }, 1500);
  }

  return (
    <main className="min-h-dvh overflow-hidden bg-[#050816] text-white lg:min-h-screen">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_15%,rgba(34,211,238,0.16),transparent_28%),linear-gradient(135deg,#050816_0%,#071a2e_58%,#020617_100%)]" />

      <section className="mx-auto flex h-dvh w-full max-w-7xl flex-col gap-2 px-3 py-2 sm:gap-4 sm:px-5 sm:py-4 lg:min-h-screen lg:gap-7 lg:px-10 lg:py-8">
        <header className="flex flex-row items-center justify-between gap-2">
          <Link href="/" className="text-xs font-semibold text-cyan-300 sm:text-sm">
            Invisible to Visible
          </Link>
          <p className="rounded-full border border-cyan-200/25 bg-cyan-300/10 px-3 py-1.5 text-[10px] font-semibold text-cyan-100 sm:px-4 sm:py-2 sm:text-xs">
            STEP 01 데이터 촬영
          </p>
        </header>

        <div className="grid min-h-0 flex-1 items-stretch gap-3 landscape:grid-cols-[1.2fr_0.8fr] md:gap-5 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
          <section className="order-2 flex min-h-0 flex-col justify-center space-y-2 landscape:order-2 lg:order-1 lg:space-y-5">
            <p className="text-[10px] font-bold tracking-[0.18em] text-cyan-300 sm:text-xs lg:text-sm lg:tracking-[0.24em]">
              CAMERA SCAN
            </p>
            <h1 className="text-xl font-bold leading-tight sm:text-2xl md:text-3xl lg:text-5xl">
              현장 Raw Data를 촬영합니다
            </h1>
            <p className="max-w-md text-xs leading-5 text-slate-300 sm:text-sm sm:leading-6 lg:text-base lg:leading-8">
              카메라 프레임으로 현장 데이터를 확인하고, 미리 정의된 Raw Data를
              시연용 분석 흐름으로 넘깁니다.
            </p>
            <button
              type="button"
              onClick={handleScan}
              disabled={isScanning}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.32)] transition hover:bg-cyan-200 disabled:cursor-wait disabled:bg-cyan-200 sm:w-auto lg:min-h-12 lg:px-7 lg:py-4 lg:text-base"
            >
              {isScanning ? "Raw Data 분석 중..." : "스캔 시작"}
            </button>
          </section>

          <section className="order-1 relative min-h-0 overflow-hidden rounded-2xl border border-cyan-200/25 bg-slate-950 p-2 shadow-[0_30px_100px_rgba(8,145,178,0.24)] landscape:order-1 sm:p-4 lg:order-2 lg:rounded-[28px] lg:p-6">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(34,211,238,0.16),transparent_25%),linear-gradient(135deg,rgba(15,23,42,0.92),rgba(2,6,23,0.72))]" />

            <div className="relative space-y-2 sm:space-y-3 lg:space-y-5">
              <div className="flex items-center justify-between gap-2 text-[9px] font-semibold text-cyan-100 sm:text-[10px] lg:text-xs">
                <span className="rounded-full border border-cyan-200/30 bg-black/40 px-2 py-1.5 backdrop-blur lg:px-4 lg:py-2">
                  CAMERA FRAME · {isCameraReady ? "LIVE" : "READY"}
                </span>
                <span className="rounded-full border border-white/15 bg-black/40 px-2 py-1.5 text-slate-200 backdrop-blur lg:px-4 lg:py-2">
                  {isCameraReady ? "Camera Preview" : "Fallback View"}
                </span>
              </div>

              <div
                className={`relative h-[42vh] max-h-[260px] min-h-[145px] w-full overflow-hidden rounded-xl border border-cyan-200/30 bg-[radial-gradient(circle_at_50%_45%,rgba(34,211,238,0.12),transparent_30%),linear-gradient(135deg,#020617,#0f172a_52%,#020617)] shadow-[inset_0_0_50px_rgba(0,0,0,0.8),0_0_34px_rgba(34,211,238,0.16)] sm:rounded-2xl lg:aspect-[16/7] lg:h-auto lg:max-h-none ${
                  isScanning
                    ? "animate-pulse border-cyan-200 shadow-[inset_0_0_50px_rgba(0,0,0,0.8),0_0_44px_rgba(34,211,238,0.42)]"
                    : ""
                }`}
              >
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
                  <div className="absolute left-1/2 top-1/2 w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-cyan-200/25 bg-black/35 px-3 py-3 text-center backdrop-blur-sm sm:w-auto lg:px-8 lg:py-5">
                    <p className="text-[10px] font-bold tracking-[0.2em] text-cyan-300 lg:text-xs">
                      AR/HUD SCAN AREA
                    </p>
                    <p className="mt-1 text-base font-bold text-white lg:mt-2 lg:text-2xl">
                      카메라 준비 영역
                    </p>
                    <p className="mt-1 text-[10px] leading-4 text-slate-400 lg:mt-2 lg:text-sm lg:leading-5">
                      권한을 허용하면 미리보기가 표시됩니다.
                    </p>
                  </div>
                )}

                {isScanning && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-cyan-950/25 backdrop-blur-[1px]">
                    <div className="absolute left-6 right-6 top-1/2 h-0.5 bg-cyan-200 shadow-[0_0_22px_rgba(34,211,238,0.95)]" />
                    <div className="rounded-2xl border border-cyan-200/45 bg-black/55 px-4 py-3 text-center shadow-[0_0_34px_rgba(34,211,238,0.28)] lg:px-6 lg:py-4">
                      <p className="text-[10px] font-bold tracking-[0.2em] text-cyan-300 lg:text-xs">
                        OCR DEMO MODE
                      </p>
                      <p className="mt-1 text-lg font-bold text-white lg:mt-2 lg:text-xl">
                        Raw Data 분석 중...
                      </p>
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.08)_1px,transparent_1px)] bg-[size:100%_18px]" />
                <div className="absolute inset-x-8 top-1/2 h-px bg-cyan-200/30" />
                <div className="absolute inset-y-6 left-1/2 w-px bg-cyan-200/30" />

                <div className="absolute inset-4 border border-cyan-200/25" />
                <div className="absolute left-4 top-4 h-10 w-10 border-l-2 border-t-2 border-cyan-200 sm:h-14 sm:w-14" />
                <div className="absolute right-4 top-4 h-10 w-10 border-r-2 border-t-2 border-cyan-200 sm:h-14 sm:w-14" />
                <div className="absolute bottom-4 left-4 h-10 w-10 border-b-2 border-l-2 border-cyan-200 sm:h-14 sm:w-14" />
                <div className="absolute bottom-4 right-4 h-10 w-10 border-b-2 border-r-2 border-cyan-200 sm:h-14 sm:w-14" />
              </div>

              <div className="max-h-[25vh] overflow-hidden rounded-xl border border-cyan-200/25 bg-black/42 p-2 backdrop-blur-sm sm:max-h-[28vh] lg:max-h-none lg:rounded-2xl lg:p-4">
                <div className="mb-2 flex items-center justify-between gap-2 border-b border-white/10 pb-2 lg:mb-4 lg:pb-3">
                  <div>
                    <p className="text-[9px] font-bold text-cyan-300 lg:text-xs">
                      SHIPYARD EQUIPMENT RAW LOG
                    </p>
                    <h2 className="mt-0.5 text-sm font-bold text-white lg:mt-1 lg:text-2xl">
                      복잡한 Raw Data
                    </h2>
                  </div>
                  <p className="text-[9px] text-slate-400 lg:text-xs">
                    Captured Area 92%
                  </p>
                </div>

                <div className="max-h-[88px] overflow-hidden border border-white/10 bg-slate-950/65 shadow-[inset_0_0_28px_rgba(8,145,178,0.12)] sm:max-h-[104px] lg:max-h-none">
                  <div className="grid grid-cols-[1.05fr_0.82fr_0.9fr_0.85fr_0.82fr_0.9fr_1.05fr] bg-cyan-300/15 text-[7px] font-bold text-cyan-100 sm:text-[8px] lg:text-[11px]">
                    {columns.map((heading) => (
                      <div
                        key={heading}
                        className="min-w-0 break-words border-r border-white/10 px-1 py-1 last:border-r-0 lg:px-2 lg:py-2"
                      >
                        {heading}
                      </div>
                    ))}
                  </div>
                  {rows.map((row, rowIndex) => (
                    <div
                      key={row.join("-")}
                      className="grid grid-cols-[1.05fr_0.82fr_0.9fr_0.85fr_0.82fr_0.9fr_1.05fr] border-t border-white/10 text-[7px] leading-3 sm:text-[8px] lg:text-[11px] lg:leading-4"
                    >
                      {row.map((cell, cellIndex) => (
                        <div
                          key={`${rowIndex}-${cell}`}
                          className={`min-w-0 break-words border-r border-white/10 px-1 py-1 last:border-r-0 lg:px-2 lg:py-2 ${
                            cellIndex === 0
                              ? "font-semibold text-slate-100"
                              : getCellClass(cell)
                          }`}
                        >
                          {cell}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="mt-2 hidden grid-cols-3 gap-2 text-[10px] text-slate-300 sm:grid lg:mt-3 lg:text-[11px]">
                  <div className="border border-white/10 bg-white/[0.04] px-2 py-1.5 lg:px-3 lg:py-2">
                    스캔 행 수: 18
                  </div>
                  <div className="border border-yellow-300/20 bg-yellow-300/10 px-2 py-1.5 text-yellow-100 lg:px-3 lg:py-2">
                    주의 후보: 10
                  </div>
                  <div className="border border-red-300/25 bg-red-400/10 px-2 py-1.5 text-red-100 lg:px-3 lg:py-2">
                    위험 후보: 16
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
