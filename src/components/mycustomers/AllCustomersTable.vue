<script setup lang="ts">
import { useSalesDashboardStore } from "@/store/sales-dashboard";
import { formatMoney } from "@/helpers";
import {useSearch} from "@/composables/useSearch";
import {storeToRefs} from "pinia";
import {useCustomer} from "@/salesDashboard/composables/mycustomers/useCustomers";
import { toRef } from "vue";
import { ref } from "vue";

const {
  pageables,
  fetchCustomersCollections,
  setSelectedExportOption,
  setSelectedOnboardingOption,
} = useCustomer();

const {
  headers,
  isLoading,
  selectedOnboardingOption,
  onboardingOptions,
  selectedExportOption,
  exportOptions,
  customersCollections
} = storeToRefs(useCustomer());

const {search} = useSearch(pageables, fetchCustomersCollections);
const props = defineProps<{
  refId: string | null;
}>();

const refId = toRef(props, "refId");
const selectedOption = ref<{ name: string; value: string } | null>(null);

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
  // fetch due today again
  fetchCustomersCollections();

};

</script>
<template>
  <v-col>
    <v-row class="d-flex justify-center my-2 mx-1">
<!-- selected onboarding option  -->
      <v-menu transition="slide-y-transition"
              v-model="selectedOnboardingOption">
        <template #activator="{ props }">
          <v-btn
            variant="outlined"
            density="comfortable"
            append-icon="mdi:mdi-chevron-down"
            v-bind="props"
            class="mr-4 text-none text-caption"
            style="border: 1px solid rgba(128, 128, 128, 0.25)"
          >
            {{ selectedOption ? selectedOption.name : "Select On-Boarding Period" }}
          </v-btn>
        </template>

        <v-sheet
          border
          rounded
        >
          <v-list
            :nav="true"
            density="comfortable"
            role="listbox"
          >
            <v-list-item
              v-for="(item, idx) in onboardingOptions"
              :key="idx"
              :value="item"
              @click="selectedOnboardingOption = item"
            >
              {{ item.name }}
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-menu>


      <v-spacer></v-spacer>

      <v-row class="d-flex justify-end">
        <!-- Search -->
        <div>
          <v-input
            hide-details
            class="px-2 font-weight-light border rounded mr-4"
            density="comfortable"
            style="
            height: 28px !important;
            padding-left: 16px !important;
            padding-right: 16px !important;
          "
          >
            <template #append>
              <v-icon
                icon="mdi mdi-magnify"
                size="small"
              />
            </template>
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
<!--  Export Option -->

        <v-btn
          class="v-btn--size-default text-caption text-capitalize mr-6"
          density="comfortable"

          variant="tonal"
          style="border: 1px solid rgba(128, 128, 128, 0.25)"
          @click="
''
        "
        >
         Export
        </v-btn>
<!--  clearing options -->
        <v-btn
          class="v-btn--size-default text-caption text-capitalize mr-6"
          density="comfortable"
          append-icon="mdi:mdi-close"
          color="primary"
          variant="tonal"
          style="border: 1px solid rgba(128, 128, 128, 0.25)"
          @click="
          setSelectedExportOption(null);
          setSelectedOnboardingOption(null);
          pageables.repaymentStatus = '';
          pageables.draw = 1;
          pageables.searchTerm = '';
          pageables.salesRepRefIds = '';
          pageables.startDate = '';
          pageables.endDate = '';
          pageables.endDate = '';
          pageables.start = 0;
          pageables.length = 10;

          fetchCustomersCollections();
        "
        >
          Clear Filters
        </v-btn>
      </v-row>
    </v-row>
  </v-col>

<!--  Table -->
  <v-data-table-server
    :headers="headers as any"
    :items="customersCollections.data"
    :items-per-page="pageables.length"
    :items-length="customersCollections.recordsTotal"
    :server-items-length="customersCollections.recordsFiltered"
    :isLoading="isLoading"
    :search="pageables.searchTerm || pageables.onboardingStatus"
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
      <a
        :href="`${kopeshaURL}/lender/index.html#/loans/loanprofile/${item.raw.refId}`"
      >
        <v-btn
          variant="outlined"
          density="compact"
          size="small"
          class="action-btn action-btn-icon mx-1"
          :color="'secondary'"
        >
          <v-icon icon="mdi mdi-eye" />
        </v-btn>
      </a>
      <a
        :href="`${kopeshaURL}/lender/index.html#/loans/loanprofile/${item.raw.refId}`"
      >
        <v-btn
          variant="outlined"
          density="compact"
          size="small"
          class="action-btn action-btn-icon mx-1"
          :color="'secondary'"
        >
          <v-icon icon="mdi mdi-pencil" />
        </v-btn>
      </a>
      <a
        :href="`${kopeshaURL}/lender/index.html#/loans/loanprofile/${item.raw.refId}`"
      >
        <v-btn
          variant="outlined"
          density="compact"
          size="small"
          class="action-btn action-btn-icon mx-1"
          :color="'secondary'"
        >
          <v-icon icon="mdi mdi-plus" />
        </v-btn>
      </a>
    </template>
  </v-data-table-server>
</template>

<style scoped>
.custom-input{
  outline-style: none;
}
</style>
