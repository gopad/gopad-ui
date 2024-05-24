<template>
  <div class="m-5 flex">
    <fwb-heading tag="h1" class="flex-grow h-16">
      {{ title }}
    </fwb-heading>

    <div class="h-auto flex-none self-center">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { FwbHeading } from "flowbite-vue";

defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>

<script lang="ts">
export default {
  name: "LayoutHeader",
};
</script>
