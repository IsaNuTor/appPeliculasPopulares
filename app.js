let pagina = 1;
const API_URL =
    "https://api.themoviedb.org/3/movie/popular?api_key=b12aa6d21519d9084f22cf2e9b7f9390&language=es-MX&page=";
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

// Boton dark
const checkbox = document.getElementById("checkbox");

checkbox.addEventListener("change", () => {
    // Cambiamos el fondo de color y el color de la letra
    document.body.classList.toggle("dark");
});

// Paginación
btnPrevious.addEventListener("click", () => {
    if (pagina > 1) {
        pagina -= 1;
        getMovies();
    }
});

btnNext.addEventListener("click", () => {
    if (pagina < 1000) {
        pagina += 1;
        getMovies();
    }
});

const getMovies = async() => {
    try {
        const response = await fetch(`${API_URL}${pagina}`);

        // Si la respuesta es correcta
        if (response.status === 200) {
            const datos = await response.json();

            let movies = "";
            datos.results.forEach((movie) => {
                movies += `
                	<div class="movie">
                		<img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
                		<h3 class="title">${movie.title}</h3>
                	</div>
                `;
            });
            document.getElementById("container").innerHTML = movies;
        } else if (response.status === 401) {
            console.log("La key es erronea");
        } else if (response.status === 404) {
            console.log("La pelicula no existe");
        } else {
            console.log("Error no identificado");
        }
    } catch (error) {
        console.log(error);
    }
};

getMovies();