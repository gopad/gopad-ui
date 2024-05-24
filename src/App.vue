<template>
  <layout-header />
  <router-view />
  <layout-footer />
</template>

<script setup lang="ts">
import { LayoutHeader, LayoutFooter } from "./components";
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  cursor: default;
}
</style>
