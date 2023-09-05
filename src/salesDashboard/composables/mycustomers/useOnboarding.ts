import { reactive, ref, watch } from "vue";
import { useQueryParams } from "@/composables/useQueryParams";
import { defineStore } from "pinia";
import axios from "@/services/api/axiosKopesha";
import {saveAs} from "file-saver";

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
export interface Collections{
  data: {
    refId: string,
    created: string,
    fullName:string
    phoneNumber: string,
    approvalLimit: number,
    activeLoan: number,
    onboardingStatus: string,
    hasUssd: string,
    dayJoined: string,
    keycloakId: string,
  }[];
  draw: number;
  start: number;
  length: number;
  recordsFiltered: number;
  recordsTotal: number;
}

export const useOnboarding = defineStore("onboarding", () => {
  const pageables = reactive({
    salesRepRefIds: "ALL",
    branchNames: "ALL",
    searchTerm: "",
    productName: "",
    repaymentStatus: "",
    draw: 1,
    start: 0,
    length: 10,
    startDate: "",
    endDate: "",
  }) as KopeshaPagination & { branchNames: string };

  const {params, generateParams} = useQueryParams(pageables);
  const onBoardingCollections = ref<Collections>({
    data: [],
    draw: 1,
    start: 0,
    length: 10,
    recordsFiltered: 0,
    recordsTotal: 0,
  } )
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

  // const selectedOnboardingOption = ref<{ name: string; value: string } | null>(null);
  // const onboardingOptions = ref<{ name: string; value: string }[]>([
  //   { name: "All", value: "all" },
  //   { name: "Approved", value: "approved" },
  //   { name: "Declined", value: "declined" },
  // ]);
  // const setSelectedOnboardingOption = async (option: { name: string; value: string } | null) => {
  //   selectedOnboardingOption.value = option;
  // }
  // const onboardingData = async () => {
  //   console.log("value changed", selectedOnboardingOption.value);
  // }
  // watch(selectedOnboardingOption, async (value) => {
  //   if (value) {
  //     await onboardingData();
  //   }
  // })

//   headers
  const headers = ref<
    { title: string; key: string; align: string; sortable: boolean }[]>([
    {title: "Application Date", align: "start", sortable: false, key: "created",},
    {title: "Names", key: "fullName", align: "end", sortable: false,},
    { title: "Phone No", key: "phoneNumber", align: "end", sortable: false },
    { title: "Loan Limit", key: "approvalLimit", align: "end", sortable: false },
    { title: "Onboarding", key: "onboardingStatus", align: "end", sortable: false },
    { title: "Actions", key: "refId", align: "start", sortable: false },
  ]);

  //fetching on the customers
  const fetchOnBoardingCollections = async () => {
    isLoading.value = true;
    await generateParams();
    const url = `/api/v1/salesrep/pending/customers?${params.value}`;
    const { data } = await axios.get(url);
   onBoardingCollections.value = data;
    isLoading.value = false;
  }
    const exportOnBoarding = async () => {
        isLoading.value = true;
        await generateParams();
        const url = `${
            import.meta.env.VITE_KOPESHA_API_URL
        }/api/v1/salesrep/pending/customers/export?${params.value}`;
        try {
            const res = await fetch(url);
            const blob = await res.blob();
            saveAs(blob, `OnBoarding_List_${pageables.startDate}_${pageables.endDate}`);
        } catch {
            return "";
        } finally {
            isLoading.value = false;
        }
    };

  return {
    pageables,
    fetchOnBoardingCollections,
    headers,
    isLoading,
    onBoardingCollections,

    selectedExportOption,
    exportOptions,
    setSelectedExportOption,
    exportOnBoarding,
  }
});




