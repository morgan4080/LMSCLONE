<script setup lang="ts">
import { useSalesDashboardStore } from "@/store/sales-dashboard";
import { formatMoney } from "@/helpers";
import { useLoanApproval } from "@/salesDashboard/composables/collections/useLoanApproval";
import { useSearch } from "@/composables/useSearch";
import { storeToRefs } from "pinia";
import { toRef } from "vue";

const {
  pageables,
  fetchApprovalCollections,
  setSelectedExportOption,
} = useLoanApproval();
const {
  headers,
  isLoading,
  selectedExportOption,
  exportOptions,
  approvalCollections,
} = storeToRefs(useLoanApproval());
const { search } = useSearch(pageables, fetchApprovalCollections);

const props = defineProps<{
  refId: string | null;
}>();

const refId = toRef(props, "refId");

const salesDashboardStore = useSalesDashboardStore();
const kopeshaURL = import.meta.env.VITE_KOPESHA_API_URL;

type optionsType = {
  page: number;
  itemsPerPage: number;
  search: string;
};

const loadItems = (options: optionsType) => {
  if (refId.value) {
    pageables.salesRepRefIds = refId.value;
  }
  if (options.page === 1) {
    pageables.start = 0;
  } else {
    pageables.start = options.itemsPerPage + 1;
  }
  pageables.length = options.itemsPerPage;
  // fetch due arrears again
  fetchApprovalCollections();
};

</script>

<template>
  <v-row class="d-flex justify-center my-2">
    <h3 class="pa-2 font-weight-regular">
      Pending Approvals({{ approvalCollections.recordsTotal }})
    </h3>
    <v-spacer></v-spacer>
    <v-row class="d-flex justify-end">
      <div>
        <v-input
          append-icon="mdi:mdi-magnify"
          hide-details
          class="px-2 font-weight-light mx-10  border rounded "
          density="comfortable"
        >
          <template v-slot:default>
            <input
              class="text-caption searchField custom-input"
              type="text"
              placeholder="Search Here"
              v-model="pageables.searchTerm"
              @input="search"
            />
          </template>
        </v-input>
      </div>
      <v-menu transition="slide-y-transition">
        <template #activator="{ props }">
          <v-btn
            variant="outlined"
            density="compact"
            append-icon="mdi:mdi-chevron-down"
            v-bind="props"
            class="mr-4 text-none text-caption"
            style="border: 1px solid rgba(128, 128, 128, 0.25)"
          >
            {{ selectedExportOption ? selectedExportOption.name : 'Export' }}
          </v-btn>
        </template>
        <v-sheet
          border
          rounded
        >
          <v-list
            :nav="true"
            density="compact"
            role="listbox"
          >
            <v-list-item
              v-for="(item, idx) in exportOptions"
              :key="idx"
              :value="item"
              @click="setSelectedExportOption(item)"
            >
              {{ item.name }}</v-list-item
            >
          </v-list>
        </v-sheet>
      </v-menu>
      <v-btn
        class="v-btn--size-default text-caption text-capitalize mr-6"
        density="compact"
        append-icon="mdi:mdi-close"
        color="primary"
        variant="tonal"
        style="border: 1px solid rgba(128, 128, 128, 0.25)"
        @click="
           setSelectedExportOption(null);
          "
      >
        Clear Filters
      </v-btn>
    </v-row>
  </v-row>
  <v-data-table-server
    :headers="headers as any"
    :items="approvalCollections.data"
    :items-per-page="pageables.length"
    :items-length="approvalCollections.recordsTotal"
    :server-items-length="salesDashboardStore.upcomingCollections.recordsTotal"
    :isLoading="isLoading"
    :search="pageables.searchTerm"
    no-data-text="No data available"
    isLoading-text="isLoading"
    :items-per-page-text="'Show'"
    :first-icon="''"
    :last-icon="''"
    :show-current-page="true"
    :items-per-page-options="[
            {
              title: '5',
              value: 5,
            },
            {
              title: '10',
              value: 10,
            },
            {
              title: '50',
              value: 50,
            },
          ]"
    @update:options="loadItems"
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
              ? 'red'
              : 'yellow'
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

<style scoped>
.custom-input{
  outline-style: none;
}
</style>
