import Link from "next/link";

const flow = [
  "STEP 01 데이터 촬영",
  "STEP 02 AI 분석",
  "STEP 03 직관적 결과",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(59,130,246,0.2),transparent_30%),linear-gradient(135deg,#050816_0%,#071a2e_54%,#020617_100%)]" />

      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-between px-4 py-5 sm:px-6 sm:py-8 lg:px-10">
        <header className="flex flex-col items-start gap-2 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between sm:pb-5">
          <p className="text-xs font-semibold tracking-[0.22em] text-cyan-300 sm:text-sm sm:tracking-[0.28em]">
            INVISIBLE TO VISIBLE
          </p>
          <p className="hidden text-sm text-slate-400 sm:block">
            산업 현장 Raw Data 분석 시연
          </p>
        </header>

        <div className="grid items-center gap-8 py-8 md:gap-10 md:py-12 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="space-y-6 md:space-y-8">
            <div className="inline-flex max-w-full items-center gap-3 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-2 text-xs font-semibold text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.16)] sm:px-4 sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.9)]" />
              복잡한 데이터를 행동 정보로 바꾸는 데모
            </div>

            <div className="space-y-4 md:space-y-5">
              <h1 className="max-w-3xl text-3xl font-bold leading-tight md:text-5xl lg:text-7xl">
                Invisible to Visible
              </h1>
              <p className="max-w-2xl text-xl font-semibold leading-snug text-cyan-100 md:text-3xl">
                복잡한 산업 데이터를 직관적 행동 정보로 전환
              </p>
              <p className="max-w-xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
                조선소 현장의 엑셀 데이터와 설비 리포트를 촬영하면, AI가
                위험 징후를 분석하고 작업자가 바로 이해할 수 있는 행동 지침으로
                보여주는 시연용 웹앱입니다.
              </p>
            </div>

            <Link
              href="/scan"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-cyan-200/50 bg-cyan-300 px-7 py-3 text-base font-bold text-slate-950 shadow-[0_0_34px_rgba(34,211,238,0.35)] transition hover:bg-cyan-200 sm:w-auto sm:py-4"
            >
              시연 시작하기
            </Link>
          </section>

          <section className="relative min-h-[360px] overflow-hidden rounded-2xl border border-cyan-200/20 bg-slate-950 shadow-[0_30px_100px_rgba(8,145,178,0.24)] sm:min-h-[430px] sm:rounded-[28px] lg:min-h-[500px]">
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(8,13,28,0.36),rgba(15,23,42,0.1)),radial-gradient(circle_at_45%_34%,rgba(34,211,238,0.18),transparent_18%),linear-gradient(90deg,rgba(2,6,23,0.98),rgba(30,41,59,0.46)_50%,rgba(2,6,23,0.88))]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.08)_1px,transparent_1px)] bg-[size:44px_44px]" />

            <div className="absolute inset-0 opacity-80">
              <div className="absolute left-[8%] top-[24%] h-14 w-[78%] -rotate-6 rounded-full border border-slate-400/20 bg-gradient-to-r from-slate-800 via-slate-500 to-slate-900 shadow-2xl" />
              <div className="absolute bottom-[24%] right-[-10%] h-16 w-[86%] rotate-12 rounded-full border border-cyan-200/20 bg-gradient-to-r from-slate-900 via-slate-500 to-slate-950" />
              <div className="absolute left-[20%] top-[10%] h-[80%] w-10 rotate-2 rounded-full border border-slate-300/20 bg-gradient-to-b from-slate-500 via-slate-700 to-slate-950" />
              <div className="absolute right-[18%] top-[16%] h-[68%] w-8 -rotate-3 rounded-full border border-slate-300/20 bg-gradient-to-b from-slate-400 via-slate-700 to-slate-950" />
            </div>

            <div className="absolute left-4 right-4 top-4 z-10 flex items-center justify-between gap-2 text-[10px] font-semibold sm:left-5 sm:right-5 sm:top-5 sm:text-xs">
              <span className="rounded-full border border-cyan-200/30 bg-black/35 px-3 py-2 text-cyan-100 backdrop-blur sm:px-4">
                DEMO FLOW
              </span>
              <span className="rounded-full border border-white/15 bg-black/35 px-3 py-2 text-slate-200 backdrop-blur sm:px-4">
                Ready
              </span>
            </div>

            <div className="absolute left-1/2 top-1/2 z-10 grid w-[82%] -translate-x-1/2 -translate-y-1/2 gap-2 sm:w-[76%] sm:gap-3">
              {flow.map((item) => (
                <div
                  key={item}
                  className="border border-cyan-200/25 bg-black/45 p-3 text-sm font-bold text-white backdrop-blur sm:p-5 sm:text-lg"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>
        </div>

        <footer className="grid gap-2 border-t border-white/10 pt-4 text-xs text-slate-400 sm:grid-cols-3 sm:gap-3 sm:pt-5 sm:text-sm">
          <span>Raw Data 촬영</span>
          <span>AI 기준 분석</span>
          <span>행동 지침 시각화</span>
        </footer>
      </section>
    </main>
  );
}
