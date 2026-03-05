import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Skontaktuj się z nami</h2>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex gap-4">
            <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
              <Phone className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Telefon</h3>
              <p className="text-gray-600">+48 601 481 319</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
              <Mail className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-600">info@superbus.com.pl</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Adres</h3>
              <p className="text-gray-600">Czułów 121</p>
              <p className="text-gray-600">32-060 Liszki</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Godziny biura</h3>
              <p className="text-gray-600">Poniedziałek - Piątek</p>
              <p className="text-gray-600">8:00 - 14:00</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}