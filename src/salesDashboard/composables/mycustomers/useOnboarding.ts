import {reactive, ref, watch} from "vue";
import { useQueryParams } from "@/composables/useQueryParams";
import { Pageables } from "@/types";
import {defineStore} from "pinia";
import axios from "@/services/api/axiosKopesha"

export const useOnboarding = defineStore("onboarding", () => {
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
    const onboardingCollections = ref([]);
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
//    headers
  const headers = ref<
    { title: string; key: string; align: string; sortable: boolean }[]>([
    {title: "Application Date", align: "start", sortable: false, key: "applicationdate",},
    {title: "Names", key: "name", align: "end", sortable: false,},
    { title: "Phone No", key: "phoneno", align: "end", sortable: false },
    { title: "Loan Limit", key: "loanlimit", align: "end", sortable: false },
    { title: "Onboarding", key: "onboarding", align: "end", sortable: false },
    { title: "Actions", key: "refId", align: "end", sortable: false },
  ]);

//     fetch onboarding
    const fetchOnboarding = async () => {
        isLoading.value = true;
        await generateParams();
        const { data } = await axios.get(
            `/api/v1/collections/onboarding?${params.value}`
        );
        onboardingCollections.value = data.data;
        isLoading.value = false;
    }
    return {
      pageables,
      fetchOnboarding,
      headers,
      isLoading,

      setSelectedExportOption,
      selectedExportOption,
      exportOptions,
    }
});
