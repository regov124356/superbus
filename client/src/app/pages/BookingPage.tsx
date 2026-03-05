import { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Bus, ArrowLeft, Plus, X } from 'lucide-react';
import { Link } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent, Polyline } from 'react-leaflet';
import L from 'leaflet';

export function BookingPage() {
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

  const [additionalStops, setAdditionalStops] = useState<string[]>([]);
  const [stopCoordinates, setStopCoordinates] = useState<{
    pickup: [number, number] | null;
    intermediates: ([number, number] | null)[];
    destination: [number, number] | null;
  }>({
    pickup: null,
    intermediates: [],
    destination: null,
  });
  const [editingStop, setEditingStop] = useState<'pickup' | 'destination' | { type: 'intermediate'; index: number } | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<[number, number][][]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking data:', formData);
    console.log('Additional stops:', additionalStops);
    alert('Dziękujemy za zapytanie! Skontaktujemy się z Tobą wkrótce.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addStop = () => {
    const newStops = [...additionalStops, ''];
    setAdditionalStops(newStops);
    setStopCoordinates({
      ...stopCoordinates,
      intermediates: [...stopCoordinates.intermediates, null],
    });
  };

  const removeStop = (index: number) => {
    const newStops = additionalStops.filter((_, i) => i !== index);
    setAdditionalStops(newStops);
    const newCoords = stopCoordinates.intermediates.filter((_, i) => i !== index);
    setStopCoordinates({
      ...stopCoordinates,
      intermediates: newCoords,
    });
  };

  const updateStop = (index: number, value: string) => {
    const newStops = [...additionalStops];
    newStops[index] = value;
    setAdditionalStops(newStops);
  };

  const geocodeAddress = async (address: string, stopType: 'pickup' | 'destination' | { type: 'intermediate'; index: number }) => {
    if (!address) return;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      const data = await response.json();
      if (data.length > 0) {
        const coords: [number, number] = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
        
        if (stopType === 'pickup') {
          setStopCoordinates({
            ...stopCoordinates,
            pickup: coords,
          });
        } else if (stopType === 'destination') {
          setStopCoordinates({
            ...stopCoordinates,
            destination: coords,
          });
        } else if (typeof stopType === 'object' && stopType.type === 'intermediate') {
          const newIntermediates = [...stopCoordinates.intermediates];
          newIntermediates[stopType.index] = coords;
          setStopCoordinates({
            ...stopCoordinates,
            intermediates: newIntermediates,
          });
        }
        
        setEditingStop(stopType);
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    }
  };

  const handleMapClick = (lat: number, lon: number) => {
    const coords: [number, number] = [lat, lon];
    
    if (editingStop === 'pickup') {
      setStopCoordinates({ ...stopCoordinates, pickup: coords });
      setFormData({
        ...formData,
        pickupLocation: `${lat.toFixed(6)}, ${lon.toFixed(6)}`
      });
    } else if (editingStop === 'destination') {
      setStopCoordinates({ ...stopCoordinates, destination: coords });
      setFormData({
        ...formData,
        destination: `${lat.toFixed(6)}, ${lon.toFixed(6)}`
      });
    } else if (typeof editingStop === 'object' && editingStop.type === 'intermediate') {
      const newIntermediates = [...stopCoordinates.intermediates];
      newIntermediates[editingStop.index] = coords;
      setStopCoordinates({ ...stopCoordinates, intermediates: newIntermediates });
      updateStop(editingStop.index, `${lat.toFixed(6)}, ${lon.toFixed(6)}`);
    }
  };

  // Component for map click handling
  const MapClickHandler = ({ onMapClick }: { onMapClick: (lat: number, lon: number) => void }) => {
    useMapEvent('click', (e) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    });
    return null;
  };

  const fetchRouteCoordinates = async () => {
    // Build list of all stops in order
    const allStops: [number, number][] = [];
    if (stopCoordinates.pickup) allStops.push(stopCoordinates.pickup);
    stopCoordinates.intermediates.forEach((coord) => {
      if (coord) allStops.push(coord);
    });
    if (stopCoordinates.destination) allStops.push(stopCoordinates.destination);

    if (allStops.length < 2) {
      setRouteCoordinates([]);
      return;
    }

    const routes: [number, number][][] = [];

    // Fetch route for each pair of consecutive stops
    for (let i = 0; i < allStops.length - 1; i++) {
      const start = allStops[i];
      const end = allStops[i + 1];

      try {
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`
        );
        const data = await response.json();
        if (data.routes && data.routes[0]) {
          const coordinates = data.routes[0].geometry.coordinates.map(
            (coord: [number, number]) => [coord[1], coord[0]] as [number, number]
          );
          routes.push(coordinates);
        }
      } catch (error) {
        console.error('Error fetching route:', error);
      }
    }

    setRouteCoordinates(routes);
  };

  useEffect(() => {
    fetchRouteCoordinates();
  }, [stopCoordinates]);

  return (
    <div className="size-full">
      <Header />
      <main className="pt-20">
        <section className="py-20 bg-gradient-to-br from-blue-50 to-white min-h-screen">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
            >
              <ArrowLeft size={20} />
              Powrót do strony głównej
            </Link>

            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">Zamów Bus</h1>
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
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="pickupLocation" className="block text-sm font-medium mb-2">
                        Miejsce wyjazdu *
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          id="pickupLocation"
                          name="pickupLocation"
                          required
                          value={formData.pickupLocation}
                          onChange={handleChange}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                          placeholder="np. Warszawa, ul. Marszałkowska 1"
                        />
                        <button
                          type="button"
                          onClick={() => geocodeAddress(formData.pickupLocation, 'pickup')}
                          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
                        >
                          Szukaj na mapie
                        </button>
                      </div>
                    </div>

                    {/* Dodatkowe przystanki */}
                    {additionalStops.map((stop, index) => (
                      <div key={index} className="relative">
                        <label htmlFor={`stop-${index}`} className="block text-sm font-medium mb-2">
                          Przystanek pośredni {index + 1}
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            id={`stop-${index}`}
                            value={stop}
                            onChange={(e) => updateStop(index, e.target.value)}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                            placeholder="np. Łódź, Dworzec Centralny"
                          />
                          <button
                            type="button"
                            onClick={() => geocodeAddress(stop, { type: 'intermediate', index })}
                            className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
                          >
                            Mapa
                          </button>
                          <button
                            type="button"
                            className="px-4 py-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-1"
                            onClick={() => removeStop(index)}
                          >
                            <X size={20} />
                            Usuń
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Przycisk dodaj przystanek */}
                    <button
                      type="button"
                      className="w-full bg-blue-50 text-blue-600 py-3 rounded-lg font-medium hover:bg-blue-100 transition-colors border-2 border-dashed border-blue-300 flex items-center justify-center gap-2"
                      onClick={addStop}
                    >
                      <Plus size={20} />
                      Dodaj przystanek pośredni
                    </button>

                    <div>
                      <label htmlFor="destination" className="block text-sm font-medium mb-2">
                        Miejsce docelowe *
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          id="destination"
                          name="destination"
                          required
                          value={formData.destination}
                          onChange={handleChange}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                          placeholder="np. Kraków, Rynek Główny"
                        />
                        <button
                          type="button"
                          onClick={() => geocodeAddress(formData.destination, 'destination')}
                          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
                        >
                          Szukaj na mapie
                        </button>
                      </div>
                    </div>

                    {/* Mapa mojej trasy */}
                    <div className="mt-8 pt-8 border-t border-gray-200">
                      <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <MapPin className="text-blue-600" size={20} />
                        Mapa mojej trasy
                      </h4>
                      <div className="rounded-lg overflow-hidden border border-gray-300">
                        <MapContainer
                          center={stopCoordinates.pickup || stopCoordinates.destination || [52.2297, 21.0122]}
                          zoom={13}
                          style={{ height: '400px', width: '100%' }}
                        >
                          <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          />
                          <MapClickHandler onMapClick={handleMapClick} />
                          
                          {routeCoordinates.map((route, idx) => (
                            <Polyline
                              key={`route-${idx}`}
                              positions={route}
                              color="#3b82f6"
                              weight={3}
                              opacity={0.7}
                            />
                          ))}
                          
                          {stopCoordinates.pickup && (
                            <Marker position={stopCoordinates.pickup}>
                              <Popup>Punkt wyjazdu</Popup>
                            </Marker>
                          )}
                          
                          {stopCoordinates.intermediates.map((coords, idx) =>
                            coords && (
                              <Marker key={`intermediate-${idx}`} position={coords}>
                                <Popup>Przystanek pośredni {idx + 1}</Popup>
                              </Marker>
                            )
                          )}
                          
                          {stopCoordinates.destination && (
                            <Marker position={stopCoordinates.destination}>
                              <Popup>Miejsce docelowe</Popup>
                            </Marker>
                          )}
                        </MapContainer>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-b-lg text-sm text-gray-600">
                        <p>Kliknij na mapę, aby dodać lub zmienić punkty trasy. Użyj przycisków "Szukaj na mapie" lub "Mapa" przy każdym punkcie.</p>
                      </div>
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
      </main>
      <Footer />
    </div>
  );
}