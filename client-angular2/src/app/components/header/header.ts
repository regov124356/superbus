import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  protected isMenuOpen = false;

  constructor(private readonly router: Router) {}

  protected toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  protected closeMenu(): void {
    this.isMenuOpen = false;
  }

  protected goToBooking(): void {
    this.router.navigate(['/booking']);
    this.closeMenu();
  }

  protected goToRoutes(): void {
    this.router.navigate(['/routes']);
    this.closeMenu();
  }

  protected scrollToSection(id: string): void {
    if (window.location.pathname !== '/') {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }

    this.closeMenu();
  }
}
