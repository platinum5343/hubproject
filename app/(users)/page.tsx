// HOME PAGE — SSR + CSR
// ──────────────────────
// SSR: `force-dynamic` prevents static generation. The page performs a
//      client-side auth check on load and redirects to /delivery if the
//      user is already logged in. This must not be pre-rendered as a static
//      file because the redirect depends on browser-side localStorage.
//
// CSR: All section components (Hero, Logistics, etc.) are "use client" and
//      render interactively in the browser after hydration.
export const dynamic = "force-dynamic";

import Hero from "./components/home/hero/Hero";
import Logistics from "./components/home/logistics/Logistics";
import Services from "./components/home/services/Services";
import OurJob from "./components/home/our-job/OurJob";
import Faq from "./components/home/Faq";

export default function Home() {
  return (
    <div>
      <Hero />
      <Logistics />
      <Services />
      <OurJob />
      <Faq />
    </div>
  );
}

