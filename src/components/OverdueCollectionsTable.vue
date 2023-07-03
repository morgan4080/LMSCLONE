<script setup lang="ts">
import { ref } from "vue";
import { useSalesDashboardStore } from "@/store/sales-dashboard";
import { formatMoney } from "../helpers";

const salesDashboardStore = useSalesDashboardStore();

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
    align: "start",
    sortable: false,
  },
  {
    title: "Loan Profile",
    key: "productName",
    align: "start",
    sortable: false,
  },
  { title: "Amount Overdue", key: "amountDue", align: "end", sortable: false },
  { title: "Amount Paid", key: "paidAmount", align: "end", sortable: false },
  { title: "Loan Balance", key: "loanBalance", align: "end", sortable: false },
  { title: "Status", key: "status", align: "end", sortable: false },
  { title: "Actions", key: "refId", align: "end", sortable: false },
]);
</script>

<template>
  <v-data-table-server
    v-model="selected"
    :headers="headers"
    :items-length="salesDashboardStore.overdueCollections.recordsTotal"
    :items="salesDashboardStore.overdueCollections.data"
    :loading="loading"
    :search="search"
    item-value="name"
    show-select
    @update:options="salesDashboardStore.getOverdueCollections()"
  >
    <template v-slot:[`item.dueDate`]="{ item }">
      <p>{{ item.raw.dueDate }}</p>
      <p class="text-red">{{ item.raw.daysOverdue }} Days Overdue</p>
    </template>

    <template v-slot:[`item.customerName`]="{ item }">
      <p>{{ item.raw.customerName }}</p>
      <p>{{ item.raw.phoneNumber }}</p>
    </template>

    <template v-slot:[`item.productName`]="{ item }">
      <p>{{ item.raw.productName }}</p>
      <p>LoanID: {{ item.raw.loanNo }}</p>
    </template>

    <template v-slot:[`item.amountDue`]="{ item }">
      <p class="text-prestaBlue">{{ formatMoney(item.raw.amountDue) }}</p>
    </template>

    <template v-slot:[`item.paidAmount`]="{ item }">
      <p>{{ formatMoney(item.raw.paidAmount) }}</p>
    </template>

    <template v-slot:[`item.loanBalance`]="{ item }">
      <p>{{ formatMoney(item.raw.loanBalance) }}</p>
    </template>

    <template v-slot:[`item.status`]="{ item }">
      <v-chip
        label
        :color="
          item.raw.status.toLowerCase() === 'paid'
            ? 'green'
            : item.raw.status.toLowerCase() === 'notpaid'
            ? 'red'
            : 'orange'
        "
      >
        {{
          item.raw.status.toLowerCase() === "notpaid"
            ? "Not Paid"
            : item.raw.status
        }}
      </v-chip>
    </template>

    <template v-slot:[`item.refId`]="{ item }">
      <v-btn
        size="x-small"
        class="rounded border"
        icon="mdi:mdi-pencil-outline"
        variant="text"
        :href="`https://lending.presta.co.ke/kopesha/lender/index.html#/customers/customer-profile/${item.raw.refId}`"
      >
      </v-btn>
    </template>
  </v-data-table-server>
</template>
