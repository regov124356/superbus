import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { News } from '../components/News';
import { AboutFull } from '../components/AboutFull';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

export function HomePage() {
  return (
    <div className="size-full">
      <Header />
      <main>
        <Hero />
        <News />
        <AboutFull />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}