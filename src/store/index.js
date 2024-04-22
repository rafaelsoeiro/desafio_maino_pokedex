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
      console.log(state.pagination)
      state.pagination.offset += newOffset;
      console.log(state.pagination)
      console.log(state.pokemons)
    },

  },
  actions: {
    fetchPokeapi({ commit },offset){
      fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
      .then(res => res.json())
      .then(data => {
        console.log('fetchPokeapi')
        commit('setPokemons', data.results);
      })
      .catch(err => console.error(err));
    }
  },
  modules: {
  }
})
