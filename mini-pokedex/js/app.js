const formulario = document.querySelector("#formulario-busqueda");
const inputBusqueda = document.querySelector("#busqueda");
const mensaje = document.querySelector("#mensaje");
const resultado = document.querySelector("#resultado");
const botonBuscar = formulario.querySelector("button");



const obtenerPokemon = async (busqueda) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${busqueda}`;
  const respuesta = await fetch(url);

  if (!respuesta.ok) {
    throw new Error("Pokémon no encontrado.");
  }

  const datos = await respuesta.json();

  return {
    id: datos.id,
    nombre: datos.name,
    imagenFrente: datos.sprites.front_default,
    imagenEspalda: datos.sprites.back_default,
    imagenShiny: datos.sprites.shiny,
    altura: datos.height,
    peso: datos.weight,
    tipos: datos.types.map(({ type }) => type.name),
  };

};

const cargarPrimeraGeneracion = async () => {
  mensaje.textContent = "Cargando primera generación...";
  resultado.innerHTML = ""; // Limpiamos la pantalla antes de empezar

  try {
    // Creamos un array de promesas desde el ID 1 hasta el 151
    const promesas = [];
    for (let i = 1; i <= 151; i++) {
      promesas.push(obtenerPokemon(i));
    }

    // Esperamos a que se resuelvan todas las peticiones a la vez
    const listaPokemon = await Promise.all(promesas);

    // Limpiamos el mensaje de carga
    mensaje.textContent = "";

    // Los dibujamos todos en orden en el HTML
    listaPokemon.forEach((pokemon) => {
      mostrarPokemon(pokemon);
    });

  } catch (error) {
    mensaje.textContent = "Error al cargar la primera generación.";
    console.error(error);
  }
};

// Llamamos a la función automáticamente al cargar la página
cargarPrimeraGeneracion();


const formatearId = (id) => {
  return String(id).padStart(3, "0");
};

const mostrarPokemon = (pokemon) => {
  const tiposHTML = pokemon.tipos
    .map((tipo) => `<span class="tipo">${tipo}</span>`)
    .join("");

  resultado.innerHTML += `
    <article class="pokemon">
      <p class="pokemon__numero">N.º ${formatearId(pokemon.id)}</p>

<div class="pokemon__galeria">
        <img
          class="pokemon__imagen pokemon__imagen--espalda"
          src="${pokemon.imagenEspalda}"
          alt="Imagen de espalda de ${pokemon.nombre}"
        >
        <img
          class="pokemon__imagen pokemon__imagen--frente"
          src="${pokemon.imagenFrente}"
          alt="Imagen de frente de ${pokemon.nombre}"
        >
      </div>

      <h2 class="pokemon__nombre">${pokemon.nombre}</h2>

      <div class="pokemon__datos">
        <p><strong>Altura</strong><br>${pokemon.altura / 10} m</p>
        <p><strong>Peso</strong><br>${pokemon.peso / 10} kg</p>
      </div>

      <div class="pokemon__tipos">
        ${tiposHTML}
      </div>
    </article>
  `;
};


formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  console.log(inputBusqueda)
  const busqueda = inputBusqueda.value.trim().toLowerCase();

  if (!busqueda) {
    mensaje.textContent = "Introduce un nombre o número.";
    resultado.innerHTML = "";
    return;
  }

  mensaje.textContent = "Cargando...";
  resultado.innerHTML = "";

  try {
    botonBuscar.disabled = true;
    const pokemon = await obtenerPokemon(busqueda);

    mostrarPokemon(pokemon);

    mensaje.textContent = "";
    inputBusqueda.focus();


  } catch (error) {
    mensaje.textContent = error.message;
  }
  finally {
    botonBuscar.disabled = false;
  }

});

