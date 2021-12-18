import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Appointments from "../views/Appointments.vue";
import Openings from "../views/Openings.vue";
import Clients from "../views/Clients.vue";
import Candidates from "../views/Candidates.vue";
import MeetingRooms from "../views/MeetingRooms.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Appointments",
    name: "Appointments",
    component: Appointments,
  },
  {
    path: "/Openings",
    name: "Openings",
    component: Openings,
  },
  {
    path: "/Candidates",
    name: "Candidates",
    component: Candidates,
  },
  {
    path: "/Clients",
    name: "Clients",
    component: Clients,
  },
  {
    path: "/MeetingRooms",
    name: "MeetingRooms",
    component: MeetingRooms,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
