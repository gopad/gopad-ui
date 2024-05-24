<template>
  <router-link v-slot="{ href }" :to="props.to" custom>
    <component :is="component" :href="href" class="pl-3">
      <font-awesome-icon :icon="['fas', 'file']" class="pr-1" />
      {{ t("actions.show") }}
    </component>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import { FwbButton, FwbA } from "flowbite-vue";
import type { RouteLocationRaw } from "vue-router";

const { t } = useI18n({
  useScope: "global",
});

const props = withDefaults(
  defineProps<{
    to: RouteLocationRaw;
    tag?: string;
  }>(),
  {
    tag: "button",
  },
);

const component = computed(() => {
  return props.tag === "button" ? FwbButton : FwbA;
});
</script>

<script lang="ts">
export default {
  name: "ShowAction",
};
</script>
