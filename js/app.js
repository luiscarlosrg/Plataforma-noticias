const contenedorNoticias =
    document.getElementById('contenedor-noticias');


// ==========================================
// FAVORITOS
// ==========================================

function obtenerFavoritos() {

    return JSON.parse(
        localStorage.getItem('favoritos')
    ) || [];

}


function guardarFavoritos(favoritos) {

    localStorage.setItem(
        'favoritos',
        JSON.stringify(favoritos)
    );

}


function alternarFavorito(id, boton) {

    let favoritos = obtenerFavoritos();


    if (favoritos.includes(id)) {

        favoritos = favoritos.filter(
            favoritoId => favoritoId !== id
        );

        boton.textContent = '☆ Favorito';

        boton.classList.remove(
            'bg-yellow-500'
        );

        boton.classList.add(
            'bg-yellow-400'
        );

    } else {

        favoritos.push(id);

        boton.textContent = '★ Favorito';

        boton.classList.remove(
            'bg-yellow-400'
        );

        boton.classList.add(
            'bg-yellow-500'
        );

    }


    guardarFavoritos(favoritos);

}


// ==========================================
// CREAR CARD
// ==========================================

function crearTarjeta(noticia) {

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

            <h3
                class="
                    text-sm
                    font-bold
                    text-gray-800
                    mb-2
                "
            >
                ${noticia.titulo}
            </h3>


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
                    Leer más
                </a>


                <button
                    type="button"
                    class="
                        boton-favorito
                        text-xs
                        px-3
                        py-1.5
                        rounded
                        transition
                    "
                >
                </button>

            </div>

        </div>
    `;


    const botonFavorito =
        tarjeta.querySelector(
            '.boton-favorito'
        );


    actualizarBotonFavorito(
        noticia.id,
        botonFavorito
    );


    botonFavorito.addEventListener(
        'click',
        () => {

            alternarFavorito(
                noticia.id,
                botonFavorito
            );

        }
    );


    return tarjeta;

}


// ==========================================
// ACTUALIZAR BOTON
// ==========================================

function actualizarBotonFavorito(
    id,
    boton
) {

    const favoritos =
        obtenerFavoritos();


    if (favoritos.includes(id)) {

        boton.textContent =
            '★ Favorito';

        boton.classList.add(
            'bg-yellow-500',
            'text-gray-900'
        );

    } else {

        boton.textContent =
            '☆ Favorito';

        boton.classList.add(
            'bg-yellow-400',
            'text-gray-900'
        );

    }

}


// ==========================================
// CARGAR NOTICIAS
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

        noticias.forEach(noticia => {

            const tarjeta =
                crearTarjeta(noticia);

            contenedorNoticias.appendChild(
                tarjeta
            );

        });

    })

    .catch(error => {

        console.error(
            'Error al cargar las noticias:',
            error
        );


        contenedorNoticias.innerHTML = `

            <div
                class="
                    col-span-full
                    bg-red-50
                    border
                    border-red-200
                    text-red-700
                    rounded
                    p-4
                    text-sm
                "
            >
                No se pudieron cargar las noticias.
            </div>

        `;

    });