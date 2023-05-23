<script setup lang="ts">
import { ref } from "vue";
import { useSalesDashboardStore } from "@/store/sales-dashboard";

const salesDashboardStore = useSalesDashboardStore();

const selected = ref([]);
const loading = ref(true);
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
  </v-data-table-server>
</template>
