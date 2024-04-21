import { createStore } from 'vuex'

export default createStore({
  state: {
    pagination:{
      limit:18,
      offset:0,
    },
    pokemons:[{}],
    idioma:[
      {}
    ],
  },
  getters: {
  },
  mutations: {
    setPokemons(state, pokemons) {
      state.pokemons = pokemons
    },
    setIdioma(state, idioma) {
      state.idioma = idioma
    },
    handleLoadMorePokemons(){
      state.pagination.offset += state.pagination.limit;
      state.pagination.limit += 18;
    }
  },
  actions: {
  },
  modules: {
  }
})
