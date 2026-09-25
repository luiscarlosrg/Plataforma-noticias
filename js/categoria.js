const contenedorCategorias =
    document.getElementById('contenedor-categorias');
// ==========================================
// CREAR CARD
// ==========================================

function crearTarjeta(categoria) {

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
            src="${categoria.imagen}"
            alt="${categoria.titulo}"
            class="w-full h-32 object-cover"
        >


        <!-- CONTENIDO -->

        <div class="p-3 flex flex-col flex-1">
            <!-- TITULO -->

            <h3
                class="
                    text-sm
                    font-bold
                    text-gray-800
                    mb-2
                "
            >
                ${categoria.titulo}
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
                ${categoria.descripcion}
            </p>


            <!-- BOTONES -->

            <div
                class="flex gap-2 mt-auto"
            >

                <a
                    href="filtro.html?categoria=${categoria.titulo}"
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
                    Ver más
                </a>
                </div>

        </div>
    `;
    return tarjeta;

}



// ==========================================
// CARGAR CATEGORIAS
// ==========================================

fetch('data/categorias.json')

    .then(response => {

        if (!response.ok) {

            throw new Error(
                'No se pudo cargar categorías.json'
            );

        }

        return response.json();

    })

    .then(categorias => {

        categorias.forEach(categoria => {

            const tarjeta =
                crearTarjeta(categoria);

            contenedorCategorias.appendChild(
                tarjeta
            );

        });

    })

    .catch(error => {

        console.error(
            'Error al cargar las categorías:',
            error
        );


        contenedorCategorias.innerHTML = `

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
                No se pudieron cargar las categorías.
            </div>

        `;

    });