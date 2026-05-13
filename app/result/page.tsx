import Link from "next/link";

const rawSummary = [
  ["PIPE-H05", "90.2°C", "3.4mm/s", "0.14"],
  ["PIPE-Z12", "93.1°C", "5.0mm/s", "0.18"],
  ["LINE-SW4", "82.7°C", "2.7mm/s", "0.12"],
];

const actionResults = [
  {
    level: "위험",
    title: "부식 위험",
    action: "7일 이내 교체",
    basis: "근거: 0.14mm/year",
    color: "border-red-300/70 bg-red-500/15 text-red-100 shadow-red-950/50",
  },
  {
    level: "위험",
    title: "고온 위험",
    action: "냉각 장치 점검",
    basis: "근거: 93.1°C",
    color: "border-red-300/70 bg-red-500/15 text-red-100 shadow-red-950/50",
  },
  {
    level: "주의",
    title: "진동 주의",
    action: "점검 주기 단축",
    basis: "근거: 5.0mm/s",
    color: "border-yellow-300/70 bg-yellow-300/12 text-yellow-100 shadow-yellow-950/40",
  },
  {
    level: "정상",
    title: "압력 정상",
    action: "현재 운영 가능",
    basis: "근거: 기준 범위",
    color: "border-green-300/70 bg-green-300/12 text-green-100 shadow-green-950/40",
  },
];

export default function ResultPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_22%,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_82%_12%,rgba(59,130,246,0.2),transparent_30%),linear-gradient(135deg,#050816_0%,#071a2e_58%,#020617_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(34,211,238,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.06)_1px,transparent_1px)] bg-[size:46px_46px]" />

      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-3 px-4 py-3 sm:gap-4 sm:px-5 sm:py-4 lg:gap-5 lg:px-10 lg:py-6">
        <header className="flex flex-row items-center justify-between gap-3">
          <Link href="/" className="text-xs font-semibold text-cyan-300 sm:text-sm">
            Invisible to Visible
          </Link>
          <p className="rounded-full border border-cyan-200/25 bg-cyan-300/10 px-3 py-1.5 text-[10px] font-semibold text-cyan-100 sm:px-4 sm:py-2 sm:text-xs">
            STEP 03 직관적 결과
          </p>
        </header>

        <section className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-[0.18em] text-cyan-300 sm:text-xs">
              RAW DATA → AI 분석 → 행동 정보
            </p>
            <h1 className="mt-1 max-w-4xl text-2xl font-bold leading-tight sm:text-3xl lg:text-5xl">
              복잡한 데이터를 현장 행동으로 전환
            </h1>
          </div>
          <p className="max-w-xl text-xs leading-5 text-slate-300 sm:text-sm lg:text-base lg:leading-7">
            숫자 중심 Raw Data를 AI 분석 흐름으로 정리해 바로 실행할 조치만
            보여줍니다.
          </p>
        </section>

        <section className="grid flex-1 grid-cols-1 gap-3 md:grid-cols-[0.78fr_1.22fr] lg:gap-5">
          <aside className="relative overflow-hidden rounded-xl border border-white/10 bg-slate-950/70 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur lg:rounded-2xl lg:p-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_20%,rgba(148,163,184,0.12),transparent_32%)]" />
            <div className="relative grid gap-3 sm:grid-cols-[0.75fr_1.25fr] md:grid-cols-1">
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] text-slate-400">
                  BEFORE
                </p>
                <h2 className="mt-1 text-lg font-bold text-white lg:text-2xl">
                  복잡한 Raw Data
                </h2>
                <p className="mt-2 text-xs leading-5 text-slate-400 lg:text-sm">
                  온도, 진동, 부식 수치가 섞여 있어 즉시 판단이 어렵습니다.
                </p>
              </div>

              <div className="overflow-hidden border border-white/10 bg-black/35 text-[9px] sm:text-[10px] lg:text-[11px]">
                <div className="grid grid-cols-4 bg-white/[0.06] font-bold text-slate-300">
                  {["ID", "온도", "진동", "부식"].map((cell) => (
                    <div
                      key={cell}
                      className="min-w-0 break-words border-r border-white/10 px-1.5 py-1.5 last:border-r-0"
                    >
                      {cell}
                    </div>
                  ))}
                </div>
                {rawSummary.map((row) => (
                  <div
                    key={row.join("-")}
                    className="grid grid-cols-4 border-t border-white/10 text-slate-400"
                  >
                    {row.map((cell) => (
                      <div
                        key={cell}
                        className="min-w-0 break-words border-r border-white/10 px-1.5 py-1.5 last:border-r-0"
                      >
                        {cell}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] sm:col-span-2 md:col-span-1">
                <div className="border border-red-300/20 bg-red-500/10 px-2 py-2 text-red-100">
                  이상 후보 9개
                </div>
                <div className="border border-yellow-300/20 bg-yellow-300/10 px-2 py-2 text-yellow-100">
                  AI 분석 필요
                </div>
              </div>
            </div>
          </aside>

          <section className="relative overflow-hidden rounded-xl border border-cyan-200/25 bg-slate-950/65 p-3 shadow-[0_26px_90px_rgba(8,145,178,0.24)] backdrop-blur lg:rounded-[28px] lg:p-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(34,211,238,0.18),transparent_25%),linear-gradient(135deg,rgba(15,23,42,0.2),rgba(2,6,23,0.5))]" />
            <div className="absolute left-3 top-3 h-8 w-8 border-l-2 border-t-2 border-cyan-200/70 lg:left-6 lg:top-6 lg:h-14 lg:w-14" />
            <div className="absolute right-3 top-3 h-8 w-8 border-r-2 border-t-2 border-cyan-200/70 lg:right-6 lg:top-6 lg:h-14 lg:w-14" />
            <div className="absolute bottom-3 left-3 h-8 w-8 border-b-2 border-l-2 border-cyan-200/70 lg:bottom-6 lg:left-6 lg:h-14 lg:w-14" />
            <div className="absolute bottom-3 right-3 h-8 w-8 border-b-2 border-r-2 border-cyan-200/70 lg:bottom-6 lg:right-6 lg:h-14 lg:w-14" />

            <div className="relative">
              <div className="mb-3 flex items-center justify-between gap-3 lg:mb-5">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] text-cyan-300">
                    AFTER
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-white lg:text-3xl">
                    직관적 행동 정보
                  </h2>
                </div>
                <p className="rounded-full border border-cyan-200/30 bg-cyan-300/10 px-3 py-1.5 text-[10px] font-semibold text-cyan-100 sm:text-xs">
                  AR Cards
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-2 lg:gap-4 xl:grid-cols-4">
                {actionResults.map((result) => (
                  <article
                    key={result.title}
                    className={`border p-3 shadow-2xl backdrop-blur-md lg:p-4 ${result.color}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full border border-white/25 bg-black/25 px-2 py-1 text-[10px] font-bold">
                        {result.level}
                      </span>
                      <span className="text-[10px] font-semibold text-white/55">
                        ACTION
                      </span>
                    </div>
                    <h3 className="mt-3 text-sm font-bold text-white lg:text-lg">
                      {result.title}
                    </h3>
                    <p className="mt-1 text-lg font-black leading-tight text-white lg:text-2xl">
                      {result.action}
                    </p>
                    <p className="mt-2 text-[11px] leading-4 text-slate-100/80 lg:text-sm lg:leading-5">
                      {result.basis}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </section>

        <footer className="flex flex-col gap-2 rounded-xl border border-cyan-200/20 bg-cyan-300/10 px-3 py-3 text-center shadow-[0_0_40px_rgba(34,211,238,0.14)] backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:text-left lg:px-5 lg:py-4">
          <p className="text-xs font-bold leading-5 text-cyan-50 sm:text-sm lg:text-lg">
            복잡한 Raw Data가 AI 분석을 거쳐 바로 행동 가능한 정보로 전환되었습니다.
          </p>
          <Link
            href="/scan"
            className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-full border border-cyan-200/40 px-4 py-2 text-xs font-bold text-cyan-100 transition hover:bg-cyan-300/10 sm:w-auto lg:min-h-12 lg:px-5 lg:py-3 lg:text-sm"
          >
            다시 촬영하기
          </Link>
        </footer>
      </section>
    </main>
  );
}
