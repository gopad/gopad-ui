import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n, type I18nOptions } from "vue-i18n";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

import enUS from "./locales/en-us.json";
import deDE from "./locales/de-de.json";

import router from "./router";
import App from "./App.vue";

import { useConfigStore } from "./store/config";
import { useNotifyStore } from "./store/notify";
import { useAuthStore } from "./store/auth";

library.add(fab, far, fas);

const pinia = createPinia();

const options: I18nOptions = {
  legacy: false,
  locale: "en-US",
  messages: {
    "en-US": enUS,
    "de-DE": deDE,
  },
  datetimeFormats: {
    "en-US": {
      long: {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
        hour12: true,
      },
    },
    "de-DE": {
      long: {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
        hour12: false,
      },
    },
  },
  numberFormats: {
    "en-US": {
      currency: {
        style: "currency",
        currencyDisplay: "symbol",
        currency: "USD",
      },
    },
    "de-DE": {
      currency: {
        style: "currency",
        currencyDisplay: "symbol",
        currency: "EUR",
      },
    },
  },
};

const i18n = createI18n<false, typeof options>(options);

const app = createApp(App);

app.use(pinia);
app.use(i18n);
app.use(router);

app.component("FontAwesomeIcon", FontAwesomeIcon);

useConfigStore()
  .loadConfig()
  .then(() => {
    useNotifyStore().initialize();
    useAuthStore().initialize();
    app.mount("#app");
  });
