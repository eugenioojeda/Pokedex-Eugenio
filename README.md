# Pokedex-Eugenio

## 1. Punto de partida
Un repositorio destinado al cumplimiento de la actividad de crear una pokédex con HTML, CSS y JavaScript que sea capaz de comunicarse con una API externa para mostrar los datos de los pokémon solicitados.


# 19. Preguntas de comprobación

## Responde en tu cuaderno o en un archivo Markdown:

###    ¿Por qué escuchamos el evento submit del formulario?
Para poder

###    ¿Qué ocurriría si eliminamos evento.preventDefault()?

Que la búsqueda realizada desaparecería de la barra de búsqueda.

###    ¿Para qué utilizamos trim() y toLowerCase()?

Para eliminar espacios adicionales y transformar la búsqueda a minúsculas para ser introducido en la llamada a la API.

###    ¿Por qué obtenerPokemon() está declarada con async?

Para que la función obtenerPokemon() pueda realizar operaciones asíncronas y devolver una promesa.

###    ¿Qué devuelve fetch()?

Una promesa.

###    ¿Para qué se utiliza await?

Para que el programa espere a que la petición sea realizada para seguir ejecutándose.

###    ¿Por qué debemos comprobar respuesta.ok?

Para comprobar que la página no de error, siendo true cuando el código HTTP se encuentra entre 200 y 299.

###    ¿Qué hace respuesta.json()?

Transformar la información recibida de la API en formato JSON.

###    ¿Por qué no devolvemos directamente todos los datos recibidos?

Porque la API devuelve muchísima información que no nos interesa obtener si no filtras la respuesta que te da.

###    ¿Qué resultado produce map() al transformar los tipos?

Consigue recorrer el array de los tipos de los pokémon y los coloca en un array.

###    ¿Por qué utilizamos join("") después de map()?

Para que los tipos del pokémon no aparezcan separados por comas

###    ¿Qué diferencia existe entre try y catch?



###    ¿Por qué hemos separado obtenerPokemon() y mostrarPokemon()?

Para separar responsabilidades del código haciendo más sencilla su comprensión

###    ¿Qué función cumple formatearId()?

La de

###    ¿Qué habría que modificar para mostrar varios Pokémon simultáneamente?
