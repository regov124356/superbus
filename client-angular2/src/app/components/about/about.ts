import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface StatItem {
  icon: string;
  value: string;
  label: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  protected readonly stats: StatItem[] = [
    { icon: 'emoji_events', value: '26', label: 'Lat Doświadczenia' },
    { icon: 'directions_bus', value: '20+', label: 'Flota Pojazdów' },
    { icon: 'place', value: '1000+', label: 'Tras po Polsce' },
    { icon: 'groups', value: 'Aktywny', label: 'Społecznie' },
  ];
}
