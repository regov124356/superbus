import { Component } from '@angular/core';
import { About } from '../../components/about/about';
import { Services } from '../../components/services/services';
import { Fleet } from '../../components/fleet/fleet';

@Component({
  selector: 'app-routes-page',
  standalone: true,
  imports: [About, Services, Fleet],
  templateUrl: './routes-page.html',
  styleUrl: './routes-page.css',
})
export class RoutesPage {}
