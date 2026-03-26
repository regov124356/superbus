import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { News } from '../../components/news/news';
import { AboutFull } from '../../components/about-full/about-full';
import { Contact } from '../../components/contact/contact';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [Hero, News, AboutFull, Contact],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {}
