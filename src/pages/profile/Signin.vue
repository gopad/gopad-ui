<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white"
          >
            Sign in to your account
          </h1>

          <form class="space-y-4 md:space-y-6" @submit.prevent="submit">
            <fwb-input
              v-model="values.username"
              placeholder="Username"
              label="Username"
              :validation-status="v.username.$error ? 'error' : undefined"
            />

            <fwb-input
              v-model="values.password"
              placeholder="Password"
              label="Password"
              type="password"
              :validation-status="v.password.$error ? 'error' : undefined"
            />

            <fwb-button
              color="default"
              size="lg"
              class="w-full"
              :loading="authStore.loading"
            >
              Submit
            </fwb-button>

            <div v-if="getProviders.total" class="flex items-center">
              <div class="w-full h-0.5 bg-gray-200 dark:bg-gray-700"></div>
              <div class="px-5 text-center text-gray-500 dark:text-gray-400">
                or
              </div>
              <div class="w-full h-0.5 bg-gray-200 dark:bg-gray-700"></div>
            </div>

            <div v-if="getProviders.total" class="space-y-3">
              <a
                v-for="row in getProviders.listing"
                :key="row.name"
                :href="<string>row.url"
                class="w-full inline-flex items-center justify-center py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <font-awesome-icon :icon="row.icon" size="lg" class="pr-2" />
                {{ row.display }}
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { FwbInput, FwbButton } from "flowbite-vue";

import { onMounted, reactive } from "vue";
import { storeToRefs } from "pinia";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../../store/auth";

import type { auth_token, notification } from "../../client/types.gen";

const authStore = useAuthStore();
const { getProviders } = storeToRefs(authStore);

const route = useRoute();
const router = useRouter();

const values = reactive({
  username: "" as string,
  password: "" as string,
});

const rules = {
  username: { required },
  password: { required },
};

const v = useVuelidate(rules, values);

async function submit() {
  const isValid = await v.value.$validate();

  if (isValid) {
    authStore
      .login(values.username, values.password)
      .then((response: auth_token | notification) => {
        if ("status" in response && response.status !== 200) {
          throw response;
        }

        router.push((route.query.redirect as string) || { name: "welcome" });
      })
      .catch(() => {});
  }
}

onMounted(() => {
  authStore.fetchProviders();
});
</script>

<script lang="ts">
export default {
  name: "ProfileSignin",
};
</script>
