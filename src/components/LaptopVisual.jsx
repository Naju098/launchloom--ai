export default function LaptopVisual({ gradient }) {
  const defaultBg = "linear-gradient(135deg, rgba(121, 227, 90, 0.08), rgba(19, 28, 23, 1))";

  return (
    <div
      className="relative grid h-44 place-items-center overflow-hidden rounded-3xl"
      style={{ background: gradient || defaultBg }}
    >
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full border-[18px] border-white/5" />
      <div className="absolute -bottom-12 -left-8 h-28 w-28 rounded-full bg-white/5 blur-xl" />

      <div className="relative w-[67%]">
        <div className="rounded-t-xl border-[5px] border-[var(--va-text)]/20 bg-[var(--va-base)] p-1.5 shadow-2xl">
          <div className="aspect-[16/9] overflow-hidden rounded-md bg-gradient-to-br from-[var(--va-elevated)] via-[var(--va-green-dim)] to-[var(--va-base)] p-3">
            <div className="h-full rounded-sm border border-white/5 bg-white/5 backdrop-blur-sm" />
          </div>
        </div>
        <div className="mx-auto h-2 w-[113%] -translate-x-[5.5%] rounded-b-xl bg-gradient-to-b from-[var(--va-text)]/10 to-[var(--va-text)]/20 shadow-lg" />
        <div className="mx-auto h-1 w-1/3 rounded-b-full bg-[var(--va-text)]/10" />
      </div>
    </div>
  );
}
