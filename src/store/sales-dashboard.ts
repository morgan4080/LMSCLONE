import { defineStore } from "pinia";
import { SalesDashboardState } from "@/types/sales-dashboard";
import axios from "axios";
import moment from "moment";
import { formatMoney } from "@/helpers";

export const useSalesDashboardStore = defineStore("sales-dashboard-store", {
  state: (): SalesDashboardState => ({
    branchIds: ["ALL"],
    salesRepIds: ["ALL"],
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
        : "ALL";
      const salesRepIds = state.salesRepIds?.length
        ? state.salesRepIds.join(",")
        : "ALL";

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
    getUpcomingCollections: function (filters?: string) {
      this.upcomingCollections.loading = true;
      let url = `${
        import.meta.env.VITE_KOPESHA_API_URL
      }/api/v1/salesrep/collections/upcoming${this.params}`;
      filters && (url += filters);
      axios
        .get(url)
        .then(response => {
          this.upcomingCollections = response.data;
        })
        .finally(() => (this.upcomingCollections.loading = false));
    },
    getOverdueCollections: function (filters?: string) {
      this.overdueCollections.loading = true;
      let url = `${
        import.meta.env.VITE_KOPESHA_API_URL
      }/api/v1/salesrep/collections/overdue${this.params}`;

      filters && (url += filters);
      axios
        .get(url)
        .then(response => {
          this.overdueCollections = response.data;
        })
        .finally(() => (this.overdueCollections.loading = false));
    },
    //TODO: add param for thing
    getNewCustomers: function (filters?: string) {
      this.newCustomers.loading = true;
      let url = `${
        import.meta.env.VITE_KOPESHA_API_URL
      }/api/v1/salesrep/customers${this.params}`;
      filters && (url += filters);
      axios
        .get(url)
        .then(response => {
          this.newCustomers = response.data;
        })
        .finally(() => (this.newCustomers.loading = false));
    },
  },
});
