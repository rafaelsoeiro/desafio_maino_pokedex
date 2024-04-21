<template>
  <div v-show="isOpen" class="modal" >
    <button @click="openCloseModal">X</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

  let isOpen=ref(false);

  function openCloseModal(){
    isOpen.value=!isOpen.value;
  }

</script>

<style scoped>
  .modal{
    z-index: 999;
    width: 100%;
    height: 400px;
    background-color: var(--color-bg-variant);
    border-radius: 0.5rem;
    border: 1px solid var(--color-primary);
    transition: var(--transition);
  }
  .modal:hover{

    background-color: transparent;

    border: 1px solid var(--color-primary);
  }
</style>