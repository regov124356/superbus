import { Check } from 'lucide-react';

const buses = [
  {
    name: 'Autobus Miejski',
    capacity: '50 miejsc',
    image: 'https://images.unsplash.com/photo-1756723701257-46513cd36fc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwYnVzJTIwdHJhbnNwb3J0YXRpb258ZW58MXx8fHwxNzcxMjU1MjcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    features: ['Klimatyzacja', 'USB w każdym miejscu', 'Bagażnik', 'WiFi'],
  },
  {
    name: 'Autokar Premium',
    capacity: '55 miejsc',
    image: 'https://images.unsplash.com/photo-1758543144629-7a8923dcdce6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBidXN8ZW58MXx8fHwxNzcxMjU1MjcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    features: ['Luksusowe fotele', 'Monitor LCD', 'Bar', 'Toaleta'],
  },
  {
    name: 'Mikrobus',
    capacity: '20 miejsc',
    image: 'https://images.unsplash.com/photo-1763736809971-286a3fe3b975?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRyYXZlbCUyMGNvYWNofGVufDF8fHx8MTc3MTI1NTI3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    features: ['Kompaktowy rozmiar', 'Idealne dla małych grup', 'Klimatyzacja', 'Przestronne wnętrze'],
  },
];

export function Fleet() {
  return (
    <section id="fleet" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Nasza Flota</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Nowoczesne pojazdy wyposażone w najwyższy standard komfortu
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {buses.map((bus, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={bus.image}
                  alt={bus.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{bus.name}</h3>
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
    </section>
  );
}
