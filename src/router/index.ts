// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
      },
      {
        path: "/scoring",
        name: "scoring",
        component: () => import("@/views/Scoring/Upload.vue"),
      },
      {
        path: "/scoring/all",
        name: "allScoring",
        component: () => import("@/views/Scoring/All.vue"),
      },
      {
        path: "/scoring/mobile/:slug",
        name: "singleMobileListing",
        component: () => import("@/views/Scoring/MobileListing.vue"),
      },
      {
        path: "/scoring/bank",
        name: "Bank Listing",
        component: () => import("@/views/Scoring/Bank.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory("/sales-dashboard/"),
  routes,
});

export default router;
