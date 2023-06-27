<script setup lang="ts">
import { onBeforeMount, ref, watch } from "vue";
import { useSalesDashboardStore } from "@/store/sales-dashboard";
import { formatMoney } from "@/helpers";

const salesDashboardStore = useSalesDashboardStore();

const selected = ref([]);
const search = ref("");

const headers = ref<
  { title: string; key: string; align: string; sortable: boolean }[]
>([
  {
    title: "Date Joined",
    align: "start",
    sortable: false,
    key: "dayJoined",
  },
  {
    title: "Name & Phone No",
    key: "fullName",
    align: "end",
    sortable: false,
  },
  { title: "Loan Limit", key: "approvalLimit", align: "end", sortable: false },
  { title: "Active Loan", key: "activeLoan", align: "end", sortable: false },
  { title: "USSD", key: "hasUssd", align: "end", sortable: false },
  {
    title: "Onboarding",
    key: "onboardingStatus",
    align: "end",
    sortable: false,
  },
  { title: "Actions", key: "refId", align: "end", sortable: false },
]);

const currentPage = ref(1);
const itemsPerPage = ref(10);

onBeforeMount(() => salesDashboardStore.getNewCustomers());
watch([currentPage, itemsPerPage], (newValues: [number, number]) => {
  let newParam = `&start=${(newValues[0] - 1) * newValues[1] + 1}&length=${
    newValues[1]
  }`;
  salesDashboardStore.getNewCustomers(newParam);
});
</script>

<template>
  <v-data-table-server
    v-model="selected"
    :headers="headers"
    :items-length="salesDashboardStore.newCustomers.recordsTotal"
    :items="salesDashboardStore.newCustomers.data"
    :loading="salesDashboardStore.newCustomers.loading"
    :search="search"
    item-value="name"
    show-select
    @update:page="currentPage = $event"
    @update:items-per-page="itemsPerPage = $event"
  >
    <template v-slot:[`item.dayJoined`]="{ item }">
      <p>{{ item.raw.created }}</p>
      <p class="text-prestaBlue">{{ item.raw.dayJoined }}</p>
    </template>
    <template v-slot:[`item.fullName`]="{ item }">
      <v-btn
        size="small"
        variant="text"
        class="text-prestaBlue"
        :href="`https://lending.presta.co.ke/kopesha/lender/index.html#/customers/customer-profile/${item.raw.refId}`"
        >{{ item.raw.fullName }}</v-btn
      >
      <p>{{ item.raw.phoneNumber }}</p>
    </template>
    <template v-slot:[`item.hasUssd`]="{ item }">
      <p :class="[item.raw.hasUssd === 'YES' ? 'text-green' : 'text-red']">
        {{ item.raw.hasUssd }}
      </p>
    </template>
    <template v-slot:[`item.approvalLimit`]="{ item }">
      <p>{{ formatMoney(item.raw.approvalLimit) }}</p>
    </template>
    <template v-slot:[`item.activeLoan`]="{ item }">
      <p>{{ formatMoney(item.raw.activeLoan) }}</p>
    </template>
    <template v-slot:[`item.onboardingStatus`]="{ item }">
      <v-chip
        label
        :color="item.raw.onboardingStatus === 'Approved' ? 'green' : 'red'"
      >
        {{ item.raw.onboardingStatus }}
      </v-chip>
    </template>
    <template v-slot:[`item.refId`]="{ item }">
      <v-btn
        size="small"
        icon="mdi:mdi-pencil"
        variant="text"
        :href="`https://lending.presta.co.ke/kopesha/lender/index.html#/customers/customer-profile/${item.raw.refId}`"
      >
      </v-btn>
    </template>
  </v-data-table-server>
</template>
