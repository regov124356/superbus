import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvent } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../components/ui/collapsible';
import { ChevronDown, Ticket } from 'lucide-react';

// Przystanki z dokładnymi współrzędnymi (Plus Codes)
const stops = [
  { name: 'Zalas Plac', lat: 50.08009946202376, lng: 19.604639759224188 },
  { name: 'Zalas Krótka', lat: 50.0791667, lng: 19.6108889 },
  { name: 'Zalas Szkoła', lat: 50.080153888156744, lng: 19.620551101093277 },
  { name: 'Zalas Kościół', lat: 50.08070512552103, lng: 19.62671074049578 },
  { name: 'Zalas Ośrodek Zdrowia', lat: 50.08347939251513, lng: 19.628191966937848 },
];

// Rozkład jazdy Zalas → Kraków
const scheduleZalasKrakow = [
  { stop: 'Zalas Plac', times: ['5:30', '7:15', '9:00', '12:00', '15:30', '17:45', '20:00'] },
  { stop: 'Zalas Krótka', times: ['5:33', '7:18', '9:03', '12:03', '15:33', '17:48', '20:03'] },
  { stop: 'Zalas Szkoła', times: ['5:36', '7:21', '9:06', '12:06', '15:36', '17:51', '20:06'] },
  { stop: 'Zalas Kościół', times: ['5:39', '7:24', '9:09', '12:09', '15:39', '17:54', '20:09'] },
  { stop: 'Zalas Ośrodek Zdrowia', times: ['5:42', '7:27', '9:12', '12:12', '15:42', '17:57', '20:12'] },
  { stop: 'Kraków Centrum', times: ['6:15', '8:00', '9:45', '12:45', '16:15', '18:30', '20:45'] },
];

// Rozkład jazdy Kraków → Zalas
const scheduleKrakowZalas = [
  { stop: 'Kraków Centrum', times: ['6:00', '8:30', '11:00', '14:00', '16:30', '18:15', '21:00'] },
  { stop: 'Zalas Ośrodek Zdrowia', times: ['6:33', '9:03', '11:33', '14:33', '17:03', '18:48', '21:33'] },
  { stop: 'Zalas Kościół', times: ['6:36', '9:06', '11:36', '14:36', '17:06', '18:51', '21:36'] },
  { stop: 'Zalas Szkoła', times: ['6:39', '9:09', '11:39', '14:39', '17:09', '18:54', '21:39'] },
  { stop: 'Zalas Krótka', times: ['6:42', '9:12', '11:42', '14:42', '17:12', '18:57', '21:42'] },
  { stop: 'Zalas Plac', times: ['6:45', '9:15', '11:45', '14:45', '17:15', '19:00', '21:45'] },
];

// Przystanki Jeziorzany - Kryspinów (dokładne współrzędne)
const stopsJeziorzany = [
  { name: 'Jeziorzany Pętla', lat: 49.98703155939126, lng: 19.778515398502353 },
  { name: 'Jeziorzany Rondo', lat: 49.99303953632348, lng: 19.77678805589676 },
  { name: 'Ściejowice Kościelec', lat: 49.9988950395103, lng: 19.779845774173737 },
  { name: 'Ściejowice Na Bagnach', lat: 50.002125951213145, lng: 19.778451025485992 },
  { name: 'Ściejowice Remiza', lat: 50.00573590198704, lng: 19.779014289379123 },
  { name: 'Rączna Bażanty', lat: 50.01131527082156, lng: 19.77522047342646 },
  { name: 'Rączna Gołebiec', lat: 50.01647450585175, lng: 19.774658381938938 },
  { name: 'Rączna Kapliczka', lat: 50.015290025186275, lng: 19.769128026914807 },
  { name: 'Rączna Centrum', lat: 50.009731701358895, lng: 19.76560860872269 },
  { name: 'Rączna Kościół', lat: 50.011041727201224, lng: 19.756580293178562 },
  { name: 'Rączna Podlas', lat: 50.01230000787437, lng: 19.745073616504673 },
  { name: 'Rączna Dzikowiec', lat: 50.017381058223584, lng: 19.74613577127457 },
  { name: 'Liszki Wołowska Droga', lat: 50.03090492612437, lng: 19.74937051534653 },
  { name: 'Liszki Rondo', lat: 50.035256981911594, lng: 19.759171307086945 },
  { name: 'Liszki UG', lat: 50.03873351899685, lng: 19.76837128400803 },
  { name: 'Liszki Mazurowa', lat: 50.03883945764862, lng: 19.774042163697064 },
  { name: 'Kryspinów Sanka', lat: 50.04241306796343, lng: 19.78880971670151 },
  { name: 'Kryspinów Rondo', lat: 50.041617234364644, lng: 19.79832082986832 },
];

// Przystanki Kryspinów - Jeziorzany (dokładne współrzędne dla odwrotnego kierunku)
const stopsKryspinow = [
  { name: 'Kryspinów Rondo', lat: 50.04367397210805, lng: 19.794420897960666 },
  { name: 'Kryspinów Sanka', lat: 50.04191696545059, lng: 19.786696135997776 },
  { name: 'Liszki Mazurowa', lat: 50.03894368809541, lng: 19.773279726505283 },
  { name: 'Liszki UG', lat: 50.03864431571931, lng: 19.767524454622624 },
  { name: 'Liszki Rondo', lat: 50.034716011487745, lng: 19.75765317678452 },
  { name: 'Liszki Wołowska Droga', lat: 50.03090837208861, lng: 19.749110341072086 },
  { name: 'Rączna Dzikowiec', lat: 50.01727075618737, lng: 19.746017754077915 },
  { name: 'Rączna Podlas', lat: 50.012332989446676, lng: 19.745208270024218 },
  { name: 'Rączna Kościół', lat: 50.011010334880034, lng: 19.756880523280778 },
  { name: 'Rączna Centrum', lat: 50.00970412148367, lng: 19.765742719173435 },
  { name: 'Rączna Kapliczka', lat: 50.01529131969562, lng: 19.769263473930216 },
  { name: 'Rączna Gołębiec', lat: 50.0156989246572, lng: 19.77507144212723 },
  { name: 'Rączna Bażanty', lat: 50.01110378017111, lng: 19.77532893419266 },
  { name: 'Ściejowice Remiza', lat: 50.006237229725535, lng: 19.778939434522464 },
  { name: 'Ściejowice Na Bagnach', lat: 50.00226042415463, lng: 19.77833837270737 },
  { name: 'Ściejowice Kościelec', lat: 49.99873297098461, lng: 19.77959901094437 },
  { name: 'Jeziorzany Rondo', lat: 49.994070680778655, lng: 19.77657347917557 },
  { name: 'Jeziorzany Pętla', lat: 49.98703155939126, lng: 19.778515398502353 },
];

// Rozkład jazdy Jeziorzany → Kryspinów
const scheduleJeziorzanyKryspinow = [
  { stop: 'Jeziorzany Pętla', times: ['7:30', '8:50', '10:00', '14:50', '15:55', '17:15'] },
  { stop: 'Jeziorzany Rondo', times: ['7:31', '8:51', '10:01', '14:51', '15:56', '17:16'] },
  { stop: 'Ściejowice Kościelec', times: ['7:33', '8:53', '10:03', '14:53', '15:58', '17:18'] },
  { stop: 'Ściejowice Na Bagnach', times: ['7:34', '8:54', '10:04', '14:54', '15:59', '17:19'] },
  { stop: 'Ściejowice Remiza', times: ['7:35', '8:55', '10:05', '14:55', '16:00', '17:20'] },
  { stop: 'Rączna Bażanty', times: ['7:36', '8:56', '10:06', '14:56', '16:01', '17:21'] },
  { stop: 'Rączna Gołebiec', times: ['7:37', '8:57', '10:07', '14:57', '16:02', '17:22'] },
  { stop: 'Rączna Kapliczka', times: ['7:38', '8:58', '10:08', '14:58', '16:03', '17:23'] },
  { stop: 'Rączna Centrum', times: ['7:39', '8:59', '10:09', '14:59', '16:04', '17:24'] },
  { stop: 'Rączna Kościół', times: ['7:40', '9:00', '10:10', '15:00', '16:05', '17:25'] },
  { stop: 'Rączna Podlas', times: ['7:42', '9:02', '10:12', '15:02', '16:07', '17:27'] },
  { stop: 'Rączna Dzikowiec', times: ['7:43', '9:03', '10:13', '15:03', '16:08', '17:28'] },
  { stop: 'Liszki Wołowska Droga', times: ['7:45', '9:05', '10:15', '15:05', '16:10', '17:30'] },
  { stop: 'Liszki Rondo', times: ['7:47', '9:07', '10:17', '15:07', '16:12', '17:32'] },
  { stop: 'Liszki UG', times: ['7:48', '9:08', '10:18', '15:08', '16:13', '17:33'] },
  { stop: 'Liszki Mazurowa', times: ['7:49', '9:09', '10:19', '15:09', '16:14', '17:34'] },
  { stop: 'Kryspinów Sanka', times: ['7:51', '9:11', '10:21', '15:11', '16:16', '17:36'] },
  { stop: 'Kryspinów Rondo', times: ['7:52', '9:12', '10:22', '15:12', '16:17', '17:37'] },
];

// Rozkład jazdy Kryspinów → Jeziorzany
const scheduleKryspinowJeziorzany = [
  { stop: 'Kryspinów Rondo', times: ['8:15', '9:35', '10:35', '15:30', '16:35', '17:50'] },
  { stop: 'Kryspinów Sanka', times: ['8:16', '9:36', '10:36', '15:31', '16:36', '17:51'] },
  { stop: 'Liszki Mazurowa', times: ['8:18', '9:38', '10:38', '15:33', '16:38', '17:53'] },
  { stop: 'Liszki UG', times: ['8:19', '9:39', '10:39', '15:34', '16:39', '17:54'] },
  { stop: 'Liszki Rondo', times: ['8:20', '9:40', '10:40', '15:35', '16:40', '17:55'] },
  { stop: 'Liszki Wołowska Droga', times: ['8:22', '9:42', '10:42', '15:37', '16:42', '17:57'] },
  { stop: 'Rączna Dzikowiec', times: ['8:24', '9:44', '10:44', '15:39', '16:44', '17:59'] },
  { stop: 'Rączna Podlas', times: ['8:25', '9:45', '10:45', '15:40', '16:45', '18:00'] },
  { stop: 'Rączna Kościół', times: ['8:27', '9:47', '10:47', '15:42', '16:47', '18:02'] },
  { stop: 'Rączna Centrum', times: ['8:28', '9:48', '10:48', '15:43', '16:48', '18:03'] },
  { stop: 'Rączna Kapliczka', times: ['8:29', '9:49', '10:49', '15:44', '16:49', '18:04'] },
  { stop: 'Rączna Gołebiec', times: ['8:30', '9:50', '10:50', '15:45', '16:50', '18:05'] },
  { stop: 'Rączna Bażanty', times: ['8:31', '9:51', '10:51', '15:46', '16:51', '18:06'] },
  { stop: 'Ściejowice Remiza', times: ['8:32', '9:52', '10:52', '15:47', '16:52', '18:07'] },
  { stop: 'Ściejowice Na Bagnach', times: ['8:33', '9:53', '10:53', '15:48', '16:53', '18:08'] },
  { stop: 'Ściejowice Kościelec', times: ['8:34', '9:54', '10:54', '15:49', '16:54', '18:09'] },
  { stop: 'Jeziorzany Rondo', times: ['8:35', '9:55', '10:55', '15:50', '16:55', '18:10'] },
  { stop: 'Jeziorzany Pętla', times: ['8:37', '9:57', '10:57', '15:52', '16:57', '18:12'] },
];

// Komponenty pomocnicze do obsługi kliknięć na mapę
function MapClickHandlerJeziorzany({ editMode, setClickedCoord }: { editMode: boolean; setClickedCoord: (coord: [number, number]) => void }) {
  useMapEvent('click', (e) => {
    if (editMode) {
      const { lat, lng } = e.latlng;
      setClickedCoord([lat, lng]);
    }
  });
  return null;
}

// Ikona markera
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export function RoutesPage() {
  const [selectedStopZalas, setSelectedStopZalas] = useState<string>('Zalas Plac');
  const [directionZalas, setDirectionZalas] = useState<'zalas-krakow' | 'krakow-zalas'>('zalas-krakow');
  const [routeCoordinatesZalas, setRouteCoordinatesZalas] = useState<[number, number][]>([]);
  const [mapOpenZalas, setMapOpenZalas] = useState(false);
  const [routeOpenZalas, setRouteOpenZalas] = useState(false);
  const [routeOpenJeziorzany, setRouteOpenJeziorzany] = useState(false);
  
  const [selectedStopJeziorzany, setSelectedStopJeziorzany] = useState<string>('Jeziorzany Pętla');
  const [directionJeziorzany, setDirectionJeziorzany] = useState<'jeziorzany-kryspinow' | 'kryspinow-jeziorzany'>('jeziorzany-kryspinow');
  const [mapOpenJeziorzany, setMapOpenJeziorzany] = useState(false);
  const [routeCoordinatesJeziorzany, setRouteCoordinatesJeziorzany] = useState<[number, number][]>([]);
  const [editMode, setEditMode] = useState(false);
  const [clickedCoord, setClickedCoord] = useState<[number, number] | null>(null);

  // Współrzędne dla środka mapy (centrum Zalas)
  const center = [50.0808, 19.6182] as [number, number];
  
  // Współrzędne dla środka mapy (Jeziorzany-Kryspinów)
  const centerJeziorzany = [50.002, 19.775] as [number, number];
  
  // Pobierz trasę z OSRM API dla Zalas-Kraków
  useEffect(() => {
    const fetchRoute = async () => {
      // Formatuj współrzędne dla OSRM (lng,lat)
      const coordinates = stops.map(stop => `${stop.lng},${stop.lat}`).join(';');
      const url = `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`;
      
      try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.code === 'Ok' && data.routes.length > 0) {
          // OSRM zwraca [lng, lat], musimy zamienić na [lat, lng] dla Leaflet
          const coords = data.routes[0].geometry.coordinates.map(
            (coord: [number, number]) => [coord[1], coord[0]] as [number, number]
          );
          setRouteCoordinatesZalas(coords);
        }
      } catch (error) {
        console.error('Błąd pobierania trasy:', error);
        // Fallback do prostych linii
        setRouteCoordinatesZalas(stops.map(stop => [stop.lat, stop.lng] as [number, number]));
      }
    };
    
    fetchRoute();
  }, []);

  // Pobierz trasę z OSRM API dla Jeziorzany-Kryspinów
  useEffect(() => {
    const fetchRoute = async () => {
      // Wybierz odpowiednią tablicę przystanków w zależności od kierunku
      const validStops = directionJeziorzany === 'jeziorzany-kryspinow' ? stopsJeziorzany : stopsKryspinow;
      const coordinates = validStops.map(stop => `${stop.lng},${stop.lat}`).join(';');
      const url = `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`;
      
      try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.code === 'Ok' && data.routes.length > 0) {
          // OSRM zwraca [lng, lat], musimy zamienić na [lat, lng] dla Leaflet
          const coords = data.routes[0].geometry.coordinates.map(
            (coord: [number, number]) => [coord[1], coord[0]] as [number, number]
          );
          setRouteCoordinatesJeziorzany(coords);
        }
      } catch (error) {
        console.error('Błąd pobierania trasy:', error);
        // Fallback do prostych linii
        setRouteCoordinatesJeziorzany(validStops.map(stop => [stop.lat, stop.lng] as [number, number]));
      }
    };
    
    fetchRoute();
  }, [directionJeziorzany]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="w-full">
          {/* Nagłówek */}
          <div className="bg-blue-600 text-white py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-bold">Rozkład jazdy</h1>
              <p className="text-lg opacity-90 mt-2">Wybierz trasę, aby zobaczyć rozkład jazdy</p>
            </div>
          </div>

          <div className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-7xl mx-auto space-y-6">
              
              {/* Kup Bilet Miesięczny */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg p-8 text-white">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <Ticket size={48} className="flex-shrink-0" />
                    <div>
                      <h2 className="text-2xl font-bold mb-1">Bilet Miesięczny</h2>
                      <p className="text-blue-100">Oszczędzaj jeżdżąc regularnie - kup bilet miesięczny</p>
                    </div>
                  </div>
                  <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors">
                    Kup teraz
                  </button>
                </div>
              </div>

              {/* Trasa: Zalas - Kraków */}
              <Collapsible open={routeOpenZalas} onOpenChange={setRouteOpenZalas}>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors">
                      <div>
                        <h2 className="text-2xl font-bold text-left">Zalas - Kraków</h2>
                      </div>
                      <ChevronDown className={`transition-transform ${routeOpenZalas ? 'rotate-180' : ''}`} />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="border-t border-gray-200 p-6 space-y-8">
                      
                      {/* Rozkład jazdy */}
                      <div>
                        <h3 className="text-xl font-bold mb-6">Rozkład Jazdy</h3>
                        
                        {/* Wybór kierunku */}
                        <div className="flex gap-4 mb-8">
                          <button
                            onClick={() => setDirectionZalas('zalas-krakow')}
                            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                              directionZalas === 'zalas-krakow'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            Zalas → Kraków
                          </button>
                          <button
                            onClick={() => setDirectionZalas('krakow-zalas')}
                            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                              directionZalas === 'krakow-zalas'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            Kraków → Zalas
                          </button>
                        </div>

                        {/* Wybór przystanku */}
                        <div className="mb-8">
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Wybierz przystanek:
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                            {stops.map((stop) => (
                              <button
                                key={stop.name}
                                onClick={() => setSelectedStopZalas(stop.name)}
                                className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                                  selectedStopZalas === stop.name
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {stop.name.replace('Zalas ', '')}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Godziny dla wybranego przystanku */}
                        {selectedStopZalas && (
                          <div className="bg-blue-50 rounded-xl p-6">
                            <h4 className="text-xl font-bold text-gray-900 mb-4">
                              {selectedStopZalas} - {directionZalas === 'zalas-krakow' ? 'kierunek Kraków' : 'kierunek Zalas'}
                            </h4>
                            <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
                              {(directionZalas === 'zalas-krakow' ? scheduleZalasKrakow : scheduleKrakowZalas)
                                .find(s => s.stop === selectedStopZalas)
                                ?.times.map((time, idx) => (
                                  <div
                                    key={idx}
                                    className="bg-white rounded-lg py-3 px-4 text-center font-bold text-lg text-gray-900 shadow-sm"
                                  >
                                    {time}
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}

                        {/* Pełna tabela rozkładu */}
                        <div className="mt-8">
                          <details className="group">
                            <summary className="cursor-pointer list-none">
                              <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <span className="font-semibold text-gray-700">Pokaż pełny rozkład</span>
                                <ChevronDown className="group-open:rotate-180 transition-transform" />
                              </div>
                            </summary>
                            <div className="mt-4 overflow-x-auto">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="border-b-2 border-blue-600">
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Przystanek</th>
                                    {(directionZalas === 'zalas-krakow' ? scheduleZalasKrakow : scheduleKrakowZalas)[0].times.map((_, idx) => (
                                      <th key={idx} className="text-center py-3 px-2 font-semibold text-gray-700 whitespace-nowrap">
                                        Kurs {idx + 1}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {(directionZalas === 'zalas-krakow' ? scheduleZalasKrakow : scheduleKrakowZalas).map((row, idx) => (
                                    <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                      <td className="py-3 px-4 font-medium text-gray-900">{row.stop}</td>
                                      {row.times.map((time, i) => (
                                        <td key={i} className="text-center py-3 px-2 text-gray-600">
                                          {time}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </details>
                        </div>

                        {/* Informacje */}
                        <div className="mt-8 pt-8 border-t-2 border-gray-200">
                          <div className="bg-blue-50 p-6 rounded-xl">
                            <h4 className="font-bold text-gray-900 mb-4">Ważne Informacje</h4>
                            <ul className="space-y-2 text-sm text-gray-700">
                              <li>✓ Rozkład jazdy obowiązuje od poniedziałku do piątku</li>
                              <li>✓ Przystanki na żądanie zaznaczone w rozkładzie</li>
                              <li>✓ W święta rozkład może ulec zmianom</li>
                              <li>✓ Rezerwacja miejsc: +48 601 481 319</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Mapa w Collapsible */}
                      <Collapsible open={mapOpenZalas} onOpenChange={setMapOpenZalas}>
                        <div className="bg-gray-50 rounded-xl overflow-hidden">
                          <CollapsibleTrigger className="w-full">
                            <div className="flex items-center justify-between p-4 hover:bg-gray-100 transition-colors">
                              <h4 className="text-lg font-bold">Mapa trasy</h4>
                              <ChevronDown className={`transition-transform ${mapOpenZalas ? 'rotate-180' : ''}`} />
                            </div>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <div className="h-96 md:h-[500px] border-t border-gray-200">
                              <MapContainer center={center} zoom={15} style={{ height: '100%', width: '100%' }} scrollWheelZoom={true}>
                                <TileLayer
                                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {/* Linia trasy */}
                                {routeCoordinatesZalas.length > 0 && (
                                  <Polyline positions={routeCoordinatesZalas} color="rgb(37, 99, 235)" weight={4} opacity={0.8} />
                                )}
                                
                                {/* Przystanki */}
                                {stops.map((stop, index) => {
                                  const schedule = directionZalas === 'zalas-krakow' ? scheduleZalasKrakow : scheduleKrakowZalas;
                                  const stopSchedule = schedule.find(s => s.stop === stop.name);
                                  
                                  return (
                                    <Marker
                                      key={index}
                                      position={[stop.lat, stop.lng]}
                                      icon={customIcon}
                                      eventHandlers={{
                                        click: () => setSelectedStopZalas(stop.name),
                                      }}
                                    >
                                      <Popup>
                                        <div className="text-sm">
                                          <div className="font-bold text-base mb-2">{stop.name}</div>
                                          {stopSchedule && (
                                            <div>
                                              <div className="text-xs text-gray-600 mb-1 font-semibold">Odjazdy:</div>
                                              <div className="flex flex-wrap gap-1">
                                                {stopSchedule.times.map((time, idx) => (
                                                  <span key={idx} className="bg-blue-600 text-white text-xs px-2 py-1 rounded font-semibold">
                                                    {time}
                                                  </span>
                                                ))}
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </Popup>
                                    </Marker>
                                  );
                                })}
                              </MapContainer>
                            </div>
                          </CollapsibleContent>
                        </div>
                      </Collapsible>

                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>

              {/* Trasa: Jeziorzany - Kryspinów */}
              <Collapsible open={routeOpenJeziorzany} onOpenChange={setRouteOpenJeziorzany}>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors">
                      <div>
                        <h2 className="text-2xl font-bold text-left">Jeziorzany - Kryspinów</h2>
                      </div>
                      <ChevronDown className={`transition-transform ${routeOpenJeziorzany ? 'rotate-180' : ''}`} />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="border-t border-gray-200 p-6 space-y-8">
                      
                      {/* Rozkład jazdy */}
                      <div>
                        <h3 className="text-xl font-bold mb-6">Rozkład Jazdy</h3>
                        
                        {/* Wybór kierunku */}
                        <div className="flex gap-4 mb-8">
                          <button
                            onClick={() => setDirectionJeziorzany('jeziorzany-kryspinow')}
                            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                              directionJeziorzany === 'jeziorzany-kryspinow'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            Jeziorzany → Kryspinów
                          </button>
                          <button
                            onClick={() => setDirectionJeziorzany('kryspinow-jeziorzany')}
                            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                              directionJeziorzany === 'kryspinow-jeziorzany'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            Kryspinów → Jeziorzany
                          </button>
                        </div>

                        {/* Wybór przystanku */}
                        <div className="mb-8">
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Wybierz przystanek:
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {stopsJeziorzany.map((stop) => (
                              <button
                                key={stop.name}
                                onClick={() => setSelectedStopJeziorzany(stop.name)}
                                className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                                  selectedStopJeziorzany === stop.name
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {stop.name}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Godziny dla wybranego przystanku */}
                        {selectedStopJeziorzany && (
                          <div className="bg-blue-50 rounded-xl p-6">
                            <h4 className="text-xl font-bold text-gray-900 mb-4">
                              {selectedStopJeziorzany} - {directionJeziorzany === 'jeziorzany-kryspinow' ? 'kierunek Kryspinów' : 'kierunek Jeziorzany'}
                            </h4>
                            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                              {(directionJeziorzany === 'jeziorzany-kryspinow' ? scheduleJeziorzanyKryspinow : scheduleKryspinowJeziorzany)
                                .find(s => s.stop === selectedStopJeziorzany)
                                ?.times.map((time, idx) => (
                                  <div
                                    key={idx}
                                    className="bg-white rounded-lg py-3 px-4 text-center font-bold text-lg text-gray-900 shadow-sm"
                                  >
                                    {time}
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}

                        {/* Pełna tabela rozkładu */}
                        <div className="mt-8">
                          <details className="group">
                            <summary className="cursor-pointer list-none">
                              <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <span className="font-semibold text-gray-700">Pokaż pełny rozkład</span>
                                <ChevronDown className="group-open:rotate-180 transition-transform" />
                              </div>
                            </summary>
                            <div className="mt-4 overflow-x-auto">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="border-b-2 border-blue-600">
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Przystanek</th>
                                    {(directionJeziorzany === 'jeziorzany-kryspinow' ? scheduleJeziorzanyKryspinow : scheduleKryspinowJeziorzany)[0].times.map((_, idx) => (
                                      <th key={idx} className="text-center py-3 px-2 font-semibold text-gray-700 whitespace-nowrap">
                                        Kurs {idx + 1}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {(directionJeziorzany === 'jeziorzany-kryspinow' ? scheduleJeziorzanyKryspinow : scheduleKryspinowJeziorzany).map((row, idx) => (
                                    <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                      <td className="py-3 px-4 font-medium text-gray-900">{row.stop}</td>
                                      {row.times.map((time, i) => (
                                        <td key={i} className="text-center py-3 px-2 text-gray-600">
                                          {time}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </details>
                        </div>

                        {/* Informacje */}
                        <div className="mt-8 pt-8 border-t-2 border-gray-200">
                          <div className="bg-blue-50 p-6 rounded-xl">
                            <h4 className="font-bold text-gray-900 mb-4">Ważne Informacje</h4>
                            <ul className="space-y-2 text-sm text-gray-700">
                              <li>✓ Rozkład jazdy obowiązuje od poniedziałku do piątku</li>
                              <li>✓ Przystanki na żądanie zaznaczone w rozkładzie</li>
                              <li>✓ W święta rozkład może ulec zmianom</li>
                              <li>✓ Rezerwacja miejsc: +48 601 481 319</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Mapa w Collapsible */}
                      <Collapsible open={mapOpenJeziorzany} onOpenChange={setMapOpenJeziorzany}>
                        <div className="bg-gray-50 rounded-xl overflow-hidden">
                          <CollapsibleTrigger className="w-full">
                            <div className="flex items-center justify-between p-4 hover:bg-gray-100 transition-colors">
                              <h4 className="text-lg font-bold">Mapa trasy</h4>
                              <ChevronDown className={`transition-transform ${mapOpenJeziorzany ? 'rotate-180' : ''}`} />
                            </div>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <div className="border-t border-gray-200 p-4 space-y-4">
                              {/* Przycisk trybu edycji */}
                              <div className="flex gap-2">
                                <button
                                  onClick={() => {
                                    setEditMode(!editMode);
                                    setClickedCoord(null);
                                  }}
                                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                                    editMode
                                      ? 'bg-red-600 text-white'
                                      : 'bg-green-600 text-white hover:bg-green-700'
                                  }`}
                                >
                                  {editMode ? 'Wyłącz tryb edycji' : 'Włącz tryb edycji'}
                                </button>
                                {editMode && clickedCoord && (
                                  <div className="flex-1 bg-yellow-50 border-2 border-yellow-400 rounded-lg p-3 flex items-center justify-between">
                                    <div className="text-sm">
                                      <div className="font-bold">Klikniętą współrzędna:</div>
                                      <div className="font-mono text-xs">{clickedCoord[0].toFixed(10)}, {clickedCoord[1].toFixed(10)}</div>
                                    </div>
                                    <button
                                      onClick={() => {
                                        const text = `${clickedCoord[0]}, ${clickedCoord[1]}`;
                                        navigator.clipboard.writeText(text);
                                        alert('Kopiowano: ' + text);
                                      }}
                                      className="ml-2 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                                    >
                                      Skopiuj
                                    </button>
                                  </div>
                                )}
                              </div>

                              {/* Wybór kierunku mapy */}
                              <div className="flex gap-4">
                                <button
                                  onClick={() => setDirectionJeziorzany('jeziorzany-kryspinow')}
                                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                                    directionJeziorzany === 'jeziorzany-kryspinow'
                                      ? 'bg-blue-600 text-white'
                                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                  }`}
                                >
                                  Jeziorzany → Kryspinów
                                </button>
                                <button
                                  onClick={() => setDirectionJeziorzany('kryspinow-jeziorzany')}
                                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                                    directionJeziorzany === 'kryspinow-jeziorzany'
                                      ? 'bg-blue-600 text-white'
                                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                  }`}
                                >
                                  Kryspinów → Jeziorzany
                                </button>
                              </div>

                              {/* Mapa */}
                              <div className="h-[500px] md:h-[700px] border rounded-lg overflow-hidden">
                                <MapContainer center={centerJeziorzany} zoom={13} style={{ height: '100%', width: '100%' }} scrollWheelZoom={true}>
                                  <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                  />
                                  
                                  {/* Handler dla kliknięć na mapę */}
                                  <MapClickHandlerJeziorzany editMode={editMode} setClickedCoord={setClickedCoord} />
                                  
                                  {/* Marker dla klikniętego punktu w trybie edycji */}
                                  {editMode && clickedCoord && (
                                    <Marker position={clickedCoord} icon={new L.Icon({
                                      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
                                      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                                      iconSize: [32, 51],
                                      iconAnchor: [16, 51],
                                      popupAnchor: [1, -34],
                                      shadowSize: [41, 41],
                                    })}>
                                      <Popup>
                                        <div className="text-xs font-mono">
                                          {clickedCoord[0].toFixed(10)}, {clickedCoord[1].toFixed(10)}
                                        </div>
                                      </Popup>
                                    </Marker>
                                  )}
                                  
                                  {/* Linia trasy */}
                                  {routeCoordinatesJeziorzany.length > 0 && (
                                    <Polyline positions={routeCoordinatesJeziorzany} color="rgb(37, 99, 235)" weight={4} opacity={0.8} />
                                  )}
                                  
                                  {/* Przystanki */}
                                  {(directionJeziorzany === 'jeziorzany-kryspinow' ? stopsJeziorzany : stopsKryspinow).map((stop, index) => {
                                    const schedule = directionJeziorzany === 'jeziorzany-kryspinow' ? scheduleJeziorzanyKryspinow : scheduleKryspinowJeziorzany;
                                    const stopSchedule = schedule.find(s => s.stop === stop.name);
                                    
                                    return (
                                      <Marker
                                        key={index}
                                        position={[stop.lat, stop.lng]}
                                        icon={customIcon}
                                        eventHandlers={{
                                          click: () => setSelectedStopJeziorzany(stop.name),
                                        }}
                                      >
                                        <Popup>
                                          <div className="text-sm">
                                            <div className="font-bold text-base mb-2">{stop.name}</div>
                                            {stopSchedule && (
                                              <div>
                                                <div className="text-xs text-gray-600 mb-1 font-semibold">Odjazdy:</div>
                                                <div className="flex flex-wrap gap-1">
                                                  {stopSchedule.times.map((time, idx) => (
                                                    <span key={idx} className="bg-blue-600 text-white text-xs px-2 py-1 rounded font-semibold">
                                                      {time}
                                                    </span>
                                                  ))}
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        </Popup>
                                      </Marker>
                                    );
                                  })}
                                </MapContainer>
                              </div>
                            </div>
                          </CollapsibleContent>
                        </div>
                      </Collapsible>

                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
