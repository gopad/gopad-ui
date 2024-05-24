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
    <router-link
      v-slot="{ href }"
      :to="{ name: 'showTeam', params: { teamId: record.slug } }"
      custom
    >
      <fwb-breadcrumb-item :href="href">
        {{ record.name }}
      </fwb-breadcrumb-item>
    </router-link>
  </fwb-breadcrumb>

  <ContentHeader :title="t('teams.title.show', [record.name])">
    <UpdateAction
      :to="{ name: 'updateTeam', params: { teamId: record.slug } }"
    />
    <DeleteAction
      :handler="deleteRecord(<string>record.slug)"
      :element="<string>record.name"
    />
  </ContentHeader>

  <fwb-table hoverable class="m-5">
    <fwb-table-body>
      <fwb-table-row>
        <fwb-table-head-cell class="w-1/3 text-right">{{
          t("common.id")
        }}</fwb-table-head-cell>
        <fwb-table-cell>{{ record.id }}</fwb-table-cell>
      </fwb-table-row>
      <fwb-table-row>
        <fwb-table-head-cell class="text-right">{{
          t("common.slug")
        }}</fwb-table-head-cell>
        <fwb-table-cell>{{ record.slug }}</fwb-table-cell>
      </fwb-table-row>
      <fwb-table-row>
        <fwb-table-head-cell class="text-right">{{
          t("teams.name")
        }}</fwb-table-head-cell>
        <fwb-table-cell>{{ record.name }}</fwb-table-cell>
      </fwb-table-row>
    </fwb-table-body>
  </fwb-table>
</template>

<script setup lang="ts">
import {
  FwbBreadcrumb,
  FwbBreadcrumbItem,
  FwbTable,
  FwbTableBody,
  FwbTableCell,
  FwbTableHeadCell,
  FwbTableRow,
} from "flowbite-vue";

import { ContentHeader, UpdateAction, DeleteAction } from "../../components";

import { onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTeamStore } from "../../store/teams";

import { useI18n } from "vue-i18n";

const route = useRoute();
const router = useRouter();
const store = useTeamStore();

const { t } = useI18n({
  useScope: "global",
});

const record = computed(() => {
  return store.currentTeam;
});

function deleteRecord(slug: string) {
  return () => {
    store
      .deleteTeam(slug)
      .then(() => {
        router.push({ name: "teams" });
      })
      .catch((e) => {
        console.log(e);
      });
  };
}

onMounted(async () => {
  await router.isReady();
  store.fetchTeam(<string>route.params.teamId);
});
</script>

<script lang="ts">
export default {
  name: "TeamShow",
};
</script>
