<template>
  <ul class="cardsContainer">
    <CardPokemon 
      class="card" 
      v-for="(pokemon, index) in pokemons" 
      :key="index" 
      :name="pokemon.name" 
      :baseUrl="pokemon.url"
    />
  </ul>
  <button class="btn jersey-25-regular" @click="loadMorePokemons">Carregar</button>
</template>

<script setup>
  import { computed, reactive } from 'vue';
  import { useStore } from 'vuex';
  import CardPokemon from './CardPokemon.vue';

  const store = useStore();
  const pokemons = computed(() => store.state.pokemons);

  const loadMorePokemons = () => {
    store.commit('setPagination',store.state.pagination.limit);
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
</style>