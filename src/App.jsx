import React, { useMemo, useState } from "react";

const cars = [
  {
    id: 1,
    title: "Volkswagen Golf 7",
    tag: "De vânzare",
    year: 2017,
    km: 128000,
    engine: "1.6 TDI",
    transmission: "Manuală",
    price: 9990,
    currency: "€",
    img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "BMW Seria 3",
    tag: "Închiriere",
    year: 2019,
    km: 78500,
    engine: "2.0 Diesel",
    transmission: "Automată",
    price: 55,
    currency: "€/zi",
    img: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Audi A4 B9",
    tag: "De vânzare",
    year: 2018,
    km: 110200,
    engine: "2.0 TDI",
    transmission: "Automată",
    price: 14900,
    currency: "€",
    img: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Dacia Duster",
    tag: "Închiriere",
    year: 2022,
    km: 22300,
    engine: "1.3 TCe",
    transmission: "Manuală",
    price: 39,
    currency: "€/zi",
    img: "https://images.unsplash.com/photo-1621310093246-8428e2ab5b37?q=80&w=1600&auto=format&fit=crop",
  },
];

function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
          {subtitle && <p className="text-muted-foreground mt-2 max-w-2xl">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-black/70 ring-1 ring-black/10">
      {children}
    </span>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-black/10 p-6 shadow-sm bg-white">
      <div className="text-3xl font-semibold">{value}</div>
      <div className="text-sm text-black/60 mt-1">{label}</div>
    </div>
  );
}

function InventoryCard({ car }) {
  return (
    <div className="group rounded-2xl overflow-hidden border border-black/10 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-[16/10] overflow-hidden">
        <img src={car.img} alt={car.title} className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform" />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold tracking-tight">{car.title}</h3>
          <Pill>{car.tag}</Pill>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-black/70">
          <div className="rounded-lg bg-black/5 px-3 py-2">An {car.year}</div>
          <div className="rounded-lg bg-black/5 px-3 py-2">{car.km.toLocaleString()} km</div>
          <div className="rounded-lg bg-black/5 px-3 py-2">{car.engine}</div>
          <div className="rounded-lg bg-black/5 px-3 py-2">{car.transmission}</div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-xl font-semibold">{car.price.toLocaleString()} {car.currency}</div>
          <a href="#contact" className="rounded-xl border border-black/10 bg-black text-white px-4 py-2 text-sm font-medium hover:opacity-95">Solicită ofertă</a>
        </div>
      </div>
    </div>
  );
}

function Inventory() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("Toate");

  const filtered = useMemo(() => {
    return cars.filter((c) => {
      const matchQ = [c.title, c.engine, c.transmission].join(" ").toLowerCase().includes(q.toLowerCase());
      const matchType = type === "Toate" || (type === "De vânzare" && c.tag === "De vânzare") || (type === "Închiriere" && c.tag === "Închiriere");
      return matchQ && matchType;
    });
  }, [q, type]);

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-6">
        <div className="relative w-full md:w-1/2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Caută: model, motorizare, transmisie"
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 pr-10 text-sm outline-none focus:ring-2 focus:ring-black/10"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40">🔎</span>
        </div>
        <div className="flex gap-2">
          {(["Toate", "De vânzare", "Închiriere"]).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`rounded-xl px-4 py-2 text-sm border ${type === t ? "bg-black text-white border-black" : "bg-white border-black/10"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((car) => (
          <InventoryCard key={car.id} car={car} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-black/60 mt-10">Niciun rezultat. Încearcă alți termeni sau contactează-ne pentru ofertă personalizată.</div>
      )}
    </div>
  );
}

function ContactCard({ label, value, href }) {
  const content = (
    <>
      <div className="text-xs uppercase tracking-wide text-black/50">{label}</div>
      <div className="text-base font-medium">{value}</div>
    </>
  );
  return (
    <div className="rounded-2xl border border-black/10 p-5 bg-white shadow-sm">
      {href ? (
        <a className="block hover:opacity-90" href={href} target="_blank" rel="noreferrer">
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
}

function BookingForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    pickup: "",
    dropoff: "",
    car: "",
    message: "",
  });

  function update(key, value) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  function submit(e) {
    e.preventDefault();
    alert(`Mulțumim, ${form.name}! Cererea ta a fost trimisă. Te contactăm în curând.`);
  }

  const inputCls = "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10";
  return (
    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input className={inputCls} placeholder="Nume complet" required value={form.name} onChange={(e) => update("name", e.target.value)} />
      <input className={inputCls} placeholder="Telefon" required value={form.phone} onChange={(e) => update("phone", e.target.value)} />
      <input className={inputCls} placeholder="Email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
      <input className={inputCls} placeholder="Model dorit (ex: Golf 7)" value={form.car} onChange={(e) => update("car", e.target.value)} />
      <input className={inputCls} placeholder="Preluare (data/ora)" type="datetime-local" value={form.pickup} onChange={(e) => update("pickup", e.target.value)} />
      <input className={inputCls} placeholder="Predare (data/ora)" type="datetime-local" value={form.dropoff} onChange={(e) => update("dropoff", e.target.value)} />
      <textarea className={`${inputCls} md:col-span-2 min-h-[120px]`} placeholder="Mesaj (opțional)" value={form.message} onChange={(e) => update("message", e.target.value)} />
      <div className="md:col-span-2 flex items-center gap-3">
        <button type="submit" className="rounded-xl bg-black text-white px-5 py-3 text-sm font-medium hover:opacity-95">Trimite cerere</button>
        <a className="rounded-xl border border-black/10 px-5 py-3 text-sm font-medium hover:bg-black/5" href="https://wa.me/40770343390" target="_blank" rel="noreferrer">Scrie-ne pe WhatsApp</a>
      </div>
    </form>
  );
}

export default function KeedMotorsSite() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-zinc-50 text-zinc-900">
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/80 border-b border-black/10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-black text-white grid place-items-center font-bold">K</div>
            <div>
              <div className="text-sm leading-tight font-semibold">KEED Motors Group</div>
              <div className="text-xs leading-tight text-black/60">Vânzări & Închirieri Auto</div>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#servicii" className="hover:opacity-80">Servicii</a>
            <a href="#flota" className="hover:opacity-80">Stoc / Flotă</a>
            <a href="#rezervari" className="hover:opacity-80">Rezervări</a>
            <a href="#despre" className="hover:opacity-80">Despre</a>
            <a href="#contact" className="hover:opacity-80">Contact</a>
          </nav>
          <a href="#rezervari" className="rounded-xl bg-black text-white px-4 py-2 text-sm font-medium hover:opacity-95">Solicită ofertă</a>
        </div>
      </header>

      <section id="hero" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            alt="Hero car"
            className="h-full w-full object-cover opacity-70"
            src="https://images.unsplash.com/photo-1542228262-3d663b306a55?q=80&w=2400&auto=format&fit=crop"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/50 to-white" />
        </div>
        <div className="max-w-6xl mx-auto px-4 py-24 md:py-36">
          <Pill>Multimarcă • Transparent • Rapid</Pill>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight">Mașina potrivită, la momentul potrivit.</h1>
          <p className="mt-4 max-w-2xl text-lg text-black/70">
            KEED Motors Group oferă <span className="font-medium">vânzări auto</span> verificate și <span className="font-medium">închirieri</span> flexibile.
            Consultanță, finanțare și buy-back, totul într-un singur loc.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a href="#flota" className="rounded-xl bg-black text-white px-6 py-3 text-sm font-medium hover:opacity-95 text-center">Vezi stocul</a>
            <a href="#rezervari" className="rounded-xl border border-black/10 bg-white px-6 py-3 text-sm font-medium hover:bg-black/5 text-center">Rezervă o mașină</a>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 -mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="Clienți mulțumiți" value="1500+" />
        <Stat label="Autoturisme în stoc/flotă" value="80+" />
        <Stat label="Ani de experiență" value="8" />
        <Stat label="Timp mediu de livrare" value="24-48h" />
      </div>

      <Section id="servicii" title="Servicii" subtitle="Soluții complete pentru mobilitate – pentru persoane fizice și companii.">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[{
            title: "Vânzări Auto",
            desc: "Autoturisme verificate tehnic, istoric transparent, garanție opțională.",
            items: ["Buy-back & trade-in", "Finanțare rapidă", "Consiliere la achiziție"],
          }, {
            title: "Închirieri Auto",
            desc: "Flotă variată, de la compacte la SUV, cu asigurare & asistență rutieră.",
            items: ["Fără garanție pentru firme eligibile", "Livrare/Preluare", "Contract pe termen scurt/lung"],
          }, {
            title: "Servicii pentru companii",
            desc: "Rent-a-car pe termen lung, management flotă, oferte personalizate.",
            items: ["Facturare lunară", "Asistență prioritară", "Discount pentru volum"],
          }].map((s) => (
            <div key={s.title} className="rounded-2xl border border-black/10 p-6 bg-white shadow-sm">
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="text-black/70 mt-2">{s.desc}</p>
              <ul className="mt-4 space-y-2 text-sm text-black/80 list-disc list-inside">
                {s.items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section id="flota" title="Stoc & Flotă" subtitle="Selectăm atent mașinile – verificare tehnică, istoric clar și preț corect.">
        <Inventory />
      </Section>

      <Section id="rezervari" title="Rezervări & Oferte" subtitle="Completează formularul și revenim rapid cu disponibilitate și ofertă.">
        <BookingForm />
      </Section>

      <Section id="despre" title="Despre KEED Motors Group" subtitle="Partenerul tău de încredere pentru vânzare și închiriere auto.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="rounded-2xl overflow-hidden border border-black/10">
            <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000&auto=format&fit=crop" alt="Showroom" className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Transparență. Rapiditate. Valoare.</h3>
            <p className="text-black/70 mt-3">
              Suntem o echipă cu experiență în domeniul auto, specializați în <span className="font-medium">vânzări de autoturisme rulate</span> și
              <span className="font-medium"> servicii de închiriere</span>. Oferim consultanță personalizată, finanțare, buy-back și soluții pentru
              companii. Test drive disponibil pentru modelele din stoc.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-black/5 p-4 text-sm">Inspecție tehnică detaliată</div>
              <div className="rounded-xl bg-black/5 p-4 text-sm">Istoric service & kilometri</div>
              <div className="rounded-xl bg-black/5 p-4 text-sm">Finanțare în 24h (eligibil)</div>
              <div className="rounded-xl bg-black/5 p-4 text-sm">Livrare națională</div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="contact" title="Contact" subtitle="Suntem aici pentru întrebări, oferte și rezervări.">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-3">
            <ContactCard label="Telefon" value="0770343390" href="tel:0770343390" />
            <ContactCard label="Email" value="valentingroza14@gmail.com" href="mailto:valentingroza14@gmail.com" />
            <ContactCard label="Adresă" value="Arad, România" />
            <ContactCard label="Program" value="Luni – Vineri: 09:00 – 18:00 • Sâmbătă: 10:00 – 14:00" />
            <div className="rounded-2xl border border-black/10 p-4 bg-white">
              <div className="text-sm font-medium mb-2">Social</div>
              <div className="flex gap-3 text-sm">
                <a className="rounded-lg border border-black/10 px-3 py-2 hover:bg-black/5" href="#" target="_blank" rel="noreferrer">Facebook</a>
                <a className="rounded-lg border border-black/10 px-3 py-2 hover:bg-black/5" href="#" target="_blank" rel="noreferrer">Instagram</a>
                <a className="rounded-lg border border-black/10 px-3 py-2 hover:bg-black/5" href="#" target="_blank" rel="noreferrer">TikTok</a>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-black/10 bg-white">
            <iframe
              title="Harta KEED Motors Group"
              src="https://www.google.com/maps?q=Arad%2C%20Rom%C3%A2nia&output=embed"
              className="w-full h-[360px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </Section>

      <footer className="border-t border-black/10 py-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-black/60">
          <div>© {new Date().getFullYear()} KEED Motors Group S.R.L. • Toate drepturile rezervate</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:opacity-80">Termeni</a>
            <a href="#" className="hover:opacity-80">Confidențialitate</a>
            <a href="#rezervari" className="rounded-lg border border-black/10 px-3 py-2 hover:bg-black/5">Cere ofertă</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
