import {reactive, ref, watch} from "vue";
import { useQueryParams } from "@/composables/useQueryParams";
import { Pageables } from "@/types";
import {defineStore} from "pinia";
import axios from "@/services/api/axiosKopesha"

export const useToday = defineStore("todays", () => {
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
  }) as Pageables & { group: string | undefined; appId: string | undefined }
  const {params, generateParams} = useQueryParams(pageables);
  const todayCollections = ref([]);
  const isLoading = ref(false);

  // export
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

  const fetchTodayCollections = async () => {
    isLoading.value = true;
    await generateParams();
    const { data } = await axios.get(
      `/api/v1/collections/today?${params.value}`
    );
    todayCollections.value = data.content;
    isLoading.value = false;
  }

  return {
    pageables,
    fetchTodayCollections,
    headers,
    isLoading,

    exportOptions,
    setSelectedExportOption,
    selectedExportOption,

    statusOptions,
    setSelectedStatusOption,
    selectedStatusOption,
  }
});



