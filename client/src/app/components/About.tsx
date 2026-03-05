import { Award, Bus, MapPin, Users } from 'lucide-react';

const stats = [
  { icon: Award, value: '26', label: 'Lat Doświadczenia' },
  { icon: Bus, value: '20+', label: 'Flota Pojazdów' },
  { icon: MapPin, value: '1000+', label: 'Tras po Polsce' },
  { icon: Users, value: 'Aktywny', label: 'Społecznie' },
];

export function About() {
  return (
    <section id="about" className="py-20 bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">O SuperBus</h2>
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
    </section>
  );
}
