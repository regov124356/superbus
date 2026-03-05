import { createBrowserRouter } from 'react-router';
import { HomePage } from './pages/HomePage';
import { BookingPage } from './pages/BookingPage';
import { NewsDetailPage } from './pages/NewsDetailPage';
import { RoutesPage } from './pages/RoutesPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage,
  },
  {
    path: '/booking',
    Component: BookingPage,
  },
  {
    path: '/news/:id',
    Component: NewsDetailPage,
  },
  {
    path: '/routes',
    Component: RoutesPage,
  },
]);
