// ==========================================
// OBTENER FAVORITOS
// ==========================================

export function obtenerFavoritos() {

    return JSON.parse(
        localStorage.getItem('favoritos')
    ) || [];

}


// ==========================================
// GUARDAR FAVORITOS
// ==========================================

export function guardarFavoritos(
    favoritos
) {

    localStorage.setItem(
        'favoritos',
        JSON.stringify(favoritos)
    );

}


// ==========================================
// COMPROBAR SI ES FAVORITO
// ==========================================

export function esFavorito(id) {

    const favoritos =
        obtenerFavoritos();

    return favoritos.includes(id);

}


// ==========================================
// ALTERNAR FAVORITO
// ==========================================

export function alternarFavorito(id) {

    let favoritos =
        obtenerFavoritos();


    if (
        favoritos.includes(id)
    ) {

        favoritos =
            favoritos.filter(
                favoritoId =>
                    favoritoId !== id
            );

    } else {

        favoritos.push(id);

    }


    guardarFavoritos(
        favoritos
    );


    return favoritos;
}