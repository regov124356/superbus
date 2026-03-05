import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { BookingPage } from './pages/booking-page/booking-page';
import { RoutesPage } from './pages/routes-page/routes-page';
import { NewsDetailPage } from './pages/news-detail-page/news-detail-page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'booking',
    component: BookingPage,
  },
  {
    path: 'routes',
    component: RoutesPage,
  },
  {
    path: 'news/:id',
    component: NewsDetailPage,
  },
];
