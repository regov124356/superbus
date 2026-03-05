import { Users, Briefcase, Calendar, MapPin } from 'lucide-react';

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

export function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Nasze Usługi</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Oferujemy kompleksowe usługi transportowe dostosowane do Twoich potrzeb
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
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
