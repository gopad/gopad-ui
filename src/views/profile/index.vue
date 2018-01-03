<template>
  <div>
    <div class="uk-card uk-card-body">
      <h3 class="uk-card-title">
        Profile
      </h3>

      <form class="uk-form-horizontal">
        <fieldset class="uk-fieldset">
          <div class="uk-margin">
            <label class="uk-form-label">
              Slug
            </label>

            <div class="uk-form-controls">
              <input
              	class="uk-input"
              	type="text"
              	name="slug"
              	disabled
              >
            </div>
          </div>

          <div class="uk-margin">
            <label class="uk-form-label">
              Username
            </label>

            <div class="uk-form-controls">
              <input
              	class="uk-input"
              	type="text"
              	name="username"
              	placeholder="Username"
              >
            </div>
          </div>

          <div class="uk-margin">
            <label class="uk-form-label">
              Email
            </label>

            <div class="uk-form-controls">
              <input
              	class="uk-input"
              	type="text"
              	name="email"
              	placeholder="Email"
              >
            </div>
          </div>

          <button class="uk-button uk-button-default">
          	Submit
          </button>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'profile'
  }
</script>

<style>
</style>
