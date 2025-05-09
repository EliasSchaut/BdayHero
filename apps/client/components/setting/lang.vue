<template>
  <div>
    <button v-if="$i18n.locale === 'de'" @click="setLocale('en')">
      <IconFlagDe
        class="text-second-600 group-hover:text-second-500 dark:text-second-400 h-6 w-6"
        aria-hidden="true"
      />
    </button>
    <button v-else-if="$i18n.locale === 'en'" @click="setLocale('de')">
      <IconFlagUk
        class="text-second-600 group-hover:text-second-500 dark:text-second-400 h-6 w-6"
        aria-hidden="true"
      />
    </button>
  </div>
</template>

<script lang="ts">
import { IconFlagDe, IconFlagUk } from "#components";
import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/vue/24/outline";

export default defineComponent({
  name: "SettingLang",
  components: {
    ComputerDesktopIcon,
    MoonIcon,
    SunIcon,
    IconFlagDe,
    IconFlagUk,
  },
  setup() {
    return {
      setLocale: useI18n().setLocale,
    };
  },
});
</script>
