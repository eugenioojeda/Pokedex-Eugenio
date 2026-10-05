const formulario = document.querySelector("#formulario-busqueda");
const inputBusqueda = document.querySelector("#busqueda");
const mensaje = document.querySelector("#mensaje");
const resultado = document.querySelector("#resultado");

console.log(formulario);
console.log(inputBusqueda);
console.log(mensaje);
console.log(resultado);

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const busqueda = inputBusqueda.value.trim().toLowerCase();

    if (!busqueda) {
        mensaje.textContent = "Introduce un nombre o número.";
        resultado.innerHTML = "";
        return;
}

    console.log(busqueda);
});

