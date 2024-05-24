<template>
  <div
    class="bg-white dark:bg-gray-900 py-8 lg:py-16 px-4 mx-auto max-w-screen-xl text-center"
  >
    <fwb-heading
      tag="h1"
      class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
    >
      {{ t("welcome.title") }}
    </fwb-heading>

    <div
      class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-0 lg:px-16 dark:text-gray-400"
    >
      {{ t("welcome.slogan") }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { FwbHeading } from "flowbite-vue";

import { useI18n } from "vue-i18n";

const { t } = useI18n({
  useScope: "global",
});
</script>

<script lang="ts">
export default {
  name: "WelcomeIndex",
};
</script>
