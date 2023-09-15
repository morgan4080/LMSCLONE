<script lang="ts" setup>
import { onBeforeMount, watch } from "vue";
import { useSalesDashboardStore } from "@/store/sales-dashboard";
import LoanApprovals from "@/components/collections/LoanApprovals.vue";
import { storeToRefs } from "pinia";
import { dateFilters } from "@/helpers";
import CollectionsTable from "@/components/collections/CollectionsTable.vue";
import { useRoute, useRouter } from "vue-router";
import stores from "@/store";
const router = useRouter();
const route = useRoute();
const { tabs, tab, salesRepIds, collectionFilter, stats, salesReps } =
  storeToRefs(useSalesDashboardStore());
const { getSalesReps, getStats, salesOverviewFilters, setStatsDates } =
  useSalesDashboardStore();
const authStore = stores.authStore;
const kopeshaURL = import.meta.env.VITE_KOPESHA_API_URL;
const dateReturn = (
  text:
    | "day"
    | "week"
    | "month"
    | "last-month"
    | "quarter"
    | "year"
    | "all"
    | "arrears"
) => {
  let [start, end] = dateFilters(text);
  setStatsDates(start, end);
};

// react to existing query parameters
watch(
  [() => route.query, salesReps],
  async ([query, reps]) => {
    if (JSON.stringify(query) !== "{}") {
      if (Object.keys(query).includes("tab")) {
        tab.value = `${query.tab}`;
      }
      if (Object.keys(query).includes("salesRep")) {
        const rep = reps.find(rep => rep.refId === `${query.salesRep}`);
        if (rep) {
          salesOverviewFilters.salesRep.text = `${rep.firstName} ${rep.lastName}`;
          salesOverviewFilters.salesRep.id = rep.refId;
        }
      }
    }
  },
  { immediate: true }
);

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
  }

  if (currentTab) {
    withValues["tab"] = currentTab;
  }

  await router.push({ path: route.path, query: withValues });
};

// set query parameters
watch(
  [salesOverviewFilters, tab],
  async ([salesOverView, currentTab]) => {
    await loadParams(salesOverView, currentTab);
    getStats();
  },
  { deep: true }
);

onBeforeMount(() => {
  getSalesReps();
  getStats();
});
const openUserCreation = () => {
  window.location.href = `${kopeshaURL}/lender/index.html#/customers/customer_form`;
};

onBeforeMount(() => {
  salesOverviewFilters.dateFilters.text = "This Month";
  salesOverviewFilters.dateFilters.value = "month";
});

console.log(salesReps.value)

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
            Sales Overview
          </h1>
          <div class="text-caption font-weight-light mb-n1">
            <span class="font-weight-medium">A Loans Overview Performance</span>
          </div>
        </v-col>
        <v-col
          cols="auto"
          sm="5"
        >
          <v-row class="d-flex justify-end">
            <div>
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
                      v-if="authStore.getCurrentUser && authStore.getCurrentUser.permissions && authStore.getCurrentUser.permissions.includes('CAN_VIEW_SALES_DASHBOARD')"
                      density="compact"
                      @click="
                        salesOverviewFilters.salesRep.text = null;
                        salesOverviewFilters.salesRep.id = '';
                        salesRepIds = [''];
                      "
                      >All</v-list-item
                    >
                    <v-list-item
                      v-for="(dropDownMenu, it) in salesReps"
                      :key="it"
                      :value="it"
                      density="compact"
                      @click="
                        salesOverviewFilters.salesRep.text = `${dropDownMenu.fullName}`;
                        salesOverviewFilters.salesRep.id = dropDownMenu.refId;
                      "
                      :title="`${dropDownMenu.fullName}`"
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
              <div class="text-body-2 font-weight-light">
                Expected Collections
              </div>
              <div class="text-h6 font-weight-regular py-2 text-primary">
                {{ stats.upcomingCollections }}
              </div>
              <div class="d-flex justify-space-between">
                <div class="text-caption font-weight-regular text-normal">
                  {{ salesOverviewFilters.dateFilters.text }}
                </div>
                <div class="text-caption font-weight-regular text-primary">
                  {{ stats.upcomingCollectionsCount }} Loans
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
              <div class="text-body-2 font-weight-light">Loans In Arrears</div>
              <div class="d-flex justify-space-between mx-1">
                <div class="text-h6 font-weight-regular py-2 text-red">
                  {{ stats.overdueCollections }}
                </div>
                <div class="text-sm font-weight-regular py-2 text-red">
                  {{ stats.overdueCollectionsPercent }}
                </div>
              </div>

              <div class="d-flex justify-space-between">
                <div class="text-caption font-weight-regular text-normal">
                  {{ salesOverviewFilters.dateFilters.text }}
                </div>
                <div class="text-caption font-weight-regular text-red">
                  {{ stats.overdueCollectionsCount }} Loans
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
                {{ stats.customersCount }} Customers
              </div>
              <div class="d-flex justify-space-between">
                <div class="text-caption font-weight-regular text-normal">
                  {{ salesOverviewFilters.dateFilters.text }}
                </div>
                <div class="text-caption font-weight-regular text-success">
                  {{ stats.customersCountIncrement }} Loans
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="d-flex">
        <v-col cols="12">
          <v-card
            :loading="false"
            variant="flat"
          >
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
                    v-for="n in tabs"
                    :key="n"
                    :value="n"
                  >
                    <v-container
                      v-if="tab === tabs[0]"
                      :fluid="true"
                    >
                      <CollectionsTable
                        :key="salesOverviewFilters.salesRep.id+tabs[0]"
                        :refId="salesOverviewFilters.salesRep.id"
                        :period="'day'"
                        title="Due Today"
                        @clearFilters="
                          salesOverviewFilters.salesRep.text = null;
                          salesOverviewFilters.salesRep.id = '';
                          salesRepIds = [''];
                          loadParams(salesOverviewFilters, tab);
                        "
                      />
                    </v-container>

                    <v-container
                      v-if="tab === tabs[1]"
                      :fluid="true"
                    >
                      <CollectionsTable
                        :key="salesOverviewFilters.salesRep.id+tabs[1]"
                        :ref-id="salesOverviewFilters.salesRep.id"
                        :period="'week'"
                        title="Due This Week"
                        @clearFilters="
                          salesOverviewFilters.salesRep.text = null;
                          salesOverviewFilters.salesRep.id = '';
                          salesRepIds = [''];
                          loadParams(salesOverviewFilters, tab);
                        "
                      />
                    </v-container>

                    <v-container
                      v-if="tab === tabs[2]"
                      :fluid="true"
                    >
                      <CollectionsTable
                        :key="salesOverviewFilters.salesRep.id+tabs[2]"
                        :ref-id="salesOverviewFilters.salesRep.id"
                        :period="'arrears'"
                        title="Arrears"
                        @clearFilters="
                          salesOverviewFilters.salesRep.text = null;
                          salesOverviewFilters.salesRep.id = '';
                          salesRepIds = [''];
                          loadParams(salesOverviewFilters, tab);
                        "
                      />
                    </v-container>

                    <v-container
                      v-if="tab === tabs[3]"
                      :fluid="true"
                    >
                      <loan-approvals
                        :key="`${Math.random().toString(36).substr(2, 16)}`"
                        :ref-id="salesOverviewFilters.salesRep.id"
                        @clearFilters="
                          salesOverviewFilters.salesRep.text = null;
                          salesOverviewFilters.salesRep.id = '';
                          salesRepIds = [''];
                          loadParams(salesOverviewFilters, tab);
                        "
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
