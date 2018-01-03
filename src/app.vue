<template>
  <div>
    <div class="uk-section-primary">
      <navbar/>
    </div>

    <div class="uk-margin">
      <router-view keep-alive></router-view>
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

<style>
  @import "app.less";
</style>
