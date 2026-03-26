import { Component } from '@angular/core';
import { Booking } from '../../components/booking/booking';

@Component({
  selector: 'app-booking-page',
  standalone: true,
  imports: [Booking],
  templateUrl: './booking-page.html',
  styleUrl: './booking-page.css',
})
export class BookingPage {}
