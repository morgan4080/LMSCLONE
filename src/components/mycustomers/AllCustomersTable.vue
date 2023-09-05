<script setup lang="ts">
import {dateFilters, formatMoney} from "@/helpers";
import { useSearch } from "@/composables/useSearch";
import { storeToRefs } from "pinia";
import { useCustomer } from "@/salesDashboard/composables/mycustomers/useCustomers";

const {
  pageables,
  fetchCustomersCollections,
  setSelectedExportOption,
  setSelectedOnboardingOption,
  exportCustomers,
  salesOverviewFilters
} = useCustomer();

const {
  headers,
  isLoading,
  customersCollections,
} = storeToRefs(useCustomer());

const { search } = useSearch(pageables, fetchCustomersCollections);
const props = defineProps<{
  refId: string | null;
  period: "day" | "week" | "month" | "quarter" | "year" | "all" | "arrears";
}>();

const kopeshaURL = import.meta.env.VITE_KOPESHA_API_URL;

type optionsType = {
  page: number;
  itemsPerPage: number;
  search: string;
};


const loadItems = (options: optionsType) => {
  if (props.refId) {
    pageables.salesRepRefIds = props.refId;
  }
    dateReturn(props.period);
  if (options.page === 1) {
    pageables.start = 0;
  } else {
    pageables.start = options.itemsPerPage + 1;
  }
  pageables.length = options.itemsPerPage;

  fetchCustomersCollections();
};
function dateReturn(
  text: "day" | "week" | "month" | "quarter" | "year" | "all" | "arrears"
) {
    let [start, end] = dateFilters(text);
    pageables.startDate = start;
    pageables.endDate = end;
}

</script>
<template>
    <v-row class="v-row d-flex pl-2 gap-4 justify-start my-6">
        <h3 class="pa-2 font-weight-regular">
            Customers ({{ customersCollections.recordsFiltered }})
        </h3>
        <v-spacer></v-spacer>
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
                            type="search"
                            placeholder="Search Here"
                            v-model="pageables.searchTerm"
                            @input="search"
                    />
                </template>
            </v-input>
        </div>
        <v-btn
                class="v-btn--size-default text-caption text-capitalize mr-6"
                density="comfortable"
                variant="tonal"
                style="border: 1px solid rgba(128, 128, 128, 0.25)"
                @click="exportCustomers"
        >
            Export
        </v-btn>
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
    <template v-slot:[`item.created`]="{ item }">
      <p>{{ item.raw.created }}</p>
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
        :label="true"
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
      <a
        :href="`${kopeshaURL}/lender/index.html#/customers/customer-profile/${item.raw.refId}`"
      >

        <v-btn

          variant="outlined"
          density="compact"
          size="small"
          class="action-btn action-btn-icon mx-1"
          :color="'secondary'"
        >

          <v-icon icon="mdi mdi-eye" />
          <v-tooltip
            activator="parent"
            location="top"
          >View</v-tooltip>
        </v-btn>

      </a>
      <a
        :href="`${kopeshaURL}/lender/index.html#/customers/customer_form/${item.raw.refId}`"
      >
        <v-btn
          variant="outlined"
          density="compact"
          size="small"
          class="action-btn action-btn-icon mx-1"
          :color="'secondary'"
        >
          <v-icon icon="mdi mdi-pencil" />
          <v-tooltip
            activator="parent"
            location="top"
          >Edit</v-tooltip>
        </v-btn>
      </a>
      <a
        :href="`${kopeshaURL}/lender/index.html#/loans/create_loan/${item.raw.refId}`"
      >
        <v-btn
          variant="outlined"
          density="compact"
          size="small"
          class="action-btn action-btn-icon mx-1"
          :color="'secondary'"
        >
          <v-icon icon="mdi mdi-plus" />
          <v-tooltip
            activator="parent"
            location="top"
          >Create Loan</v-tooltip>
        </v-btn>
      </a>
    </template>
  </v-data-table-server>
</template>

<style scoped>
.custom-input {
  outline-style: none;
}
</style>
