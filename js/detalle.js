const contenedorDetalle =
    document.getElementById(
        'detalle-noticia'
    );


// ==========================================
// OBTENER ID
// ==========================================

const parametros =
    new URLSearchParams(
        window.location.search
    );


const id =
    Number(
        parametros.get('id')
    );


// ==========================================
// CARGAR NOTICIA
// ==========================================

fetch('data/noticias.json')

    .then(response => {

        if (!response.ok) {

            throw new Error(
                'No se pudo cargar noticias.json'
            );

        }

        return response.json();

    })

    .then(noticias => {

        const noticia =
            noticias.find(
                noticia => noticia.id === id
            );


        // ==================================
        // NOTICIA NO ENCONTRADA
        // ==================================

        if (!noticia) {

            contenedorDetalle.innerHTML = `

                <div class="p-8 text-center">

                    <h1
                        class="
                            text-xl
                            font-bold
                            text-gray-800
                            mb-3
                        "
                    >
                        Noticia no encontrada
                    </h1>

                    <a
                        href="index.html"
                        class="
                            text-xs
                            text-blue-600
                            hover:text-blue-800
                        "
                    >
                        Volver a noticias
                    </a>

                </div>

            `;

            return;

        }


        // ==================================
        // MOSTRAR NOTICIA
        // ==================================

        contenedorDetalle.innerHTML = `

            <!-- IMAGEN -->

            <img
                src="${noticia.imagen}"
                alt="${noticia.titulo}"
                class="
                    w-full
                    h-64
                    object-cover
                "
            >


            <!-- CONTENIDO -->

            <div class="p-6">


                <!-- CATEGORIA -->

                <span
                    class="
                        inline-block
                        bg-blue-50
                        text-blue-600
                        text-xs
                        px-2
                        py-1
                        rounded
                        mb-3
                    "
                >
                    ${noticia.categoria}
                </span>


                <!-- TITULO -->

                <h1
                    class="
                        text-2xl
                        md:text-3xl
                        font-bold
                        text-gray-800
                        mb-4
                    "
                >
                    ${noticia.titulo}
                </h1>


                <!-- DESCRIPCION -->

                <p
                    class="
                        text-sm
                        text-gray-600
                        leading-7
                        mb-6
                    "
                >
                    ${noticia.descripcion}
                </p>


                <!-- ACCIONES -->

                <div class="flex gap-3">

                    <a
                        href="filtro.html?categoria=${noticia.categoria}"
                        class="
                            bg-blue-600
                            text-white
                            text-xs
                            px-4
                            py-2
                            rounded
                            hover:bg-blue-700
                            transition
                        "
                    >
                        Ver más noticias de ${noticia.categoria}
                    </a>

                </div>

            </div>

        `;

    })

    .catch(error => {

        console.error(
            'Error al cargar la noticia:',
            error
        );


        contenedorDetalle.innerHTML = `

            <div
                class="
                    p-6
                    text-center
                    text-sm
                    text-red-600
                "
            >
                No se pudo cargar la noticia.
            </div>

        `;

    });