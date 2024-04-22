<template>
  <h1>Home</h1>
  <PokemonList />
</template>

<script setup>
  import PokemonList from '@/components/PokemonList.vue';
  import { computed, onMounted, reactive ,ref} from 'vue';
  import { useStore } from 'vuex';

  const store = useStore();


  const loadPokemons = () => {
    if(store.state.pokemons.length!=0){
      return
    }
    store.dispatch('fetchPokeapi',store.state.pagination.offset)
      .then(() => {
        console.log('Dados dos pokémons carregados com sucesso!');
      })
      .catch(error => {
        console.error('Erro ao carregar os dados dos pokémons:', error);
      });
  };
  onMounted(loadPokemons);

</script>
