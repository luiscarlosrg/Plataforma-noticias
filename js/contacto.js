const formulario =
    document.getElementById(
        'formulario-contacto'
    );


// ==========================================
// CAMPOS
// ==========================================

const campoNombre =
    document.getElementById('nombre');

const campoCorreo =
    document.getElementById('correo');

const campoAsunto =
    document.getElementById('asunto');

const campoMensaje =
    document.getElementById('mensaje');


// ==========================================
// MENSAJES DE ERROR
// ==========================================

const errorNombre =
    document.getElementById('error-nombre');

const errorCorreo =
    document.getElementById('error-correo');

const errorAsunto =
    document.getElementById('error-asunto');

const errorMensaje =
    document.getElementById('error-mensaje');


// ==========================================
// MODAL
// ==========================================

const modal =
    document.getElementById('modal');

const modalIcono =
    document.getElementById('modal-icono');

const modalTitulo =
    document.getElementById('modal-titulo');

const modalMensaje =
    document.getElementById('modal-mensaje');

const modalCerrar =
    document.getElementById('modal-cerrar');


// ==========================================
// MOSTRAR MODAL
// ==========================================

function mostrarModal(
    titulo,
    mensaje,
    tipo
) {

    modalTitulo.textContent =
        titulo;

    modalMensaje.textContent =
        mensaje;


    if (tipo === 'error') {

        modalIcono.textContent = '⚠️';

        modalCerrar.classList.remove(
            'bg-green-600',
            'hover:bg-green-700'
        );

        modalCerrar.classList.add(
            'bg-red-500',
            'hover:bg-red-600'
        );

    } else {

        modalIcono.textContent = '✓';

        modalCerrar.classList.remove(
            'bg-red-500',
            'hover:bg-red-600'
        );

        modalCerrar.classList.add(
            'bg-green-600',
            'hover:bg-green-700'
        );

    }


    modal.classList.remove('hidden');

    modal.classList.add('flex');

}


// ==========================================
// CERRAR MODAL
// ==========================================

function cerrarModal() {

    modal.classList.add('hidden');

    modal.classList.remove('flex');

}


modalCerrar.addEventListener(
    'click',
    cerrarModal
);


// ==========================================
// CERRAR AL HACER CLICK FUERA
// ==========================================

modal.addEventListener(
    'click',
    function (evento) {

        if (evento.target === modal) {

            cerrarModal();

        }

    }
);


// ==========================================
// ENVIAR FORMULARIO
// ==========================================

formulario.addEventListener(
    'submit',
    function (evento) {

        evento.preventDefault();


        // Limpiar mensajes anteriores

        errorNombre.textContent = '';
        errorCorreo.textContent = '';
        errorAsunto.textContent = '';
        errorMensaje.textContent = '';


        let formularioValido = true;


        // ==================================
        // NOMBRE
        // ==================================

        if (
            campoNombre.value.trim() === ''
        ) {

            errorNombre.textContent =
                'El nombre es obligatorio.';

            formularioValido = false;

        }


        // ==================================
        // CORREO
        // ==================================

        if (
            campoCorreo.value.trim() === ''
        ) {

            errorCorreo.textContent =
                'El correo es obligatorio.';

            formularioValido = false;

        } else {

            const patronCorreo =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !patronCorreo.test(
                    campoCorreo.value.trim()
                )
            ) {

                errorCorreo.textContent =
                    'Ingresa un correo electrónico válido.';

                formularioValido = false;

            }

        }


        // ==================================
        // ASUNTO
        // ==================================

        if (
            campoAsunto.value.trim() === ''
        ) {

            errorAsunto.textContent =
                'El asunto es obligatorio.';

            formularioValido = false;

        }


        // ==================================
        // MENSAJE
        // ==================================

        if (
            campoMensaje.value.trim() === ''
        ) {

            errorMensaje.textContent =
                'El mensaje es obligatorio.';

            formularioValido = false;

        }


        // ==================================
        // SI HAY ERRORES
        // ==================================

        if (!formularioValido) {

            return;

        }


        // ==================================
        // FORMULARIO CORRECTO
        // ==================================

        mostrarModal(
            '¡Mensaje enviado correctamente!',
            'Gracias por contactarnos. Hemos recibido tu mensaje correctamente.',
            'success'
        );

        // Limpiar formulario

        formulario.reset();

    }
);