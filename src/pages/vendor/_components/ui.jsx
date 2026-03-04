export function Badge({ tone = "gray", children }) {
  const tones = {
    gray: "bg-slate-100 text-slate-700 border-slate-200",
    green: "bg-emerald-50 text-emerald-700 border-emerald-200",
    yellow: "bg-amber-50 text-amber-700 border-amber-200",
    blue: "bg-sky-50 text-sky-700 border-sky-200",
    red: "bg-rose-50 text-rose-700 border-rose-200",
  };

  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold",
        tones[tone] || tones.gray,
      ].join(" ")}
    >
      {children}
    </span>
  );
}

export function StatCard({ icon, title, value, hint }) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-600 text-white">
            {icon}
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">{title}</div>
            <div className="mt-1 text-2xl font-extrabold text-slate-900">
              {value}
            </div>
          </div>
        </div>
        {hint ? <div className="text-xs text-slate-500">{hint}</div> : null}
      </div>
    </div>
  );
}

export function Tabs({ tabs, active, onChange }) {
  return (
    <div className="inline-flex rounded-2xl border bg-white p-1">
      {tabs.map((t) => {
        const isActive = t.value === active;
        return (
          <button
            key={t.value}
            type="button"
            onClick={() => onChange(t.value)}
            className={[
              "rounded-2xl px-4 py-2 text-sm font-semibold transition",
              isActive
                ? "bg-emerald-600 text-white"
                : "text-slate-700 hover:bg-slate-100",
            ].join(" ")}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}