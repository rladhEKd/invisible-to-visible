"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const pipeline = [
  "Raw Data 정리",
  "AI 기준 분석",
  "위험도 분류",
  "결과 시각화",
];

export default function AnalyzingPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      router.push("/result");
    }, 2600);

    return () => window.clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_30%,rgba(34,211,238,0.2),transparent_30%),linear-gradient(135deg,#050816_0%,#071a2e_54%,#020617_100%)]" />

      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-5 sm:px-6 sm:py-8 lg:px-10">
        <header className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-cyan-300">
            Invisible to Visible
          </p>
          <p className="rounded-full border border-cyan-200/25 bg-cyan-300/10 px-4 py-2 text-xs font-semibold text-cyan-100">
            STEP 02 AI 분석
          </p>
        </header>

        <div className="flex flex-1 items-center justify-center py-8 md:py-0">
          <div className="mx-auto w-full max-w-5xl space-y-7 text-center md:space-y-10">
            <div className="space-y-3 md:space-y-4">
              <p className="text-xs font-bold tracking-[0.2em] text-cyan-300 sm:text-sm sm:tracking-[0.26em]">
                AI ANALYZING
              </p>
              <h1 className="text-3xl font-bold md:text-5xl">
                촬영된 Raw Data를 분석하고 있습니다
              </h1>
              <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-300 md:text-base md:leading-8">
                복잡한 수치를 기준값과 비교하고, 현장에서 바로 이해할 수 있는
                위험도와 행동 지침으로 변환합니다.
              </p>
            </div>

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-cyan-200/30 bg-cyan-300/10 shadow-[0_0_42px_rgba(34,211,238,0.28)] md:h-28 md:w-28">
              <div className="h-14 w-14 animate-spin rounded-full border-4 border-cyan-300/20 border-t-cyan-200 md:h-16 md:w-16" />
            </div>

            <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 md:gap-4">
              {pipeline.map((item, index) => (
                <article
                  key={item}
                  className="relative min-h-28 border border-cyan-200/20 bg-white/[0.06] p-4 text-left shadow-[0_18px_45px_rgba(0,0,0,0.24)] backdrop-blur md:min-h-40 md:p-5"
                >
                  <p className="text-xs font-bold text-cyan-300">
                    0{index + 1}
                  </p>
                  <h2 className="mt-3 text-base font-bold text-white md:mt-4 md:text-xl">{item}</h2>
                  <div className="absolute bottom-4 left-4 right-4 h-1 overflow-hidden rounded-full bg-white/10 md:bottom-5 md:left-5 md:right-5">
                    <div className="h-full animate-pulse rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.8)]" />
                  </div>
                </article>
              ))}
            </section>

            <div className="mx-auto max-w-xl rounded-2xl border border-cyan-200/25 bg-slate-950/70 p-4 text-left shadow-[0_0_38px_rgba(34,211,238,0.18)] backdrop-blur md:p-5">
              <p className="text-xs font-bold tracking-[0.22em] text-cyan-300">
                AI PROCESSING DEMO
              </p>
              <p className="mt-3 text-base font-semibold text-white md:text-lg">
                기준값 비교 · 이상 패턴 분류 · 행동 지침 생성
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                실제 AI 모델 호출 없이 시연 흐름을 보여주는 화면입니다. 잠시 후
                최종 결과 페이지로 자동 이동합니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
