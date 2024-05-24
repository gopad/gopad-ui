import { en, de } from "@formkit/i18n";
import { defaultConfig } from "@formkit/vue";
import { rootClasses } from "./formkit.theme";

export const formkitConfig = defaultConfig({
  locales: { en, de },
  locale: "en",

  iconLoaderUrl: (iconName: string) =>
    `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free/svgs/solid/${iconName}.svg`,

  config: {
    rootClasses,
  },
});
