import {reactive, ref, watch} from "vue";
import { useQueryParams } from "@/composables/useQueryParams";
import { Pageables,Headers } from "@/types";
import {defineStore} from "pinia";
import axios from "@/services/api/axiosKopesha"

export const useArrears = defineStore("arrears", () => {
  const pageables = reactive({
    recordsPerPage: 5,
    totalRecords: 0,
    totalPages: 0,
    currentPage: 0,
    sort: "ASC",
    searchTerm: undefined,
    order: "ASC",
    group: undefined,
    appId: undefined,
    startDate: null,
    endDate: null,
  }) as Pageables & { group: string | undefined; appId: string | undefined }
  const {params, generateParams} = useQueryParams(pageables);
  const arrearsCollections = ref([]);
  const isLoading = ref(false);

  const selectedExportOption = ref<{ name: string; value: string } | null>(null);
  const exportOptions = ref<{ name: string; value: string }[]>([
    { name: "CSV", value: "csv" },
  ]);
  const setSelectedExportOption = async (option: { name: string; value: string } | null) => {
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
  // status
  const selectedStatusOption = ref<{ name: string; value: string } | null>(null);
  const statusOptions = ref<{ name: string; value: string }[]>([
    { name: "PAID", value: "paid" },
    { name: "NOT PAID", value: "not-paid" },
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

  // timeperiod

  const selectedTimePeriodOption = ref<{ name: string; value: string } | null>(null);
  const timePeriodOptions = ref<{ name: string; value: string }[]>([
    { name: "Today", value: "today" },
    { name: "Yesterday", value: "yesterday" },
    { name: "Last 7 Days", value: "last7days" },
  ]);
  const setSelectedTimePeriodOption = async (option: { name: string; value: string } | null) => {
    selectedTimePeriodOption.value = option;
  }
  const filterTimePeriod = async () => {
    console.log("value changed", selectedTimePeriodOption.value);
  }
  watch(selectedTimePeriodOption, async (value) => {
    if (value) {
      await filterTimePeriod();
    }
  })

  //headers
  const headers = ref<
    { title: string; key: string; align: string; sortable: boolean }[]>([
    {title: "Date Due", align: "start", sortable: false, key: "dueDate",},
    {title: "Name & Phone No", key: "customerName", align: "end", sortable: false,},
    { title: "Loan Profile", key: "productName", align: "end", sortable: false },
    { title: "Due Today", key: "duetoday", align: "end", sortable: false },
    { title: "Arrears", key: "arrears", align: "end", sortable: false },
    { title: "Total Due", key: "totaldue", align: "end", sortable: false },
    { title: "Status", key: "status", align: "end", sortable: false },
    { title: "Actions", key: "refId", align: "end", sortable: false },
  ]);

  //fetching arrears
  const fetchArrearsCollections= async () => {
    isLoading.value = true;
    await generateParams();
    const {data} = await axios.get(
      "/arrears", {params: params.value}
    );
    arrearsCollections.value = data.content;
    isLoading.value = false;
  }

  return {
    pageables,
    fetchArrearsCollections,
    headers,
    isLoading,
    exportOptions,

    setSelectedExportOption,
    selectedExportOption,
    selectedStatusOption,

    setSelectedStatusOption,
    statusOptions,
    arrearsCollections,

    selectedTimePeriodOption,
    timePeriodOptions,
    setSelectedTimePeriodOption,
  }
});
