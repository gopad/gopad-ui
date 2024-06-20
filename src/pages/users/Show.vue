<template>
  <fwb-breadcrumb solid class="m-5">
    <router-link v-slot="{ href }" :to="{ name: 'welcome' }" custom>
      <fwb-breadcrumb-item :href="href" home>{{
        t("breadcrumb.home")
      }}</fwb-breadcrumb-item>
    </router-link>
    <router-link v-slot="{ href }" :to="{ name: 'users' }" custom>
      <fwb-breadcrumb-item :href="href">{{
        t("breadcrumb.users")
      }}</fwb-breadcrumb-item>
    </router-link>
    <router-link
      v-slot="{ href }"
      :to="{ name: 'showUser', params: { userId: record.username } }"
      custom
    >
      <fwb-breadcrumb-item :href="href">
        {{ record.username }}
      </fwb-breadcrumb-item>
    </router-link>
  </fwb-breadcrumb>

  <ContentHeader :title="t('users.title.show', [record.username])">
    <UpdateAction
      :to="{ name: 'updateUser', params: { userId: record.username } }"
    />
    <DeleteAction
      :handler="deleteRecord(<string>record.username)"
      :element="<string>record.username"
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
          t("users.username")
        }}</fwb-table-head-cell>
        <fwb-table-cell>{{ record.username }}</fwb-table-cell>
      </fwb-table-row>
      <fwb-table-row>
        <fwb-table-head-cell class="text-right">{{
          t("users.email")
        }}</fwb-table-head-cell>
        <fwb-table-cell>{{ record.email }}</fwb-table-cell>
      </fwb-table-row>
      <fwb-table-row>
        <fwb-table-head-cell class="text-right">{{
          t("users.fullname")
        }}</fwb-table-head-cell>
        <fwb-table-cell>{{ record.fullname }}</fwb-table-cell>
      </fwb-table-row>
      <fwb-table-row>
        <fwb-table-head-cell class="text-right">{{
          t("users.admin")
        }}</fwb-table-head-cell>
        <fwb-table-cell>{{ record.admin }}</fwb-table-cell>
      </fwb-table-row>
      <fwb-table-row>
        <fwb-table-head-cell class="text-right">{{
          t("users.active")
        }}</fwb-table-head-cell>
        <fwb-table-cell>{{ record.active }}</fwb-table-cell>
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
import { useUserStore } from "../../store/users";

import { useI18n } from "vue-i18n";

const route = useRoute();
const router = useRouter();
const store = useUserStore();

const { t } = useI18n({
  useScope: "global",
});

const record = computed(() => {
  return store.currentUser;
});

function deleteRecord(username: string) {
  return () => {
    store
      .deleteUser(username)
      .then(() => {
        router.push({ name: "users" });
      })
      .catch((e) => {
        console.log(e);
      });
  };
}

onMounted(async () => {
  await router.isReady();
  store.fetchUser(<string>route.params.userId);
});
</script>

<script lang="ts">
export default {
  name: "UserShow",
};
</script>
