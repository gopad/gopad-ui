<template>
  <layout-header />
  <router-view />
  <layout-footer />
</template>

<script setup lang="ts">
import { LayoutHeader, LayoutFooter } from "./components";
</script>

<style>
html {
  cursor: default;
}
</style>
