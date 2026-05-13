import Link from "next/link";

const rawSummary = [
  ["PIPE-H05", "90.2°C", "3.4mm/s", "20.5%", "34ppm"],
  ["PIPE-Z12", "93.1°C", "5.0mm/s", "18.1%", "37ppm"],
  ["LINE-SW4", "82.7°C", "2.7mm/s", "19.4%", "28ppm"],
  ["COMP-02", "84.4°C", "4.8mm/s", "12.6%", "26ppm"],
  ["VALVE-B2", "68.2°C", "1.8mm/s", "7.2%", "16ppm"],
];

const actionResults = [
  {
    level: "위험",
    title: "부식 위험 87%",
    action: "7일 이내 교체 필요",
    detail: "해수 배관 외벽 부식률이 기준을 초과했습니다. 정비 일정과 교체 자재를 즉시 확인하세요.",
    color: "border-red-300/70 bg-red-500/15 text-red-100 shadow-red-950/50",
  },
  {
    level: "위험",
    title: "고온 위험",
    action: "즉시 냉각 장치 점검",
    detail: "고온 구간의 작업을 제한하고 냉각 라인, 밸브, 열원 상태를 우선 점검하세요.",
    color: "border-red-300/70 bg-red-500/15 text-red-100 shadow-red-950/50",
  },
  {
    level: "주의",
    title: "진동 주의",
    action: "다음 점검 주기 단축",
    detail: "펌프 고정 상태와 회전축 흔들림을 확인하고 모니터링 주기를 앞당기세요.",
    color: "border-yellow-300/70 bg-yellow-300/12 text-yellow-100 shadow-yellow-950/40",
  },
  {
    level: "정상",
    title: "압력 정상",
    action: "현재 운영 가능",
    detail: "압력값은 기준 범위 안에 있습니다. 현재 운전 조건을 유지해도 됩니다.",
    color: "border-green-300/70 bg-green-300/12 text-green-100 shadow-green-950/40",
  },
];

export default function ResultPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_22%,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_82%_12%,rgba(59,130,246,0.2),transparent_30%),linear-gradient(135deg,#050816_0%,#071a2e_58%,#020617_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(34,211,238,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.06)_1px,transparent_1px)] bg-[size:46px_46px]" />

      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-5 px-4 py-5 sm:gap-7 sm:px-6 sm:py-8 lg:px-10">
        <header className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="text-sm font-semibold text-cyan-300">
            Invisible to Visible
          </Link>
          <p className="rounded-full border border-cyan-200/25 bg-cyan-300/10 px-4 py-2 text-xs font-semibold text-cyan-100">
            STEP 03 직관적 결과
          </p>
        </header>

        <section className="space-y-3 md:space-y-4">
          <p className="text-xs font-bold tracking-[0.2em] text-cyan-300 sm:text-sm sm:tracking-[0.24em]">
            AR VISUALIZATION RESULT
          </p>
          <h1 className="max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
            복잡한 데이터가 행동 지침으로 전환되었습니다
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-slate-300 md:text-base md:leading-8">
            최종 화면에서는 숫자보다 현장에서 바로 실행해야 할 조치가 먼저
            보이도록 정리했습니다.
          </p>
        </section>

        <section className="grid flex-1 grid-cols-1 gap-4 md:gap-6 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.34)] backdrop-blur md:rounded-[24px] md:p-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_20%,rgba(148,163,184,0.12),transparent_32%)]" />
            <div className="relative">
              <p className="text-xs font-bold tracking-[0.22em] text-slate-400">
                BEFORE
              </p>
              <h2 className="mt-2 text-xl font-bold text-white md:text-2xl">
                복잡한 Raw Data
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                여러 설비의 온도, 진동, 부식률, 가스농도 값이 섞여 있어
                사람이 즉시 판단하기 어렵습니다.
              </p>

              <div className="mt-4 overflow-hidden border border-white/10 bg-black/35 text-[9px] sm:text-[11px] md:mt-6">
                <div className="grid grid-cols-5 bg-white/[0.06] font-bold text-slate-300">
                  {["ID", "온도", "진동", "부식", "가스"].map((cell) => (
                    <div
                      key={cell}
                      className="min-w-0 break-words border-r border-white/10 px-1.5 py-2 last:border-r-0 sm:px-2"
                    >
                      {cell}
                    </div>
                  ))}
                </div>
                {rawSummary.map((row) => (
                  <div
                    key={row.join("-")}
                    className="grid grid-cols-5 border-t border-white/10 text-slate-400"
                  >
                    {row.map((cell) => (
                      <div
                        key={cell}
                        className="min-w-0 break-words border-r border-white/10 px-1.5 py-2 last:border-r-0 sm:px-2"
                      >
                        {cell}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2 text-xs sm:grid-cols-2 md:mt-5 md:gap-3">
                <div className="border border-red-300/20 bg-red-500/10 px-3 py-2 text-red-100 md:py-3">
                  이상 후보 9개
                </div>
                <div className="border border-yellow-300/20 bg-yellow-300/10 px-3 py-2 text-yellow-100 md:py-3">
                  판단 필요 14개
                </div>
              </div>
            </div>
          </aside>

          <section className="relative overflow-hidden rounded-2xl border border-cyan-200/25 bg-slate-950/65 p-4 shadow-[0_30px_110px_rgba(8,145,178,0.26)] backdrop-blur md:rounded-[28px] md:p-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(34,211,238,0.18),transparent_25%),linear-gradient(135deg,rgba(15,23,42,0.2),rgba(2,6,23,0.5))]" />
            <div className="absolute left-4 top-4 h-10 w-10 border-l-2 border-t-2 border-cyan-200/70 md:left-6 md:top-6 md:h-14 md:w-14" />
            <div className="absolute right-4 top-4 h-10 w-10 border-r-2 border-t-2 border-cyan-200/70 md:right-6 md:top-6 md:h-14 md:w-14" />
            <div className="absolute bottom-4 left-4 h-10 w-10 border-b-2 border-l-2 border-cyan-200/70 md:bottom-6 md:left-6 md:h-14 md:w-14" />
            <div className="absolute bottom-4 right-4 h-10 w-10 border-b-2 border-r-2 border-cyan-200/70 md:bottom-6 md:right-6 md:h-14 md:w-14" />

            <div className="relative">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between md:mb-5 md:gap-4">
                <div>
                  <p className="text-xs font-bold tracking-[0.22em] text-cyan-300">
                    AFTER
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">
                    직관적 행동 정보
                  </h2>
                </div>
                <p className="rounded-full border border-cyan-200/30 bg-cyan-300/10 px-4 py-2 text-xs font-semibold text-cyan-100">
                  AR Overlay Cards
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                {actionResults.map((result) => (
                  <article
                    key={result.title}
                    className={`border p-4 shadow-2xl backdrop-blur-md md:p-5 ${result.color}`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="rounded-full border border-white/25 bg-black/25 px-3 py-1 text-xs font-bold">
                        {result.level}
                      </span>
                      <span className="text-xs font-semibold text-white/55">
                        ACTION
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-white md:mt-5 md:text-xl">
                      {result.title}
                    </h3>
                    <p className="mt-2 text-2xl font-black leading-tight text-white md:mt-3 md:text-3xl">
                      {result.action}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-100/80 md:mt-4">
                      {result.detail}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </section>

        <footer className="rounded-2xl border border-cyan-200/20 bg-cyan-300/10 px-4 py-4 text-center shadow-[0_0_40px_rgba(34,211,238,0.14)] backdrop-blur md:px-5">
          <p className="text-base font-bold leading-7 text-cyan-50 md:text-lg">
            복잡한 수치 데이터가 현장에서 바로 행동 가능한 정보로 전환되었습니다.
          </p>
          <Link
            href="/scan"
            className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-cyan-200/40 px-5 py-3 text-sm font-bold text-cyan-100 transition hover:bg-cyan-300/10 sm:w-auto"
          >
            다시 촬영하기
          </Link>
        </footer>
      </section>
    </main>
  );
}
