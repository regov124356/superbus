import { useParams, useNavigate } from 'react-router';
import { Calendar, Megaphone, ArrowLeft } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const newsDetails = [
  {
    id: 1,
    icon: Calendar,
    date: '02.01.2026',
    title: 'Zmiana rozkładu jazdy od 02.01.2026',
    badge: 'Ważne',
    badgeColor: 'bg-red-100 text-red-700',
    fullContent: `
      <h3 class="text-2xl font-bold mb-4">Zmiana rozkładu jazdy od 02.01.2026</h3>
      <p class="mb-4">Szanowni Państwo,</p>
      <p class="mb-4">Informujemy, że od dnia 2 stycznia 2026 roku wprowadzamy zmiany w rozkładzie jazdy naszych autobusów.</p>
      
      <h4 class="text-xl font-semibold mb-3 mt-6">Główne zmiany:</h4>
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>Wcześniejsze kursy poranne - pierwszy kurs o 5:30 zamiast 6:00</li>
        <li>Dodatkowe połączenia w godzinach szczytu (7:00-9:00 oraz 15:00-18:00)</li>
        <li>Nowe przystanki na trasie Kraków - Liszki</li>
        <li>Zoptymalizowane czasy przejazdu</li>
      </ul>
      
      <p class="mb-4">Szczegółowy rozkład jazdy dostępny jest w naszym biurze oraz na stronie internetowej w zakładce "Rozkłady".</p>
      
      <p class="mb-4">W razie pytań prosimy o kontakt:</p>
      <p class="mb-2"><strong>Telefon:</strong> +48 601 481 319</p>
      <p class="mb-2"><strong>Email:</strong> info@superbus.com.pl</p>
      
      <p class="mt-6">Przepraszamy za wszelkie niedogodności i dziękujemy za zrozumienie.</p>
    `,
  },
  {
    id: 2,
    icon: Calendar,
    date: '24-26.12.2025',
    title: 'Boże Narodzenie 2025',
    badge: 'Komunikat',
    badgeColor: 'bg-orange-100 text-orange-700',
    fullContent: `
      <h3 class="text-2xl font-bold mb-4">Kursowanie autobusów w okresie świątecznym</h3>
      <p class="mb-4">Szanowni Pasażerowie,</p>
      <p class="mb-4">Informujemy o zmianach w kursowaniu autobusów w okresie świąt Bożego Narodzenia 2025:</p>
      
      <h4 class="text-xl font-semibold mb-3 mt-6">Autobusy NIE będą kursować:</h4>
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li><strong>24 grudnia 2025 (Wigilia)</strong> - autobusy nie kursują</li>
        <li><strong>25 grudnia 2025 (Boże Narodzenie)</strong> - autobusy nie kursują</li>
        <li><strong>26 grudnia 2025 (Drugi dzień świąt)</strong> - autobusy nie kursują</li>
      </ul>
      
      <p class="mb-4"><strong>27 grudnia 2025 (piątek)</strong> - wznowienie normalnego rozkładu jazdy</p>
      
      <h4 class="text-xl font-semibold mb-3 mt-6">Godziny otwarcia biura:</h4>
      <p class="mb-4">Biuro SuperBus będzie nieczynne w dniach 24-26 grudnia 2025.</p>
      <p class="mb-4">Wznowienie pracy biura: 27 grudnia 2025, godz. 8:00-14:00</p>
      
      <p class="mt-6">Życzymy wszystkim Pasażerom spokojnych i radosnych Świąt Bożego Narodzenia!</p>
      <p class="mt-4"><em>Zespół SuperBus</em></p>
    `,
  },
  {
    id: 3,
    icon: Megaphone,
    date: '15.02.2026',
    title: 'Objazd w Rybnej',
    badge: 'Komunikat',
    badgeColor: 'bg-orange-100 text-orange-700',
    fullContent: `
      <h3 class="text-2xl font-bold mb-4">Zmiana organizacji ruchu - objazd przez Rybną</h3>
      <p class="mb-4">Szanowni Pasażerowie,</p>
      <p class="mb-4">Informujemy, że w związku ze zmianą organizacji ruchu na czas remontu przepustu w miejscowości Rybna, nasze autobusy będą kursować objazdem.</p>
      
      <h4 class="text-xl font-semibold mb-3 mt-6">Szczegóły zmiany trasy:</h4>
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>Objazd będzie przebiegać przez <strong>ul. Malownicza</strong></li>
        <li>Wszystkie przystanki na trasie będą obsługiwane</li>
        <li>Czas przejazdu może ulec wydłużeniu o około 5-10 minut</li>
        <li>Remont potrwa do końca marca 2026</li>
      </ul>
      
      <h4 class="text-xl font-semibold mb-3 mt-6">Dotyczy następujących linii:</h4>
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>Linia Kraków - Liszki - Czułów</li>
        <li>Linia Kraków - Rybna</li>
      </ul>
      
      <p class="mb-4">Prosimy pasażerów o uwzględnienie dłuższego czasu przejazdu przy planowaniu podróży.</p>
      
      <p class="mb-4">W razie pytań prosimy o kontakt:</p>
      <p class="mb-2"><strong>Telefon:</strong> +48 601 481 319</p>
      <p class="mb-2"><strong>Email:</strong> info@superbus.com.pl</p>
      
      <p class="mt-6">Przepraszamy za wszelkie niedogodności i dziękujemy za wyrozumiałość.</p>
    `,
  },
];

export function NewsDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const newsItem = newsDetails.find(item => item.id === Number(id));

  if (!newsItem) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Nie znaleziono aktualności</h1>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
            >
              Wróć do strony głównej
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const Icon = newsItem.icon;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50 pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 font-semibold"
          >
            <ArrowLeft size={20} />
            Powrót do strony głównej
          </button>

          <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 text-white">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${newsItem.badgeColor}`}>
                  {newsItem.badge}
                </span>
                <Icon size={48} />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">{newsItem.title}</h1>
              <p className="text-lg opacity-90">{newsItem.date}</p>
            </div>

            <div 
              className="p-8 prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: newsItem.fullContent }}
            />
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
