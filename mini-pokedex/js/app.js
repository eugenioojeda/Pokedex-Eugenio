const formulario = document.querySelector("#formulario-busqueda");
const inputBusqueda = document.querySelector("#busqueda");
const mensaje = document.querySelector("#mensaje");
const resultado = document.querySelector("#resultado");
const botonBuscar = formulario.querySelector("button");
const coloresTipos = {
  grass: "#78C850", fire: "#F08030", water: "#6890F0", bug: "#A8B820",
  normal: "#A8A878", poison: "#A040A0", electric: "#F8D030", ground: "#E0C068",
  fairy: "#EE99AC", fighting: "#C03028", psychic: "#F85888", rock: "#B8A038",
  ghost: "#705898", ice: "#98D8D8", dragon: "#7038F8", flying: "#A890F0",
  steel: "#B8B8D0", dark: "#705746"
};

let listaPokemonGlobal = [];

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
    experiencia: datos.base_experience,
    habilidades: datos.abilities.map(({ ability }) => ability.name),
    estadisticas: datos.stats.reduce((acc, { stat, base_stat }) => {
      acc[stat.name] = base_stat;
      return acc;
    }, {})
  };

};

const cargarPrimeraGeneracion = async () => {
  mensaje.textContent = "Cargando primera generación...";
  resultado.innerHTML = "";

  try {

    const promesas = [];
    for (let i = 1; i <= 151; i++) {
      promesas.push(obtenerPokemon(i));
    }


    const listaPokemon = await Promise.all(promesas);
    listaPokemonGlobal = listaPokemon;


    mensaje.textContent = "";


    mostrarListaPokemon(listaPokemon);

  } catch (error) {
    mensaje.textContent = "Error al cargar la primera generación.";
    console.error(error);
  }
};


cargarPrimeraGeneracion();


const formatearId = (id) => {
  return String(id).padStart(3, "0");
};

const mostrarListaPokemon = (lista) => {
  resultado.innerHTML = "";
  lista.forEach((pokemon) => {
    mostrarPokemon(pokemon);
  });
};

const mostrarPokemon = (pokemon) => {
  const tiposHTML = pokemon.tipos
    .map((tipo) => {
      const color = coloresTipos[tipo.toLowerCase()] || "#A8A878";
      return `<span class="tipo" style="background-color: ${color}; color: white; padding: 4px 8px; border-radius: 4px; margin-right: 4px; font-weight: bold; text-transform: uppercase; font-size: 12px;">${tipo}</span>`;
    })
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

      <button class="pokemon__boton-detalles" onclick="abrirDetalles(${pokemon.id})">Ver detalles</button>
    </article>
  `;
};


formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const busqueda = inputBusqueda.value.trim().toLowerCase();

  if (busqueda == "") {
    mostrarListaPokemon(listaPokemonGlobal);
    return;
  }

  if (!busqueda) {
    mensaje.textContent = "Introduce un nombre o número.";
    resultado.innerHTML = "";
    return;
  }



  mensaje.textContent = "Cargando...";
  resultado.innerHTML = "";

  try {
    botonBuscar.disabled = true;

    const pokemonFiltrados = listaPokemonGlobal.filter((pokemon) => {
      const coincideNombre = pokemon.nombre.toLowerCase().includes(busqueda);
      const coincideId = String(pokemon.id) === busqueda;
      return coincideNombre || coincideId;
    });

    if (pokemonFiltrados.length > 0) {
      mensaje.textContent = "";
      mostrarListaPokemon(pokemonFiltrados);
    } else {
      resultado.innerHTML = "";
      mensaje.textContent = "No se encontraron Pokémon con ese criterio.";
    }

    inputBusqueda.focus();


  } catch (error) {
    mensaje.textContent = error.message;
  }
  finally {
    botonBuscar.disabled = false;
  }

});

const abrirDetalles = (id) => {
  const pokemon = listaPokemonGlobal.find(p => p.id === id);
  if (!pokemon) return;

  let modal = document.querySelector("#modal-pokemon");
  if (!modal) {
    modal = document.createElement("dialog");
    modal.id = "modal-pokemon";
    document.body.appendChild(modal);
  }

  const tiposHTML = pokemon.tipos
    .map((tipo) => {
      const color = coloresTipos[tipo.toLowerCase()] || "#A8A878";
      return `<span class="tipo" style="background-color: ${color}; color: white; padding: 4px 8px; border-radius: 4px; margin-right: 4px; font-weight: bold; text-transform: uppercase; font-size: 12px;">${tipo}</span>`;
    })
    .join("");
    
  const habilidadesHTML = pokemon.habilidades.map(hab => `<li>${hab}</li>`).join("");

  modal.innerHTML = `
    <div class="modal-contenido">
      <button class="modal-cerrar" onclick="cerrarDetalles()">✕</button>
      <h2>N.º ${formatearId(pokemon.id)} - ${pokemon.nombre.toUpperCase()}</h2>
      <img class="modal-imagen" src="${pokemon.imagenFrente}" alt="${pokemon.nombre}" style="width: 150px; height: 150px;">
      
      <div class="modal-info">
        <p><strong>Tipos:</strong> ${tiposHTML}</p>
        <p><strong>Altura:</strong> ${pokemon.altura / 10} m</p>
        <p><strong>Peso:</strong> ${pokemon.peso / 10} kg</p>
        <p><strong>Experiencia base:</strong> ${pokemon.experiencia || 'N/A'}</p>
      </div>

      <h3>Habilidades</h3>
      <ul>${habilidadesHTML}</ul>

      <h3>Estadísticas base</h3>
      <ul class="modal-estadisticas">
        <li><strong>PS (HP):</strong> ${pokemon.estadisticas['hp'] || 0}</li>
        <li><strong>Ataque:</strong> ${pokemon.estadisticas['attack'] || 0}</li>
        <li><strong>Defensa:</strong> ${pokemon.estadisticas['defense'] || 0}</li>
        <li><strong>Ataque Especial:</strong> ${pokemon.estadisticas['special-attack'] || 0}</li>
        <li><strong>Defensa Especial:</strong> ${pokemon.estadisticas['special-defense'] || 0}</li>
        <li><strong>Velocidad:</strong> ${pokemon.estadisticas['speed'] || 0}</li>
      </ul>
    </div>
  `;

  modal.showModal();
};

const cerrarDetalles = () => {
  const modal = document.querySelector("#modal-pokemon");
  if (modal) {
    modal.close();
  }
};
