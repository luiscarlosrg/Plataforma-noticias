import {
    obtenerNoticias,
    crearNoticia,
    eliminarNoticia as eliminarNoticiaStorage
} from './noticias-storage.js';


// ==========================================
// ELEMENTOS DEL DOM
// ==========================================

const formulario =
    document.getElementById(
        'formulario-noticia'
    );

const listaNoticias =
    document.getElementById(
        'lista-noticias'
    );


// CAMPOS

const campoTitulo =
    document.getElementById('titulo');

const campoDescripcion =
    document.getElementById('descripcion');

const campoImagen =
    document.getElementById('imagen');


// MENSAJES DE ERROR

const errorTitulo =
    document.getElementById('error-titulo');

const errorDescripcion =
    document.getElementById('error-descripcion');

const errorImagen =
    document.getElementById('error-imagen');


// ==========================================
// CARGAR NOTICIAS
// ==========================================

async function cargarNoticias() {

    try {

        const noticias =
            await obtenerNoticias();

        mostrarNoticias(noticias);

    } catch (error) {

        console.error(
            'Error al cargar las noticias:',
            error
        );

    }
}


// ==========================================
// MOSTRAR NOTICIAS
// ==========================================

function mostrarNoticias(noticias) {

    listaNoticias.innerHTML = '';


    if (noticias.length === 0) {

        listaNoticias.innerHTML = `

            <div class="col-span-full bg-white rounded-xl shadow-md p-8 text-center">

                <p class="text-gray-600">
                    No existen noticias registradas.
                </p>

            </div>

        `;

        return;
    }


    noticias.forEach(noticia => {

        const tarjeta =
            document.createElement('article');


        tarjeta.className =
            'bg-white rounded-xl shadow-md overflow-hidden';


        tarjeta.innerHTML = `

            <img
                src="${noticia.imagen}"
                alt="${noticia.titulo}"
                class="w-full h-48 object-cover"
            >

            <div class="p-5">

                <h4
                    class="text-lg font-bold text-gray-800 mb-3"
                >
                    ${noticia.titulo}
                </h4>

                <p
                    class="text-gray-600 text-sm mb-5"
                >
                    ${noticia.descripcion}
                </p>

                <button
                    type="button"
                    class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    data-id="${noticia.id}"
                >
                    Eliminar
                </button>

            </div>

        `;


        // Botón eliminar

        const botonEliminar =
            tarjeta.querySelector(
                'button'
            );


        botonEliminar.addEventListener(
            'click',
            () => eliminarNoticia(noticia.id)
        );


        listaNoticias.appendChild(
            tarjeta
        );

    });
}


// ==========================================
// ELIMINAR NOTICIA
// ==========================================

async function eliminarNoticia(id) {

    const confirmar =
        confirm(
            '¿Estás seguro de que deseas eliminar esta noticia?'
        );


    if (!confirmar) {

        return;
    }


    try {

        const noticias =
            await eliminarNoticiaStorage(id);


        mostrarNoticias(noticias);


    } catch (error) {

        console.error(
            'Error al eliminar la noticia:',
            error
        );

    }
}


// ==========================================
// VALIDAR FORMULARIO
// ==========================================

function validarFormulario() {

    let formularioValido = true;


    // Limpiar errores

    errorTitulo.textContent = '';

    errorDescripcion.textContent = '';

    errorImagen.textContent = '';


    // ======================================
    // TÍTULO
    // ======================================

    if (
        campoTitulo.value.trim() === ''
    ) {

        errorTitulo.textContent =
            'El título es obligatorio.';

        formularioValido = false;
    }


    // ======================================
    // DESCRIPCIÓN
    // ======================================

    if (
        campoDescripcion.value.trim() === ''
    ) {

        errorDescripcion.textContent =
            'La descripción es obligatoria.';

        formularioValido = false;
    }


    // ======================================
    // IMAGEN
    // ======================================

    if (
        campoImagen.value.trim() === ''
    ) {

        errorImagen.textContent =
            'La URL de la imagen es obligatoria.';

        formularioValido = false;
    }


    return formularioValido;
}


// ==========================================
// CREAR NOTICIA
// ==========================================

formulario.addEventListener(
    'submit',
    async function (evento) {

        evento.preventDefault();


        // Validar

        if (!validarFormulario()) {

            return;
        }


        try {

            await crearNoticia(

                campoTitulo.value.trim(),

                campoDescripcion.value.trim(),

                campoImagen.value.trim()

            );


            // Limpiar formulario

            formulario.reset();


            // Volver a cargar noticias

            await cargarNoticias();


            alert(
                'La noticia fue creada correctamente.'
            );


        } catch (error) {

            console.error(
                'Error al crear la noticia:',
                error
            );

        }

    }
);


// ==========================================
// INICIAR
// ==========================================

cargarNoticias();