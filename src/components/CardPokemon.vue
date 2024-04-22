<template>
  <li>
    <div class="cardImageContainer">
      <img :src="getPokemonImageUrl(baseUrl)" :alt="name">
    </div>
    <div class="cardContainerTitle">
      <h3 class="jersey-25-regular">{{ name }}</h3>
      <button class="btnCardPokemon" @click="loadPokemonInfo(baseUrl)">Info</button>
    </div> 
  </li>
</template>

<script>
  export default {
    props:{
      name: String,
      imgUrl: String,
      baseUrl: String
    },
    setup(props) {
      const name= props.name;
      const baseUrl = props.baseUrl;
      return{
        name,
        baseUrl,
      }
    },
    methods:{
      loadPokemonInfo(url) {
        fetch(url)
        .then(res => res.json())
        .then(pokemonInfo => {
          console.log(pokemonInfo);
          return { abilities: pokemonInfo.abilities, moves: pokemonInfo.moves, species: pokemonInfo.species };
        })
        .catch(error => {
          console.error('Error loading Pokemon info:', error);
        });
      },
      getPokemonImageUrl(baseUrl){
        const baseUrlSvg = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/';
        if (baseUrl) {
          const pokemonId = baseUrl.split('/')[6];
          if (pokemonId) {
            return baseUrlSvg + pokemonId + '.svg';
          }
        }
        return ''; 
      }
    }
  }
</script>

<style>
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