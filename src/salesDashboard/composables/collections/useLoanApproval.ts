import {reactive, ref, watch} from "vue";
import { useQueryParams } from "@/composables/useQueryParams";
import { Pageables } from "@/types";
import {defineStore} from "pinia";
import axios from "@/services/api/axiosKopesha"

export const useLoanApproval = defineStore("loanapproval", () => {
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
  const loanapprovalCollections = ref([]);
  const isLoading = ref(false);

//   export
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

// headers
  const headers = ref<
    { title: string; key: string; align: string; sortable: boolean }[]>([
    {title: "Application Date", align: "start", sortable: false, key: "applicationdate",},
    {title: "Name & Phone No", key: "namephoneno", align: "end", sortable: false,},
    { title: "Loan Product", key: "produc", align: "end", sortable: false },
    { title: "Principal", key: "principle", align: "end", sortable: false },
    { title: "Fees", key: "fees", align: "end", sortable: false },
    { title: "BF", key: "bf", align: "end", sortable: false },
    { title: "Total", key: "total", align: "end", sortable: false },
    { title: "Status", key: "status", align: "end", sortable: false },
    { title: "Actions", key: "refId", align: "end", sortable: false },
  ]);

//   fetch pending loan approval
  const fetchLoanApprovals = async () => {
    isLoading.value = true;
    await generateParams();
    const { data } = await axios.get(
      `/api/v1/collections/approval?${params.value}`
    );
    loanapprovalCollections.value = data.data;
    isLoading.value = false;
  }

  return {
    pageables,
    headers,
    isLoading,
    fetchLoanApprovals,

    selectedExportOption,
    exportOptions,
    setSelectedExportOption,

  }
});
