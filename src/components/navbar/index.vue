<template>
  <div class="uk-light uk-navbar-container tm-navbar-container" uk-sticky="media: 960; show-on-up: true; animation: uk-animation-slide-top; cls-inactive: uk-navbar-transparent; top: 400">
    <div class="uk-container uk-container-expand">
      <nav class="uk-navbar">
        <div class="uk-navbar-left">
          <router-link class="uk-navbar-item uk-logo" to="/">
            Gopad
          </router-link>
        </div>

        <div class="uk-navbar-right">
          <ul class="uk-navbar-nav">
            <router-link to="/" exact tag="li">
              <a>
                Dashboard
              </a>
            </router-link>
            <router-link to="/profile" tag="li">
              <a>
                Profile
              </a>
            </router-link>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'navbar'
  }
</script>

<style>
</style>
