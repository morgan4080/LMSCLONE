<script lang="ts" setup>
import { onMounted, watch } from "vue";
import { useSalesDashboardStore } from "@/store/sales-dashboard";
import AllCustomersTable from "@/components/mycustomers/AllCustomersTable.vue";
import OnboardingApprovalTable from "@/components/mycustomers/OnboardingApprovalTable.vue";
import { dateFilters } from "@/helpers";
import OverdueCollectionsTable from "@/components/OverdueCollectionsTable.vue";
import { storeToRefs } from "pinia";
const { tab, myCustomerTabs, collectionFilter, salesRepIds, stats, salesReps } =
  storeToRefs(useSalesDashboardStore());

const {
  getStats,
  getBranches,
  getOverdueCollections,
  salesOverviewFilters,
  getSalesReps,
} = useSalesDashboardStore();

onMounted(() => {
  getSalesReps();
  getStats();
  getBranches();
  getOverdueCollections();
});

watch(salesOverviewFilters, () => {
  if (salesOverviewFilters.salesRep.id) {
    salesRepIds.value = [salesOverviewFilters.salesRep.id!];
  } else {
    salesRepIds.value = [""];
  }

  salesOverviewFilters.dateFilters.value &&
    dateReturn(salesOverviewFilters.dateFilters.value);

  getStats();
});

function dateReturn(
  text: "day" | "week" | "month" | "quarter" | "year" | "all" | "arrears"
) {
  let [start, end] = dateFilters(text) as string[];
  stats.value.startDate = start;
  stats.value.endDate = end;
}
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
            <span class="font-weight-medium">01/04/2023 - 30/04/2023</span>
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
                        salesOverviewFilters.salesRep.id = dropDownMenu.refId;
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
            <!--            button add customer-->
            <div>
              <v-btn
                class="v-btn--size-default text-caption text-capitalize pr-2"
                density="default"
                :flat="true"
                color="primary"
                style="border: 1px solid rgba(128, 128, 128, 0.25)"
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
                {{ stats.upcomingCollections }} Customers
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
                  {{ stats.overdueCollections }} Customers
                </div>
              </div>
              <div class="d-flex justify-space-between">
                <div class="text-caption font-weight-regular text-normal">
                  This Month
                </div>
                <div class="text-caption font-weight-regular text-green">
                  {{ stats.overdueCollectionsCount }}
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
                {{ stats.customersCount }} Customers
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
                      />
                    </v-container>
                    <v-container
                      v-else-if="n === myCustomerTabs[1]"
                      :fluid="true"
                    >
                      <onboarding-approval-table
                        :key="Math.random().toString(36).substr(2, 16)"
                        :refId="salesOverviewFilters.salesRep.id"
                      />
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
