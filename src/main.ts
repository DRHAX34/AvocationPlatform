import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import ApiService from "./services/apiService";
import ServiceOptions from "./services/serviceOptions";

Vue.config.productionTip = false;

Vue.use(
  ApiService,
  new ServiceOptions("https://localhost:7053/api", async () => {
    return "TESTE";
  })
);

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
