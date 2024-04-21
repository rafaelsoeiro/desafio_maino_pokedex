<template>
  <div>
    <div class="cardsContainer">
      <div v-for="pokemon in pokemons" :key="pokemon.name" class="card">
        <h3>{{ pokemon.name }}</h3>
        <img :src="getPokemonImageUrl(pokemon)" :alt="pokemon.name">
      </div>
    </div>
    <button class="btn jersey-25-regular">Carregar</button>
  </div>
</template>

<script setup>
  import { computed, reactive } from 'vue';
  import { useStore } from 'vuex';

  const store = useStore();
  const baseUrlSvg = reactive({
    baseUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/'
  });

  const pokemons = computed(() => {
    return store.state.pokemons;
  });

  const getPokemonImageUrl = (pokemon) => {
    if (pokemon && pokemon.url) {
      const pokemonId = pokemon.url.split('/')[6];
      if (pokemonId) {
        return baseUrlSvg.baseUrl + pokemonId + '.svg';
      }
    }
    return ''; 
  };
</script>

<style scoped>
  .cardsContainer{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    column-gap: 2rem;
    row-gap: 3rem;
  }
  .card{
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid var(--color-primary);
    background: var(--color-bg-variant);
    text-align: center;
    cursor: pointer;
    transition: var(--transition);
  }
  .card:hover{
    background: transparent;
    border: 1px solid var(--color-primary-variant);
    transform: scale(1.1);
    /* transform: rotateY(180deg); */
    backface-visibility: hidden;
    
  }
  .card h3{
    margin-bottom: 1rem;
  }
</style>