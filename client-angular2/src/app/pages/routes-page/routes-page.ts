import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild } from '@angular/core';
import * as L from 'leaflet';

type DirectionJeziorzany = 'jeziorzany-kryspinow' | 'kryspinow-jeziorzany';

interface Stop {
  name: string;
  lat: number;
  lng: number;
}

interface ScheduleRow {
  stop: string;
  times: string[];
}

@Component({
  selector: 'app-routes-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './routes-page.html',
  styleUrl: './routes-page.css',
})
export class RoutesPage implements AfterViewInit, OnDestroy {
  @ViewChild('jeziorzanyMap') private jeziorzanyMapElement?: ElementRef<HTMLDivElement>;

  protected routeOpenJeziorzany = false;
  protected mapOpenJeziorzany = false;

  protected selectedStopJeziorzany = 'Jeziorzany Pętla';
  protected directionJeziorzany: DirectionJeziorzany = 'jeziorzany-kryspinow';

  protected stopsJeziorzany: Stop[] = [
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

  protected stopsKryspinow: Stop[] = [
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



  protected scheduleJeziorzanyKryspinow: ScheduleRow[] = [
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

  protected scheduleKryspinowJeziorzany: ScheduleRow[] = [
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

  private mapJeziorzany?: L.Map;
  private routeCoordinatesJeziorzany: [number, number][] = [];
  private readonly centerJeziorzany: [number, number] = [50.002, 19.775];

  private readonly markerIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  constructor(private readonly ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.loadRoutes();
  }

  ngOnDestroy(): void {
    this.mapJeziorzany?.remove();
  }

  protected get jeziorzanySchedule(): ScheduleRow[] {
    return this.directionJeziorzany === 'jeziorzany-kryspinow'
      ? this.scheduleJeziorzanyKryspinow
      : this.scheduleKryspinowJeziorzany;
  }

  protected get currentJeziorzanyStops(): Stop[] {
    return this.directionJeziorzany === 'jeziorzany-kryspinow' ? this.stopsJeziorzany : this.stopsKryspinow;
  }

  protected get selectedTimesJeziorzany(): string[] {
    return this.jeziorzanySchedule.find((item) => item.stop === this.selectedStopJeziorzany)?.times ?? [];
  }

  protected toggleJeziorzanySection(): void {
    this.routeOpenJeziorzany = !this.routeOpenJeziorzany;
  }

  protected toggleMapJeziorzany(): void {
    this.mapOpenJeziorzany = !this.mapOpenJeziorzany;
    if (this.mapOpenJeziorzany) {
      setTimeout(() => {
        this.initJeziorzanyMap();
      }, 0);
    }
  }

  protected setDirectionJeziorzany(direction: DirectionJeziorzany): void {
    this.directionJeziorzany = direction;
    if (!this.currentJeziorzanyStops.some((stop) => stop.name === this.selectedStopJeziorzany)) {
      this.selectedStopJeziorzany = this.currentJeziorzanyStops[0].name;
    }
    this.loadJeziorzanyRoute();
  }

  protected selectStopJeziorzany(stopName: string): void {
    this.selectedStopJeziorzany = stopName;
  }

  protected getDirectionLabelJeziorzany(): string {
    return this.directionJeziorzany === 'jeziorzany-kryspinow' ? 'kierunek Kryspinów' : 'kierunek Jeziorzany';
  }

  private async loadRoutes(): Promise<void> {
    await this.loadJeziorzanyRoute();
  }

  private async loadJeziorzanyRoute(): Promise<void> {
    this.routeCoordinatesJeziorzany = await this.fetchRoute(this.currentJeziorzanyStops);
    this.renderJeziorzanyMap();
  }

  private async fetchRoute(stops: Stop[]): Promise<[number, number][]> {
    const coordinates = stops.map((stop) => `${stop.lng},${stop.lat}`).join(';');
    const url = `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.code === 'Ok' && data.routes.length > 0) {
        return data.routes[0].geometry.coordinates.map((coord: [number, number]) => [coord[1], coord[0]] as [number, number]);
      }
    } catch {}

    return stops.map((stop) => [stop.lat, stop.lng] as [number, number]);
  }

  private initJeziorzanyMap(): void {
    if (!this.jeziorzanyMapElement) {
      return;
    }

    if (!this.mapJeziorzany) {
      this.mapJeziorzany = L.map(this.jeziorzanyMapElement.nativeElement).setView(this.centerJeziorzany, 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(this.mapJeziorzany);
    }

    this.mapJeziorzany.invalidateSize();
    this.renderJeziorzanyMap();
  }

  private renderJeziorzanyMap(): void {
    if (!this.mapJeziorzany) {
      return;
    }

    this.mapJeziorzany.eachLayer((layer) => {
      if (!(layer instanceof L.TileLayer)) {
        this.mapJeziorzany?.removeLayer(layer);
      }
    });

    if (this.routeCoordinatesJeziorzany.length > 0) {
      L.polyline(this.routeCoordinatesJeziorzany, { color: 'rgb(37, 99, 235)', weight: 4, opacity: 0.8 }).addTo(this.mapJeziorzany);
    }

    this.currentJeziorzanyStops.forEach((stop) => {
      const row = this.jeziorzanySchedule.find((item) => item.stop === stop.name);
      const times = row ? row.times.map((time) => `<span class="popup-time">${time}</span>`).join('') : '';
      const marker = L.marker([stop.lat, stop.lng], { icon: this.markerIcon }).addTo(this.mapJeziorzany as L.Map);
      marker.bindPopup(`<div class="popup-card"><div class="popup-title">${stop.name}</div><div class="popup-label">Odjazdy:</div><div class="popup-times">${times}</div></div>`);
      marker.on('click', () => {
        this.ngZone.run(() => {
          this.selectedStopJeziorzany = stop.name;
        });
      });
    });
  }
}
