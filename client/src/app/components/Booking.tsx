import { useState } from 'react';
import { Calendar, MapPin, Users, Bus, Clock } from 'lucide-react';

export function Booking() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pickupLocation: '',
    destination: '',
    date: '',
    time: '',
    passengers: '',
    returnDate: '',
    returnTime: '',
    additionalInfo: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking data:', formData);
    // Tutaj będzie logika wysyłki formularza
    alert('Dziękujemy za zapytanie! Skontaktujemy się z Tobą wkrótce.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="booking" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Zamów Bus</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Wypełnij formularz, a my skontaktujemy się z Tobą z ofertą dopasowaną do Twoich potrzeb
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Dane kontaktowe */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Users className="text-blue-600" size={24} />
                Dane kontaktowe
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Imię i nazwisko *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    placeholder="Jan Kowalski"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    placeholder="jan@example.com"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Telefon kontaktowy *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    placeholder="+48 555 555 555"
                  />
                </div>
              </div>
            </div>

            {/* Szczegóły trasy */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <MapPin className="text-blue-600" size={24} />
                Szczegóły trasy
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="pickupLocation" className="block text-sm font-medium mb-2">
                    Miejsce wyjazdu *
                  </label>
                  <input
                    type="text"
                    id="pickupLocation"
                    name="pickupLocation"
                    required
                    value={formData.pickupLocation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    placeholder="np. Warszawa, ul. Marszałkowska 1"
                  />
                </div>

                <div>
                  <label htmlFor="destination" className="block text-sm font-medium mb-2">
                    Miejsce docelowe *
                  </label>
                  <input
                    type="text"
                    id="destination"
                    name="destination"
                    required
                    value={formData.destination}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    placeholder="np. Kraków, Rynek Główny"
                  />
                </div>
              </div>
            </div>

            {/* Data i godzina */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Calendar className="text-blue-600" size={24} />
                Data i godzina wyjazdu
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium mb-2">
                    Data wyjazdu *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-medium mb-2">
                    Godzina wyjazdu *
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="returnDate" className="block text-sm font-medium mb-2">
                    Data powrotu (opcjonalnie)
                  </label>
                  <input
                    type="date"
                    id="returnDate"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="returnTime" className="block text-sm font-medium mb-2">
                    Godzina powrotu (opcjonalnie)
                  </label>
                  <input
                    type="time"
                    id="returnTime"
                    name="returnTime"
                    value={formData.returnTime}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Liczba pasażerów */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Bus className="text-blue-600" size={24} />
                Szczegóły pojazdu
              </h3>
              <div>
                <label htmlFor="passengers" className="block text-sm font-medium mb-2">
                  Liczba pasażerów *
                </label>
                <input
                  type="number"
                  id="passengers"
                  name="passengers"
                  required
                  min="1"
                  max="100"
                  value={formData.passengers}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                  placeholder="Podaj liczbę osób"
                />
              </div>
            </div>

            {/* Dodatkowe informacje */}
            <div>
              <label htmlFor="additionalInfo" className="block text-sm font-medium mb-2">
                Dodatkowe informacje
              </label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                rows={4}
                value={formData.additionalInfo}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none"
                placeholder="Dodatkowe wymagania, przystanki po drodze, bagaż itp."
              />
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-sm text-gray-700">
                * Pola wymagane. Wszystkie dane będą traktowane poufnie zgodnie z RODO. 
                Po wysłaniu formularza skontaktujemy się z Tobą w ciągu 24 godzin z ofertą cenową.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Wyślij zapytanie ofertowe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
