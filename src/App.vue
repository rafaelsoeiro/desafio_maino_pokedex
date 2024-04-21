<template>
  <div>
    <Header />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue';
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Jersey+25&display=swap');
  * {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    box-sizing: border-box;
    list-style: none;
    text-decoration: none;
  }

  :root {
    --color-bg: #0A171F;
    --color-bg-variant: #0F222E;  
    --color-primary: #5197E1;
    --color-primary-variant: rgba(48, 131, 220, 0.6);
    --color-white: #fff;
    --color-light: rgba(255, 255, 255, 0.4);

    --transition: all 400ms ease;

    --container-width-lg: 75%;
    --container-width-md: 70%;
    --container-width-sm: 80%
  }


  html {
    scroll-behavior: smooth;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: var(--color-bg);
    color: var(--color-white);
    line-height: 1.7;
    
  }
  .jersey-25-regular {
  font-family: "Jersey 25", sans-serif;
  font-weight: 400;
  font-style: normal;
  }

  .container {
    width: var(--container-width-lg);
    margin: 0 auto;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 500;
  }

  h1 {
    font-size: 2.5rem;
  }

  a {
    color: var(--color-primary);
    transition: var(--transition);
  }

  a:hover {
    color: var(--color-white);
  }

  .btn {
    width: max-content;
    display: inline-block;
    background-color: var(--color-primary);
    padding: 0.75rem 1.2rem;
    border-radius: 0.4rem;
    cursor: pointer;
    border: 1px solid var(--color-primary);
    transition: var(--transition);
  }

  .btn:hover {
    color: var(--color-white);
    background: var(--color-bg);
    border-color: var(--color-primary-variant);
  }

  .btn-primary {
    background: var(--color-primary);
    color: var(--color-bg);
  }

  img {
    display: block;
    width: 100%;
    object-fit: cover;
  }

  @media screen and (max-width: 768px) {
    .container {
        width: var(--container-width-md);
    }

  }

  @media screen and (max-width: 600px) {
    .container {
        width: var(--container-width-sm);
    }
  }
</style>
