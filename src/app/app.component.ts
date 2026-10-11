import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen bg-gray-100 text-gray-800 flex flex-col">
      <header class="bg-blue-600 text-white shadow-sm">
        <nav class="max-w-6xl mx-auto px-5 py-3 flex flex-wrap items-center justify-between gap-3">
          <a routerLink="/" class="font-bold text-lg">📰 NovaNews</a>
          <div class="flex flex-wrap items-center gap-2 text-xs">
            <a routerLink="/" [routerLinkActiveOptions]="{ exact: true }" routerLinkActive="bg-blue-700" class="px-3 py-2 rounded hover:bg-blue-700 transition">Inicio</a>
            <a routerLink="/noticias" routerLinkActive="bg-blue-700" class="px-3 py-2 rounded hover:bg-blue-700 transition">Noticias</a>
            <a routerLink="/categorias" routerLinkActive="bg-blue-700" class="px-3 py-2 rounded hover:bg-blue-700 transition">Categorías</a>
            <a routerLink="/favoritos" routerLinkActive="bg-blue-700" class="px-3 py-2 rounded hover:bg-blue-700 transition">Favoritos</a>
            <a routerLink="/contacto" routerLinkActive="bg-blue-700" class="px-3 py-2 rounded hover:bg-blue-700 transition">Contacto</a>
          </div>
        </nav>
      </header>

      <router-outlet />

      <footer class="bg-gray-900 text-gray-300 mt-8">
        <div class="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h2 class="text-white font-bold mb-2">📰 NovaNews</h2>
            <p class="text-xs leading-relaxed">Tu portal de noticias actualizado. Información sobre tecnología, ciencia, turismo e innovación.</p>
          </div>
          <div>
            <h2 class="text-white font-bold mb-2">Secciones</h2>
            <ul class="text-xs space-y-1"><li>Tecnología</li><li>Turismo</li><li>Ciencia</li><li>Innovación</li></ul>
          </div>
          <div>
            <h2 class="text-white font-bold mb-2">Contacto</h2>
            <ul class="text-xs space-y-1"><li>📧 contacto@novanews.com</li><li>📞 +57 300 123 4567</li><li>📍 Colombia</li></ul>
          </div>
          <div>
            <h2 class="text-white font-bold mb-2">Redes sociales</h2>
            <div class="flex gap-2 text-xs"><span class="bg-gray-800 px-2 py-1 rounded">Twitter</span><span class="bg-gray-800 px-2 py-1 rounded">Facebook</span><span class="bg-gray-800 px-2 py-1 rounded">Instagram</span></div>
          </div>
        </div>
        <div class="border-t border-gray-800 text-center py-4">
          <p class="text-xs text-gray-500">© 2026 NovaNews - Luis Carlos Rico. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  `,
})
export class AppComponent {}
