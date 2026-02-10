export default function TrustBadges({ variant = "default" }) {
  const items = [
    { title: "Verified Brands.", icon: "✓" },
    { title: "Secure Payments.", icon: "🔒" },
    { title: "Fast Delivery.", icon: "🚚" },
  ];

  const isHero = variant === "hero";

  return (
    <section className={isHero ? "mt-6" : "bg-white border-b border-gray-100 py-6"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {items.map((item) => (
            <div
              key={item.title}
              className={
                isHero
                  ? "flex items-center gap-3 px-5 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20"
                  : "flex items-center gap-3 px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100"
              }
            >
              <div
                className={
                  isHero
                    ? "w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white flex-shrink-0 font-black"
                    : "w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-900 flex-shrink-0 font-black"
                }
              >
                {item.icon}
              </div>

              <span className={isHero ? "text-white font-bold text-sm" : "text-gray-900 font-black text-sm"}>
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
