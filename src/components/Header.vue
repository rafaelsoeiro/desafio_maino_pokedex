<template>
  <header class="Header jersey-25-regular">
    <router-link to="/">
      <img class="logo" src=".././assets/pokedex-logo.png" alt="">
      <span>Pokedex - Mainô challenge</span> 
    </router-link> 
    <slot></slot>
    <nav>
      <router-link to="/">Pokedex</router-link>  
      <router-link to="/about">Sobre</router-link>
    </nav>
    <SelectIdioma/>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import SelectIdioma from '@/components/SelectIdioma.vue'
</script>

<style scoped>
  .Header{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    background-color: var(--color-bg-variant);
    height: 5rem;
    
  }
  .logo{
    width: 3rem;
  }
  a{
    display: flex;
    align-items: center;
    color: var(--color-white);
    font-size: 2rem;
  }
  a:hover{
    color: var(--color-light);
  }
  nav{
    display: flex;
    align-items: center;
    text-transform: uppercase;
  }
  nav a{
    font-size: 1.5rem;
    margin-left: 10px;
  }
</style>