import Link from "next/link";

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
  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_15%,rgba(34,211,238,0.16),transparent_28%),linear-gradient(135deg,#050816_0%,#071a2e_58%,#020617_100%)]" />

      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-5 px-4 py-5 sm:gap-7 sm:px-6 sm:py-8 lg:px-10">
        <header className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="text-sm font-semibold text-cyan-300">
            Invisible to Visible
          </Link>
          <p className="rounded-full border border-cyan-200/25 bg-cyan-300/10 px-4 py-2 text-xs font-semibold text-cyan-100">
            STEP 01 데이터 촬영
          </p>
        </header>

        <div className="grid flex-1 items-center gap-6 md:gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <section className="space-y-4 md:space-y-5">
            <p className="text-xs font-bold tracking-[0.2em] text-cyan-300 sm:text-sm sm:tracking-[0.24em]">
              CAMERA SCAN
            </p>
            <h1 className="text-3xl font-bold leading-tight md:text-5xl">
              현장 Raw Data를 촬영합니다
            </h1>
            <p className="text-sm leading-7 text-slate-300 md:text-base md:leading-8">
              카메라 프레임 안에는 사람이 한눈에 판단하기 어려운 설비 데이터가
              표시됩니다. 복잡한 수치 속에 숨어 있는 이상 징후를 다음 단계에서
              AI가 분석합니다.
            </p>
            <Link
              href="/analyzing"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-cyan-300 px-7 py-3 text-base font-bold text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.32)] transition hover:bg-cyan-200 sm:w-auto sm:py-4"
            >
              촬영한 데이터 분석하기
            </Link>
          </section>

          <section className="relative min-h-[520px] overflow-hidden rounded-2xl border border-cyan-200/25 bg-slate-950 shadow-[0_30px_100px_rgba(8,145,178,0.24)] sm:min-h-[620px] sm:rounded-[28px]">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(34,211,238,0.16),transparent_24%),linear-gradient(135deg,rgba(15,23,42,0.92),rgba(2,6,23,0.72))]" />

            <div className="absolute left-4 right-4 top-4 z-10 flex items-center justify-between gap-2 text-[10px] font-semibold text-cyan-100 sm:left-6 sm:right-6 sm:top-6 sm:text-xs">
              <span className="rounded-full border border-cyan-200/30 bg-black/40 px-3 py-2 backdrop-blur sm:px-4">
                CAMERA FRAME · REPORT-042
              </span>
              <span className="rounded-full border border-white/15 bg-black/40 px-3 py-2 text-slate-200 backdrop-blur sm:px-4">
                Raw Data Preview
              </span>
            </div>

            <div className="absolute inset-4 top-16 rounded-xl border border-cyan-200/25 bg-black/42 p-3 backdrop-blur-sm sm:inset-10 sm:top-20 sm:rounded-2xl sm:p-4">
              <div className="mb-3 flex flex-col gap-2 border-b border-white/10 pb-3 sm:mb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-bold text-cyan-300 sm:text-xs">
                    SHIPYARD EQUIPMENT RAW LOG
                  </p>
                  <h2 className="mt-1 text-lg font-bold text-white sm:text-2xl">
                    사람이 보기 어려운 복잡한 Raw Data
                  </h2>
                </div>
                <p className="text-[10px] text-slate-400 sm:text-xs">Captured Area 92%</p>
              </div>

              <div className="overflow-hidden border border-white/10 bg-slate-950/65 shadow-[inset_0_0_28px_rgba(8,145,178,0.12)]">
                <div className="grid grid-cols-[1.05fr_0.82fr_0.9fr_0.85fr_0.82fr_0.9fr_1.05fr] bg-cyan-300/15 text-[8px] font-bold text-cyan-100 sm:text-[11px]">
                  {columns.map((heading) => (
                    <div
                      key={heading}
                      className="min-w-0 break-words border-r border-white/10 px-1 py-1.5 last:border-r-0 sm:px-2 sm:py-2"
                    >
                      {heading}
                    </div>
                  ))}
                </div>
                {rows.map((row, rowIndex) => (
                  <div
                    key={row.join("-")}
                    className="grid grid-cols-[1.05fr_0.82fr_0.9fr_0.85fr_0.82fr_0.9fr_1.05fr] border-t border-white/10 text-[8px] leading-3 sm:text-[11px] sm:leading-4"
                  >
                    {row.map((cell, cellIndex) => (
                      <div
                        key={`${rowIndex}-${cell}`}
                        className={`min-w-0 break-words border-r border-white/10 px-1 py-1.5 last:border-r-0 sm:px-2 sm:py-2 ${
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

              <div className="mt-3 grid grid-cols-1 gap-2 text-[10px] text-slate-300 sm:grid-cols-3 sm:text-[11px]">
                <div className="border border-white/10 bg-white/[0.04] px-2 py-2 sm:px-3">
                  스캔 행 수: 18
                </div>
                <div className="border border-yellow-300/20 bg-yellow-300/10 px-2 py-2 text-yellow-100 sm:px-3">
                  주의 후보: 10
                </div>
                <div className="border border-red-300/25 bg-red-400/10 px-2 py-2 text-red-100 sm:px-3">
                  위험 후보: 16
                </div>
              </div>
            </div>

            <div className="absolute inset-4 border border-cyan-200/35 sm:inset-6" />
            <div className="absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2 border-cyan-200 sm:left-6 sm:top-6 sm:h-12 sm:w-12" />
            <div className="absolute right-4 top-4 h-8 w-8 border-r-2 border-t-2 border-cyan-200 sm:right-6 sm:top-6 sm:h-12 sm:w-12" />
            <div className="absolute bottom-4 left-4 h-8 w-8 border-b-2 border-l-2 border-cyan-200 sm:bottom-6 sm:left-6 sm:h-12 sm:w-12" />
            <div className="absolute bottom-4 right-4 h-8 w-8 border-b-2 border-r-2 border-cyan-200 sm:bottom-6 sm:right-6 sm:h-12 sm:w-12" />
          </section>
        </div>
      </section>
    </main>
  );
}
