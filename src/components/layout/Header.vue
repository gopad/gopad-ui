<template>
  <fwb-navbar solid>
    <template #logo>Gopad</template>
    <template #default="{ isShowMenu }">
      <fwb-navbar-collapse :is-show-menu="isShowMenu">
        <fwb-navbar-link link="/" link-attr="to" component="router-link">
          <font-awesome-icon :icon="['fas', 'house']" />
          {{ t("mainnav.home") }}
        </fwb-navbar-link>

        <fwb-navbar-link link="/users" link-attr="to" component="router-link">
          <font-awesome-icon :icon="['fas', 'user']" />
          {{ t("mainnav.users") }}
        </fwb-navbar-link>

        <fwb-navbar-link link="/teams" link-attr="to" component="router-link">
          <font-awesome-icon :icon="['fas', 'people-group']" />
          {{ t("mainnav.teams") }}
        </fwb-navbar-link>
      </fwb-navbar-collapse>
    </template>
  </fwb-navbar>
</template>

<script setup lang="ts">
import { FwbNavbar, FwbNavbarCollapse, FwbNavbarLink } from "flowbite-vue";

import { useI18n } from "vue-i18n";

const { t } = useI18n({
  useScope: "global",
});
</script>

<script lang="ts">
export default {
  name: "LayoutHeader",
};
</script>
