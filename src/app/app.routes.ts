import { Routes } from '@angular/router';
import { CategoriesComponent } from './pages/categories.component';
import { CategoryNewsComponent } from './pages/category-news.component';
import { ContactComponent } from './pages/contact.component';
import { FavoritesComponent } from './pages/favorites.component';
import { HomeComponent } from './pages/home.component';
import { ManagementComponent } from './pages/management.component';
import { NewsDetailComponent } from './pages/news-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'NovaNews' },
  { path: 'noticias', component: ManagementComponent, title: 'Gestionar noticias - NovaNews' },
  { path: 'categorias', component: CategoriesComponent, title: 'Categorías - NovaNews' },
  { path: 'categoria/:categoria', component: CategoryNewsComponent, title: 'Noticias por categoría - NovaNews' },
  { path: 'favoritos', component: FavoritesComponent, title: 'Mis favoritos - NovaNews' },
  { path: 'contacto', component: ContactComponent, title: 'Contacto - NovaNews' },
  { path: 'noticia/:id', component: NewsDetailComponent, title: 'Detalle - NovaNews' },
  { path: '**', redirectTo: '' },
];
