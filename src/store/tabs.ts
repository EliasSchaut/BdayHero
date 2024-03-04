export const tabsStore = defineStore('tabs', {
  state: (): TabsType => {
    return {
      hovering: false,
      active: null,
      tabs: [],
    };
  },
  actions: {
    setActive(tab: TabType) {
      this.active = tab;
    },
    isActive(tab: TabType) {
      return this.active === tab;
    },
    setTabs(tabs: TabType[]) {
      this.tabs = tabs;
    },
    setHovering(is_hovering: boolean) {
      this.hovering = is_hovering;
    },
    moveSelectedTabToTop(title: string) {
      const new_tabs = [...this.tabs];
      const idx = new_tabs.findIndex((tab) => tab.title === title);
      const selected_tab = new_tabs.splice(idx, 1);
      new_tabs.unshift(selected_tab[0]);
      this.setTabs(new_tabs);
      this.setActive(new_tabs[0]);
    },
  },
});

export type TabType = { title: string; content: any };

export type TabsType = {
  hovering: boolean;
  active: TabType | null;
  tabs: Array<TabType>;
};
