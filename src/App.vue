<template>
  <div id="app">
    <router-link to="/">Home</router-link><br>
    <router-link to="/about">About</router-link>
    <!-- router-linkでリンクを指定して、それをrouter-viewで表示する -->
    <router-view/> 
  </div>
</template>

<script>
//import components here (import ~~ from ~~)

export default {
  
}
</script>

<style>

</style>
