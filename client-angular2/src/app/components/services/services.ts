import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services {
  protected readonly services: ServiceItem[] = [
    {
      icon: 'groups',
      title: 'Transport dla Grup',
      description: 'Organizujemy przewozy dla grup turystycznych, wycieczek szkolnych i eventów okolicznościowych.',
    },
    {
      icon: 'work',
      title: 'Transport Firmowy',
      description: 'Regularne przewozy pracowników, wyjazdy integracyjne i konferencje biznesowe.',
    },
    {
      icon: 'event',
      title: 'Eventy i Imprezy',
      description: 'Transport gości na wesela, koncerty, imprezy sportowe i inne wydarzenia specjalne.',
    },
    {
      icon: 'place',
      title: 'Trasy Regularne',
      description: 'Obsługujemy stałe trasy regularne na liniach komunikacyjnych, zapewniając niezawodną obsługę komunikacyjną.',
    },
  ];
}
