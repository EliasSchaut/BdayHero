<template>
  <ul
    role="list"
    class="divide-second-100 ring-second-900/5 dark:divide-second-700 dark:bg-second-800 dark:ring-second-700 divide-y overflow-hidden bg-white shadow-sm ring-1 sm:rounded-xl"
  >
    <li
      v-for="element in list"
      :key="element.content"
      class="hover:bg-second-50 dark:hover:bg-second-900 relative flex justify-between gap-x-6 px-4 py-5 sm:px-6"
    >
      <div class="flex min-w-0 gap-x-4">
        <component
          v-if="element.icon"
          class="h-6 w-6 flex-none"
          :is="element.icon()"
          alt=""
        />
        <div class="min-w-0 flex-auto">
          <p
            class="text-second-900 dark:text-second-100 text-sm leading-6 font-semibold"
          >
            <a v-if="element.href" :href="element.href" target="_blank">
              <span class="absolute inset-x-0 -top-px bottom-0" />
              {{ element.content }}
            </a>
            <span v-else>{{ element.content }}</span>
          </p>
          <p
            v-if="element.subcontent"
            class="text-second-600 dark:text-second-400"
          >
            {{ element.subcontent }}
          </p>
        </div>
      </div>
      <div v-if="element.href" class="flex shrink-0 items-center gap-x-4">
        <ChevronRightIcon
          class="text-second-400 dark:text-second-500 h-5 w-5 flex-none"
          aria-hidden="true"
        />
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/20/solid';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'List',
  components: {
    ChevronRightIcon,
  },
  props: {
    list: {
      type: Array<{
        content: string;
        subcontent?: string;
        href?: string;
        icon?: Function;
      }>,
      required: true,
    },
  },
});
</script>
