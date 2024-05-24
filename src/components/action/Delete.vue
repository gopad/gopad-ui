<template>
  <component
    :is="component"
    href="#"
    class="ml-3"
    @click.prevent="showModal"
    @click.shift.prevent="confirmDelete"
  >
    <font-awesome-icon :icon="['fas', 'trash']" class="pr-1" />
    {{ t("actions.delete") }}
  </component>

  <fwb-modal v-if="isShowModal" @close="closeModal">
    <template #header>
      <div class="flex items-center text-lg">
        {{ t("actions.delete") }}
      </div>
    </template>
    <template #body>
      <i18n-t
        keypath="actions.confirm_delete"
        tag="p"
        class="text-base text-left leading-relaxed text-gray-500 dark:text-gray-400"
      >
        <code>{{ element }}</code>
      </i18n-t>
    </template>
    <template #footer>
      <div class="flex justify-between">
        <fwb-button color="alternative" @click="closeModal">
          {{ t("actions.cancel") }}
        </fwb-button>
        <fwb-button color="red" @click="confirmDelete">
          {{ t("actions.confirm") }}
        </fwb-button>
      </div>
    </template>
  </fwb-modal>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";

import { FwbButton, FwbA, FwbModal } from "flowbite-vue";

const { t } = useI18n({
  useScope: "global",
});

const props = withDefaults(
  defineProps<{
    element: string;
    handler: () => void;
    tag?: string;
  }>(),
  {
    element: "unknown",
    tag: "button",
  },
);

const isShowModal = ref<boolean>(false);

const component = computed(() => {
  return props.tag === "button" ? FwbButton : FwbA;
});

function confirmDelete() {
  props.handler();
  isShowModal.value = false;
}

function closeModal() {
  isShowModal.value = false;
}

function showModal() {
  isShowModal.value = true;
}
</script>

<script lang="ts">
export default {
  name: "DeleteAction",
};
</script>
