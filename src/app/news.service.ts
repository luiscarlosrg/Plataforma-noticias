import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Categoria, Noticia } from './models';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private readonly http = inject(HttpClient);

  async getNews(): Promise<Noticia[]> {
    const storedNews = localStorage.getItem('noticias');
    if (storedNews !== null) {
      return this.parseStoredValue<Noticia[]>(storedNews, 'noticias');
    }

    const news = await firstValueFrom(
      this.http.get<Noticia[]>('data/noticias.json'),
    );
    localStorage.setItem('noticias', JSON.stringify(news));
    return news;
  }

  async getCategories(): Promise<Categoria[]> {
    return firstValueFrom(this.http.get<Categoria[]>('data/categorias.json'));
  }

  async createNews(input: Omit<Noticia, 'id'>): Promise<Noticia[]> {
    const news = await this.getNews();
    const id = news.reduce((maximum, item) => Math.max(maximum, item.id), 0) + 1;
    const updatedNews = [...news, { ...input, id }];
    this.saveNews(updatedNews);
    return updatedNews;
  }

  async deleteNews(id: number): Promise<Noticia[]> {
    const updatedNews = (await this.getNews()).filter((item) => item.id !== id);
    this.saveNews(updatedNews);

    const favorites = this.getFavorites().filter((favoriteId) => favoriteId !== id);
    localStorage.setItem('favoritos', JSON.stringify(favorites));
    return updatedNews;
  }

  getFavorites(): number[] {
    const storedFavorites = localStorage.getItem('favoritos');
    return storedFavorites === null
      ? []
      : this.parseStoredValue<number[]>(storedFavorites, 'favoritos');
  }

  isFavorite(id: number): boolean {
    return this.getFavorites().includes(id);
  }

  toggleFavorite(id: number): boolean {
    const favorites = this.getFavorites();
    const isFavorite = favorites.includes(id);
    const updatedFavorites = isFavorite
      ? favorites.filter((favoriteId) => favoriteId !== id)
      : [...favorites, id];

    localStorage.setItem('favoritos', JSON.stringify(updatedFavorites));
    return !isFavorite;
  }

  private saveNews(news: Noticia[]): void {
    localStorage.setItem('noticias', JSON.stringify(news));
  }

  private parseStoredValue<T>(value: string, key: string): T {
    try {
      return JSON.parse(value) as T;
    } catch (error) {
      throw new Error(`Los datos guardados en "${key}" no son válidos.`, {
        cause: error,
      });
    }
  }
}
