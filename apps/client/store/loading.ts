export const loadingStore = defineStore("loading", {
  state: (): LoadingType => {
    return {
      loading: ref(false),
      success: ref(false),
      failure: ref(false),
    };
  },
  actions: {
    set_loading() {
      this.success = false;
      this.failure = false;
      this.loading = true;
    },
    set_default() {
      this.success = false;
      this.failure = false;
      this.loading = false;
    },
    set_success() {
      this.loading = false;
      this.failure = false;
      this.success = true;
    },
    set_failure() {
      this.loading = false;
      this.success = false;
      this.failure = true;
    },
    set_failure_then_default(delay_between: number = 2) {
      this.set_failure();
      setTimeout(() => this.set_default(), delay_between * 1000);
    },
    set_success_then_default(delay_between: number = 2) {
      this.set_success();
      setTimeout(() => this.set_default(), delay_between * 1000);
    },
  },
});

class LoadingType {
  loading!: Ref<boolean>;
  success!: Ref<boolean>;
  failure!: Ref<boolean>;
}
