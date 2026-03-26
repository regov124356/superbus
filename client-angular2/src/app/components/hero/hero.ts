import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  constructor(private readonly router: Router) {}

  protected goToBooking(): void {
    this.router.navigate(['/booking']);
  }
}
