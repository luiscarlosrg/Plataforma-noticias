import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewsCardComponent } from '../news-card.component';
import { Categoria, Noticia } from '../models';
import { NewsService } from '../news.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, NewsCardComponent],
  template: `
    <main class="max-w-7xl mx-auto px-6 py-10 w-full">
      <h1 class="text-lg font-bold text-gray-800 mb-5">Noticias</h1>
      <section class="bg-white rounded-xl shadow-md p-6 mb-10">
        <h2 class="text-xl font-bold text-gray-800 mb-6">Crear nueva noticia</h2>
        <form [formGroup]="form" (ngSubmit)="createNews()">
          <div class="mb-5">
            <label for="titulo" class="block text-sm font-semibold text-gray-700 mb-2">Título</label>
            <input id="titulo" formControlName="titulo" placeholder="Título de la noticia" class="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500">
            @if (form.controls.titulo.touched && form.controls.titulo.invalid) {
              <p class="text-red-500 text-xs mt-1">El título es obligatorio.</p>
            }
          </div>
          <div class="mb-5">
            <label for="categoria" class="block text-sm font-semibold text-gray-700 mb-2">Categoría</label>
            <select id="categoria" formControlName="categoria" class="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Seleccionar categoría</option>
              @for (category of categories; track category.id) {
                <option [value]="category.titulo">{{ category.titulo }}</option>
              }
            </select>
            @if (form.controls.categoria.touched && form.controls.categoria.invalid) {
              <p class="text-red-500 text-xs mt-1">La categoría es obligatoria.</p>
            }
          </div>
          <div class="mb-5">
            <label for="descripcion" class="block text-sm font-semibold text-gray-700 mb-2">Descripción</label>
            <textarea id="descripcion" formControlName="descripcion" rows="4" placeholder="Descripción de la noticia" class="w-full border border-gray-300 rounded px-3 py-2 outline-none resize-none focus:ring-2 focus:ring-blue-500"></textarea>
            @if (form.controls.descripcion.touched && form.controls.descripcion.invalid) {
              <p class="text-red-500 text-xs mt-1">La descripción es obligatoria.</p>
            }
          </div>
          <div class="mb-5">
            <label for="imagen" class="block text-sm font-semibold text-gray-700 mb-2">URL de la imagen</label>
            <input id="imagen" type="url" formControlName="imagen" placeholder="https://..." class="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500">
            @if (form.controls.imagen.touched && form.controls.imagen.invalid) {
              <p class="text-red-500 text-xs mt-1">Ingresa una URL de imagen válida.</p>
            }
          </div>
          @if (error) {
            <p role="alert" class="text-red-600 text-sm mb-4">{{ error }}</p>
          }
          <button type="submit" class="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition">Crear noticia</button>
        </form>
      </section>

      <section>
        <h2 class="text-xl font-bold text-gray-800 mb-6">Noticias existentes</h2>
        @if (news.length === 0) {
          <p class="bg-white rounded-xl shadow-md p-8 text-center text-gray-600">No existen noticias registradas.</p>
        } @else {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (item of news; track item.id) {
              <app-news-card [noticia]="item" [showFavoriteAction]="false" [allowDelete]="true" (deleteRequested)="deleteNews($event)" />
            }
          </div>
        }
      </section>
    </main>
  `,
})
export class ManagementComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly newsService = inject(NewsService);
  readonly form = this.formBuilder.nonNullable.group({
    titulo: ['', Validators.required],
    categoria: ['', Validators.required],
    descripcion: ['', Validators.required],
    imagen: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/i)]],
  });
  news: Noticia[] = [];
  categories: Categoria[] = [];
  error = '';

  async ngOnInit(): Promise<void> {
    try {
      [this.news, this.categories] = await Promise.all([
        this.newsService.getNews(),
        this.newsService.getCategories(),
      ]);
    } catch (error) {
      console.error('Error al cargar los datos de gestión:', error);
      this.error = 'No fue posible cargar las noticias y categorías.';
    }
  }

  async createNews(): Promise<void> {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    try {
      this.news = await this.newsService.createNews(this.form.getRawValue());
      this.form.reset();
      this.error = '';
    } catch (error) {
      console.error('Error al crear la noticia:', error);
      this.error = 'No fue posible crear la noticia.';
    }
  }

  async deleteNews(id: number): Promise<void> {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta noticia?')) {
      return;
    }

    try {
      this.news = await this.newsService.deleteNews(id);
      this.error = '';
    } catch (error) {
      console.error('Error al eliminar la noticia:', error);
      this.error = 'No fue posible eliminar la noticia.';
    }
  }
}
