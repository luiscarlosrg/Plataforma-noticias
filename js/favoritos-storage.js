
export function obtenerFavoritos() {

    return JSON.parse(
        localStorage.getItem('favoritos')
    ) || [];

}


export function guardarFavoritos(favoritos) {

    localStorage.setItem(
        'favoritos',
        JSON.stringify(favoritos)
    );

}


export function alternarFavorito(id) {

    let favoritos = obtenerFavoritos();

    if (favoritos.includes(id)) {

        favoritos = favoritos.filter(
            favoritoId => favoritoId !== id
        );

    } else {

        favoritos.push(id);

    }

    guardarFavoritos(favoritos);

    return favoritos;

}


export function esFavorito(id) {

    return obtenerFavoritos().includes(id);

}
