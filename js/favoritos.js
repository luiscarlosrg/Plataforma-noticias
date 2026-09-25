const contenedorFavoritos =
    document.getElementById(
        'contenedor-favoritos'
    );


// ==========================================
// OBTENER FAVORITOS
// ==========================================

function obtenerFavoritos() {

    return JSON.parse(
        localStorage.getItem('favoritos')
    ) || [];

}


// ==========================================
// GUARDAR FAVORITOS
// ==========================================

function guardarFavoritos(favoritos) {

    localStorage.setItem(
        'favoritos',
        JSON.stringify(favoritos)
    );

}


// ==========================================
// MENSAJE CUANDO NO HAY FAVORITOS
// ==========================================

function mostrarMensajeVacio() {

    contenedorFavoritos.innerHTML = `

        <div
            class="
                col-span-full
                bg-white
                border
                border-gray-200
                rounded-md
                shadow-sm
                p-8
                text-center
            "
        >

            <div class="text-4xl mb-3">
                ⭐
            </div>


            <h2
                class="
                    text-lg
                    font-bold
                    text-gray-800
                    mb-2
                "
            >
                No tienes favoritos
            </h2>


            <p
                class="
                    text-xs
                    text-gray-500
                    mb-5
                "
            >
                Todavía no has guardado ninguna noticia.
            </p>


            <a
                href="index.html#noticias"
                class="
                    inline-block
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
                Explorar noticias
            </a>

        </div>

    `;

}


// ==========================================
// ELIMINAR FAVORITO
// ==========================================

function eliminarFavorito(
    id,
    tarjeta
) {

    let favoritos =
        obtenerFavoritos();


    favoritos =
        favoritos.filter(
            favoritoId => favoritoId !== id
        );


    guardarFavoritos(
        favoritos
    );


    tarjeta.remove();


    if (
        contenedorFavoritos.children.length === 0
    ) {

        mostrarMensajeVacio();

    }

}


// ==========================================
// CREAR CARD
// ==========================================

function crearTarjetaFavorito(
    noticia
) {

    const tarjeta =
        document.createElement('article');


    tarjeta.className = `
        bg-white
        border
        border-gray-200
        rounded-md
        overflow-hidden
        shadow-sm
        hover:shadow-md
        transition
        flex
        flex-col
    `;


    tarjeta.innerHTML = `

        <!-- IMAGEN -->

        <img
            src="${noticia.imagen}"
            alt="${noticia.titulo}"
            class="w-full h-32 object-cover"
        >


        <!-- CONTENIDO -->

        <div class="p-3 flex flex-col flex-1">


            <!-- CATEGORIA -->

            <span
                class="
                    inline-block
                    w-fit
                    bg-blue-50
                    text-blue-600
                    text-[10px]
                    px-1.5
                    py-0.5
                    rounded
                    mb-2
                "
            >
                [${noticia.categoria}]
            </span>


            <!-- TITULO -->

            <h2
                class="
                    text-sm
                    font-bold
                    text-gray-800
                    mb-2
                "
            >
                ${noticia.titulo}
            </h2>


            <!-- DESCRIPCION -->

            <p
                class="
                    text-xs
                    text-gray-500
                    leading-relaxed
                    mb-3
                "
            >
                ${noticia.descripcion}
            </p>


            <!-- BOTONES -->

            <div
                class="flex gap-2 mt-auto"
            >

                <a
                    href="detalle.html?id=${noticia.id}"
                    class="
                        bg-blue-600
                        text-white
                        text-xs
                        px-3
                        py-1.5
                        rounded
                        hover:bg-blue-700
                        transition
                    "
                >
                    Leer
                </a>


                <button
                    type="button"
                    class="
                        boton-eliminar
                        bg-red-500
                        text-white
                        text-xs
                        px-3
                        py-1.5
                        rounded
                        hover:bg-red-600
                        transition
                    "
                >
                    Eliminar
                </button>

            </div>

        </div>
    `;


    const botonEliminar =
        tarjeta.querySelector(
            '.boton-eliminar'
        );


    botonEliminar.addEventListener(
        'click',
        () => {

            eliminarFavorito(
                noticia.id,
                tarjeta
            );

        }
    );


    return tarjeta;

}


// ==========================================
// CARGAR FAVORITOS
// ==========================================

const favoritos =
    obtenerFavoritos();


if (favoritos.length === 0) {

    mostrarMensajeVacio();

} else {

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

            const noticiasFavoritas =
                noticias.filter(
                    noticia =>
                        favoritos.includes(
                            noticia.id
                        )
                );


            if (
                noticiasFavoritas.length === 0
            ) {

                mostrarMensajeVacio();

                return;

            }


            noticiasFavoritas.forEach(
                noticia => {

                    const tarjeta =
                        crearTarjetaFavorito(
                            noticia
                        );

                    contenedorFavoritos.appendChild(
                        tarjeta
                    );

                }
            );

        })

        .catch(error => {

            console.error(
                'Error al cargar favoritos:',
                error
            );

        });

}