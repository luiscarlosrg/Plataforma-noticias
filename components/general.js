class HeaderComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<header class="bg-blue-600 text-white shadow-sm">

        <nav
            class="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between"
        >

            <!-- LOGO -->

            <a
                href="index.html"
                class="font-bold text-lg"
            >
                📰 NovaNews
            </a>


            <!-- MENU -->

            <div class="flex items-center gap-2 text-xs">

                <a
                    href="index.html"
                    class="bg-blue-700 px-3 py-2 rounded hover:bg-blue-800 transition"
                >
                    Inicio
                </a>

                <a
                    href="categorias.html"
                    class="px-3 py-2 rounded hover:bg-blue-700 transition"
                >
                    Categorías
                </a>

                <a
                    href="favoritos.html"
                    class="px-3 py-2 rounded hover:bg-blue-700 transition"
                >
                    Favoritos
                </a>

                <a
                    href="contacto.html"
                    class="px-3 py-2 rounded hover:bg-blue-700 transition"
                >
                    Contacto
                </a>

            </div>

        </nav>

    </header>`;
    }
}

class FooterComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `    <footer
        class="bg-gray-900 text-gray-300 mt-8"
    >

        <div
            class="
                max-w-6xl
                mx-auto
                px-6
                py-8
                grid
                grid-cols-1
                md:grid-cols-4
                gap-6
            "
        >

            <div>

                <h3
                    class="text-white font-bold mb-2"
                >
                    📰 NovaNews
                </h3>

                <p class="text-xs leading-relaxed">
                    Tu portal de noticias actualizado.
                    Información sobre tecnología,
                    ciencia, turismo e innovación.
                </p>

            </div>


            <div>

                <h3
                    class="text-white font-bold mb-2"
                >
                    Secciones
                </h3>

                <ul class="text-xs space-y-1">

                    <li>Tecnología</li>
                    <li>Turismo</li>
                    <li>Ciencia</li>
                    <li>Innovación</li>

                </ul>

            </div>


            <div id="contacto">

                <h3
                    class="text-white font-bold mb-2"
                >
                    Contacto
                </h3>

                <ul class="text-xs space-y-1">

                    <li>📧 contacto@novanews.com</li>
                    <li>📞 +57 300 123 4567</li>
                    <li>📍 Colombia</li>

                </ul>

            </div>


            <div>

                <h3
                    class="text-white font-bold mb-2"
                >
                    Redes sociales
                </h3>

                <div class="flex gap-2">

                    <span
                        class="bg-gray-800 px-2 py-1 text-xs rounded"
                    >
                        Twitter
                    </span>

                    <span
                        class="bg-gray-800 px-2 py-1 text-xs rounded"
                    >
                        Facebook
                    </span>

                    <span
                        class="bg-gray-800 px-2 py-1 text-xs rounded"
                    >
                        Instagram
                    </span>

                </div>

            </div>

        </div>


        <div
            class="border-t border-gray-800 text-center py-4"
        >

            <p class="text-xs text-gray-500">
                © 2026 NovaNews - Luis Carlos Rico. Todos los derechos reservados.
            </p>

        </div>

    </footer>
    `;
    }
}
customElements.define('header-component', HeaderComponent);
customElements.define('footer-component', FooterComponent);