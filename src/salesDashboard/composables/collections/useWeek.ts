import { reactive, ref, watch } from "vue";
import { useQueryParams } from "@/composables/useQueryParams";
import { defineStore } from "pinia";
import axios from "@/services/api/axiosKopesha";

export interface KopeshaPagination {
  salesRepRefIds: string;
  searchTerm: string;
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
    dueDate: string;
    dueToday: number;
    customerName: string;
    productName: string;
    phoneNumber: string;
    loanNo: number;
    refId: string;
    amountDue: number;
    loanBalance: number;
    status: "NOTPAID" | "PAID" | "PARTIALLYPAID";
    daysOverdue: 16;
  }[];
  draw: number;
  start: number;
  length: number;
  recordsFiltered: number;
  recordsTotal: number;
  }

export const useWeek = defineStore("weeks", () => {
  const pageables = reactive({
    salesRepRefIds: "",
    searchTerm: "",
    productName: "",
    repaymentStatus: "",
    draw: 1,
    start: 0,
    length: 10,
    startDate: "",
    endDate: "",
  }) as KopeshaPagination;
  const {params, generateParams} = useQueryParams(pageables);
  const weekCollections = ref<Collections>({
    data: [],
    draw: 1,
    start: 0,
    length: 10,
    recordsFiltered: 0,
    recordsTotal: 0,
  } )
  const isLoading = ref(false);
  const selectedExportOption = ref<{ name: string; value: string } | null>(null);
  const exportOptions = ref<{ name: string; value: string }[]>([
    { name: "CSV", value: "csv" },
  ]);
  const setSelectedExportOption = async (
    option: { name: string; value: string } | null
  ) => {
    selectedExportOption.value = option;
  }
  const exportData = async () => {
    console.log("value changed", selectedExportOption.value);
  }

  watch(selectedExportOption, async (value) => {
    if (value) {
      await exportData();
    }
  })


  const selectedStatusOption = ref<{ name: string; value: string } | null>(null);
  const statusOptions = ref<{ name: string; value: string }[]>([
    { name: "PAID", value: "PAID" },
    { name: "NOT PAID", value: "NOTPAID" },
    { name: "PARTIALLY PAID", value: "PARTIALLYPAID" },
  ]);

  const setSelectedStatusOption = async (option: { name: string; value: string } | null) => {
    selectedStatusOption.value = option;
  }
  const filterStatus = async () => {
    console.log("value changed", selectedStatusOption.value);
  }

  watch(selectedStatusOption, async (value) => {
    if (value) {
      await filterStatus();
    }
  })


    const headers = ref<
      { title: string; key: string; align: string; sortable: boolean }[]
    >([
      { title: "Loan No.", align: "start", sortable: false, key: "loanNo" },
      { title: "Date Due", align: "start", sortable: false, key: "dueDate" },
      {
        title: "Name & Phone No",
        key: "customerName",
        align: "start",
        sortable: false,
      },
      {
        title: "Loan Product",
        key: "productName",
        align: "start",
        sortable: false,
      },
      { title: "Due Today", key: "dueToday", align: "start", sortable: false },
      {
        title: "Status",
        key: "status",
        align: "start",
        sortable: false,
      },
      { title: "Actions", key: "refId", align: "start", sortable: false },
    ]);


  const fetchWeekCollections = async () => {
isLoading.value= true;
await generateParams();
const url = `/api/v1/salesrep/collections/overdue?${params.value}`;
const { data } = await axios.get(url);
weekCollections.value = data;
isLoading.value = false;

  }

  return {
    pageables,
    fetchWeekCollections,
    headers,
    isLoading,
    weekCollections,

    selectedExportOption,
    exportOptions,
    setSelectedExportOption,

    selectedStatusOption,
    statusOptions,
    setSelectedStatusOption,
  }
}
);
