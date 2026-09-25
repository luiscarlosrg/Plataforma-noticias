// ==========================================
// OBTENER ID
// ==========================================

const parametros =
    new URLSearchParams(
        window.location.search
    );


const categoria =
    parametros.get('categoria');

const myHeading = document.getElementById("demo");


myHeading.innerHTML = ` <h2 class="text-lg font-bold text-gray-800">${categoria}</h2>`;

