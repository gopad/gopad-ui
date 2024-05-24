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
    <router-link v-slot="{ href }" :to="{ name: 'createTeam' }" custom>
      <fwb-breadcrumb-item :href="href">{{
        t("breadcrumb.create")
      }}</fwb-breadcrumb-item>
    </router-link>
  </fwb-breadcrumb>

  <ContentHeader :title="t('teams.title.create')">
    <CancelAction :to="{ name: 'teams' }" />
  </ContentHeader>

  <div class="m-5">
    <FormKit
      id="create"
      type="form"
      submit-label="Create"
      name="createTeam"
      @submit="submit"
    >
      <FormKit
        id="slug"
        type="text"
        name="slug"
        validation="length:3,64"
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

import { reset } from "@formkit/core";
import { useRouter } from "vue-router";
import { useTeamStore } from "../../store/teams";

import { useI18n } from "vue-i18n";

import type { general_error } from "../../client/models/general_error";
import type { team } from "../../client/models/team";

const router = useRouter();
const store = useTeamStore();

const { t } = useI18n({
  useScope: "global",
});

async function submit(data: team) {
  return store
    .createTeam(data)
    .then((resp: void | general_error | team) => {
      const val = <team>resp;
      reset("create");
      router.push({ name: "showTeam", params: { teamId: val.slug } });
    })
    .catch((e) => {
      console.log(e);
    });
}
</script>

<script lang="ts">
export default {
  name: "TeamCreate",
};
</script>
