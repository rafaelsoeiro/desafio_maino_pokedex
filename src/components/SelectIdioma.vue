<template>
  <select v-model="opcao" >
    <!-- <option selected value="">{{idiomas[0].name}}</option> -->
    <option v-for="idioma in idiomas" :key="opcao.id" :value="idioma.id" :selected="idioma.select" >{{ idioma.name }}</option>

  </select>
  <p>{{ opcao }}</p>
</template>

<script>
  export default{
    name: "SelectIdioma",
    data(){
      return{
        opcao:'',
      idiomas: [
        {id:13,name:'pt-BR',url:'https://pokeapi.co/api/v2/language/13/',select:true},
        {id:7,name:'es',url:'https://pokeapi.co/api/v2/language/7/', select:false},
        {id:9,name:'en',url:'https://pokeapi.co/api/v2/language/9/',select:false},
      ]
      }
    }
  }
</script>

