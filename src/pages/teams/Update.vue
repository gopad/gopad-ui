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
    <router-link
      v-slot="{ href }"
      :to="{ name: 'updateTeam', params: { teamId: record.slug } }"
      custom
    >
      <fwb-breadcrumb-item :href="href">{{
        t("breadcrumb.update")
      }}</fwb-breadcrumb-item>
    </router-link>
  </fwb-breadcrumb>

  <ContentHeader :title="t('teams.title.update', [record.name])">
    <CancelAction :to="{ name: 'teams' }" />
  </ContentHeader>

  <div class="m-5">
    <FormKit
      id="update"
      type="form"
      submit-label="Update"
      name="updateTeam"
      @submit="submit"
    >
      <FormKit
        id="slug"
        type="text"
        name="slug"
        validation="required|length:3,64"
        label="Slug"
        help="Slug of your team"
      />
      <FormKit
        id="name"
        type="text"
        name="name"
        validation="required|length:3,64"
        label="Name"
        help="Name of your team"
      />
    </FormKit>
  </div>
</template>

<script setup lang="ts">
import { FwbBreadcrumb, FwbBreadcrumbItem } from "flowbite-vue";

import { ContentHeader, CancelAction } from "../../components";

import { onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { reset } from "@formkit/core";
import { useTeamStore } from "../../store/teams";

import { useI18n } from "vue-i18n";

import type { general_error } from "../../client/models/general_error";
import type { team } from "../../client/models/team";

const store = useTeamStore();
const route = useRoute();
const router = useRouter();

const { t } = useI18n({
  useScope: "global",
});

const record = computed(() => {
  return store.currentTeam;
});

function submit(data: team) {
  return store
    .updateTeam(<string>record.value.slug, data)
    .then((resp: void | general_error | team) => {
      const val = <team>resp;
      reset("update", val);
      router.push({ name: "showTeam", params: { teamId: val.slug } });
    })
    .catch((e) => {
      console.log(e);
    });
}

onMounted(async () => {
  await router.isReady();
  store.fetchTeam(<string>route.params.teamId);
});

watch(record, (newTeam) => {
  reset("update", newTeam);
});
</script>

<script lang="ts">
export default {
  name: "TeamUpdate",
};
</script>
