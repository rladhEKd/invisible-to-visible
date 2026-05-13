import Link from "next/link";

const flow = [
  "STEP 01 카메라 인식",
  "STEP 02 AI 분석",
  "STEP 03 AR 정보 표시",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(59,130,246,0.2),transparent_30%),linear-gradient(135deg,#050816_0%,#071a2e_54%,#020617_100%)]" />

      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-between px-4 py-4 sm:px-6 sm:py-6 lg:px-10 lg:py-8">
        <header className="flex items-center justify-between border-b border-white/10 pb-3 sm:pb-5">
          <p className="text-xs font-semibold tracking-[0.22em] text-cyan-300 sm:text-sm sm:tracking-[0.28em]">
            INVISIBLE TO VISIBLE
          </p>
          <p className="hidden text-sm text-slate-400 sm:block">
            AR Glass Prototype
          </p>
        </header>

        <div className="grid items-center gap-6 py-6 md:gap-10 md:py-10 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="space-y-5 md:space-y-7">
            <div className="inline-flex max-w-full items-center gap-3 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-2 text-xs font-semibold text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.16)] sm:px-4 sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.9)]" />
              휴대폰으로 보는 AR 글래스 시연
            </div>

            <div className="space-y-3 md:space-y-4">
              <h1 className="max-w-3xl text-3xl font-bold leading-tight md:text-5xl lg:text-7xl">
                Invisible to Visible
              </h1>
              <p className="max-w-2xl text-xl font-semibold leading-snug text-cyan-100 md:text-3xl">
                복잡한 산업 Raw Data를 현장에서 바로 행동 가능한 AR 정보로 전환합니다.
              </p>
              <p className="max-w-xl text-sm leading-6 text-slate-300 md:text-base md:leading-7">
                카메라 화면 위에 AI 분석 결과를 겹쳐 보여주는 시연용
                프로토타입입니다.
              </p>
            </div>

            <Link
              href="/scan"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-cyan-200/50 bg-cyan-300 px-7 py-3 text-base font-bold text-slate-950 shadow-[0_0_34px_rgba(34,211,238,0.35)] transition hover:bg-cyan-200 sm:w-auto sm:py-4"
            >
              AR 글래스 시연 시작
            </Link>
          </section>

          <section className="relative min-h-[300px] overflow-hidden rounded-2xl border border-cyan-200/20 bg-slate-950 shadow-[0_30px_100px_rgba(8,145,178,0.24)] sm:min-h-[380px] sm:rounded-[28px] lg:min-h-[500px]">
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
                AR GLASS VIEW
              </span>
              <span className="rounded-full border border-white/15 bg-black/35 px-3 py-2 text-slate-200 backdrop-blur sm:px-4">
                Demo Ready
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

        <footer className="grid gap-2 border-t border-white/10 pt-3 text-xs text-slate-400 sm:grid-cols-3 sm:gap-3 sm:pt-5 sm:text-sm">
          <span>카메라 기반 인식</span>
          <span>AI 위험 분류</span>
          <span>AR 행동 정보</span>
        </footer>
      </section>
    </main>
  );
}
