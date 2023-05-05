<template>
  <v-container class="fill-height bg-background">
    <v-responsive class="d-flex fill-height">
      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto" sm="7">
          <h1 class="text-h6 font-weight-regular text-grey-darken-2">
            Sales Overview
          </h1>
          <div class="text-caption font-weight-light mb-n1">
            <span class="font-weight-medium">Sales Performance</span> For The
            Period Between
            <span class="font-weight-medium">01/04/2023 - 30/04/2023</span>
          </div>
        </v-col>
        <v-col cols="auto" sm="5">
          <v-row class="d-flex justify-end">
            <div v-for="(dropDown, i) in dropDownData" :key="i" class="px-3">
              <v-menu transition="slide-y-transition">
                <template v-slot:activator="{ props }">
                  <v-btn
                    class="v-btn--size-default text-caption text-capitalize"
                    density="default"
                    :append-icon="dropDown.appendIcon"
                    v-bind="props"
                    flat
                    style="border: 1px solid rgba(128, 128, 128, 0.25)"
                  >
                    {{ dropDown.text }}
                  </v-btn>
                </template>
                <v-sheet border rounded>
                  <v-list nav density="compact" role="listbox">
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
      <v-row class="d-flex">
        <v-col v-for="(data, i) in cardData" :key="i" cols="12" sm="4">
          <v-card :loading="false">
            <v-card-text>
              <div class="text-body-2 font-weight-light">
                {{ data.text }}
              </div>
              <div
                class="text-h6 font-weight-regular py-2"
                :class="'text-' + data.color"
              >
                {{ data.metric }}
              </div>
              <div class="d-flex justify-space-between">
                <div
                  v-for="(cap, i) in data.captions"
                  :key="i"
                  class="text-caption font-weight-regular"
                  :class="'text-' + cap.color"
                >
                  {{ cap.metric }}
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
                        Upcoming Collections
                      </h1>
                      <div class="text-caption font-weight-light mb-n1">
                        Summary Of Upcoming Collections
                      </div>
                    </v-col>
                    <v-col class="d-flex align-start" sm="8">
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
                      <v-btn variant="tonal" size="small" class="rounded-s-0">
                        <span>GO</span>
                      </v-btn>
                    </template>
                  </v-input>
                </v-col>
              </v-row>

              <v-row class="d-flex align-center justify-center mt-9">
                <v-col cols="auto" sm="7">
                  <v-row class="d-flex justify-start">
                    <div
                      v-for="(dropDown, i) in upComingCollectionFilters"
                      :key="i"
                      class="px-1"
                    >
                      <v-menu transition="slide-y-transition">
                        <template v-slot:activator="{ props }">
                          <v-btn
                            class="v-btn--size-default text-caption text-capitalize"
                            density="default"
                            :append-icon="dropDown.appendIcon"
                            v-bind="props"
                            flat
                            style="border: 1px solid rgba(128, 128, 128, 0.25)"
                          >
                            {{ dropDown.text }}
                          </v-btn>
                        </template>
                        <v-sheet border rounded>
                          <v-list nav density="compact" role="listbox">
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
                <v-col cols="auto" sm="5">
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
                        <v-sheet border rounded>
                          <v-list nav density="compact" role="listbox">
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
                <ServerTable />
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
                    <v-col class="d-flex align-start" sm="8">
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
                      <v-btn variant="tonal" size="small" class="rounded-s-0">
                        <span>GO</span>
                      </v-btn>
                    </template>
                  </v-input>
                </v-col>
              </v-row>

              <v-row class="d-flex align-center justify-center mt-9">
                <v-col cols="auto" sm="7">
                  <v-row class="d-flex justify-start">
                    <div
                      v-for="(dropDown, i) in newCustomerFilters"
                      :key="i"
                      class="px-1"
                    >
                      <v-menu transition="slide-y-transition">
                        <template v-slot:activator="{ props }">
                          <v-btn
                            class="v-btn--size-default text-caption text-capitalize"
                            density="default"
                            :append-icon="dropDown.appendIcon"
                            v-bind="props"
                            flat
                            style="border: 1px solid rgba(128, 128, 128, 0.25)"
                          >
                            {{ dropDown.text }}
                          </v-btn>
                        </template>
                        <v-sheet border rounded>
                          <v-list nav density="compact" role="listbox">
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
                <v-col cols="auto" sm="5">
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
                        <v-sheet border rounded>
                          <v-list nav density="compact" role="listbox">
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
                <ServerTable />
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import ServerTable from "@/components/ServerTable.vue";

type CardDataType = {
  text: string;
  metric: string;
  color: string;
  captions: { metric: string; color: string }[];
}[];

const searchUpcomingCollections = ref("");

const cardData = ref<CardDataType>([
  {
    text: "Total Upcoming Collections",
    metric: "70,000 KES",
    color: "primary",
    captions: [
      {
        metric: "Next 30 Days",
        color: "normal",
      },
      {
        metric: "20 Loans",
        color: "primary",
      },
    ],
  },
  {
    text: "Total Overdue Collections",
    metric: "1,900,000 KES",
    color: "red",
    captions: [
      {
        metric: "Last 30 Days",
        color: "normal",
      },
      {
        metric: "17 Loans",
        color: "red",
      },
    ],
  },
  {
    text: "Total New Customers",
    metric: "150,000 Customers",
    color: "success",
    captions: [
      {
        metric: "Last 30 Days",
        color: "normal",
      },
      {
        metric: "+10%",
        color: "success",
      },
    ],
  },
]);

const dropDownData = ref([
  {
    text: "All Branches",
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
    text: "All Sales Rep",
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
    text: "This Month",
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
]);

const upComingCollectionFilters = ref([
  {
    text: "All Branches",
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
    text: "All Sales Rep",
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
    text: "This Month",
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
]);

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

const newCustomerFilters = ref([
  {
    text: "Select Onboarding Status",
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
    text: "Select USSD Status",
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
]);

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
</script>

<style scoped>
.searchField:focus-visible {
  outline: rgba(128, 128, 128, 0.35) solid 0.5px;
}
</style>
