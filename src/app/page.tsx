import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Help from '@/components/sections/Help';
import Stories from '@/components/sections/Stories';
import Timeline from '@/components/sections/Timeline';
import Services from '@/components/sections/Services';
import GoodNews from '@/components/sections/GoodNews';
import Manuals from '@/components/sections/Manuals';
import Concierge from '@/components/sections/Concierge';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Help />
        <Services />
        <Concierge />
        <Stories />
        <Timeline />
        <Manuals />
        <GoodNews />
      </main>
      <Footer />
    </div>
  );
}
