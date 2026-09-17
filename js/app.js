import {
    alternarFavorito,
    esFavorito
} from './favoritos-storage.js';


const contenedorNoticias =
    document.getElementById('contenedor-noticias');


fetch('data/noticias.json')
    .then(response => response.json())
    .then(noticias => {

        noticias.forEach(noticia => {

            const tarjeta =
                document.createElement('article');

            tarjeta.className =
                'bg-white rounded-xl shadow-md overflow-hidden';


            tarjeta.innerHTML = `
                <img
                    src="${noticia.imagen}"
                    alt="${noticia.titulo}"
                    class="w-full h-52 object-cover"
                >

                <div class="p-6">

                    <h3 class="text-xl font-bold text-gray-800 mb-3">
                        ${noticia.titulo}
                    </h3>

                    <p class="text-gray-600 mb-5">
                        ${noticia.descripcion}
                    </p>

                    <div class="flex gap-2">

                        <a
                            href="detalle.html?id=${noticia.id}"
                            class="inline-block bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700"
                        >
                            Ver más
                        </a>

                        <button
                            type="button"
                            class="boton-favorito bg-yellow-400 text-gray-800 px-5 py-2 rounded-lg hover:bg-yellow-500"
                        >
                        </button>

                    </div>

                </div>
            `;


            const botonFavorito =
                tarjeta.querySelector('.boton-favorito');


            function actualizarBoton() {

                if (esFavorito(noticia.id)) {

                    botonFavorito.textContent =
                        '★ Quitar favorito';

                } else {

                    botonFavorito.textContent =
                        '☆ Agregar favorito';

                }

            }


            actualizarBoton();


            botonFavorito.addEventListener(
                'click',
                () => {

                    alternarFavorito(noticia.id);

                    actualizarBoton();

                }
            );


            contenedorNoticias.appendChild(tarjeta);

        });

    })
    .catch(error => {

        console.error(
            'Error al cargar las noticias:',
            error
        );

    });