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
            <span class="font-weight-medium">An Overview of Customers</span> For The
            Period Between
            <span class="font-weight-medium">01/04/2023 - 30/04/2023</span>
          </div>
        </v-col>
        <v-col
          cols="auto"
          sm="5"
        >
          <v-row class="d-flex justify-end">
            <div class="px-3">
              <v-menu transition="slide-y-transition">
                <template v-slot:activator="{ props }">
                  <v-btn
                    class="v-btn--size-default text-caption text-capitalize"
                    density="default"
                    :append-icon="salesOverviewFilters.branches.appendIcon"
                    v-bind="props"
                    flat
                    style="border: 1px solid rgba(128, 128, 128, 0.25)"
                  >
                    {{ salesOverviewFilters.branches.text || "All Branches" }}
                  </v-btn>
                </template>
                <v-sheet
                  border
                  rounded
                >
                  <v-list
                    nav
                    density="compact"
                    role="listbox"
                  >
                    <v-list-item
                      density="compact"
                      @click="salesOverviewFilters.branches.text = ''"
                    >All</v-list-item
                    >
                    <v-list-item
                      v-for="(dropDownMenu, it) in salesDashboardStore.branches"
                      :key="it"
                      :value="it"
                      density="compact"
                      @click="
                        salesOverviewFilters.branches.text =
                          dropDownMenu.toString()
                      "
                    >{{ dropDownMenu }}</v-list-item
                    >
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
                    :append-icon="salesOverviewFilters.salesRep.appendIcon"
                    v-bind="props"
                    flat
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
                    nav
                    density="compact"
                    role="listbox"
                  >
                    <v-list-item
                      density="compact"
                      @click="
                        (salesOverviewFilters.salesRep.text = null),
                          (salesOverviewFilters.salesRep.id = null)
                      "
                    >All</v-list-item
                    >
                    <v-list-item
                      v-for="(
                        dropDownMenu, it
                      ) in salesDashboardStore.salesReps"
                      :key="it"
                      :value="it"
                      density="compact"
                      @click="
                        (salesOverviewFilters.salesRep.text =
                          dropDownMenu.name.toString()),
                          (salesOverviewFilters.salesRep.id =
                            dropDownMenu.refId)
                      "
                    >{{ dropDownMenu.name }}</v-list-item
                    >
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
                    flat
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
                    nav
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
                flat
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
              <div class="text-body-2 font-weight-light">
                Total Customers
              </div>
              <div class="text-h6 font-weight-regular py-2 text-primary">
                {{ salesDashboardStore.stats.upcomingCollections }} Customers
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
              <div class="text-body-2 font-weight-light">
                New Customers
              </div>
              <div class="d-flex justify-space-between mx-1">
                <div class="text-h6 font-weight-regular py-2 text-green">
                  {{ salesDashboardStore.stats.overdueCollections }} Customers
                </div>

              </div>


              <div class="d-flex justify-space-between">
                <div class="text-caption font-weight-regular text-normal">
                  This Month
                </div>
                <div class="text-caption font-weight-regular text-green">
                  {{ salesDashboardStore.stats.overdueCollectionsCount }}
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
                {{ salesDashboardStore.stats.customersCount }} Customers
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
                        {{ collectionFilter.collections.name }}
                      </h1>
                      <div class="text-caption font-weight-light mb-n1">
                        Summary
                        {{ collectionFilter.collections.name }}
                      </div>
                    </v-col>
                    <v-col
                      class="d-flex align-start"
                      sm="8"
                    >
                      <div
                        class="text-caption text-primary font-weight-regular text-decoration-underline pt-2"
                      >
                        View All
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
                    v-for="(t, ind) in tabs"
                    :key="ind"
                    :value="t"
                    class="text-none text-caption"
                  >{{ t }}</v-tab>
                </v-tabs>
                <hr style="background: rgba(130,130,130,0.1); height: 1px;border: none">

                <v-window v-model="tab">
                  <v-window-item
                    v-for="n in tabs"
                    :key="n"
                    :value="n"
                  >
                    <v-container
                      v-if="n === tabs[0]"
                      :fluid="true"
                    >
                   <all-customers-table />
                    </v-container>
                    <v-container
                      v-else-if="n === tabs[1]"
                      :fluid="true"
                    >
                   <onboarding-approval-table/>
                    </v-container>

                  </v-window-item>
                </v-window>
              </div>
              <v-row class="d-flex mt-9">
                <OverdueCollectionsTable
                  v-if="
                    collectionFilter.collections.name.toLowerCase() ===
                    'overdue'
                  "
                />
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

    </div>
  </div>
</template>

<script lang="ts" setup>
import {onBeforeMount, reactive, ref, watch} from "vue";
import { useSalesDashboardStore } from "@/store/sales-dashboard";
import AllCustomersTable from "@/components/mycustomers/AllCustomersTable.vue";
import OnboardingApprovalTable from "@/components/mycustomers/OnboardingApprovalTable.vue";
import { dateFilters } from "@/helpers";
import OverdueCollectionsTable from "@/components/OverdueCollectionsTable.vue";
const salesDashboardStore = useSalesDashboardStore();

async function initialize() {
  await salesDashboardStore.getBranches();
  await salesDashboardStore.getStats();
  await salesDashboardStore.getUpcomingCollections();
  await salesDashboardStore.getOverdueCollections();
  await salesDashboardStore.getSalesRepByBranch("HQ");
}

const tabs = ref(["All Customers", "Onboarding Approvals"]);
const tab = ref<string | null>(null);

onBeforeMount(async () => {
  await initialize();
});

const salesOverviewFilters = reactive({
  branches: {
    text: null,
    appendIcon: "mdi:mdi-chevron-down",
  } as {
    text: string | null;
    appendIcon: string;
  },
  salesRep: {
    text: null,
    id: null,
    appendIcon: "mdi:mdi-chevron-down",
  } as {
    text: string | null;
    id: string | null;
    appendIcon: string;
  },
  dateFilters: {
    text: "All Time",
    value: null,
    appendIcon: "mdi:mdi-chevron-down",
    menus: [
      { title: "All Time", value: "all" },
      { title: "This Year", value: "year" },
      { title: "This Month", value: "month" },
      { title: "This Week", value: "week" },
    ],
  } as {
    text: string;
    value: string | null;
    appendIcon: string;
    menus: { title: string; value: string }[];
  },
});

const collectionFilter = ref({
  collections: {
    name: "Customer Listing",
  },
});

watch(salesOverviewFilters, () => {
  salesOverviewFilters.branches.text
    ? ((salesDashboardStore.branchIds = [salesOverviewFilters.branches.text]),
      salesDashboardStore.getSalesRepByBranch(
        salesOverviewFilters.branches.text
      ))
    : (salesDashboardStore.branchIds = ["ALL"]);

  salesOverviewFilters.salesRep.id
    ? (salesDashboardStore.salesRepIds = [salesOverviewFilters.salesRep.id!])
    : (salesDashboardStore.salesRepIds = ["ALL"]);

  salesOverviewFilters.dateFilters.value &&
  dateReturn(salesOverviewFilters.dateFilters.value);

  salesDashboardStore.getStats();
});

function dateReturn(text: string) {
  let [start, end] = dateFilters(text) as string[];
  salesDashboardStore.stats.startDate = start;
  salesDashboardStore.stats.endDate = end;
}

</script>

<style scoped>
.searchField:focus-visible {
  outline: rgba(128, 128, 128, 0.35) solid 0.5px;
}
</style>
