import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Noticia } from '../models';
import { NewsService } from '../news.service';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    <main class="max-w-4xl mx-auto px-6 py-8 w-full">
      <a routerLink="/" class="inline-block text-xs text-blue-600 hover:text-blue-800 mb-5">← Volver a noticias</a>
      @if (error) {
        <p class="bg-red-50 border border-red-200 rounded p-4 text-sm text-red-700">{{ error }}</p>
      } @else if (news) {
        <article class="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
          <img [src]="news.imagen" [alt]="news.titulo" class="w-full h-80 object-cover">
          <div class="p-8">
            @if (news.categoria) {
              <p class="text-blue-600 text-sm mb-2">{{ news.categoria }}</p>
            }
            <h1 class="text-4xl font-bold text-gray-800 mb-6">{{ news.titulo }}</h1>
            <p class="text-lg text-gray-600 leading-relaxed">{{ news.descripcion }}</p>
          </div>
        </article>
      } @else {
        <article class="bg-white rounded-md p-8 text-center">
          <h1 class="text-3xl font-bold text-gray-800 mb-4">Noticia no encontrada</h1>
          <a routerLink="/" class="text-blue-600 hover:text-blue-800">Volver a noticias</a>
        </article>
      }
    </main>
  `,
})
export class NewsDetailComponent implements OnInit {
  private readonly newsService = inject(NewsService);
  private readonly route = inject(ActivatedRoute);
  news: Noticia | undefined;
  error = '';

  async ngOnInit(): Promise<void> {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    try {
      const news = await this.newsService.getNews();
      this.news = news.find((item) => item.id === id);
    } catch (error) {
      console.error('Error al cargar la noticia:', error);
      this.error = 'No fue posible cargar la noticia.';
    }
  }
}
