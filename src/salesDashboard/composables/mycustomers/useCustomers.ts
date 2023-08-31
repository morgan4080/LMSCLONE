import {reactive, ref, watch} from "vue";
import { useQueryParams } from "@/composables/useQueryParams";
import { Pageables } from "@/types";
import {defineStore} from "pinia";
import axios from "@/services/api/axiosKopesha"

export const useCustomers = defineStore("customers", () => {
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
  const mycustomersCollections = ref([]);
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

//   onboarding period

const selectedOnboardingOption = ref<{ name: string; value: string } | null>(null);
const onboardingOptions = ref<{ name: string; value: string }[]>([
  { name: "All", value: "all" },
  { name: "Approved", value: "approved" },
  { name: "Declined", value: "declined" },
]);
const setSelectedOnboardingOption = async (option: { name: string; value: string } | null) => {
  selectedOnboardingOption.value = option;
}
const onboardingData = async () => {
  console.log("value changed", selectedOnboardingOption.value);
}
watch(selectedOnboardingOption, async (value) => {
  if (value) {
    await onboardingData();
  }
})
//   headers
  const headers = ref<
    { title: string; key: string; align: string; sortable: boolean }[]>([
    {title: "Date Joined", align: "start", sortable: false, key: "datejoined",},
    {title: "Names", key: "name", align: "end", sortable: false,},
    { title: "Phone No", key: "phoneno", align: "end", sortable: false },
    { title: "Loan Limit", key: "loanlimit", align: "end", sortable: false },
    { title: "Active Loan", key: "activeloan", align: "end", sortable: false },
    { title: "Actions", key: "refId", align: "end", sortable: false },
  ]);

  //fetching on the customers
  const fetchMyCustomers = async () => {
    isLoading.value = true;
    await generateParams();
    const {data} = await axios.get(
      "/mycustomers", {params: params.value}
    );
    mycustomersCollections.value = data.data;
    isLoading.value = false;
  }

  return {
    pageables,
    fetchMyCustomers,
    headers,
    isLoading,

    selectedOnboardingOption,
    onboardingOptions,
    setSelectedOnboardingOption,

    selectedExportOption,
    exportOptions,
    setSelectedExportOption,
  }
});




