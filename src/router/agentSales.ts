const agentSalesRouter = [
  {
    path: "/agentsales/correlations",
    name: "CorrelationsDashboard",
    component: () => import("@/views/AgentSales/CorrelationsDashboard.vue"),
  },
  {
    path: "/agentsales/issuedLoans",
    name: "IssuedLoansDashboard",
    component: () => import("@/views/AgentSales/IssuedLoansDashboard.vue"),
  },
  {
    path: "/agentsales/collections",
    name: "CollectionsDashboard",
    component: () => import("@/views/AgentSales/CollectionsDashboard.vue"),
  },
  {
    path: "/agentsales/loanRepayments",
    name: "LoanRepaymentsDashboard",
    component: () => import("@/views/AgentSales/LoanRepaymentsDashboard.vue"),
  },
  {
    path: "/agentsales/applicationsMembership",
    name: "ApplicationsMembershipDashboard",
    component: () =>
      import("@/views/AgentSales/ApplicationsMembershipDashboard.vue"),
  },
];

export default agentSalesRouter;
