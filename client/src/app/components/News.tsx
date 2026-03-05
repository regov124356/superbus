import { Calendar, TrendingDown, MapPin, Megaphone } from 'lucide-react';
import { useNavigate } from 'react-router';

const news = [
  {
    id: 1,
    icon: Calendar,
    date: '02.01.2026',
    title: 'Zmiana rozkładu jazdy od 02.01.2026',
    description: 'Informujemy o zmianie rozkładu jazdy od 2 stycznia 2026 roku. Szczegółowe informacje o nowych godzinach dostępne są w zakładce rozkłady.',
    badge: 'Ważne',
    badgeColor: 'bg-red-100 text-red-700',
  },
  {
    id: 2,
    icon: Calendar,
    date: '24-26.12.2025',
    title: 'Boże Narodzenie 2025',
    description: 'Kursowanie busa w okresie świątecznym: 24.12 (Wigilia), 25.12 (Boże Narodzenie), 26.12 (Drugi dzień świąt) - bus nie będzie kursował.',
    badge: 'Komunikat',
    badgeColor: 'bg-orange-100 text-orange-700',
  },
  {
    id: 3,
    icon: Megaphone,
    date: '15.02.2026',
    title: 'Objazd w Rybnej',
    description: 'Informujemy, że w związku ze zmianą organizacji ruchu na czas remontu przepustu w Rybnej, busy kursować będą objazdem przez ul. Malownicza. Wszystkie przystanki na trasie będą obsługiwane.',
    badge: 'Komunikat',
    badgeColor: 'bg-orange-100 text-orange-700',
  },
];

export function News() {
  const navigate = useNavigate();

  return (
    <section id="news" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Aktualności</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Bądź na bieżąco z najnowszymi informacjami SuperBus
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden border border-gray-100 flex flex-col"
              >
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                    <Icon size={32} />
                  </div>
                  <p className="text-sm opacity-90">{item.date}</p>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed flex-1">{item.description}</p>
                  <button 
                    onClick={() => navigate(`/news/${item.id}`)}
                    className="mt-4 bg-red-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-600 transition-colors self-start"
                  >
                    Zobacz więcej
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
