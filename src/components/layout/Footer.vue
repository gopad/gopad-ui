<template>
  <fwb-footer>
    <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
      Copyright &copy; 2024
      <a class="hover:underline" href="https://gopad.eu/">Gopad</a>. All rights
      reserved.
    </span>

    <fwb-footer-link-group>
      <!-- <fwb-footer-link @click.prevent="switchLocale('de')" href="#">
        🇩🇪
      </fwb-footer-link>
      <fwb-footer-link @click.prevent="switchLocale('en')" href="#">
        🇺🇸
      </fwb-footer-link> -->
      <fwb-footer-link href="https://twitter.com/tboerger">
        <font-awesome-icon :icon="['fab', 'twitter']" />
      </fwb-footer-link>
      <fwb-footer-link href="https://github.com/gopad">
        <font-awesome-icon :icon="['fab', 'github']" />
      </fwb-footer-link>
    </fwb-footer-link-group>
  </fwb-footer>
</template>

<script setup lang="ts">
// import { changeLocale } from "@formkit/vue";
import { FwbFooter, FwbFooterLink, FwbFooterLinkGroup } from "flowbite-vue";

// import { useI18n } from "vue-i18n";
// import type { MessageSchema } from "../../locales/schema";

// const { t } = useI18n({
//   useScope: "global",
// });

// function switchLocale(locale: string) {
//   changeLocale(locale);

//   switch (locale) {
//     case 'de': {
//       i18n.locale.value = 'de-DE';
//       break;
//     }
//     case 'en': {
//       i18n.locale.value = 'en-US';
//       break;
//     }
//   }

// }
</script>

<script lang="ts">
export default {
  name: "LayoutFooter",
};
</script>
