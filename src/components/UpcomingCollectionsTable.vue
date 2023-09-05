<script setup lang="ts">
import { onBeforeMount, ref, watch } from "vue";
import { useSalesDashboardStore } from "@/store/sales-dashboard";
import { formatMoney } from "../helpers";

const salesDashboardStore = useSalesDashboardStore();
const kopeshaURL = import.meta.env.VITE_KOPESHA_API_URL;

const selected = ref([]);
const loading = ref(false);
const search = ref("");

const headers = ref<
  { title: string; key: string; align: string; sortable: boolean }[]
>([
  {
    title: "Date Due",
    align: "start",
    sortable: false,
    key: "dueDate",
  },
  {
    title: "Name & Phone No",
    key: "customerName",
    align: "end",
    sortable: false,
  },
  { title: "Loan Profile", key: "productName", align: "end", sortable: false },
  { title: "Amount Due", key: "amountDue", align: "end", sortable: false },
  { title: "Amount Paid", key: "amountPaid", align: "end", sortable: false },
  { title: "Loan Balance", key: "loanBalance", align: "end", sortable: false },
  { title: "Status", key: "status", align: "end", sortable: false },
  { title: "Actions", key: "refId", align: "end", sortable: false },
]);

const currentPage = ref(1);
const itemsPerPage = ref(10);

onBeforeMount(() => salesDashboardStore.getUpcomingCollections());
watch([currentPage, itemsPerPage], (newValues: [number, number]) => {
  let newParam = `&start=${(newValues[0] - 1) * newValues[1] + 1}&length=${
    newValues[1]
  }`;
  salesDashboardStore.getUpcomingCollections(newParam);
});
</script>

<template>
  <v-data-table-server
    v-model="selected"
    :headers="headers"
    :items-length="salesDashboardStore.upcomingCollections.recordsTotal"
    :items="salesDashboardStore.upcomingCollections.data"
    :loading="loading"
    :search="search"
    item-value="name"
    show-select
    @update:options="salesDashboardStore.getUpcomingCollections()"
  >
    <template v-slot:[`item.dueDate`]="{ item }">
      <p>{{ item.raw.dueDate }}</p>
    </template>
    <template v-slot:[`item.customerName`]="{ item }">
      <p>{{ item.raw.customerName }}</p>
      <p>{{ item.raw.phoneNumber }}</p>
    </template>
    <template v-slot:[`item.productName`]="{ item }">
      <p>{{ item.raw.productName }}</p>
      <p>{{ item.raw.loanNo }}</p>
    </template>
    <template v-slot:[`item.amountDue`]="{ item }">
      <p>{{ formatMoney(item.raw.amountDue) }}</p>
    </template>
    <template v-slot:[`item.amountPaid`]="{ item }">
      <p>{{ formatMoney(item.raw.amountPaid) }}</p>
    </template>
    <template v-slot:[`item.loanBalance`]="{ item }">
      <p>{{ formatMoney(item.raw.loanBalance) }}</p>
    </template>
    <template v-slot:[`item.status`]="{ item }">
      <v-chip
        label
        :color="
          item.raw.status === 'Paid'
            ? 'green'
            : item.raw.status === 'Not Paid'
            ? '#FB6B27'
            : '#D90000'
        "
      >
        {{ item.raw.status }}
      </v-chip>
    </template>
    <template v-slot:[`item.refId`]="{ item }">
      <v-btn
        icon
        :href="`${kopeshaURL}/lender/index.html#/loans/loanprofile/${item.raw.refId}`"
      >
        <v-icon
          icon="mdi-wifi"
          size="small"
        ></v-icon>
      </v-btn>
    </template>
  </v-data-table-server>
</template>
