// ==========================================
// OBTENER NOTICIAS
// ==========================================

export async function obtenerNoticias() {

    const noticiasGuardadas =
        localStorage.getItem('noticias');

    // Si ya existen noticias en localStorage,
    // las utilizamos.

    if (noticiasGuardadas) {

        return JSON.parse(noticiasGuardadas);
    }


    // Si no existen, las cargamos desde JSON.

    const respuesta =
        await fetch('data/noticias.json');

    const noticias =
        await respuesta.json();


    // Guardamos las noticias iniciales.

    localStorage.setItem(
        'noticias',
        JSON.stringify(noticias)
    );


    return noticias;
}


// ==========================================
// GUARDAR NOTICIAS
// ==========================================

export function guardarNoticias(noticias) {

    localStorage.setItem(
        'noticias',
        JSON.stringify(noticias)
    );
}


// ==========================================
// CREAR NOTICIA
// ==========================================

export async function crearNoticia(
    titulo,
    descripcion,
    imagen
) {

    const noticias =
        await obtenerNoticias();


    // Generamos un nuevo ID.

    const nuevoId =
        noticias.length > 0
            ? Math.max(
                ...noticias.map(noticia => noticia.id)
            ) + 1
            : 1;


    const nuevaNoticia = {

        id: nuevoId,

        titulo: titulo,

        descripcion: descripcion,

        imagen: imagen

    };


    noticias.push(nuevaNoticia);


    guardarNoticias(noticias);


    return nuevaNoticia;
}


// ==========================================
// ELIMINAR NOTICIA
// ==========================================

export async function eliminarNoticia(id) {

    const noticias =
        await obtenerNoticias();


    const nuevasNoticias =
        noticias.filter(
            noticia =>
                noticia.id !== id
        );


    guardarNoticias(
        nuevasNoticias
    );


    // ======================================
    // ELIMINAR TAMBIÉN DE FAVORITOS
    // ======================================

    const favoritos =
        JSON.parse(
            localStorage.getItem(
                'favoritos'
            )
        ) || [];


    const nuevosFavoritos =
        favoritos.filter(
            favoritoId =>
                favoritoId !== id
        );


    localStorage.setItem(
        'favoritos',
        JSON.stringify(
            nuevosFavoritos
        )
    );


    return nuevasNoticias;
}