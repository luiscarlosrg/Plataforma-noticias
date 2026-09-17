import {
    obtenerFavoritos,
    alternarFavorito
} from './favoritos-storage.js';


const contenedorFavoritos =
    document.getElementById('contenedor-favoritos');


function mostrarMensajeVacio() {

    contenedorFavoritos.innerHTML = `
        <div class="col-span-full bg-white rounded-xl p-8 text-center">

            <p class="text-gray-600 text-lg">
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

}


const favoritos = obtenerFavoritos();


fetch('data/noticias.json')
    .then(response => response.json())
    .then(noticias => {

        const noticiasFavoritas =
            noticias.filter(
                noticia => favoritos.includes(noticia.id)
            );


        if (noticiasFavoritas.length === 0) {

            mostrarMensajeVacio();

            return;

        }


        noticiasFavoritas.forEach(noticia => {

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

                    <h2 class="text-xl font-bold text-gray-800 mb-3">
                        ${noticia.titulo}
                    </h2>

                    <p class="text-gray-600 mb-5">
                        ${noticia.descripcion}
                    </p>

                    <div class="flex gap-2">

                        <a
                            href="detalle.html?id=${noticia.id}"
                            class="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                        >
                            Ver más
                        </a>

                        <button
                            type="button"
                            class="boton-quitar bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
                        >
                            Quitar
                        </button>

                    </div>

                </div>
            `;


            const botonQuitar =
                tarjeta.querySelector('.boton-quitar');


            botonQuitar.addEventListener(
                'click',
                () => {

                    alternarFavorito(noticia.id);

                    tarjeta.remove();


                    if (
                        contenedorFavoritos.children.length === 0
                    ) {

                        mostrarMensajeVacio();

                    }

                }
            );


            contenedorFavoritos.appendChild(tarjeta);

        });

    })
    .catch(error => {

        console.error(
            'Error al cargar favoritos:',
            error
        );

    });