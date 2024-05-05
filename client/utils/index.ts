import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Updater } from '@tanstack/vue-table';
import type { Ref } from 'vue';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function value_updater<T extends Updater<any>>(
  updaterOrValue: T,
  ref: Ref,
) {
  return (ref.value =
    updaterOrValue instanceof Function
      ? updaterOrValue(ref.value)
      : updaterOrValue);
}
