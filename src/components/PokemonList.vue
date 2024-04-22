<template>
  <ul class="cardsContainer" ref="cardsContainer">
    <CardPokemon 
      class="card" 
      v-for="(pokemon, index) in pokemons" 
      :key="index" 
      :name="pokemon.name" 
      :baseUrl="pokemon.url"
    />
  </ul>
</template>

<script setup>
  import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
  import { useStore } from 'vuex';
  import CardPokemon from './CardPokemon.vue';

  const store = useStore();
  const cardsContainer = ref(null);
  const pokemons = reactive(computed(() => {
    return store.state.pokemons
  }))
  let lastCardRef = ref(null);

  onMounted(() => {
    observerLastCart();
  });

  const observerLastCart = () => {
    setTimeout(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            observer.unobserve(lastCardRef.value);
            loadMorePokemons();
          } 
        });
      });
      const cards = document.querySelectorAll('.cardsContainer .card');
      lastCardRef.value = cards[cards.length - 1];
      if (lastCardRef.value) {
        observer.observe(lastCardRef.value);
      }
    }, 100);
  }

  const loadMorePokemons = () => {
    store.commit('setPagination',store.state.pagination.limit);
    store.dispatch('fetchPokeapi',store.state.pagination.offset)
      .then(() => {
        //console.log('Dados dos pokémons carregados com sucesso! 2');
        observerLastCart();
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