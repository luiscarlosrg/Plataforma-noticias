import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Noticia } from './models';
import { NewsService } from './news.service';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <article class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
      <img [src]="noticia.imagen" [alt]="noticia.titulo" class="w-full h-52 object-cover">
      <div class="p-6 flex flex-col flex-1">
        @if (noticia.categoria) {
          <span class="inline-block w-fit bg-blue-50 text-blue-600 text-[10px] px-1.5 py-0.5 rounded mb-2">{{ noticia.categoria }}</span>
        }
        <h2 class="text-xl font-bold text-gray-800 mb-3">{{ noticia.titulo }}</h2>
        <p class="text-gray-600 mb-5">{{ noticia.descripcion }}</p>
        <div class="flex gap-3 flex-wrap mt-auto">
          <a [routerLink]="['/noticia', noticia.id]" class="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">Ver más</a>
          @if (showFavoriteAction) {
            <button type="button" (click)="toggleFavorite()" [class]="favoriteClass" class="px-5 py-2 rounded-lg transition">
              {{ favorite ? '⭐ Favorito' : '☆ Agregar a favoritos' }}
            </button>
          }
          @if (allowRemove) {
            <button type="button" (click)="favoriteToggled.emit(noticia.id)" class="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition">Quitar favorito</button>
          }
        </div>
      </div>
    </article>
  `,
})
export class NewsCardComponent {
  @Input({ required: true }) noticia!: Noticia;
  @Input() showFavoriteAction = true;
  @Input() allowRemove = false;
  @Output() favoriteToggled = new EventEmitter<number>();

  private readonly newsService = inject(NewsService);
  favorite = false;

  ngOnInit(): void {
    this.favorite = this.newsService.isFavorite(this.noticia.id);
  }

  get favoriteClass(): string {
    return this.favorite
      ? 'bg-yellow-500 text-white hover:bg-yellow-600'
      : 'bg-gray-200 text-gray-700 hover:bg-gray-300';
  }

  toggleFavorite(): void {
    this.favorite = this.newsService.toggleFavorite(this.noticia.id);
    this.favoriteToggled.emit(this.noticia.id);
  }
}
