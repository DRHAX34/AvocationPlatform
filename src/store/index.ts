import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentPage: "",
    currentPageSubMenu: [],
    isMobile: false,
  },
  mutations: {
    setCurrentPage(state, page) {
      state.currentPage = page;
    },
    setPageSubMenu(state, subMenu) {
      state.currentPageSubMenu = subMenu;
    },
    setMobileMode(state, isMobile) {
      state.isMobile = isMobile;
    },
  },
});

export default store;
