export const tabsStore = defineStore('tabs', {
  state: (): TabsType => {
    return {
      hovering: false,
      active: null,
      tab_names: [],
      tab_names_static: [],
    };
  },
  actions: {
    setActive(tab_name: string) {
      this.active = tab_name;
    },
    isActive(tab_name: string) {
      return this.active === tab_name;
    },
    setTabs(tab_names: string[]) {
      this.tab_names = tab_names;
      this.active = tab_names[0];
    },
    addTab(tab_name: string) {
      if (this.tab_names.includes(tab_name)) return;
      if (tab_name.includes('.')) return;
      this.tab_names.push(tab_name);
      this.tab_names_static.push(tab_name);
      if (this.active === null) {
        this.active = tab_name;
      }
    },
    getIndexOfTab(tab_name: string) {
      return this.tab_names.indexOf(tab_name);
    },
    setHovering(is_hovering: boolean) {
      this.hovering = is_hovering;
    },
    moveSelectedTabToTop(tab_name: string) {
      const new_tabs = [...this.tab_names];
      const idx = this.getIndexOfTab(tab_name);
      const selected_tab = new_tabs.splice(idx, 1);
      new_tabs.unshift(selected_tab[0]);
      this.setTabs(new_tabs);
    },
  },
});

export type TabsType = {
  hovering: boolean;
  active: string | null;
  tab_names: Array<string>;
  tab_names_static: Array<string>;
};
