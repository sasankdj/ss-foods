import { useState, useEffect, useRef, useCallback } from "react";

// =========================================================================
// JUNCTION — Food Court homepage (v2: animated, interactive, 3D)
// Single self-contained component. Assumes Tailwind CSS is configured in
// the host project. No external deps beyond React — all motion is done
// with CSS keyframes + vanilla mouse/IntersectionObserver handling, so
// this drops into any existing React app with zero extra installs.
// =========================================================================

const CATEGORIES = [
  { id: "starters", label: "Starters", emoji: "🥟", blurb: "Small plates, big flavor" },
  { id: "mains", label: "Main Course", emoji: "🍛", blurb: "The heart of the counter" },
  { id: "tandoor", label: "Tandoor & Grill", emoji: "🍢", blurb: "Straight off the fire" },
  { id: "chinese", label: "Indo-Chinese", emoji: "🥡", blurb: "Wok-tossed favorites" },
  { id: "south", label: "South Indian", emoji: "🫓", blurb: "Dosa, idli & more" },
  { id: "desserts", label: "Desserts", emoji: "🍮", blurb: "Sweet finish" },
  { id: "beverages", label: "Beverages", emoji: "🥤", blurb: "Shakes, juices, chai" },
];

const MENU = [
  { id: 1, name: "Paneer Tikka", cat: "starters", price: 180, veg: true, stall: "Punjab Grill Co." },
  { id: 2, name: "Chicken 65", cat: "starters", price: 220, veg: false, stall: "South Spice" },
  { id: 3, name: "Butter Chicken", cat: "mains", price: 260, veg: false, stall: "Punjab Grill Co." },
  { id: 4, name: "Dal Makhani", cat: "mains", price: 190, veg: true, stall: "Punjab Grill Co." },
  { id: 5, name: "Tandoori Chicken (Half)", cat: "tandoor", price: 280, veg: false, stall: "Fire & Smoke" },
  { id: 6, name: "Seekh Kebab", cat: "tandoor", price: 240, veg: false, stall: "Fire & Smoke" },
  { id: 7, name: "Veg Manchurian", cat: "chinese", price: 170, veg: true, stall: "Wok This Way" },
  { id: 8, name: "Hakka Noodles", cat: "chinese", price: 160, veg: true, stall: "Wok This Way" },
  { id: 9, name: "Masala Dosa", cat: "south", price: 120, veg: true, stall: "South Spice" },
  { id: 10, name: "Idli Sambar (4pc)", cat: "south", price: 90, veg: true, stall: "South Spice" },
  { id: 11, name: "Gulab Jamun (2pc)", cat: "desserts", price: 70, veg: true, stall: "Sweet Corner" },
  { id: 12, name: "Cold Coffee", cat: "beverages", price: 110, veg: true, stall: "Sweet Corner" },
];

const TABLES = [
  { id: "T1", seats: 2, status: "available" },
  { id: "T2", seats: 4, status: "available" },
  { id: "T3", seats: 4, status: "reserved" },
  { id: "T4", seats: 6, status: "available" },
  { id: "T5", seats: 2, status: "reserved" },
  { id: "T6", seats: 4, status: "available" },
  { id: "T7", seats: 8, status: "available" },
  { id: "T8", seats: 4, status: "reserved" },
];

const ORDER_MODES = [
  { id: "dinein", label: "Dine In", desc: "Order from your table", emoji: "🍽️" },
  { id: "parcel", label: "Parcel", desc: "Pack it up to go", emoji: "🥡" },
  { id: "online", label: "Online Order", desc: "Delivered to your door", emoji: "🛵" },
];

// ---------------------------------------------------------------- hooks --

function useCountUp(target, duration = 1200, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return value;
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

// ------------------------------------------------------------ TiltCard --

function TiltCard({ children, className = "", strength = 10, glow = true }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  const onMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * strength;
      const rotateX = (0.5 - py) * strength;
      setStyle({
        transform: `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`,
        "--glow-x": `${px * 100}%`,
        "--glow-y": `${py * 100}%`,
        "--glow-o": glow ? 1 : 0,
      });
    },
    [strength, glow]
  );

  const onLeave = useCallback(() => {
    setStyle({
      transform: "perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
      "--glow-o": 0,
    });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transition: "transform 300ms cubic-bezier(.2,.8,.2,1)", transformStyle: "preserve-3d", ...style }}
      className={`tilt-card relative ${className}`}
    >
      {children}
    </div>
  );
}

// -------------------------------------------------------------- Icons --

function IconArrow({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconVeg({ filled }) {
  return (
    <span className={`inline-flex w-3.5 h-3.5 border-2 rounded-sm items-center justify-center ${filled ? "border-emerald-500" : "border-rose-500"}`}>
      <span className={`block w-1.5 h-1.5 rounded-full ${filled ? "bg-emerald-500" : "bg-rose-500"}`} />
    </span>
  );
}

// ------------------------------------------------------------- Sections --

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out`}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [orderMode, setOrderMode] = useState("dinein");
  const [activeCategory, setActiveCategory] = useState("starters");
  const [selectedTable, setSelectedTable] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [bump, setBump] = useState(false);
  const [statsRef, statsVisible] = useReveal();
  const heroRef = useRef(null);
  const [heroTilt, setHeroTilt] = useState({ x: 0, y: 0 });

  const dishCount = useCountUp(48, 1400, statsVisible);
  const stallCount = useCountUp(5, 1000, statsVisible);
  const ratingTenths = useCountUp(47, 1200, statsVisible);

  const visibleItems = MENU.filter((item) => item.cat === activeCategory);

  const addToCart = () => {
    setCartCount((c) => c + 1);
    setBump(true);
    setTimeout(() => setBump(false), 350);
  };

  const onHeroMove = (e) => {
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setHeroTilt({ x, y });
  };

  return (
    <div className="min-h-screen bg-[#FBF7F0] text-[#1D1610] font-sans overflow-x-hidden">
      <style>{`
        @keyframes floatSlow { 0%,100% { transform: translate(0,0) rotate(0deg); } 50% { transform: translate(14px,-18px) rotate(8deg); } }
        @keyframes floatSlower { 0%,100% { transform: translate(0,0) rotate(0deg); } 50% { transform: translate(-16px,16px) rotate(-6deg); } }
        @keyframes blobMove { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(30px,-20px) scale(1.08); } 66% { transform: translate(-20px,20px) scale(0.95); } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes pulseGlow { 0%,100% { box-shadow: 0 0 0 0 rgba(255,122,61,0.45); } 50% { box-shadow: 0 0 0 10px rgba(255,122,61,0); } }
        @keyframes bump { 0% { transform: scale(1); } 40% { transform: scale(1.35); } 100% { transform: scale(1); } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .cart-bump { animation: bump 350ms ease; }
        .glow-hover::before {
          content: "";
          position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
          background: radial-gradient(160px circle at var(--glow-x,50%) var(--glow-y,50%), rgba(255,178,56,0.35), transparent 70%);
          opacity: var(--glow-o, 0); transition: opacity 300ms ease;
        }
        .text-gradient {
          background: linear-gradient(90deg, #FF7A3D, #FFB238 45%, #FF7A3D);
          background-size: 200% auto;
          -webkit-background-clip: text; background-clip: text; color: transparent;
          animation: shimmer 5s linear infinite;
        }
        .table-available { animation: pulseGlow 2.6s ease-in-out infinite; }
        .marquee-track { animation: marquee 22s linear infinite; }
      `}</style>

   
      {/* ---------------- Hero ---------------- */}
      <section
        ref={heroRef}
        onMouseMove={onHeroMove}
        className="relative max-w-6xl mx-auto px-6 pt-20 pb-14 overflow-hidden"
      >
        {/* animated background blobs */}
        <div
          className="pointer-events-none absolute -top-24 -right-16 w-80 h-80 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, #FF7A3D, transparent 70%)", animation: "blobMove 9s ease-in-out infinite" }}
        />
        <div
          className="pointer-events-none absolute top-40 -left-24 w-72 h-72 rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(circle, #FFB238, transparent 70%)", animation: "blobMove 11s ease-in-out infinite reverse" }}
        />
        {/* floating food emoji */}
        <span className="absolute top-8 right-24 text-4xl select-none" style={{ animation: "floatSlow 6s ease-in-out infinite" }}>🍜</span>
        <span className="absolute top-52 right-6 text-3xl select-none hidden sm:block" style={{ animation: "floatSlower 7s ease-in-out infinite" }}>🍢</span>
        <span className="absolute bottom-6 left-8 text-3xl select-none hidden sm:block" style={{ animation: "floatSlow 8s ease-in-out infinite" }}>🥗</span>

        <div
          className="grid md:grid-cols-5 gap-10 items-end relative"
          style={{
            transform: `rotateX(${heroTilt.y * -4}deg) rotateY(${heroTilt.x * 4}deg)`,
            transformStyle: "preserve-3d",
            transition: "transform 200ms ease-out",
          }}
        >
          <div className="md:col-span-3">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
              Seven kitchens.
              <br />
              <span className="text-gradient">One table.</span>
            </h1>
            <p className="mt-5 text-lg text-[#1D1610]/70 max-w-md">
              Punjabi tandoor, South Indian tiffins, Indo-Chinese wok, and more —
              order from every stall in the court without leaving your seat.
            </p>
          </div>
          <div className="md:col-span-2 text-sm text-[#1D1610]/60 md:text-right">
            <p>Open daily, 11:00 AM – 11:00 PM</p>
            <p>Level 2, City Central Mall</p>
          </div>
        </div>

        {/* live stats */}
        <div ref={statsRef} className="mt-10 flex flex-wrap gap-x-10 gap-y-3 text-sm">
          <div><span className="text-2xl font-extrabold text-[#FF7A3D]">{dishCount}+</span> <span className="text-[#1D1610]/60">dishes</span></div>
          <div><span className="text-2xl font-extrabold text-[#FF7A3D]">{stallCount}</span> <span className="text-[#1D1610]/60">stalls</span></div>
          <div><span className="text-2xl font-extrabold text-[#FF7A3D]">{(ratingTenths / 10).toFixed(1)}★</span> <span className="text-[#1D1610]/60">avg rating</span></div>
        </div>

        {/* Order mode selector */}
        <div id="order" className="mt-10 grid sm:grid-cols-3 gap-5">
          {ORDER_MODES.map((mode, i) => {
            const active = orderMode === mode.id;
            return (
              <Reveal key={mode.id} delay={i * 80}>
                <TiltCard strength={12}>
                  <button
                    onClick={() => setOrderMode(mode.id)}
                    className={`glow-hover relative w-full text-left rounded-2xl border px-6 py-5 overflow-hidden transition-colors duration-300 ${
                      active
                        ? "bg-[#1D1610] border-[#1D1610] text-[#FBF7F0] shadow-xl shadow-[#1D1610]/20"
                        : "bg-white border-[#1D1610]/10 hover:border-[#FF7A3D]/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{mode.emoji}</span>
                      <IconArrow className={`w-4 h-4 transition-transform ${active ? "text-[#FBF7F0] translate-x-0" : "text-[#1D1610]/40 group-hover:translate-x-1"}`} />
                    </div>
                    <div className="font-semibold text-lg mt-3">{mode.label}</div>
                    <p className={`mt-1 text-sm ${active ? "text-[#FBF7F0]/70" : "text-[#1D1610]/60"}`}>{mode.desc}</p>
                  </button>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ---------------- Categories ---------------- */}
      <section id="menu" className="max-w-6xl mx-auto px-6 py-14 border-t border-[#1D1610]/10">
        <Reveal>
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-3xl font-extrabold">Categories</h2>
            <span className="text-sm text-[#1D1610]/50">{MENU.length} dishes across the court</span>
          </div>
        </Reveal>

        <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6" style={{ scrollbarWidth: "none" }}>
          {CATEGORIES.map((cat, i) => {
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 rounded-xl px-5 py-3 text-left border transition-all duration-300 transform hover:-translate-y-0.5 ${
                  active
                    ? "bg-gradient-to-br from-[#FF7A3D] to-[#FFB238] border-transparent text-white shadow-lg shadow-[#FF7A3D]/30 scale-105"
                    : "bg-white border-[#1D1610]/10 hover:border-[#FF7A3D]/40"
                }`}
              >
                <div className="text-xl mb-1">{cat.emoji}</div>
                <div className="font-semibold text-sm whitespace-nowrap">{cat.label}</div>
                <div className={`text-xs ${active ? "text-white/80" : "text-[#1D1610]/50"}`}>{cat.blurb}</div>
              </button>
            );
          })}
        </div>

        {/* Menu items for active category */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleItems.map((item, i) => (
            <Reveal key={item.id} delay={i * 60}>
              <TiltCard strength={8}>
                <div className="glow-hover relative rounded-2xl border border-[#1D1610]/10 bg-white p-5 flex flex-col gap-3 overflow-hidden">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <IconVeg filled={item.veg} />
                        <h3 className="font-semibold">{item.name}</h3>
                      </div>
                      <p className="text-xs text-[#1D1610]/50 mt-1">{item.stall}</p>
                    </div>
                    <span className="font-bold text-[#FF7A3D] whitespace-nowrap">₹{item.price}</span>
                  </div>
                  <button
                    onClick={addToCart}
                    className="mt-auto text-sm font-semibold border border-[#1D1610]/15 rounded-lg py-2 hover:bg-[#1D1610] hover:text-white transition-colors duration-300"
                  >
                    Add to order
                  </button>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- Table booking ---------------- */}
      <section id="bookatable" className="relative bg-[#1D1610] text-[#FBF7F0] overflow-hidden">
        <div
          className="pointer-events-none absolute top-0 left-1/3 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #FF7A3D, transparent 70%)", animation: "blobMove 10s ease-in-out infinite" }}
        />
        <div className="max-w-6xl mx-auto px-6 py-16 relative">
          <Reveal>
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="text-3xl font-extrabold">Book a table</h2>
              <span className="text-sm text-[#FBF7F0]/50">
                {TABLES.filter((t) => t.status === "available").length} of {TABLES.length} free right now
              </span>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {TABLES.map((table, i) => {
              const isSelected = selectedTable === table.id;
              const isAvailable = table.status === "available";
              return (
                <Reveal key={table.id} delay={i * 40}>
                  <TiltCard strength={isAvailable ? 14 : 0} glow={isAvailable}>
                    <button
                      disabled={!isAvailable}
                      onClick={() => setSelectedTable(table.id)}
                      className={`glow-hover relative w-full rounded-xl px-4 py-6 text-left border transition-colors duration-300 ${
                        !isAvailable
                          ? "border-white/10 bg-white/[0.03] text-white/30 cursor-not-allowed"
                          : isSelected
                          ? "border-[#FF7A3D] bg-gradient-to-br from-[#FF7A3D] to-[#FFB238] text-white"
                          : "border-white/15 hover:border-[#FF7A3D]/60 table-available"
                      }`}
                    >
                      <div className="font-bold text-lg">{table.id}</div>
                      <div className="text-xs mt-1 opacity-75">{table.seats} seats</div>
                      <div className="text-xs mt-2 font-medium">
                        {isAvailable ? (isSelected ? "Selected" : "Available") : "Reserved"}
                      </div>
                    </button>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
          {selectedTable && (
            <div className="mt-6 flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-6 py-4 animate-[fadeInUp_0.4s_ease]">
              <span className="text-sm">
                Table <strong>{selectedTable}</strong> selected — menu at this table opens once you confirm.
              </span>
              <button className="flex items-center gap-2 bg-[#FBF7F0] text-[#1D1610] text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-white transition-colors">
                Confirm booking <IconArrow />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ---------------- Stalls marquee ---------------- */}
      <section id="stalls" className="py-14 overflow-hidden">
        <Reveal className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold mb-6">Stalls in the court</h2>
        </Reveal>
        <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {["Punjab Grill Co.", "Fire & Smoke", "Wok This Way", "South Spice", "Sweet Corner"].map((stall, i) => (
            <Reveal key={stall} delay={i * 70}>
              <TiltCard strength={10}>
                <div className="glow-hover relative rounded-2xl border border-[#1D1610]/10 bg-white p-5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF7A3D] to-[#FFB238] flex items-center justify-center text-white font-bold text-sm mb-3">
                    {stall.charAt(0)}
                  </div>
                  <h3 className="font-semibold text-sm">{stall}</h3>
                  <p className="text-xs text-[#1D1610]/50 mt-1">
                    {MENU.filter((m) => m.stall === stall).length} items on the menu
                  </p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- Footer ---------------- */}
      <footer className="border-t border-[#1D1610]/10">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-[#1D1610]/60">
          <div>
            <span className="font-bold text-[#1D1610]">Junction Food Court</span> — Level 2, City Central Mall
          </div>
          <div className="flex gap-6">
            <span>Open 11:00 AM – 11:00 PM</span>
            <span>+91 98765 43210</span>
          </div>
        </div>
      </footer>
    </div>
  );
}