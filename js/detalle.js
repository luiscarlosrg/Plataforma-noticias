const contenedorDetalle = document.getElementById('detalle-noticia');

const parametros = new URLSearchParams(window.location.search);

const id = Number(parametros.get('id'));

console.log('ID recibido:', id);


fetch('data/noticias.json')
    .then(response => response.json())
    .then(noticias => {

        const noticia = noticias.find(noticia => noticia.id === id);

        if (!noticia) {

            contenedorDetalle.innerHTML = `
                <div class="p-8 text-center">

                    <h1 class="text-3xl font-bold text-gray-800 mb-4">
                        Noticia no encontrada
                    </h1>

                    <a
                        href="index.html"
                        class="text-blue-600 hover:text-blue-800"
                    >
                        Volver a noticias
                    </a>

                </div>
            `;

            return;
        }


        contenedorDetalle.innerHTML = `

            <img
                src="${noticia.imagen}"
                alt="${noticia.titulo}"
                class="w-full h-80 object-cover"
            >

            <div class="p-8">

                <h1 class="text-4xl font-bold text-gray-800 mb-6">
                    ${noticia.titulo}
                </h1>

                <p class="text-lg text-gray-600 leading-relaxed">
                    ${noticia.descripcion}
                </p>

            </div>

        `;

    })
    .catch(error => {

        console.error(
            'Error al cargar la noticia:',
            error
        );

    });