import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface BusItem {
  name: string;
  capacity: string;
  image: string;
  features: string[];
}

@Component({
  selector: 'app-fleet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fleet.html',
  styleUrl: './fleet.css',
})
export class Fleet {
  protected readonly buses: BusItem[] = [
    {
      name: 'Autobus Miejski',
      capacity: '50 miejsc',
      image: 'https://images.unsplash.com/photo-1756723701257-46513cd36fc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      features: ['Klimatyzacja', 'USB w każdym miejscu', 'Bagażnik', 'WiFi'],
    },
    {
      name: 'Autokar Premium',
      capacity: '55 miejsc',
      image: 'https://images.unsplash.com/photo-1758543144629-7a8923dcdce6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      features: ['Luksusowe fotele', 'Monitor LCD', 'Bar', 'Toaleta'],
    },
    {
      name: 'Mikrobus',
      capacity: '20 miejsc',
      image: 'https://images.unsplash.com/photo-1763736809971-286a3fe3b975?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      features: ['Kompaktowy rozmiar', 'Idealne dla małych grup', 'Klimatyzacja', 'Przestronne wnętrze'],
    },
  ];
}
