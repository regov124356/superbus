import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import * as L from 'leaflet';

type StopEdit = 'pickup' | 'destination' | { type: 'intermediate'; index: number } | null;

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  pickupLocation: string;
  destination: string;
  date: string;
  time: string;
  passengers: string;
  returnDate: string;
  returnTime: string;
  additionalInfo: string;
}

interface StopCoordinates {
  pickup: [number, number] | null;
  intermediates: ([number, number] | null)[];
  destination: [number, number] | null;
}

@Component({
  selector: 'app-booking-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './booking-page.html',
  styleUrl: './booking-page.css',
})
export class BookingPage implements AfterViewInit, OnDestroy {
  @ViewChild('bookingMap') private bookingMapElement?: ElementRef<HTMLDivElement>;

  protected formData: BookingFormData = {
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
  };

  protected additionalStops: string[] = [];
  protected stopCoordinates: StopCoordinates = {
    pickup: null,
    intermediates: [],
    destination: null,
  };

  protected editingStop: StopEdit = null;

  private readonly defaultCenter: [number, number] = [52.2297, 21.0122];
  private bookingMap?: L.Map;
  private routePolylines: L.Polyline[] = [];
  private stopMarkers: L.Marker[] = [];

  private readonly markerIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnDestroy(): void {
    this.bookingMap?.remove();
  }

  protected async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    alert('Dziękujemy za zapytanie! Skontaktujemy się z Tobą wkrótce.');
  }

  protected addStop(): void {
    this.additionalStops.push('');
    this.stopCoordinates.intermediates.push(null);
  }

  protected removeStop(index: number): void {
    this.additionalStops = this.additionalStops.filter((_, i) => i !== index);
    this.stopCoordinates.intermediates = this.stopCoordinates.intermediates.filter((_, i) => i !== index);
    this.refreshMapLayers();
    this.fetchRouteCoordinates();
  }

  protected updateStop(index: number, value: string): void {
    this.additionalStops[index] = value;
  }

  protected async geocodeAddress(address: string, stopType: Exclude<StopEdit, null>): Promise<void> {
    if (!address.trim()) {
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      const data = await response.json();

      if (!data.length) {
        return;
      }

      const coords: [number, number] = [Number.parseFloat(data[0].lat), Number.parseFloat(data[0].lon)];

      if (stopType === 'pickup') {
        this.stopCoordinates.pickup = coords;
        this.formData.pickupLocation = `${coords[0].toFixed(6)}, ${coords[1].toFixed(6)}`;
      } else if (stopType === 'destination') {
        this.stopCoordinates.destination = coords;
        this.formData.destination = `${coords[0].toFixed(6)}, ${coords[1].toFixed(6)}`;
      } else {
        this.stopCoordinates.intermediates[stopType.index] = coords;
        this.additionalStops[stopType.index] = `${coords[0].toFixed(6)}, ${coords[1].toFixed(6)}`;
      }

      this.editingStop = stopType;
      this.bookingMap?.setView(coords, 13);
      this.refreshMapLayers();
      await this.fetchRouteCoordinates();
    } catch {}
  }

  private initMap(): void {
    if (!this.bookingMapElement) {
      return;
    }

    this.bookingMap = L.map(this.bookingMapElement.nativeElement).setView(this.defaultCenter, 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.bookingMap);

    this.bookingMap.on('click', (event: L.LeafletMouseEvent) => {
      this.handleMapClick(event.latlng.lat, event.latlng.lng);
    });
  }

  private handleMapClick(lat: number, lon: number): void {
    const coords: [number, number] = [lat, lon];

    if (this.editingStop === 'pickup') {
      this.stopCoordinates.pickup = coords;
      this.formData.pickupLocation = `${lat.toFixed(6)}, ${lon.toFixed(6)}`;
    } else if (this.editingStop === 'destination') {
      this.stopCoordinates.destination = coords;
      this.formData.destination = `${lat.toFixed(6)}, ${lon.toFixed(6)}`;
    } else if (this.editingStop && typeof this.editingStop === 'object') {
      this.stopCoordinates.intermediates[this.editingStop.index] = coords;
      this.additionalStops[this.editingStop.index] = `${lat.toFixed(6)}, ${lon.toFixed(6)}`;
    } else {
      return;
    }

    this.refreshMapLayers();
    this.fetchRouteCoordinates();
  }

  private getAllStopsOrdered(): [number, number][] {
    const allStops: [number, number][] = [];

    if (this.stopCoordinates.pickup) {
      allStops.push(this.stopCoordinates.pickup);
    }

    this.stopCoordinates.intermediates.forEach((coords) => {
      if (coords) {
        allStops.push(coords);
      }
    });

    if (this.stopCoordinates.destination) {
      allStops.push(this.stopCoordinates.destination);
    }

    return allStops;
  }

  private async fetchRouteCoordinates(): Promise<void> {
    const allStops = this.getAllStopsOrdered();

    this.routePolylines.forEach((line) => this.bookingMap?.removeLayer(line));
    this.routePolylines = [];

    if (allStops.length < 2) {
      return;
    }

    for (let index = 0; index < allStops.length - 1; index += 1) {
      const start = allStops[index];
      const end = allStops[index + 1];

      try {
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`
        );
        const data = await response.json();

        if (data?.routes?.[0]?.geometry?.coordinates) {
          const coordinates = data.routes[0].geometry.coordinates.map(
            (coord: [number, number]) => [coord[1], coord[0]] as [number, number]
          );
          const polyline = L.polyline(coordinates, { color: '#3b82f6', weight: 3, opacity: 0.7 });
          polyline.addTo(this.bookingMap as L.Map);
          this.routePolylines.push(polyline);
        }
      } catch {}
    }
  }

  private refreshMapLayers(): void {
    this.stopMarkers.forEach((marker) => this.bookingMap?.removeLayer(marker));
    this.stopMarkers = [];

    if (!this.bookingMap) {
      return;
    }

    if (this.stopCoordinates.pickup) {
      const marker = L.marker(this.stopCoordinates.pickup, { icon: this.markerIcon }).bindPopup('Punkt wyjazdu');
      marker.addTo(this.bookingMap);
      this.stopMarkers.push(marker);
    }

    this.stopCoordinates.intermediates.forEach((coords, index) => {
      if (coords) {
        const marker = L.marker(coords, { icon: this.markerIcon }).bindPopup(`Przystanek pośredni ${index + 1}`);
        marker.addTo(this.bookingMap as L.Map);
        this.stopMarkers.push(marker);
      }
    });

    if (this.stopCoordinates.destination) {
      const marker = L.marker(this.stopCoordinates.destination, { icon: this.markerIcon }).bindPopup('Miejsce docelowe');
      marker.addTo(this.bookingMap);
      this.stopMarkers.push(marker);
    }
  }
}
