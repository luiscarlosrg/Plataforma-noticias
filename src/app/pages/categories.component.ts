import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Categoria } from '../models';
import { NewsService } from '../news.service';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    <main class="max-w-4xl mx-auto px-6 py-8 w-full">
      <h1 class="text-lg font-bold text-gray-800 mb-5">Categorías</h1>
      @if (error) {
        <p class="bg-red-50 border border-red-200 rounded p-4 text-sm text-red-700">{{ error }}</p>
      } @else {
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          @for (category of categories; track category.id) {
            <article class="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
              <img [src]="category.imagen" [alt]="category.titulo" class="w-full h-32 object-cover">
              <div class="p-3 flex flex-col flex-1">
                <h2 class="text-sm font-bold text-gray-800 mb-2">{{ category.titulo }}</h2>
                <p class="text-xs text-gray-500 leading-relaxed mb-3">{{ category.descripcion }}</p>
                <a [routerLink]="['/categoria', category.titulo]" class="bg-blue-600 text-white text-xs px-3 py-1.5 rounded hover:bg-blue-700 transition w-fit mt-auto">Ver más</a>
              </div>
            </article>
          }
        </div>
      }
    </main>
  `,
})
export class CategoriesComponent implements OnInit {
  private readonly newsService = inject(NewsService);
  categories: Categoria[] = [];
  error = '';

  async ngOnInit(): Promise<void> {
    try {
      this.categories = await this.newsService.getCategories();
    } catch (error) {
      console.error('Error al cargar las categorías:', error);
      this.error = 'No se pudieron cargar las categorías.';
    }
  }
}
