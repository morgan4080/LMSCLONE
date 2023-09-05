import { reactive, ref, watch } from "vue";
import { useQueryParams } from "@/composables/useQueryParams";
import { defineStore } from "pinia";
import axios from "@/services/api/axiosKopesha";
import { saveAs } from "file-saver";
import moment from "moment/moment";

export interface KopeshaPagination {
  salesRepRefIds: string;
  searchTerm: string;
  onboardingStatus: "Approved" | "Pending" | "";
  productName: string;
  repaymentStatus: string;
  draw: number;
  start: number;
  length: number;
  startDate: string;
  endDate: string;
}

export interface Collections {
  data: {
    refId: string;
    created: string;
    fullName: string;
    phoneNumber: string;
    approvalLimit: number;
    activeLoan: number;
    onboardingStatus: string;
    hasUssd: string;
    dayJoined: string;
    keycloakId: string;
  }[];
  draw: number;
  start: number;
  length: number;
  recordsFiltered: number;
  recordsTotal: number;
}

export const useCustomer = defineStore("customers", () => {
  const pageables = reactive({
    salesRepRefIds: "",
    onboardingStatus: "",
    searchTerm: "",
    productName: "",
    repaymentStatus: "",
    draw: 1,
    start: 0,
    length: 10,
    startDate: "",
    endDate: "",
  }) as KopeshaPagination;
  const stats = ref({
    startDate: moment()
      .add("-6", "years")
      .startOf("year")
      .format("DD/MM/YYYY"),
    endDate: moment().format("DD/MM/YYYY"),
  });
  const { params, generateParams } = useQueryParams(pageables);
  const customersCollections = ref<Collections>({
    data: [],
    draw: 1,
    start: 0,
    length: 10,
    recordsFiltered: 0,
    recordsTotal: 0,
  });
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
          | "quarter"
          | "year"
          | "all"
          | "arrears";
      }[];
    },
  });

  const isLoading = ref(false);

  // export
  const selectedExportOption = ref<{ name: string; value: string } | null>(
    null
  );
  const exportOptions = ref<{ name: string; value: string }[]>([
    { name: "CSV", value: "csv" },
  ]);
  const setSelectedExportOption = async (
    option: { name: string; value: string } | null
  ) => {
    selectedExportOption.value = option;
  };
  const exportData = async () => {
    console.log("value changed", selectedExportOption.value);
  };
  watch(selectedExportOption, async value => {
    if (value) {
      await exportData();
    }
  });

  //   onboarding period

  const selectedOnboardingOption = ref<{ name: string; value: string } | null>(
    null
  );
  const onboardingOptions = ref<{ name: string; value: string }[]>([
    { name: "All", value: "" },
    { name: "Approved", value: "Approved" },
    { name: "Declined", value: "Pending" },
  ]);
  const setSelectedOnboardingOption = async (
    option: { name: string; value: string } | null
  ) => {
    selectedOnboardingOption.value = option;
  };
  const onboardingData = async () => {
    console.log("value changed", selectedOnboardingOption.value);
  };
  watch(selectedOnboardingOption, async value => {
    if (value) {
      await onboardingData();
    }
  });
  //   headers
  const headers = ref<
    { title: string; key: string; align: string; sortable: boolean }[]
  >([
    { title: "Date Joined", align: "start", sortable: false, key: "created" },
    { title: "Names", key: "fullName", align: "end", sortable: false },
    { title: "Phone No", key: "phoneNumber", align: "end", sortable: false },
    {
      title: "Loan Limit",
      key: "approvalLimit",
      align: "end",
      sortable: false,
    },
    { title: "Active Loan", key: "activeLoan", align: "end", sortable: false },
    { title: "Actions", key: "refId", align: "end", sortable: false },
  ]);

  //fetching on the customers
  const fetchCustomersCollections = async () => {
    isLoading.value = true;
    await generateParams();
    const url = `/api/v1/salesrep/customers?${params.value}`;
    const { data } = await axios.get(url);
    customersCollections.value = data;
    isLoading.value = false;
  };

  const exportCustomers = async () => {
    isLoading.value = true;
    await generateParams();
    const url = `${
      import.meta.env.VITE_KOPESHA_API_URL
    }/api/v1/salesrep/customers/export?${params.value}`;
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      saveAs(blob, `Customer_List_${pageables.startDate}_${pageables.endDate}`);
    } catch {
      return "";
    } finally {
      isLoading.value = false;
    }
  };

  return {
    pageables,
    fetchCustomersCollections,
    headers,
    isLoading,
    customersCollections,
    stats,
    salesOverviewFilters,

    selectedOnboardingOption,
    onboardingOptions,
    setSelectedOnboardingOption,

    selectedExportOption,
    exportOptions,
    setSelectedExportOption,
    exportCustomers,
  };
});
