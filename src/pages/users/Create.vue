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
    <router-link v-slot="{ href }" :to="{ name: 'createUser' }" custom>
      <fwb-breadcrumb-item :href="href">{{
        t("breadcrumb.create")
      }}</fwb-breadcrumb-item>
    </router-link>
  </fwb-breadcrumb>

  <ContentHeader :title="t('users.title.create')">
    <CancelAction :to="{ name: 'users' }" />
  </ContentHeader>

  <div class="m-5">
    <FormKit id="create" type="form" submit-label="Create" @submit="submit">
      <FormKit
        id="username"
        type="text"
        name="username"
        validation="required|length:3,64"
        label="Username"
        help="Username of your user"
      />
      <FormKit
        id="password"
        type="text"
        name="password"
        validation="required|length:3,64"
        label="Password"
        help="Password of your user"
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
        id="fullname"
        type="text"
        name="fullname"
        validation=""
        label="Fullname"
        help="Fullname of your user"
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

import { reset } from "@formkit/core";
import { useRouter } from "vue-router";
import { useUserStore } from "../../store/users";

import { useI18n } from "vue-i18n";

import type { notification } from "../../client/models/notification";
import type { user } from "../../client/models/user";

const router = useRouter();
const store = useUserStore();

const { t } = useI18n({
  useScope: "global",
});

async function submit(data: user) {
  return store
    .createUser(data)
    .then((resp: void | notification | user) => {
      const val = <user>resp;
      reset("create");
      router.push({ name: "showUser", params: { userId: val.username } });
    })
    .catch((e) => {
      console.log(e);
    });
}
</script>

<script lang="ts">
export default {
  name: "UserCreate",
};
</script>
