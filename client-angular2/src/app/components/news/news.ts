import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface NewsItem {
  id: number;
  icon: string;
  date: string;
  title: string;
  description: string;
  badge: string;
  badgeClass: string;
}

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news.html',
  styleUrl: './news.css',
})
export class News {
  protected readonly news: NewsItem[] = [
    {
      id: 1,
      icon: 'event',
      date: '02.01.2026',
      title: 'Zmiana rozkładu jazdy od 02.01.2026',
      description: 'Informujemy o zmianie rozkładu jazdy od 2 stycznia 2026 roku. Szczegółowe informacje o nowych godzinach dostępne są w zakładce rozkłady.',
      badge: 'Ważne',
      badgeClass: 'badge-important',
    },
    {
      id: 2,
      icon: 'event',
      date: '24-26.12.2025',
      title: 'Boże Narodzenie 2025',
      description: 'Kursowanie busa w okresie świątecznym: 24.12, 25.12, 26.12 - bus nie będzie kursował.',
      badge: 'Komunikat',
      badgeClass: 'badge-info',
    },
    {
      id: 3,
      icon: 'campaign',
      date: '15.02.2026',
      title: 'Objazd w Rybnej',
      description: 'W związku ze zmianą organizacji ruchu na czas remontu przepustu w Rybnej, busy kursować będą objazdem przez ul. Malownicza.',
      badge: 'Komunikat',
      badgeClass: 'badge-info',
    },
  ];

  constructor(private readonly router: Router) {}

  protected openNews(id: number): void {
    this.router.navigate(['/news', id]);
  }
}
