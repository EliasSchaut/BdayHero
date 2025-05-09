import { alertStore } from "@/store/alert";

export default defineNuxtPlugin(({ hook }) => {
  const alert = alertStore();
  hook("i18n:beforeLocaleSwitch", () => {
    alert.hide();
  });

  hook("vue:error", (error, instance, info) => {
    alert.show(String(error), "danger");
    console.error(error);
  });
});
