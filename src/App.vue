<template>
  <div id="app" style="background: #e7e7e7;">
    <AdminPage msg="ADMIN UI"/>
  </div>
</template>

<script>
import AdminPage from './components/AdminPage.vue'

export default {
  name: 'App',
  components: {
    AdminPage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
