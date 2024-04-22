<template>
  <div>
    <div class="cardsContainer">
      <div v-for="pokemon in pokemons" :key="pokemon.name" class="card">
        <div class="cardImageContainer">
          <img :src="getPokemonImageUrl(pokemon)" :alt="pokemon.name">
        </div>
        <div class="cardContainerTitle">
          <h3 class="jersey-25-regular">{{ pokemon.name }}</h3>
          <button class="btnCardPokemon" @click="loadPokemonInfo(pokemon.url)">Info</button>
        </div> 
      </div>
    </div>
    <button class="btn jersey-25-regular" @click="loadMorePokemons">Carregar</button>
  </div>
</template>

<script setup>
  import { computed, reactive } from 'vue';
  import { useStore } from 'vuex';

  const store = useStore();
  const baseUrlSvg = reactive({
    baseUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/'
  });


  const pokemons = computed(() => store.state.pokemons);


  const getPokemonImageUrl = (pokemon) => {
    if (pokemon && pokemon.url) {
      const pokemonId = pokemon.url.split('/')[6];
      if (pokemonId) {
        return baseUrlSvg.baseUrl + pokemonId + '.svg';
      }
    }
    return ''; 
  };

  const loadPokemonInfo = (pokemonUrl) => {
    fetch(pokemonUrl)
    .then(res => res.json())
    .then(pokemonInfo=>{
      console.log(pokemonInfo)
      return {abilites:pokemonInfo.abilities,moves: pokemonInfo.moves,species:pokemonInfo.species}
    })
  }

  const loadMorePokemons = () => {
    store.commit('setPagination',store.state.pagination.limit);
    // Chama a action fetchPokeapi
    store.dispatch('fetchPokeapi',store.state.pagination.offset)
      .then(() => {
        console.log('Dados dos pokémons carregados com sucesso! 2');
      })
      .catch(error => {
        console.error('Erro ao carregar os dados dos pokémons:', error);
      });
  };
</script>



<style scoped>
  .cardsContainer {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    padding: 20px;
  }

  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    max-height: 300px;
    padding: 0;
    border: 1px solid var(--color-primary);
    border-radius: 0.5rem;
    background: var(--color-bg-variant);
    text-align: center;
    transition: var(--transition);
    overflow: hidden;
  }

  .card:hover {
    background: transparent;
    border-color: var(--color-primary-variant);
    transform: scale(1.05);
  }

  .cardImageContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    padding: 1rem;
  }

  .cardImageContainer img {
    max-width: 100%;
    max-height: 100%;
  }

  .cardContainerTitle {
    background: var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0;
    max-height: 50px;
    width: 100%;
  }

  .cardContainerTitle h3{
    margin: 0 auto;
    font-size: 16px;
    text-transform: uppercase;
  }
  .btnCardPokemon{
    display: inline-block;
    width: max-content;
    padding: 0.75rem 1.2rem;
    background-color: var(--color-primary);
    color: var(--color-white);
    cursor: pointer;
    border: 1px solid var(--color-primary);
    transition: var(--transition);
    font-family: "Jersey 25", sans-serif;
  }

  .btnCardPokemon:hover {
    background: var(--color-primary-variant);
    border-color: var(--color-primary-variant);
  }
</style>