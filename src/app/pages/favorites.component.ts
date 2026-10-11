import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NewsCardComponent } from '../news-card.component';
import { Noticia } from '../models';
import { NewsService } from '../news.service';

@Component({
  standalone: true,
  imports: [NewsCardComponent, RouterLink],
  template: `
    <main class="max-w-6xl mx-auto px-6 py-8 min-h-[500px] w-full">
      <h1 class="text-lg font-bold text-gray-800">Mis Favoritos</h1>
      <p class="text-xs text-gray-500 mt-2 mb-5">Noticias que has guardado.</p>
      @if (error) {
        <p class="bg-red-50 border border-red-200 rounded p-4 text-sm text-red-700">{{ error }}</p>
      } @else if (news.length === 0) {
        <div class="bg-white rounded-xl p-8 text-center">
          <p class="text-gray-600 text-lg">No tienes noticias favoritas todavía.</p>
          <a routerLink="/" class="inline-block mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">Explorar noticias</a>
        </div>
      } @else {
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          @for (item of news; track item.id) {
            <app-news-card [noticia]="item" [showFavoriteAction]="false" [allowRemove]="true" (favoriteToggled)="removeFavorite($event)" />
          }
        </div>
      }
    </main>
  `,
})
export class FavoritesComponent implements OnInit {
  private readonly newsService = inject(NewsService);
  news: Noticia[] = [];
  error = '';

  async ngOnInit(): Promise<void> {
    await this.refreshFavorites();
  }

  async removeFavorite(id: number): Promise<void> {
    try {
      this.newsService.toggleFavorite(id);
      await this.refreshFavorites();
    } catch (error) {
      console.error('Error al actualizar los favoritos:', error);
      this.error = 'No se pudieron actualizar los favoritos.';
    }
  }

  private async refreshFavorites(): Promise<void> {
    try {
      const [allNews, favorites] = await Promise.all([
        this.newsService.getNews(),
        Promise.resolve(this.newsService.getFavorites()),
      ]);
      this.news = allNews.filter((item) => favorites.includes(item.id));
    } catch (error) {
      console.error('Error al cargar favoritos:', error);
      this.error = 'No fue posible cargar tus favoritos.';
    }
  }
}
