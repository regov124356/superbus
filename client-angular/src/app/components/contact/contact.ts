import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ContactCard {
  icon: string;
  title: string;
  lines: string[];
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  protected readonly cards: ContactCard[] = [
    { icon: '📞', title: 'Telefon', lines: ['+48 601 481 319'] },
    { icon: '✉️', title: 'Email', lines: ['info@superbus.com.pl'] },
    { icon: '📍', title: 'Adres', lines: ['Czułów 121', '32-060 Liszki'] },
    { icon: '🕒', title: 'Godziny biura', lines: ['Poniedziałek - Piątek', '8:00 - 14:00'] },
  ];
}
