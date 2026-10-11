import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NewsCardComponent } from '../news-card.component';
import { Noticia } from '../models';
import { NewsService } from '../news.service';

@Component({
  standalone: true,
  imports: [NewsCardComponent, RouterLink],
  template: `
    <main class="max-w-6xl mx-auto px-6 py-8 w-full">
      <a routerLink="/categorias" class="inline-block text-xs text-blue-600 hover:text-blue-800 mb-5">← Volver a categorías</a>
      <h1 class="text-lg font-bold text-gray-800 mb-5">{{ category }}</h1>
      @if (error) {
        <p class="bg-red-50 border border-red-200 rounded p-4 text-sm text-red-700">{{ error }}</p>
      } @else if (news.length === 0) {
        <p class="bg-white rounded-xl p-8 text-center text-gray-600">No hay noticias en esta categoría.</p>
      } @else {
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          @for (item of news; track item.id) {
            <app-news-card [noticia]="item" />
          }
        </div>
      }
    </main>
  `,
})
export class CategoryNewsComponent implements OnInit {
  private readonly newsService = inject(NewsService);
  private readonly route = inject(ActivatedRoute);
  category = '';
  news: Noticia[] = [];
  error = '';

  async ngOnInit(): Promise<void> {
    this.category = this.route.snapshot.paramMap.get('categoria') ?? '';
    try {
      const news = await this.newsService.getNews();
      this.news = news.filter(
        (item) => item.categoria?.toLocaleLowerCase() === this.category.toLocaleLowerCase(),
      );
    } catch (error) {
      console.error('Error al cargar las noticias:', error);
      this.error = 'No se pudieron cargar las noticias.';
    }
  }
}
