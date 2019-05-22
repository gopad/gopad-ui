<template>
  <div id="app">
    <div class="uk-section-primary">
      <navbar/>
    </div>

    <div class="uk-margin">
      <router-view></router-view>
    </div>

    <foot/>
  </div>
</template>

<script>
  import Navbar from './components/navbar/index.vue'
  import Foot from './components/foot/index.vue'

  export default {
    name: 'app',
    components: {
      Navbar,
      Foot
    }
  }
</script>

<style lang="scss">
  @import "app.scss";
</style>
