const POKEAPI_URL = "https://pokeapi.co/api/v2";
const pokemonListEl = document.querySelector("#pokemons");
const pokemonInfoEl = document.querySelector("#pokemon-info")

document.addEventListener("DOMContentLoaded", () => {
    loadPokemons();
});

pokemonListEl.addEventListener("change", () => {
    selectPokemon(pokemonListEl.value);
});

const loadPokemons = async () => {
    try {
        const response = await fetch(`${POKEAPI_URL}/pokemon`).then(response => response.json());

        response.results.forEach(pokemon => {
            const optionEl = document.createElement("option");

            optionEl.textContent = pokemon.name;
            optionEl.value = pokemon.url;
            pokemonListEl.appendChild(optionEl);
        });
    } catch (error) {
        console.error(`Error fetching pokemons: ${error}`);
    }
}

const selectPokemon = async (pokemonUrl) => {
    // Limpio el interior del contenedor de mostrar
    pokemonInfoEl.innerHTML = "";

    // Verifico el value
    if (pokemonUrl != undefined) {
        try {
            const response = await fetch(pokemonUrl).then(response => response.json());

            pokemonInfoEl.innerHTML = `
                <h2 class="title">${response.name}</h2>
                <img src="${response.sprites.front_default}" alt="Image of ${response.name}.">
                <span>Type: ${response.types.map(type => `${type.type.name} `).join('')}</span>
                <div id="box-stats">
                    <h2 class="title">Stats</h2>
                    <ul id="list-stats">
                        ${response.stats.map(stat => `<li>${stat.stat.name} [${stat.base_stat}]</li>`).join('')}
                    </ul>
                </div>
                <div id="box-abilities">
                    <h2 class="title">Abilities</h2>
                    <ul id="list-abilities">
                        ${response.abilities.map(ability => `<li>${ability.ability.name}</li>`).join('')}
                    </ul>
                </div>
            `;
        } catch (error) {
            console.error(`Error fetching pokemon info: ${error}`);
        }
    }
}
