import { defineStore } from "pinia";
import axios from "axios";
import moment from "moment";
import { formatMoney } from "@/helpers";
import axiosKopesha from "@/services/api/axiosKopesha";
import { computed, onBeforeMount, reactive, ref } from "vue";
import {
  Customer,
  OverdueCollection,
  Pagination,
  SalesRep,
  UpcomingCollection,
} from "@/types/sales-dashboard";
import { useAuthStore } from "@/store/auth-store";
export const useSalesDashboardStore = defineStore(
  "sales-dashboard-store",
  () => {
    const branchIds = ref([""]);
    const salesRepIds = ref([""]);
    const branches = ref([""]);
    const salesReps = ref<SalesRep[]>([]);
    const authStore = useAuthStore();

    const stats = ref({
      startDate: moment()
        .add("-6", "years")
        .startOf("year")
        .format("DD/MM/YYYY"),
      endDate: moment().format("DD/MM/YYYY"),
      upcomingCollections: "0.0",
      overdueCollections: "0.0",
      overdueCollectionsPercent: "0%",
      upcomingCollectionsCount: "0",
      overdueCollectionsCount: "0",
      customersCount: "0",

      // my customers
      customersCountIncrement: "+0%",
      totalCustomers: "0",
      newCustomers: "0",
      newCustomersPercent: "0%",
      onBoardingApprovals: "0",
      onboardingApprovals: "0",
    });

    const upcomingCollections = ref<
      { data: UpcomingCollection | [] } & Pagination
    >({
      data: [],
      loading: false,
      draw: 0,
      length: 0,
      recordsFiltered: 0,
      recordsTotal: 0,
      start: 0,
    });
    const overdueCollections = ref<
      { data: OverdueCollection | [] } & Pagination
    >({
      data: [],
      loading: false,
      draw: 0,
      length: 0,
      recordsFiltered: 0,
      recordsTotal: 0,
      start: 0,
    });
    const newCustomers = ref<{ data: Customer | [] } & Pagination>({
      data: [],
      loading: false,
      draw: 0,
      length: 0,
      recordsFiltered: 0,
      recordsTotal: 0,
      start: 0,
    });
    const tabs = ref([
      "Due Today",
      "Due This Week",
      "In Arrears",
      "Loan Approvals",
    ]);
    const myCustomerTabs = ref(["All Customers", "Onboarding Approvals"]);
    const tab = ref<string | null>(null);
    const salesOverviewFilters = reactive({
      branches: {
        text: null,
        appendIcon: "mdi:mdi-chevron-down",
      } as {
        text: string | null;
        appendIcon: string;
      },
      salesRep: {
        text: null,
        id: "",
        appendIcon: "mdi:mdi-chevron-down",
      } as {
        text: string | null;
        id: string | null;
        appendIcon: string;
      },
      dateFilters: {
        text: "Today",
        value: "day",
        appendIcon: "mdi:mdi-chevron-down",
        menus: [
          {
            title: "Today",
            value: "day",
          },
          {
            title: "This Week",
            value: "week",
          },
          {
            title: "This Month",
            value: "month",
          },
          {
            title: "Last Month",
            value: "last-month",
          },
          {
            title: "This Quarter",
            value: "quarter",
          },
          {
            title: "This Year",
            value: "year",
          },
          {
            title: "All",
            value: "all",
          },
        ],
      } as {
        text: string;
        value:
          | "day"
          | "week"
          | "month"
          | "last-month"
          | "quarter"
          | "year"
          | "all"
          | "arrears";
        appendIcon: string;
        menus: {
          title: string;
          value:
            | "day"
            | "week"
            | "month"
            | "last-month"
            | "quarter"
            | "year"
            | "all"
            | "arrears";
        }[];
      },
    });
    const collectionFilter = ref({
      collections: {
        name: "Collections",
        appendIcon: "mdi:mdi-chevron-down",
        menu: ["Upcoming", "Overdue"],
      },
    });

    const upcomingCollectionFilters = ref({
      product: {
        text: null,
        appendIcon: "mdi:mdi-chevron-down",
        menus: [
          "Biashara",
          "PRESTA LMS",
          "Corporate Loan",
          "Okoa",
          "Salary Advance",
        ],
      } as { text: string | null; appendIcon: string; menus: string[] },
      status: {
        text: null,
        appendIcon: "mdi:mdi-chevron-down",
        menus: [
          {
            title: "Paid",
            value: "Paid",
          },
          {
            title: "Not Paid",
            value: "NOTPAID",
          },
          {
            title: "Partially Paid",
            value: "Partially Paid",
          },
        ],
      } as {
        text: string | null;
        appendIcon: string;
        menus: { title: string; value: string }[];
      },
    });

    const overdueCollectionFilters = ref({
      product: {
        text: null,
        appendIcon: "mdi:mdi-chevron-down",
        filterParam: "",
        menus: [
          "Biashara",
          "PRESTA LMS",
          "Corporate Loan",
          "Okoa",
          "Salary Advance",
        ],
      } as {
        text: string | null;
        appendIcon: string;
        filterParam: string;
        menus: string[];
      },
      status: {
        text: null,
        appendIcon: "mdi:mdi-chevron-down",
        filterParam: "",
        menus: [
          {
            title: "Paid",
            value: "&status=Paid",
          },
          {
            title: "Not Paid",
            value: "&status=NOTPAID",
          },
          {
            title: "Partially Paid",
            value: "&status=Partially Paid",
          },
        ],
      } as {
        text: string | null;
        appendIcon: string;
        filterParam: string;
        menus: { title: string; value: string }[];
      },
    });
    const upComingCollectionActions = ref([
      {
        text: "Export",
        appendIcon: "mdi:mdi-chevron-down",
        menus: [
          {
            text: "Op 1",
          },
          {
            text: "Op 2",
          },
          {
            text: "Op 3",
          },
        ],
      },
      {
        text: "Show/Hide",
        appendIcon: "mdi:mdi-chevron-down",
        menus: [
          {
            text: "Op 1",
          },
          {
            text: "Op 2",
          },
          {
            text: "Op 3",
          },
        ],
      },
      {
        text: "This Week",
        appendIcon: "mdi:mdi-chevron-down",
        menus: [
          {
            text: "Op 1",
          },
          {
            text: "Op 2",
          },
          {
            text: "Op 3",
          },
        ],
      },
      {
        text: null,
        appendIcon: "mdi:mdi-dots-vertical",
        menus: [
          {
            text: "Op 1",
          },
          {
            text: "Op 2",
          },
          {
            text: "Op 3",
          },
        ],
      },
    ]);

    const newCustomerFilters = ref({
      status: {
        text: "Select Onboarding ",
        filterParam: "",
        appendIcon: "mdi:mdi-chevron-down",
        menus: [
          {
            title: "Approved",
            param: "&onboardingStatus=Approved",
          },
          { title: "Denied", param: "&onboardingStatus=Denied" },
        ],
      },
      ussd: {
        text: "Select USSD Status",
        filterParam: "",
        appendIcon: "mdi:mdi-chevron-down",
        menus: [
          {
            text: "Has USSD",
            param: "&hasUssd=YES",
          },
          {
            text: "Lacks USSD",
            param: "&hasUssd=NO",
          },
        ],
      },
    });

    const newCustomerActions = ref([
      {
        text: "Export",
        appendIcon: "mdi:mdi-chevron-down",
        menus: [
          {
            text: "Op 1",
          },
          {
            text: "Op 2",
          },
          {
            text: "Op 3",
          },
        ],
      },
      {
        text: "Show/Hide",
        appendIcon: "mdi:mdi-chevron-down",
        menus: [
          {
            text: "Op 1",
          },
          {
            text: "Op 2",
          },
          {
            text: "Op 3",
          },
        ],
      },
      {
        text: "This Week",
        appendIcon: "mdi:mdi-chevron-down",
        menus: [
          {
            text: "Op 1",
          },
          {
            text: "Op 2",
          },
          {
            text: "Op 3",
          },
        ],
      },
      {
        text: null,
        appendIcon: "mdi:mdi-dots-vertical",
        menus: [
          {
            text: "Op 1",
          },
          {
            text: "Op 2",
          },
          {
            text: "Op 3",
          },
        ],
      },
    ]);

    const params = computed<any>({
      get: () => {
        const params = new URLSearchParams();
        const salesRepIdsL = salesRepIds.value?.length
          ? salesRepIds.value.join(",")
          : "";
        console.log(stats.value.startDate);
        console.log(stats.value.endDate);
        params.append("salesRepRefIds", salesRepIdsL);
        params.append("startDate", stats.value.startDate);
        params.append("endDate", stats.value.endDate);
        return "?" + params.toString();
      },
      set: ({ start, end }: { start: string; end: string }) => {
        stats.value.startDate = start;
        stats.value.endDate = end;
      },
    });

    function getBranches() {
      axiosKopesha.get(`/api/v1/salesrep/branches`).then(response => {
        branches.value = response.data;
      });
    }

    onBeforeMount(async () => {
      await authStore.initialize()
    })

    async function getSalesReps() {
      try {
        if (authStore.getCurrentUser) {
          axiosKopesha.get(`/api/v1/salesrepresentative/all`)
            .then(response => {
            console.log(authStore.getCurrentUser)
            if (
              authStore.getCurrentUser &&
              authStore.getCurrentUser.permissions &&
              authStore.getCurrentUser.permissions.includes("CAN_VIEW_SALES_DASHBOARD")
            ) {
              console.log("::::::response.data:::::")
              console.log(response.data)
              salesReps.value = response.data;
            } else {
              salesReps.value = response.data.filter((rep: SalesRep) => rep.keycloakId === authStore.getCurrentUser?.keycloakId);
              console.log("::::::salesReps.value:::::")
              console.log(salesReps.value)
              if (salesReps.value.length > 0) {
                salesOverviewFilters.salesRep.id = salesReps.value[0].refId;
                salesOverviewFilters.salesRep.text = `${salesReps.value[0].fullName}`;
              }
            }
          });
        }
      } catch (e) {
        console.log(e)
      }
    }

    function getStats() {
      try {
        axiosKopesha
          .get(`/api/v1/salesrep/overview${params.value}`)
          .then(response => {
            stats.value.upcomingCollections = formatMoney(
              response.data.upcomingCollections
            );
            stats.value.overdueCollections = formatMoney(
              response.data.overdueCollections
            );
            stats.value.upcomingCollectionsCount =
              response.data.upcomingCollectionsCount;
            stats.value.overdueCollectionsCount =
              response.data.overdueCollectionsCount;
            stats.value.customersCount = response.data.customersCount;
            stats.value.customersCountIncrement =
              response.data.customersCountIncrement;
          });
      } catch (e) {
        console.log(e)
      }
    }

    function getOverdueCollections(filters?: string) {
      try {
        overdueCollections.value.loading = true;
        let url = `/api/v1/salesrep/collections/overdue${params.value}`;
        filters && (url += filters);
        axiosKopesha
          .get(url)
          .then(response => {
            overdueCollections.value = response.data;
          })
          .finally(() => (overdueCollections.value.loading = false));
      } catch (e) {
        console.log(e)
      }
    }

    function getNewCustomers(filters?: string) {
      newCustomers.value.loading = true;
      let url = `/api/v1/salesrep/customers${params.value}`;
      filters && (url += filters);
      axios
        .get(url)
        .then(response => {
          newCustomers.value = response.data;
        })
        .finally(() => (newCustomers.value.loading = false));
    }

    function newCustomerFilterFetch() {
      const newParam = newCustomerFilters.value.ussd.filterParam.concat(
        newCustomerFilters.value.status.filterParam
      );
      getNewCustomers(newParam);
    }

    function overdueCollectionFilterFetch() {
      const newParam =
        overdueCollectionFilters.value.product.filterParam.concat(
          overdueCollectionFilters.value.status.filterParam
        );
      getOverdueCollections(newParam);
    }
    function getStatsCustomer() {
      axiosKopesha
        .get(`/api/v1/salesrep/customer${params.value}`)
        .then(response => {
          stats.value.totalCustomers = response.data.totalCustomers;
          stats.value.newCustomers = response.data.newCustomers;
          stats.value.onBoardingApprovals = response.data.onBoardingApprovals;
          stats.value.newCustomersPercent = response.data.newCustomersPercent;
          stats.value.customersCountIncrement =
            response.data.customersCountIncrement;
          stats.value.onboardingApprovals = response.data.onboardingApprovals;
        });
    }

    const setStatsDates = (start: string, end: string) => {
      params.value = { start, end };
    };

    return {
      branchIds,
      salesRepIds,
      branches,
      salesReps,
      stats,
      upcomingCollections,
      overdueCollections,
      newCustomers,
      myCustomerTabs,
      tabs,
      tab,
      salesOverviewFilters,
      collectionFilter,
      upcomingCollectionFilters,
      overdueCollectionFilters,
      upComingCollectionActions,
      newCustomerFilters,
      newCustomerActions,

      getNewCustomers,
      getOverdueCollections,
      getStats,
      getSalesReps,
      getBranches,
      getStatsCustomer,
      newCustomerFilterFetch,
      overdueCollectionFilterFetch,
      setStatsDates,
    };
  }
);
