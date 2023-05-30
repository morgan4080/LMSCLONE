import { defineStore } from "pinia";
import { SalesDashboardState } from "@/types/sales-dashboard";
import axios from "axios";
import moment from "moment";
import { formatMoney } from "@/helpers";

export const useSalesDashboardStore = defineStore("app", {
  state: (): SalesDashboardState => ({
    branchIds: ["Upper Hill"],
    salesRepIds: ["y5gQa6UklgxcYd8C"],
    branches: [],
    salesReps: [],
    stats: {
      startDate: moment()
        .add("-6", "years")
        .startOf("year")
        .format("DD/MM/YYYY"),
      endDate: moment().format("DD/MM/YYYY"),
      upcomingCollections: "0.0",
      overdueCollections: "0.0",
      upcomingCollectionsCount: "0",
      overdueCollectionsCount: "0",
      customersCount: "0",
      customersCountIncrement: "+0%",
    },
    upcomingCollections: {
      data: [],
      loading: false,
      draw: 0,
      length: 0,
      recordsFiltered: 0,
      recordsTotal: 0,
      start: 0,
    },
    overdueCollections: {
      data: [],
      loading: false,
      draw: 0,
      length: 0,
      recordsFiltered: 0,
      recordsTotal: 0,
      start: 0,
    },
    newCustomers: {
      data: [],
      loading: false,
      draw: 0,
      length: 0,
      recordsFiltered: 0,
      recordsTotal: 0,
      start: 0,
    },
  }),

  getters: {
    params: state => {
      const params = new URLSearchParams();

      const branchIds = state.branchIds?.length
        ? state.branchIds.join(",")
        : "All";
      const salesRepIds = state.salesRepIds?.length
        ? state.salesRepIds.join(",")
        : "All";

      params.append("branchNames", branchIds);
      params.append("salesRepRefIds", salesRepIds);
      if (state.stats.startDate)
        params.append("startDate", state.stats.startDate);
      if (state.stats.endDate) params.append("endDate", state.stats.endDate);

      return "?" + params.toString();
    },
  },

  actions: {
    getBranches: function () {
      axios
        .get(`${import.meta.env.VITE_KOPESHA_API_URL}/api/v1/salesrep/branches`)
        .then(response => {
          this.branches = response.data;
        });
    },
    getSalesRepByBranch: function (branch: string) {
      axios
        .get(
          `${
            import.meta.env.VITE_KOPESHA_API_URL
          }/api/v1/salesrep/${branch}/salesReps`
        )
        .then(response => {
          this.salesReps = response.data;
        });
    },
    getStats: function () {
      axios
        .get(
          `${import.meta.env.VITE_KOPESHA_API_URL}/api/v1/salesrep/overview${
            this.params
          }`
        )
        .then(response => {
          this.stats.upcomingCollections = formatMoney(
            response.data.upcomingCollections
          );
          this.stats.overdueCollections = formatMoney(
            response.data.overdueCollections
          );
          this.stats.upcomingCollectionsCount =
            response.data.upcomingCollectionsCount;
          this.stats.overdueCollectionsCount =
            response.data.overdueCollectionsCount;
          this.stats.customersCount = response.data.customersCount;
          this.stats.customersCountIncrement =
            response.data.customersCountIncrement;
        });
    },
    getUpcomingCollections: function () {
      this.upcomingCollections.loading = true;
      axios
        .get(
          `${
            import.meta.env.VITE_KOPESHA_API_URL
          }/api/v1/salesrep/collections/upcoming${this.params}`
        )
        .then(response => {
          this.upcomingCollections = response.data;
        })
        .finally(() => (this.upcomingCollections.loading = false));
    },
    getOverdueCollections: function () {
      this.overdueCollections.loading = true;
      axios
        .get(
          `${
            import.meta.env.VITE_KOPESHA_API_URL
          }/api/v1/salesrep/collections/overdue${this.params}`
        )
        .then(response => {
          this.overdueCollections = response.data;
        })
        .finally(() => (this.overdueCollections.loading = false));
    },
    getNewCustomers: function () {
      this.newCustomers.loading = true;
      axios
        .get(
          `${import.meta.env.VITE_KOPESHA_API_URL}/api/v1/salesrep/customers${
            this.params
          }`
        )
        .then(response => {
          this.newCustomers = response.data;
        })
        .finally(() => (this.newCustomers.loading = false));
    },
  },
});
