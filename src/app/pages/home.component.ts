import { Component, OnInit, inject } from '@angular/core';
import { NewsCardComponent } from '../news-card.component';
import { Noticia } from '../models';
import { NewsService } from '../news.service';

@Component({
  standalone: true,
  imports: [NewsCardComponent],
  template: `
    <section class="bg-blue-600 text-white">
      <div class="max-w-6xl mx-auto px-6 py-10 text-center">
        <h1 class="text-3xl md:text-4xl font-bold mb-4">Bienvenido a <span class="text-yellow-300">NovaNews</span></h1>
        <p class="max-w-xl mx-auto text-sm leading-relaxed text-blue-100 mb-6">Descubre las noticias más recientes sobre tecnología, ciencia, turismo e innovación.</p>
        <a href="#noticias" class="inline-block bg-yellow-400 text-gray-900 text-xs font-semibold px-5 py-2.5 rounded hover:bg-yellow-300 transition">Ver Noticias</a>
      </div>
    </section>
    <main id="noticias" class="max-w-6xl mx-auto px-6 py-8 w-full">
      <h2 class="text-lg font-bold text-gray-800 mb-5">Noticias Destacadas</h2>
      @if (error) {
        <p class="bg-red-50 border border-red-200 rounded-xl p-6 text-center text-red-600">{{ error }}</p>
      } @else if (news.length === 0) {
        <p class="bg-white rounded-xl p-8 text-center text-gray-600">No hay noticias disponibles.</p>
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
export class HomeComponent implements OnInit {
  private readonly newsService = inject(NewsService);
  news: Noticia[] = [];
  error = '';

  async ngOnInit(): Promise<void> {
    try {
      this.news = await this.newsService.getNews();
    } catch (error) {
      console.error('Error al cargar las noticias:', error);
      this.error = 'No fue posible cargar las noticias.';
    }
  }
}
