import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Home.vue"),
  },
  {
    path: "/Appointments",
    name: "Appointments",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Appointments.vue"),
  },
  {
    path: "/Openings",
    name: "Openings",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Openings.vue"),
  },
  {
    path: "/Candidates",
    name: "Candidates",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Candidates.vue"),
  },
  {
    path: "/Clients",
    name: "Clients",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Clients.vue"),
  },
  {
    path: "/MeetingRooms",
    name: "MeetingRooms",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MeetingRooms.vue"),
  },
  {
    path: "/Candidate",
    name: "Candidate",
    redirect: "/Candidate/Dashboard",
  },
  {
    path: "/Candidate/Dashboard",
    name: "CandidateDashboard",
    component: () => import("../views/Candidate/Dashboard.vue"),
  },
  {
    path: "/Candidate/Onboarding",
    name: "CandidateOnboarding",
    component: () => import("../views/Candidate/Onboarding.vue"),
  },
  {
    path: "/About",
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
