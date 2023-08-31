import {reactive, ref, watch} from "vue";
import { useQueryParams } from "@/composables/useQueryParams";
import { Pageables } from "@/types";
import {defineStore} from "pinia";
import axios from "@/services/api/axiosKopesha"

export const useNewcustomer = defineStore("newcustomer", () => {
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
    const newcustomerCollections = ref([]);
    const isLoading = ref(false);

    // selectdonboarding
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

// selected ussd
    const selectedUssdOption = ref<{ name: string; value: string } | null>(null);
    const ussdOptions = ref<{ name: string; value: string }[]>([
        { name: "All Ussd", value: "allussd" },
        { name: "Has Ussd", value: "hasussd" },
        { name: "No Ussd", value: "noussd" },
    ]);
    const setSelectedUssdOption = async (option: { name: string; value: string } | null) => {
        selectedUssdOption.value = option;
    }
    const ussdData = async () => {
        console.log("value changed", selectedUssdOption.value);
    }
    watch(selectedUssdOption, async (value) => {
        if (value) {
            await ussdData();
        }

    })

    // selected export
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
        {title: "Date Joined", align: "start", sortable: false, key: "datejoined",},
        {title: "Name & Phone No", key: "customerName", align: "end", sortable: false,},
        { title: "Loan Limit", key: "loanlimit", align: "end", sortable: false },
        { title: "Active Loan", key: "activeloan", align: "end", sortable: false },
        { title: "Mobile", key: "mobile", align: "end", sortable: false },
        { title: "Onboarding", key: "Onboarding", align: "end", sortable: false },
        { title: "Actions", key: "refId", align: "end", sortable: false },
    ]);

   //fetching on the new customer
    const fetchNewCustomers = async () => {
        isLoading.value = true;
        await generateParams();
        const {data} = await axios.get(
            "/newcustomers", {params: params.value}
        );
        newcustomerCollections.value = data.data;
        isLoading.value = false;
    }
    return {
        pageables,
        headers,
        isLoading,
        fetchNewCustomers,

        selectedOnboardingOption,
        onboardingOptions,
        setSelectedOnboardingOption,
        onboardingData,

        selectedUssdOption,
        ussdOptions,
        setSelectedUssdOption,
        ussdData,

        selectedExportOption,
        exportOptions,
        setSelectedExportOption,
        exportData,
    }
});
