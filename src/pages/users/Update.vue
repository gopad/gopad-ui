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
      :to="{ name: 'showUser', params: { userId: record.slug } }"
      custom
    >
      <fwb-breadcrumb-item :href="href">
        {{ record.username }}
      </fwb-breadcrumb-item>
    </router-link>
    <router-link
      v-slot="{ href }"
      :to="{ name: 'updateUser', params: { userId: record.slug } }"
      custom
    >
      <fwb-breadcrumb-item :href="href">{{
        t("breadcrumb.update")
      }}</fwb-breadcrumb-item>
    </router-link>
  </fwb-breadcrumb>

  <ContentHeader :title="t('users.title.update', [record.username])">
    <CancelAction :to="{ name: 'users' }" />
  </ContentHeader>

  <div class="m-5">
    <FormKit
      id="update"
      type="form"
      submit-label="Update"
      name="updateUser"
      @submit="submit"
    >
      <FormKit
        id="slug"
        type="text"
        name="slug"
        validation="length:3,64"
        label="Slug"
        help="Slug of your user"
      />
      <FormKit
        id="username"
        type="text"
        name="username"
        validation="required|length:3,64"
        label="Username"
        help="Username of your user"
      />
      <FormKit
        id="email"
        type="text"
        name="email"
        validation="required|email"
        label="Email"
        help="Email of your user"
      />
      <FormKit
        id="admin"
        type="checkbox"
        name="admin"
        validation=""
        label="Admin"
        help="Check if user is admin"
      />
      <FormKit
        id="active"
        type="checkbox"
        name="active"
        validation=""
        label="Active"
        help="Check if user is active"
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
import { useUserStore } from "../../store/users";

import { useI18n } from "vue-i18n";

import type { general_error } from "../../client/models/general_error";
import type { user } from "../../client/models/user";

const store = useUserStore();
const route = useRoute();
const router = useRouter();

const { t } = useI18n({
  useScope: "global",
});

const record = computed(() => {
  return store.currentUser;
});

function submit(data: user) {
  return store
    .updateUser(<string>record.value.slug, data)
    .then((resp: void | general_error | user) => {
      const val = <user>resp;
      reset("update", val);
      router.push({ name: "showUser", params: { userId: val.slug } });
    })
    .catch((e) => {
      console.log(e);
    });
}

onMounted(async () => {
  await router.isReady();
  store.fetchUser(<string>route.params.userId);
});

watch(record, (newUser) => {
  reset("update", newUser);
});
</script>

<script lang="ts">
export default {
  name: "UserUpdate",
};
</script>
