<template>
  <div class="filterPokemonsContainer">
    <p class="filterTitle">Filtrar Pokemons</p>
    <div class="filterInputs">
      <input type="text" placeholder="Nome" v-model="filter.name" class="filterInput"/>
      <input type="number" placeholder="ID" v-model.number="filter.id" class="filterInput"/>
      <input type="text" placeholder="Tipo" v-model="filter.type" class="filterInput"/>
      <input type="text" placeholder="Espécie" v-model="filter.species" class="filterInput"/>
    </div>
  </div>

  <ul class="cardsContainer" ref="cardsContainer">
    <CardPokemon 
      class="card" 
      v-for="(pokemon, index) in filteredPokemons" 
      :key="index" 
      :pokemon="pokemon"
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
  
  const filter = reactive({
    name: '',
    id: null,
    type: '',
    species: ''
  });
  
  const filteredPokemons = computed(() => {
  return store.state.pokemons.filter(pokemon => {
    // Verifica se o nome do Pokémon corresponde ao filtro de nome
    if (filter.name && !pokemon.name.toLowerCase().includes(filter.name.toLowerCase())) {
      return false;
    }
    // Verifica se o ID do Pokémon corresponde ao filtro de ID
    if (filter.id && pokemon.id !== filter.id) {
      return false;
    }
    // Verifica se o tipo do Pokémon corresponde ao filtro de tipo
    if (filter.type && !pokemon.types.includes(filter.type)) {
      return false;
    }
    // Verifica se a espécie do Pokémon corresponde ao filtro de espécie
    if (filter.species && pokemon.species !== filter.species) {
      return false;
    }
    return true;
  });
});

  onMounted(() => {
    observerLastCart();
    console.log('all pokemons',store.state.pokemons);
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
  .filterPokemonsContainer {
  margin-bottom: 20px;
}

.filterTitle {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.filterInputs {
  display: flex;
  gap: 10px;
}

.filterInput {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex: 1;
}
</style>