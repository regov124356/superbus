import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class Booking {
  protected formData = {
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

  protected submit(): void {
    alert('Dziękujemy za zapytanie! Skontaktujemy się z Tobą wkrótce.');
  }
}
