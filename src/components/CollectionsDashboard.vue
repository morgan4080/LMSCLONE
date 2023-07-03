<template>
  <v-container class="fill-height bg-background">
    <div class="flex-column w-100 fill-height">
      <v-row class="d-flex align-center justify-center">
        <v-col
          cols="auto"
          sm="7"
        >
          <h1 class="text-h6 font-weight-regular text-grey-darken-2">
            Sales Overview
          </h1>
          <div class="text-caption font-weight-light mb-n1">
            <span class="font-weight-medium">Sales Performance</span> For The
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
                Total Upcoming Collections
              </div>
              <div class="text-h6 font-weight-regular py-2 text-primary">
                {{ salesDashboardStore.stats.upcomingCollections }}
              </div>
              <div class="d-flex justify-space-between">
                <div class="text-caption font-weight-regular text-normal">
                  Next 30 Days
                </div>
                <div class="text-caption font-weight-regular text-primary">
                  {{ salesDashboardStore.stats.upcomingCollectionsCount }} Loans
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
                Total Overdue Collections
              </div>
              <div class="text-h6 font-weight-regular py-2 text-red">
                {{ salesDashboardStore.stats.overdueCollections }}
              </div>
              <div class="d-flex justify-space-between">
                <div class="text-caption font-weight-regular text-normal">
                  Last 30 Days
                </div>
                <div class="text-caption font-weight-regular text-red">
                  {{ salesDashboardStore.stats.overdueCollectionsCount }} Loans
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
                Total New Customers
              </div>
              <div class="text-h6 font-weight-regular py-2 text-success">
                {{ salesDashboardStore.stats.customersCount }} Customers
              </div>
              <div class="d-flex justify-space-between">
                <div class="text-caption font-weight-regular text-normal">
                  Last 30 Days
                </div>
                <div class="text-caption font-weight-regular text-success">
                  {{ salesDashboardStore.stats.customersCountIncrement }} Loans
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
                        {{ collectionFilter.collections.name }} Collections
                      </h1>
                      <div class="text-caption font-weight-light mb-n1">
                        Summary Of
                        {{ collectionFilter.collections.name }} Collections
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
                  <v-input
                    v-model="searchUpcomingCollections"
                    hide-details
                    class="font-weight-light"
                    density="compact"
                  >
                    <template v-slot:default>
                      <input
                        class="border rounded rounded-e-0 px-2 text-caption w-100 searchField"
                        type="text"
                        placeholder="Search Here"
                      />
                      <v-btn
                        variant="tonal"
                        size="small"
                        class="rounded-s-0"
                      >
                        <span>GO</span>
                      </v-btn>
                    </template>
                  </v-input>
                </v-col>
              </v-row>

              <v-row class="d-flex align-center justify-center mt-9">
                <v-col
                  cols="auto"
                  sm="7"
                >
                  <v-row class="d-flex justify-start">
                    <div class="px-1">
                      <v-menu transition="slide-y-transition">
                        <template v-slot:activator="{ props }">
                          <v-btn
                            class="v-btn--size-default text-caption text-capitalize"
                            density="default"
                            :append-icon="
                              collectionFilter.collections.appendIcon
                            "
                            v-bind="props"
                            flat
                            style="border: 1px solid rgba(128, 128, 128, 0.25)"
                          >
                            {{ collectionFilter.collections.name }} Loans
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
                              v-for="(dropdown, idx) in collectionFilter
                                .collections.menu"
                              :key="idx"
                              density="compact"
                              @click="
                                collectionFilter.collections.name = dropdown
                              "
                              >{{ dropdown }} Loans</v-list-item
                            >
                          </v-list>
                        </v-sheet>
                      </v-menu>
                    </div>

                    <div
                      v-if="
                        collectionFilter.collections.name.toLowerCase() ===
                        'upcoming'
                      "
                      class="px-3"
                    >
                      <v-menu transition="slide-y-transition">
                        <template v-slot:activator="{ props }">
                          <v-btn
                            class="v-btn--size-default text-caption text-capitalize"
                            density="default"
                            :append-icon="
                              upcomingCollectionFilters.product.appendIcon
                            "
                            v-bind="props"
                            flat
                            style="border: 1px solid rgba(128, 128, 128, 0.25)"
                          >
                            {{
                              upcomingCollectionFilters.product.text ||
                              "Select Product"
                            }}
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
                                upcomingCollectionFilters.product.text = null
                              "
                              >All Products</v-list-item
                            >
                            <v-list-item
                              v-for="(
                                dropDownMenu, it
                              ) in upcomingCollectionFilters.product.menus"
                              :key="it"
                              :value="it"
                              density="compact"
                              @click="
                                upcomingCollectionFilters.product.text =
                                  dropDownMenu
                              "
                              >{{ dropDownMenu }}</v-list-item
                            >
                          </v-list>
                        </v-sheet>
                      </v-menu>
                    </div>

                    <div
                      v-if="
                        collectionFilter.collections.name.toLowerCase() ===
                        'upcoming'
                      "
                      class="px-3"
                    >
                      <v-menu transition="slide-y-transition">
                        <template v-slot:activator="{ props }">
                          <v-btn
                            class="v-btn--size-default text-caption text-capitalize"
                            density="default"
                            :append-icon="
                              upcomingCollectionFilters.status.appendIcon
                            "
                            v-bind="props"
                            flat
                            style="border: 1px solid rgba(128, 128, 128, 0.25)"
                          >
                            {{
                              upcomingCollectionFilters.status.text ||
                              "Select Status"
                            }}
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
                              value="All"
                              density="compact"
                              @click="
                                upcomingCollectionFilters.status.text = null
                              "
                              >All</v-list-item
                            >
                            <v-list-item
                              v-for="(
                                dropDownMenu, it
                              ) in upcomingCollectionFilters.status.menus"
                              :key="it"
                              :value="it"
                              density="compact"
                              @click="
                                upcomingCollectionFilters.status.text =
                                  dropDownMenu.title
                              "
                              >{{ dropDownMenu.title }}</v-list-item
                            >
                          </v-list>
                        </v-sheet>
                      </v-menu>
                    </div>
                  </v-row>
                </v-col>
                <v-col
                  cols="auto"
                  sm="5"
                >
                  <v-row class="d-flex justify-end">
                    <div
                      v-for="(dropDown, i) in upComingCollectionActions"
                      :key="i"
                      class="px-2"
                    >
                      <v-menu transition="slide-y-transition">
                        <template v-slot:activator="{ props }">
                          <v-btn
                            class="v-btn--size-default text-caption text-capitalize"
                            density="default"
                            :append-icon="
                              dropDown.text ? dropDown.appendIcon : ''
                            "
                            v-bind="props"
                            flat
                            style="border: 1px solid rgba(128, 128, 128, 0.25)"
                          >
                            <template v-slot:default>
                              <v-icon
                                v-if="!dropDown.text"
                                :icon="dropDown.appendIcon"
                              ></v-icon>
                              {{ dropDown.text }}
                            </template>
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
                              v-for="(dropDownMenu, it) in dropDown.menus"
                              :key="it"
                              :title="dropDownMenu.text"
                              :value="it"
                              density="compact"
                            ></v-list-item>
                          </v-list>
                        </v-sheet>
                      </v-menu>
                    </div>
                  </v-row>
                </v-col>
              </v-row>
              <v-row class="d-flex mt-9">
                <UpcomingCollectionsTable
                  v-if="
                    collectionFilter.collections.name.toLowerCase() ===
                    'upcoming'
                  "
                />
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

      <v-row class="d-flex">
        <v-col cols="12">
          <v-card :loading="false">
            <v-card-text class="px-7 py-9">
              <v-row>
                <v-col sm="9">
                  <v-row>
                    <v-col sm="4">
                      <h1 class="text-h6 font-weight-regular">New Customers</h1>
                      <div class="text-caption font-weight-light mb-n1">
                        Summary Of All Recent Customers
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
                  <v-input
                    v-model="searchUpcomingCollections"
                    hide-details
                    class="font-weight-light"
                    density="compact"
                  >
                    <template v-slot:default>
                      <input
                        class="border rounded rounded-e-0 px-2 text-caption w-100 searchField"
                        type="text"
                        placeholder="Search Here"
                      />
                      <v-btn
                        variant="tonal"
                        size="small"
                        class="rounded-s-0"
                      >
                        <span>GO</span>
                      </v-btn>
                    </template>
                  </v-input>
                </v-col>
              </v-row>

              <v-row class="d-flex align-center justify-center mt-9">
                <v-col
                  cols="auto"
                  sm="7"
                >
                  <v-row class="d-flex justify-start">
                    <div class="px-1">
                      <v-menu transition="slide-y-transition">
                        <template v-slot:activator="{ props }">
                          <v-btn
                            class="v-btn--size-default text-caption text-capitalize"
                            density="default"
                            :append-icon="newCustomerFilters.status.appendIcon"
                            v-bind="props"
                            flat
                            style="border: 1px solid rgba(128, 128, 128, 0.25)"
                          >
                            {{
                              newCustomerFilters.status.text ||
                              "Select Onboarding "
                            }}
                            Status
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
                              @click="
                                newCustomerFilters.status.text = '';
                                StatusParam = '';
                                newCustomerFilter();
                              "
                              title="All"
                              density="compact"
                            ></v-list-item>

                            <v-list-item
                              v-for="(dropDownMenu, it) in newCustomerFilters
                                .status.menus"
                              @click="
                                StatusParam = dropDownMenu.param;
                                newCustomerFilter();
                                newCustomerFilters.status.text =
                                  dropDownMenu.title;
                              "
                              :key="it"
                              :title="dropDownMenu.title"
                              :value="it"
                              density="compact"
                            ></v-list-item>
                          </v-list>
                        </v-sheet>
                      </v-menu>
                    </div>

                    <div class="px-1">
                      <v-menu transition="slide-y-transition">
                        <template v-slot:activator="{ props }">
                          <v-btn
                            class="v-btn--size-default text-caption text-capitalize"
                            density="default"
                            :append-icon="newCustomerFilters.ussd.appendIcon"
                            v-bind="props"
                            flat
                            style="border: 1px solid rgba(128, 128, 128, 0.25)"
                          >
                            {{
                              newCustomerFilters.ussd.text ||
                              "Select USSD Status"
                            }}
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
                              title="All USSD"
                              @click="
                                UssdParam = '';
                                newCustomerFilter();
                                newCustomerFilters.ussd.text = '';
                              "
                              density="compact"
                            ></v-list-item>
                            <v-list-item
                              v-for="(dropDownMenu, it) in newCustomerFilters
                                .ussd.menus"
                              :key="it"
                              :title="dropDownMenu.text"
                              :value="it"
                              @click="
                                UssdParam = dropDownMenu.param;
                                newCustomerFilter();
                                newCustomerFilters.ussd.text =
                                  dropDownMenu.text;
                              "
                              density="compact"
                            ></v-list-item>
                          </v-list>
                        </v-sheet>
                      </v-menu>
                    </div>
                  </v-row>
                </v-col>
                <v-col
                  cols="auto"
                  sm="5"
                >
                  <v-row class="d-flex justify-end">
                    <div
                      v-for="(dropDown, i) in newCustomerActions"
                      :key="i"
                      class="px-2"
                    >
                      <v-menu transition="slide-y-transition">
                        <template v-slot:activator="{ props }">
                          <v-btn
                            class="v-btn--size-default text-caption text-capitalize"
                            density="default"
                            :append-icon="
                              dropDown.text ? dropDown.appendIcon : ''
                            "
                            v-bind="props"
                            flat
                            style="border: 1px solid rgba(128, 128, 128, 0.25)"
                          >
                            <template v-slot:default>
                              <v-icon
                                v-if="!dropDown.text"
                                :icon="dropDown.appendIcon"
                              ></v-icon>
                              {{ dropDown.text }}
                            </template>
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
                              v-for="(dropDownMenu, it) in dropDown.menus"
                              :key="it"
                              :title="dropDownMenu.text"
                              :value="it"
                              density="compact"
                            ></v-list-item>
                          </v-list>
                        </v-sheet>
                      </v-menu>
                    </div>
                  </v-row>
                </v-col>
              </v-row>
              <v-row class="d-flex mt-9">
                <NewCustomersTable />
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { onBeforeMount, reactive, ref, watch } from "vue";
import { useSalesDashboardStore } from "@/store/sales-dashboard";
import UpcomingCollectionsTable from "@/components/UpcomingCollectionsTable.vue";
import NewCustomersTable from "@/components/NewCustomersTable.vue";
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

onBeforeMount(async () => {
  await initialize();
});

const searchUpcomingCollections = ref("");

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

// const upComingCollectionFilters = reactive({
//   branches: {
//     text: "All Branches",
//     appendIcon: "mdi:mdi-chevron-down",
//   } as {
//     text: string | null;
//     appendIcon: string;
//   },
//   salesRep: {
//     text: "All Sales Rep",
//     id: null,
//     appendIcon: "mdi:mdi-chevron-down",
//   } as {
//     text: string | null;
//     id: string | null;
//     appendIcon: string;
//   },
//   dateFilters: {
//     text: "All Time",
//     appendIcon: "mdi:mdi-chevron-down",
//     menus: ["All Time", "This Year", "This Month", "This Week"],
//   },
// });
const collectionFilter = ref({
  collections: {
    name: "Upcoming",
    appendIcon: "mdi:mdi-chevron-down",
    menu: ["Upcoming", "Overdue"],
  },
});
const upcomingCollectionFilters = ref({
  product: {
    text: null,
    appendIcon: "mdi:mdi-chevron-down",
    menus: [
      "Biashara",
      "PRESTA LMS",
      "Corporate Loan",
      "Okoa",
      "Salary Advance",
    ],
  } as { text: string | null; appendIcon: string; menus: string[] },
  status: {
    text: null,
    appendIcon: "mdi:mdi-chevron-down",
    menus: [
      {
        title: "Paid",
        value: "Paid",
      },
      {
        title: "Not Paid",
        value: "NOTPAID",
      },
      {
        title: "Partially Paid",
        value: "Partially Paid",
      },
    ],
  } as {
    text: string | null;
    appendIcon: string;
    menus: { title: string; value: string }[];
  },
});
const upComingCollectionActions = ref([
  {
    text: "Export",
    appendIcon: "mdi:mdi-chevron-down",
    menus: [
      {
        text: "Op 1",
      },
      {
        text: "Op 2",
      },
      {
        text: "Op 3",
      },
    ],
  },
  {
    text: "Show/Hide",
    appendIcon: "mdi:mdi-chevron-down",
    menus: [
      {
        text: "Op 1",
      },
      {
        text: "Op 2",
      },
      {
        text: "Op 3",
      },
    ],
  },
  {
    text: "This Week",
    appendIcon: "mdi:mdi-chevron-down",
    menus: [
      {
        text: "Op 1",
      },
      {
        text: "Op 2",
      },
      {
        text: "Op 3",
      },
    ],
  },
  {
    text: null,
    appendIcon: "mdi:mdi-dots-vertical",
    menus: [
      {
        text: "Op 1",
      },
      {
        text: "Op 2",
      },
      {
        text: "Op 3",
      },
    ],
  },
]);

const newCustomerFilters = ref({
  status: {
    text: "Select Onboarding ",
    appendIcon: "mdi:mdi-chevron-down",
    menus: [
      {
        title: "Approved",
        param: "&onboardingStatus=Approved",
      },
      { title: "Denied", param: "&onboardingStatus=Denied" },
    ],
  },
  ussd: {
    text: "Select USSD Status",
    appendIcon: "mdi:mdi-chevron-down",
    menus: [
      {
        text: "Has USSD",
        param: "&hasUssd=YES",
      },
      {
        text: "Lacks USSD",
        param: "&hasUssd=NO",
      },
    ],
  },
});

const newCustomerActions = ref([
  {
    text: "Export",
    appendIcon: "mdi:mdi-chevron-down",
    menus: [
      {
        text: "Op 1",
      },
      {
        text: "Op 2",
      },
      {
        text: "Op 3",
      },
    ],
  },
  {
    text: "Show/Hide",
    appendIcon: "mdi:mdi-chevron-down",
    menus: [
      {
        text: "Op 1",
      },
      {
        text: "Op 2",
      },
      {
        text: "Op 3",
      },
    ],
  },
  {
    text: "This Week",
    appendIcon: "mdi:mdi-chevron-down",
    menus: [
      {
        text: "Op 1",
      },
      {
        text: "Op 2",
      },
      {
        text: "Op 3",
      },
    ],
  },
  {
    text: null,
    appendIcon: "mdi:mdi-dots-vertical",
    menus: [
      {
        text: "Op 1",
      },
      {
        text: "Op 2",
      },
      {
        text: "Op 3",
      },
    ],
  },
]);

const UssdParam = ref("");
const StatusParam = ref("");

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
function newCustomerFilter() {
  let newParam = UssdParam.value.concat(StatusParam.value);
  salesDashboardStore.getNewCustomers(newParam);
}
</script>

<style scoped>
.searchField:focus-visible {
  outline: rgba(128, 128, 128, 0.35) solid 0.5px;
}
</style>
