import {
    obtenerNoticias
} from './noticias-storage.js';

import {
    esFavorito,
    alternarFavorito
} from './favoritos-storage.js';


// ==========================================
// CONTENEDOR
// ==========================================

const contenedorNoticias =
    document.getElementById(
        'contenedor-noticias'
    );


// ==========================================
// MOSTRAR NOTICIAS
// ==========================================

function mostrarNoticias(
    noticias
) {

    contenedorNoticias.innerHTML = '';


    if (noticias.length === 0) {

        contenedorNoticias.innerHTML = `

            <div
                class="col-span-full bg-white rounded-xl shadow-md p-8 text-center"
            >

                <p class="text-gray-600 text-lg">
                    No hay noticias disponibles.
                </p>

            </div>

        `;

        return;
    }


    noticias.forEach(
        noticia => {

            const tarjeta =
                document.createElement(
                    'article'
                );


            tarjeta.className =
                'bg-white rounded-xl shadow-md overflow-hidden';


            const favorito =
                esFavorito(
                    noticia.id
                );


            tarjeta.innerHTML = `

                <img
                    src="${noticia.imagen}"
                    alt="${noticia.titulo}"
                    class="w-full h-52 object-cover"
                >

                <div class="p-6">

                    <h3
                        class="text-xl font-bold text-gray-800 mb-3"
                    >
                        ${noticia.titulo}
                    </h3>

                    <p
                        class="text-gray-600 mb-5"
                    >
                        ${noticia.descripcion}
                    </p>


                    <div class="flex gap-3 flex-wrap">

                        <a
                            href="detalle.html?id=${noticia.id}"
                            class="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                        >
                            Ver más
                        </a>


                        <button
                            type="button"
                            class="
                                boton-favorito
                                px-5
                                py-2
                                rounded-lg
                                transition
                                ${
                                    favorito
                                        ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }
                            "
                        >
                            ${
                                favorito
                                    ? '⭐ Favorito'
                                    : '☆ Agregar a favoritos'
                            }
                        </button>

                    </div>

                </div>

            `;


            // ==================================
            // BOTÓN FAVORITO
            // ==================================

            const botonFavorito =
                tarjeta.querySelector(
                    '.boton-favorito'
                );


            botonFavorito.addEventListener(
                'click',
                () => {

                    const favoritos =
                        alternarFavorito(
                            noticia.id
                        );


                    const ahoraEsFavorito =
                        favoritos.includes(
                            noticia.id
                        );


                    if (
                        ahoraEsFavorito
                    ) {

                        botonFavorito.textContent =
                            '⭐ Favorito';

                        botonFavorito.className =
                            `
                            boton-favorito
                            px-5
                            py-2
                            rounded-lg
                            transition
                            bg-yellow-500
                            text-white
                            hover:bg-yellow-600
                            `;

                    } else {

                        botonFavorito.textContent =
                            '☆ Agregar a favoritos';

                        botonFavorito.className =
                            `
                            boton-favorito
                            px-5
                            py-2
                            rounded-lg
                            transition
                            bg-gray-200
                            text-gray-700
                            hover:bg-gray-300
                            `;

                    }

                }
            );


            contenedorNoticias.appendChild(
                tarjeta
            );

        }
    );

}


// ==========================================
// CARGAR NOTICIAS
// ==========================================

async function cargarNoticias() {

    try {

        const noticias =
            await obtenerNoticias();


        mostrarNoticias(
            noticias
        );

    } catch (error) {

        console.error(
            'Error al cargar las noticias:',
            error
        );


        contenedorNoticias.innerHTML = `

            <div
                class="col-span-full bg-red-50 border border-red-200 rounded-xl p-6 text-center"
            >

                <p class="text-red-600">
                    No fue posible cargar las noticias.
                </p>

            </div>

        `;

    }

}


// ==========================================
// INICIAR
// ==========================================

cargarNoticias();