<template>
  <fwb-breadcrumb solid class="m-5">
    <router-link v-slot="{ href }" :to="{ name: 'welcome' }" custom>
      <fwb-breadcrumb-item :href="href" home>{{
        t("breadcrumb.home")
      }}</fwb-breadcrumb-item>
    </router-link>
    <router-link v-slot="{ href }" :to="{ name: 'teams' }" custom>
      <fwb-breadcrumb-item :href="href">{{
        t("breadcrumb.teams")
      }}</fwb-breadcrumb-item>
    </router-link>
  </fwb-breadcrumb>

  <ContentHeader :title="t('teams.title.index')">
    <CreateAction :to="{ name: 'createTeam' }" />
  </ContentHeader>

  <fwb-table v-if="getTeams.length > 0" class="m-5" hoverable>
    <fwb-table-head>
      <fwb-table-head-cell>{{ t("common.slug") }}</fwb-table-head-cell>
      <fwb-table-head-cell>{{ t("teams.name") }}</fwb-table-head-cell>
      <fwb-table-head-cell class="w-80"
        ><span class="sr-only">{{
          t("common.actions")
        }}</span></fwb-table-head-cell
      >
    </fwb-table-head>
    <fwb-table-body>
      <fwb-table-row v-for="row in getTeams" :key="row.id">
        <fwb-table-cell>{{ row.slug }}</fwb-table-cell>
        <fwb-table-cell>{{ row.name }}</fwb-table-cell>
        <fwb-table-cell>
          <ShowAction
            :to="{ name: 'showTeam', params: { teamId: row.slug } }"
            tag="link"
          />
          <UpdateAction
            :to="{ name: 'updateTeam', params: { teamId: row.slug } }"
            tag="link"
          />
          <DeleteAction
            :handler="deleteRecord(<string>row.slug)"
            :element="<string>row.name"
            tag="link"
          />
        </fwb-table-cell>
      </fwb-table-row>
    </fwb-table-body>
  </fwb-table>

  <div
    v-else
    class="bg-white dark:bg-gray-900 py-8 lg:py-16 px-4 mx-auto max-w-screen-xl text-center"
  >
    <h2
      class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
    >
      {{ t("teams.no_entries") }}
    </h2>
    <i18n-t
      keypath="teams.create.question"
      tag="p"
      for="teams.create.link"
      class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-0 lg:px-16 dark:text-gray-400"
    >
      <router-link :to="{ name: 'createTeam' }" class="hover:underline">{{
        $t("teams.create.link")
      }}</router-link>
    </i18n-t>
  </div>
</template>

<script setup lang="ts">
import {
  FwbBreadcrumb,
  FwbBreadcrumbItem,
  FwbTable,
  FwbTableBody,
  FwbTableCell,
  FwbTableHead,
  FwbTableHeadCell,
  FwbTableRow,
} from "flowbite-vue";

import {
  ContentHeader,
  CreateAction,
  ShowAction,
  UpdateAction,
  DeleteAction,
} from "../../components";

import { onMounted, computed } from "vue";
import { useTeamStore } from "../../store/teams";

import { useI18n } from "vue-i18n";

import type { team } from "../../client/models/team";

const store = useTeamStore();

const { t } = useI18n({
  useScope: "global",
});

const getTeams = computed(() => {
  return store.teams as team[];
});

function deleteRecord(slug: string) {
  return () => {
    store
      .deleteTeam(slug)
      .then(() => {
        store.fetchTeams();
      })
      .catch((e) => {
        console.log(e);
      });
  };
}

onMounted(() => {
  store.fetchTeams();
});
</script>

<script lang="ts">
export default {
  name: "TeamIndex",
};
</script>
