// Composables
import { createRouter, createWebHistory } from "vue-router";
import agentSalesRouter from "@/router/agentSales";
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
        path: "/scoring/bank/:slug",
        name: "Bank Listing",
        component: () => import("@/views/Scoring/Bank.vue"),
      },
      {
        path: "/sales-customers",
        name: "My Customers",
        component: () => import("@/components/MyCustomersDashboard.vue"),
      },
      ...agentSalesRouter,

    ],
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory("/lms/"),
  routes,
});

export default router;
