import { createStore } from 'vuex'

export default createStore({
  state: {
    pagination:{
      limit:20,
      offset:0,
    },
    pokemons:[],
    idioma:[
      {}
    ],
  },
  getters: {
  },
  mutations: {
    setPokemons(state, pokemons) {
      state.pokemons.push(...pokemons)
    },
    setIdioma(state, idioma) {
      state.idioma = idioma
    },
    setPagination(state,newOffset){
      state.pagination.offset += newOffset;
    },

  },
  actions: {
  fetchPokeapi({ commit }, offset) {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
      .then(res => res.json())
      .then(data => {
        const requests = data.results.map(pokemon => {
          return fetch(pokemon.url).then(res => res.json());
        });

        Promise.all(requests)
          .then(pokemonsFull => {
            const formattedPokemons = pokemonsFull.map(res => ({
              id: res.id,
              name: res.name,
              species: res.species.name,
              type: res.types,
              attacks: res.abilities,
              sprites: res.sprites,
              game_indices: res.game_indices.map(indice => indice.version.name),
            }));
            commit('setPokemons', formattedPokemons);
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  },
},
  modules: {
  }
})
