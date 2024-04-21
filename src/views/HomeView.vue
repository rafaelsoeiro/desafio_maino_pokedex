<template>
  <h1>Home</h1>
  <PokemonList />
</template>

<script setup>
  import PokemonList from '@/components/PokemonList.vue';
  import { onMounted, reactive ,ref} from 'vue';
  import { useStore } from 'vuex';

  const store = useStore();
  let pokemons = reactive([]);


  const loadPokemons = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${store.state.pagination.limit}&offset=${store.state.pagination.offset}`)
      .then(res => res.json())
      .then(data => {
        store.commit('setPokemons', data.results);
        pokemons.value = data.results;
      })
      .catch(err => console.error(err));
  };
  onMounted(loadPokemons);
</script>
