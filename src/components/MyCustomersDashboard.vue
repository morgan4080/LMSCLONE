<script lang="ts" setup>
import { onMounted, watch } from "vue";
import { useSalesDashboardStore } from "@/store/sales-dashboard";
import AllCustomersTable from "@/components/mycustomers/AllCustomersTable.vue";
import OnboardingApprovalTable from "@/components/mycustomers/OnboardingApprovalTable.vue";
import { dateFilters } from "@/helpers";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
const { tab, myCustomerTabs, salesRepIds, stats, salesReps } = storeToRefs(
  useSalesDashboardStore()
);
const {
  getBranches,
  getOverdueCollections,
  salesOverviewFilters,
  getSalesReps,
  getStatsCustomer,
} = useSalesDashboardStore();

onMounted(() => {
  getSalesReps();
  getBranches();
  getOverdueCollections();
  getStatsCustomer();
});

const kopeshaURL = import.meta.env.VITE_KOPESHA_API_URL;
const loadParams = async (
  salesOverView: typeof salesOverviewFilters,
  currentTab: typeof tab.value
) => {
  const withValues: Record<string, string | number> = {};

  if (salesOverView.salesRep.id) {
    if (salesOverviewFilters.salesRep.id) {
      salesRepIds.value = [salesOverviewFilters.salesRep.id!];
    } else {
      salesRepIds.value = [""];
    }
    withValues["salesRep"] = salesOverView.salesRep.id;
  }

  if (salesOverviewFilters.dateFilters.value) {
    dateReturn(salesOverviewFilters.dateFilters.value);
    withValues["startDate"] = stats.value.startDate;
    withValues["endDate"] = stats.value.endDate;
  }

  if (currentTab) {
    withValues["tab"] = currentTab;
  }

  await router.push({ path: route.path, query: withValues });
};

watch(
  [salesOverviewFilters, tab],
  async ([salesOverView, currentTab]) => {
    await loadParams(salesOverView, currentTab);
    getStatsCustomer();
  },
  { deep: true }
);

function dateReturn(
  text:
    | "day"
    | "week"
    | "month"
    | "last-month"
    | "quarter"
    | "year"
    | "all"
    | "arrears"
) {
  let [start, end] = dateFilters(text);
  stats.value.startDate = start;
  stats.value.endDate = end;
}
const openUserCreation = () => {
  window.location.href = `${kopeshaURL}lender/index.html#/customers/customer_form`;
};
</script>
<template>
  <div class="pa-6 fill-height bg-background">
    <div class="flex-column w-100 fill-height">
      <v-row class="d-flex align-center justify-center mx-1">
        <v-col
          cols="auto"
          sm="7"
        >
          <h1 class="text-h6 font-weight-regular text-grey-darken-2">
            My Customers
          </h1>
          <div class="text-caption font-weight-light mb-n1">
            <span class="font-weight-medium">An Overview of Customers</span> For
            The Period Between
            <span class="font-weight-medium"
              >{{ stats.startDate }} - {{ stats.endDate }}</span
            >
          </div>
        </v-col>
        <v-col
          cols="auto"
          sm="5"
        >
          <v-row class="d-flex justify-end">
            <div class="px-3"></div>
            <div class="px-3">
              <v-menu transition="slide-y-transition">
                <template v-slot:activator="{ props }">
                  <v-btn
                    class="v-btn--size-default text-caption text-capitalize"
                    density="default"
                    :append-icon="salesOverviewFilters.salesRep.appendIcon"
                    v-bind="props"
                    :flat="true"
                    style="border: 1px solid rgba(128, 128, 128, 0.25)"
                  >
                    {{ salesOverviewFilters.salesRep.text || "All Sales Rep" }}
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
                      density="compact"
                      @click="
                        salesOverviewFilters.salesRep.text = null;
                        salesOverviewFilters.salesRep.id = null;
                      "
                      >All</v-list-item
                    >
                    <v-list-item
                      v-for="(dropDownMenu, it) in salesReps"
                      :key="it"
                      :value="it"
                      density="compact"
                      @click="
                        salesOverviewFilters.salesRep.text =
                          dropDownMenu.firstName.toString();
                        salesOverviewFilters.salesRep.id = dropDownMenu.keycloakId;
                      "
                      :title="`${dropDownMenu.firstName} ${dropDownMenu.lastName}`"
                      :subtitle="`${dropDownMenu.phoneNumber}`"
                    >
                    </v-list-item>
                  </v-list>
                </v-sheet>
              </v-menu>
            </div>
            <div class="px-3">
              <v-menu transition="slide-y-transition">
                <template v-slot:activator="{ props }">
                  <v-btn
                    class="v-btn--size-default text-caption text-capitalize"
                    density="default"
                    :append-icon="salesOverviewFilters.dateFilters.appendIcon"
                    v-bind="props"
                    :flat="true"
                    style="border: 1px solid rgba(128, 128, 128, 0.25)"
                  >
                    {{ salesOverviewFilters.dateFilters.text || "All Time" }}
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
                      v-for="(dropDownMenu, it) in salesOverviewFilters
                        .dateFilters.menus"
                      :key="it"
                      :value="it"
                      density="compact"
                      @click="
                        salesOverviewFilters.dateFilters.text =
                          dropDownMenu.title;
                        salesOverviewFilters.dateFilters.value =
                          dropDownMenu.value;
                      "
                      >{{ dropDownMenu.title }}</v-list-item
                    >
                  </v-list>
                </v-sheet>
              </v-menu>
            </div>
            <div>
              <v-btn
                class="v-btn--size-default text-caption text-capitalize"
                density="default"
                :flat="true"
                color="primary"
                style="border: 1px solid rgba(128, 128, 128, 0.25)"
                @click="openUserCreation"
              >
                Add Customer
              </v-btn>
            </div>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="d-flex">
        <v-col
          cols="12"
          sm="4"
        >
          <v-card
            border
            variant="flat"
            :loading="false"
          >
            <v-card-text>
              <div class="text-body-2 font-weight-light">Total Customers</div>
              <div class="text-h6 font-weight-regular py-2 text-primary">
                {{ stats.totalCustomers }} Customers
              </div>
              <div class="d-flex justify-space-between">
                <div class="text-caption font-weight-regular text-normal">
                  Onboarded
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          sm="4"
        >
          <v-card
            border
            variant="flat"
            :loading="false"
          >
            <v-card-text>
              <div class="text-body-2 font-weight-light">New Customers</div>
              <div class="d-flex justify-space-between mx-1">
                <div class="text-h6 font-weight-regular py-2 text-green">
                  {{ stats.newCustomers }} Customers
                </div>
              </div>
              <div class="d-flex justify-space-between">
                <div class="text-caption font-weight-regular text-normal">
                  {{ salesOverviewFilters.dateFilters.text }}
                </div>
                <div class="text-caption font-weight-regular text-green">
                  {{ stats.customersCountIncrement }}
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          sm="4"
        >
          <v-card
            border
            variant="flat"
            :loading="false"
          >
            <v-card-text>
              <div class="text-body-2 font-weight-light">
                Onboarding Approvals
              </div>
              <div class="text-h6 font-weight-regular py-2 text-red">
                {{ stats.onboardingApprovals }} Customers
              </div>
              <div class="d-flex justify-space-between">
                <div class="text-caption font-weight-regular text-normal">
                  Pending
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="d-flex">
        <v-col cols="12">
          <v-card :loading="false">
            <v-card-text class="px-7 py-9">
              <v-row>
                <v-col sm="9">
                  <v-row>
                    <v-col sm="4">
                      <h1 class="text-h6 font-weight-regular">
                        Customer Listing
                      </h1>
                      <div class="text-caption font-weight-light mb-n1">
                        Summary Of Your Customers
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  class="d-flex align-center justify-end text-caption"
                  sm="3"
                >
                </v-col>
              </v-row>
              <div>
                <v-tabs
                  v-model="tab"
                  color="primary"
                  align-tabs="start"
                  density="comfortable"
                  class="text-none px-3 -mb-1 mt-5"
                >
                  <v-tab
                    v-for="(t, ind) in myCustomerTabs"
                    :key="ind"
                    :value="t"
                    class="text-none text-caption"
                    >{{ t }}</v-tab
                  >
                </v-tabs>
                <hr
                  style="
                    background: rgba(130, 130, 130, 0.1);
                    height: 1px;
                    border: none;
                  "
                />

                <v-window v-model="tab">
                  <v-window-item
                    v-for="n in myCustomerTabs"
                    :key="n"
                    :value="n"
                  >
                    <v-container
                      v-if="n === myCustomerTabs[0]"
                      :fluid="true"
                    >
                      <all-customers-table
                        :key="Math.random().toString(36).substr(2, 16)"
                        :refId="salesOverviewFilters.salesRep.id"
                        :period="salesOverviewFilters.dateFilters.value"
                      />
                    </v-container>
                    <v-container
                      v-else-if="n === myCustomerTabs[1]"
                      :fluid="true"
                    >
                      <onboarding-approval-table
                        :key="Math.random().toString(36).substr(2, 16)"
                        :refId="salesOverviewFilters.salesRep.id"
                        :period="salesOverviewFilters.dateFilters.value"
                      />
                    </v-container>
                  </v-window-item>
                </v-window>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
