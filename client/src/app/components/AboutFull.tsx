import { useState } from 'react';
import { Award, Users, MapPin, Briefcase, Calendar, Bus, Check } from 'lucide-react';

const stats = [
  { icon: Award, value: '26', label: 'Lat Doświadczenia' },
  { icon: Bus, value: '20+', label: 'Flota Pojazdów' },
  { icon: MapPin, value: '1000+', label: 'Tras po Polsce' },
  { icon: Users, value: 'Aktywny', label: 'Społecznie' },
];

const services = [
  {
    icon: Users,
    title: 'Transport dla Grup',
    description: 'Organizujemy przewozy dla grup turystycznych, wycieczek szkolnych i eventów okolicznościowych.',
  },
  {
    icon: Briefcase,
    title: 'Transport Firmowy',
    description: 'Regularne przewozy pracowników, wyjazdy integracyjne i konferencje biznesowe.',
  },
  {
    icon: Calendar,
    title: 'Eventy i Imprezy',
    description: 'Transport gości na wesela, koncerty, imprezy sportowe i inne wydarzenia specjalne.',
  },
  {
    icon: MapPin,
    title: 'Trasy Regularne',
    description: 'Obsługujemy stałe trasy regularne na liniach komunikacyjnych, zapewniając niezawodną obsługę komunikacyjną.',
  },
];

const buses = [
  {
    name: 'Mercedes-Benz Sprinter',
    capacity: '19 miejsc',
    image: 'https://images.unsplash.com/photo-1763736809971-286a3fe3b975?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRyYXZlbCUyMGNvYWNofGVufDF8fHx8MTc3MTI1NTI3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    features: ['Klimatyzacja', 'Komfortowe fotele', 'Bagażnik', 'WiFi'],
    type: 'bus',
  },
  {
    name: 'VW Crafter',
    capacity: '24 miejsca',
    image: 'https://images.unsplash.com/photo-1763736809971-286a3fe3b975?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRyYXZlbCUyMGNvYWNofGVufDF8fHx8MTc3MTI1NTI3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    features: ['Klimatyzacja', 'USB w każdym miejscu', 'Duży bagażnik', 'Bluetooth'],
    type: 'bus',
  },
  {
    name: 'Mercedes-Benz Tourismo',
    capacity: '49 miejsc',
    image: 'https://images.unsplash.com/photo-1758543144629-7a8923dcdce6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBidXN8ZW58MXx8fHwxNzcxMjU1MjcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    features: ['Luksusowe fotele', 'Monitor LCD', 'Bar', 'Toaleta', 'WiFi'],
    type: 'coach',
  },
  {
    name: 'Setra ComfortClass',
    capacity: '55 miejsc',
    image: 'https://images.unsplash.com/photo-1758543144629-7a8923dcdce6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBidXN8ZW58MXx8fHwxNzcxMjU1MjcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    features: ['Premium fotele', 'System audio-video', 'Toaleta', 'Lodówka', 'Klimatyzacja'],
    type: 'coach',
  },
];

export function AboutFull() {
  const [selectedFleetType, setSelectedFleetType] = useState<'bus' | 'coach'>('bus');

  const filteredBuses = buses.filter(bus => bus.type === selectedFleetType);

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* O firmie */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">O SuperBus</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Poznaj naszą firmę, usługi i nowoczesną flotę pojazdów
          </p>
        </div>

        {/* Opis firmy i statystyki */}
        <div className="bg-blue-600 text-white rounded-3xl p-8 md:p-12 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">Nasza Historia</h3>
              <p className="text-lg mb-6 leading-relaxed">
                Firma SUPER BUS powstała w styczniu 2000 roku, rozpoczynając swoją działalność 
                14-osobowym Fordem Transitem na trasie Baczyn-Kraków. W ciągu ponad 26 lat 
                działalności firma dynamicznie się rozwijała, systematycznie powiększając flotę 
                o coraz nowocześniejsze pojazdy oraz otwierając nowe połączenia.
              </p>
              <p className="text-lg mb-6 leading-relaxed">
                Dziś SUPER BUS to kompleksowa firma transportowa oferująca szeroki zakres usług: 
                przewozy pracowników dla firm, obsługę komunikacyjną szkół, organizację wycieczek 
                turystycznych, transport gości weselnych oraz obsługę różnorodnych eventów i imprez.
              </p>
              <p className="text-lg leading-relaxed">
                Dysponujemy flotą ponad 20 nowoczesnych pojazdów, które regularnie przechodzą 
                przeglądy techniczne. Nasi doświadczeni kierowcy gwarantują bezpieczną i komfortową 
                podróż. Do tej pory pokonaliśmy ponad 1000 tras w całej Polsce, obsługując klientów 
                indywidualnych, firmy oraz instytucje.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-center hover:bg-white/20 transition-colors"
                  >
                    <div className="flex justify-center mb-4">
                      <Icon size={40} />
                    </div>
                    <div className="text-4xl font-bold mb-2">{stat.value}</div>
                    <div className="text-sm opacity-90">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Usługi */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">Co robimy?</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Oferujemy kompleksowe usługi transportowe dostosowane do różnych potrzeb
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <Icon size={32} className="text-blue-600" />
                  </div>
                  <h4 className="text-xl font-semibold mb-4">{service.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Flota */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">Nasza Flota</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Wybierz typ pojazdu, aby zobaczyć dostępne opcje
            </p>

            {/* Przełącznik typu pojazdu */}
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => setSelectedFleetType('bus')}
                className={`px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center gap-2 ${
                  selectedFleetType === 'bus'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Bus size={24} />
                Busy do 35 osób
              </button>
              <button
                onClick={() => setSelectedFleetType('coach')}
                className={`px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center gap-2 ${
                  selectedFleetType === 'coach'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Bus size={24} />
                Autokary powyżej 45 osób
              </button>
            </div>
          </div>

          {/* Lista pojazdów */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredBuses.map((bus, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={bus.image}
                    alt={bus.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-2xl font-semibold mb-2">{bus.name}</h4>
                  <p className="text-blue-600 font-semibold mb-4">{bus.capacity}</p>
                  <ul className="space-y-2">
                    {bus.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check size={20} className="text-green-600" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
