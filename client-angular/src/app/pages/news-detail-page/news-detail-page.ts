import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-news-detail-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './news-detail-page.html',
  styleUrl: './news-detail-page.css',
})
export class NewsDetailPage {
  protected newsId: string | null;

  constructor(route: ActivatedRoute) {
    this.newsId = route.snapshot.paramMap.get('id');
  }
}
