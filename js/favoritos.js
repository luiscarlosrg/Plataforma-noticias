import {
    obtenerNoticias
} from './noticias-storage.js';

import {
    obtenerFavoritos,
    alternarFavorito
} from './favoritos-storage.js';


// ==========================================
// CONTENEDOR
// ==========================================

const contenedorFavoritos =
    document.getElementById(
        'contenedor-favoritos'
    );


// ==========================================
// MOSTRAR FAVORITOS
// ==========================================

function mostrarFavoritos(
    noticias
) {

    contenedorFavoritos.innerHTML = '';


    const favoritos =
        obtenerFavoritos();


    const noticiasFavoritas =
        noticias.filter(
            noticia =>
                favoritos.includes(
                    noticia.id
                )
        );


    // ======================================
    // SIN FAVORITOS
    // ======================================

    if (
        noticiasFavoritas.length === 0
    ) {

        contenedorFavoritos.innerHTML = `

            <div
                class="col-span-full bg-white rounded-xl p-8 text-center"
            >

                <p
                    class="text-gray-600 text-lg"
                >
                    No tienes noticias favoritas todavía.
                </p>


                <a
                    href="index.html"
                    class="inline-block mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                >
                    Explorar noticias
                </a>

            </div>

        `;

        return;
    }


    // ======================================
    // MOSTRAR FAVORITOS
    // ======================================

    noticiasFavoritas.forEach(
        noticia => {

            const tarjeta =
                document.createElement(
                    'article'
                );


            tarjeta.className =
                'bg-white rounded-xl shadow-md overflow-hidden';


            tarjeta.innerHTML = `

                <img
                    src="${noticia.imagen}"
                    alt="${noticia.titulo}"
                    class="w-full h-52 object-cover"
                >


                <div class="p-6">

                    <h2
                        class="text-xl font-bold text-gray-800 mb-3"
                    >
                        ${noticia.titulo}
                    </h2>


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
                            class="boton-quitar-favorito bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
                        >
                            Quitar favorito
                        </button>

                    </div>

                </div>

            `;


            // ==================================
            // QUITAR FAVORITO
            // ==================================

            const botonQuitar =
                tarjeta.querySelector(
                    '.boton-quitar-favorito'
                );


            botonQuitar.addEventListener(
                'click',
                () => {

                    alternarFavorito(
                        noticia.id
                    );


                    // Actualizamos la lista

                    mostrarFavoritos(
                        noticias
                    );

                }
            );


            contenedorFavoritos.appendChild(
                tarjeta
            );

        }
    );

}


// ==========================================
// CARGAR NOTICIAS
// ==========================================

async function cargarFavoritos() {

    try {

        const noticias =
            await obtenerNoticias();


        mostrarFavoritos(
            noticias
        );

    } catch (error) {

        console.error(
            'Error al cargar favoritos:',
            error
        );

    }

}


// ==========================================
// INICIAR
// ==========================================

cargarFavoritos();