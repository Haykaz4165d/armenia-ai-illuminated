import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import hero from "@/assets/hero.jpg";
import manuscript from "@/assets/manuscript.jpg";
import computer from "@/assets/computer.jpg";
import shirakatsi from "@/assets/shirakatsi.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Հայոց պատմությունը և արհեստական բանականությունը" },
      { name: "description", content: "Պրեզենտացիա՝ Մաշտոցից մինչև արհեստական բանականություն. հայ գիտական մտքի ճանապարհը։" },
      { property: "og:title", content: "Հայոց պատմությունը և արհեստական բանականությունը" },
      { property: "og:description", content: "Մաշտոցից մինչև արհեստական բանականություն" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Noto+Sans+Armenian:wght@400;600&family=Noto+Serif+Armenian:wght@600;700&display=swap" },
    ],
  }),
  component: Deck,
});

function ImageSlide({ img, kicker, title, children }: { img: string; kicker: string; title: string; children: ReactNode }) {
  return (
    <>
      <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="slide-overlay absolute inset-0" />
      <div className="relative flex h-full max-w-[1000px] flex-col justify-center gap-8 px-[120px]">
        <div className="slide-kicker">{kicker}</div>
        <h2 className="slide-title">{title}</h2>
        {children}
      </div>
    </>
  );
}

const slides: ReactNode[] = [
  <>
    <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
    <div className="slide-overlay absolute inset-0" />
    <div className="relative flex h-full max-w-[1100px] flex-col justify-center gap-10 px-[120px]">
      <div className="slide-kicker">Պատմություն · Գիտություն · Ապագա</div>
      <h1 className="slide-title-lg">Հայոց պատմությունը և արհեստական բանականությունը</h1>
      <p className="slide-body">Մաշտոցի տառերից մինչև նեյրոնային ցանցեր․ ինչպես է հայ միտքը դարեր շարունակ կառուցել տեղեկատվության և տրամաբանության համակարգեր։</p>
    </div>
  </>,
  <ImageSlide img={manuscript} kicker="405 թ." title="Այբուբենը՝ առաջին «կոդը»">
    <p className="slide-body">Մեսրոպ Մաշտոցը ստեղծեց 36 տառից բաղկացած հայոց այբուբենը։ Յուրաքանչյուր տառ ուներ նաև թվային արժեք․ սա տեղեկատվության կոդավորման համակարգ էր։</p>
    <p className="slide-body">Արհեստական բանականությունն այսօր նույնպես աշխատում է կոդավորված նշաններով՝ տառերը վերածելով թվերի (տոկենների)։</p>
  </ImageSlide>,
  <ImageSlide img={shirakatsi} kicker="VII դար" title="Անանիա Շիրակացի">
    <p className="slide-body">Մաթեմատիկոս, աստղագետ և աշխարհագրագետ։ Նրա թվաբանական խնդրագիրքը աշխարհի հնագույն պահպանված դասագրքերից է։</p>
    <p className="slide-body">Ալգորիթմական մտածողությունը՝ խնդիրը քայլերով լուծելը, արհեստական բանականության հիմքն է։</p>
  </ImageSlide>,
  <ImageSlide img={manuscript} kicker="Մատենադարան" title="Հիշողությունը թվային դարաշրջանում">
    <div className="flex gap-12">
      <div><div className="slide-stat">~23 000</div><p className="slide-body">ձեռագիր և պատառիկ</p></div>
    </div>
    <p className="slide-body">Արհեստական բանականությունը օգնում է թվայնացնել ձեռագրերը, ճանաչել հին գրչության տառերը (OCR) և վերականգնել վնասված էջերը։</p>
  </ImageSlide>,
  <ImageSlide img={computer} kicker="1956 թ." title="Երևանը՝ հաշվողական տեխնիկայի կենտրոն">
    <p className="slide-body">Ակադեմիկոս Սերգեյ Մերգելյանի գլխավորությամբ հիմնադրվեց Երևանի մաթեմատիկական մեքենաների գիտահետազոտական ինստիտուտը։</p>
    <p className="slide-body">Այստեղ ստեղծվեցին «Հրազդան» և «Նաիրի» համակարգիչները, որոնք օգտագործվում էին ողջ ԽՍՀՄ-ում։</p>
  </ImageSlide>,
  <div className="flex h-full flex-col justify-center gap-14 px-[120px]">
    <div className="slide-kicker">Այսօր</div>
    <h2 className="slide-title">Ժամանակակից Հայաստանը և AI-ը</h2>
    <div className="grid grid-cols-3 gap-10">
      {[
        ["Կրթություն", "«Թումո» ստեղծարար տեխնոլոգիաների կենտրոնը (2011) դեռահասներին սովորեցնում է ծրագրավորում և մեքենայական ուսուցում։"],
        ["Ընկերություններ", "Հայաստանում հիմնադրված Picsart-ը AI գործիքներով ծառայում է միլիոնավոր օգտատերերի աշխարհով մեկ։"],
        ["Հայերենը AI-ում", "Հայերեն լեզվական մոդելներ, խոսքի ճանաչում և մեքենայական թարգմանություն՝ լեզվի թվային ապագայի համար։"],
      ].map(([t, d]) => (
        <div key={t} className="slide-card">
          <h3 className="slide-kicker mb-5">{t}</h3>
          <p className="slide-body">{d}</p>
        </div>
      ))}
    </div>
  </div>,
  <ImageSlide img={hero} kicker="Ժառանգության պահպանում" title="Ինչպես է AI-ը ծառայում պատմությանը">
    <ul className="slide-body flex list-none flex-col gap-5">
      <li>◆ Գրաբար տեքստերի թարգմանություն և վերլուծություն</li>
      <li>◆ Խաչքարերի և հուշարձանների 3D վերակառուցում</li>
      <li>◆ Հին լուսանկարների և ձեռագրերի վերականգնում</li>
      <li>◆ Արխիվային տվյալների արագ որոնում</li>
    </ul>
  </ImageSlide>,
  <div className="flex h-full flex-col items-start justify-center gap-10 px-[120px]">
    <div className="slide-kicker">Եզրակացություն</div>
    <h2 className="slide-title-lg max-w-[1500px]">Անցյալը՝ որպես տվյալ, ապագան՝ որպես հնարավորություն</h2>
    <p className="slide-body max-w-[1100px]">Մաշտոցից մինչև Մերգելյան, Մատենադարանից մինչև նեյրոնային ցանցեր․ հայ միտքը միշտ եղել է գիտելիքի պահապան և նորարար։</p>
  </div>,
];

function Deck() {
  const [i, setI] = useState(0);
  const [scale, setScale] = useState(0.2);
  const box = useRef<HTMLDivElement>(null);
  const touch = useRef(0);
  const go = (d: number) => setI((v) => Math.max(0, Math.min(slides.length - 1, v + d)));

  useEffect(() => {
    const el = box.current!;
    const ro = new ResizeObserver(() => setScale(Math.min(el.clientWidth / 1920, el.clientHeight / 1080)));
    ro.observe(el);
    const key = (e: KeyboardEvent) => {
      if (["ArrowRight", " ", "PageDown"].includes(e.key)) go(1);
      if (["ArrowLeft", "PageUp"].includes(e.key)) go(-1);
    };
    window.addEventListener("keydown", key);
    return () => { ro.disconnect(); window.removeEventListener("keydown", key); };
  }, []);

  return (
    <div className="deck-root flex h-[100dvh] flex-col">
      <div
        ref={box}
        className="relative flex-1 overflow-hidden"
        onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
        onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - touch.current; if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); }}
      >
        <div className="slide-content" style={{ transform: `scale(${scale})` }}>{slides[i]}</div>
      </div>
      <div className="flex items-center justify-center gap-4 p-3 text-sm">
        <button className="deck-btn rounded-full px-4 py-2" onClick={() => go(-1)} aria-label="Նախորդ">←</button>
        <span className="text-deck-ink tabular-nums">{i + 1} / {slides.length}</span>
        <button className="deck-btn rounded-full px-4 py-2" onClick={() => go(1)} aria-label="Հաջորդ">→</button>
        <button className="deck-btn rounded-full px-4 py-2" onClick={() => document.documentElement.requestFullscreen?.()}>Ամբողջ էկրան</button>
      </div>
    </div>
  );
}
