import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Stories from '@/components/sections/Stories';
import Timeline from '@/components/sections/Timeline';
import Manuals from '@/components/sections/Manuals';
import ReflectionTool from '@/components/sections/ReflectionTool';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <Stories />
        <Timeline />
        <Manuals />
        <ReflectionTool />
      </main>
      <Footer />
    </div>
  );
}
