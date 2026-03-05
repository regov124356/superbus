import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface StatItem { icon: string; value: string; label: string; }
interface ServiceItem { icon: string; title: string; description: string; }
interface FleetItem { name: string; capacity: string; image: string; features: string[]; type: 'bus' | 'coach'; }

@Component({
  selector: 'app-about-full',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-full.html',
  styleUrl: './about-full.css',
})
export class AboutFull {
  protected selectedFleetType: 'bus' | 'coach' = 'bus';

  protected readonly stats: StatItem[] = [
    { icon: '🏆', value: '26', label: 'Lat Doświadczenia' },
    { icon: '🚌', value: '20+', label: 'Flota Pojazdów' },
    { icon: '📍', value: '1000+', label: 'Tras po Polsce' },
    { icon: '👥', value: 'Aktywny', label: 'Społecznie' },
  ];

  protected readonly services: ServiceItem[] = [
    { icon: '👥', title: 'Transport dla Grup', description: 'Organizujemy przewozy dla grup turystycznych, wycieczek szkolnych i eventów okolicznościowych.' },
    { icon: '💼', title: 'Transport Firmowy', description: 'Regularne przewozy pracowników, wyjazdy integracyjne i konferencje biznesowe.' },
    { icon: '📅', title: 'Eventy i Imprezy', description: 'Transport gości na wesela, koncerty, imprezy sportowe i inne wydarzenia specjalne.' },
    { icon: '📍', title: 'Trasy Regularne', description: 'Obsługujemy stałe trasy regularne na liniach komunikacyjnych, zapewniając niezawodną obsługę komunikacyjną.' },
  ];

  protected readonly buses: FleetItem[] = [
    { name: 'Mercedes-Benz Sprinter', capacity: '19 miejsc', image: 'https://images.unsplash.com/photo-1763736809971-286a3fe3b975?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', features: ['Klimatyzacja', 'Komfortowe fotele', 'Bagażnik', 'WiFi'], type: 'bus' },
    { name: 'VW Crafter', capacity: '24 miejsca', image: 'https://images.unsplash.com/photo-1763736809971-286a3fe3b975?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', features: ['Klimatyzacja', 'USB w każdym miejscu', 'Duży bagażnik', 'Bluetooth'], type: 'bus' },
    { name: 'Mercedes-Benz Tourismo', capacity: '49 miejsc', image: 'https://images.unsplash.com/photo-1758543144629-7a8923dcdce6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', features: ['Luksusowe fotele', 'Monitor LCD', 'Bar', 'Toaleta', 'WiFi'], type: 'coach' },
    { name: 'Setra ComfortClass', capacity: '55 miejsc', image: 'https://images.unsplash.com/photo-1758543144629-7a8923dcdce6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', features: ['Premium fotele', 'System audio-video', 'Toaleta', 'Lodówka', 'Klimatyzacja'], type: 'coach' },
  ];

  protected setFleetType(type: 'bus' | 'coach'): void {
    this.selectedFleetType = type;
  }

  protected get filteredBuses(): FleetItem[] {
    return this.buses.filter((bus) => bus.type === this.selectedFleetType);
  }
}
