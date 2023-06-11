<script setup lang="ts">
import { ref, onMounted } from "vue";
// import axiosInstance from "@/services/api/axiosInstance";

const open = ref(true);
const tableData = ref([]);
const loading = ref(false);
const totalItems = ref(30);
const sources = {
  mobile: {
    count: 83,
    total: 1500,
    highest: 2000,
    lastOn: "DD/MM/YYYY HH:MM",
  },
  cash: {
    count: 7,
    total: 1500,
    highest: 2000,
    lastOn: "DD/MM/YYYY HH:MM",
  },
};
const headers = ref<
  { title: string; key: string; align: string; sortable: boolean }[]
>([
  {
    title: "Count",
    align: "start",
    sortable: false,
    key: "count",
  },
  {
    title: "Inflow Type",
    key: "inflowType",
    align: "start",
    sortable: false,
  },
  { title: "Description", key: "description", align: "start", sortable: false },
  { title: "Total", key: "total", align: "end", sortable: false },
  { title: "Last Amount", key: "lastAmount", align: "end", sortable: false },
  { title: "Last On", key: "lastOn", align: "end", sortable: false },
]);
const options = ["Option 1", "Option 2", "Option 3"];

// const mobileMoneyData = ref([])

// API Call: Get Mobile Money Data
const loadMobileMoneyData = async () => {
  // await axiosInstance
  //   .get("/e_statement/")
  //   .then(response => (mobileMoneyData.value = response.data))
  //   .catch(error => console.error(error));
};

onMounted(() => {
  loadMobileMoneyData() 
})
</script>

<template>
  <v-container fluid>
    <div
      @click="open = !open"
      class="bg-blue-darken-2 hover-cursor-pointer px-6 py-2 rounded d-flex justify-space-between hover-cursor-pointer"
    >
      <p>Sources / Inflows</p>
      <v-icon
        icon="mdi:mdi-arrow-down-thin-circle-outline"
        :class="open ? 'fa-rotate-180' : ''"
      ></v-icon>
    </div>
    <div v-if="open">
      <v-row>
        <v-col class="my-2">
          <v-card
            class="rounded text-caption"
            variant="flat"
            color="white"
          >
            <v-container fluid>
              <div class="mx-4">
                <h1 class="text-h6 font-weight-regular">Mobile Money</h1>
                <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                  Summary of Mobile Money
                </h2>
              </div>
              <div class="my-8 mx-4">
                <v-row class="justify-space-between d-flex font-weight-bold">
                  <v-col>Title</v-col>
                  <v-col class="text-right">Description</v-col>
                </v-row>
                <v-divider
                  class="my-3"
                  :thickness="3"
                />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Count</v-col>
                  <v-col class="text-right">{{ sources.mobile.count }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Total</v-col>
                  <v-col class="text-right">{{ sources.mobile.total }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Highest</v-col>
                  <v-col class="text-right">{{ sources.mobile.highest }}</v-col>
                </v-row>
                <v-divider
                  :thickness="3"
                  class="my-2"
                />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Last On</v-col>
                  <v-col class="text-right">{{ sources.mobile.lastOn }}</v-col>
                </v-row>
                <v-divider class="my-3" />
              </div>
            </v-container>
          </v-card>
        </v-col>
        <v-col class="my-2">
          <v-card
            class="rounded text-caption"
            variant="flat"
            color="white"
          >
            <v-container fluid>
              <div class="mx-4">
                <h1 class="text-h6 font-weight-regular">Cash Deposit</h1>
                <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                  Summary of Cash Deposit
                </h2>
              </div>
              <div class="my-8 mx-4">
                <v-row class="justify-space-between d-flex font-weight-bold">
                  <v-col>Title</v-col>
                  <v-col class="text-right">Description</v-col>
                </v-row>
                <v-divider
                  class="my-3"
                  :thickness="3"
                />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Count</v-col>
                  <v-col class="text-right">{{ sources.cash.count }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Total</v-col>
                  <v-col class="text-right">{{ sources.cash.total }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Highest</v-col>
                  <v-col class="text-right">{{ sources.cash.highest }}</v-col>
                </v-row>
                <v-divider
                  :thickness="3"
                  class="my-2"
                />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Last On</v-col>
                  <v-col class="text-right">{{ sources.cash.lastOn }}</v-col>
                </v-row>
                <v-divider class="my-3" />
              </div>
            </v-container>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-container fluid>
          <v-card
            variant="flat"
            class="rounded py-4"
            color="white"
          >
            <div class="px-8">
              <h1 class="text-h6 font-weight-regular">
                Top Sources / Inflow Transactions
              </h1>
              <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                Summary of Top Sources / Inflow Transactions
              </h2>
            </div>

            <v-container fluid>
              <div class="d-flex justify-space-between my-2">
                <div>
                  <v-menu transition="slide-y-transition">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        size="small"
                        variant="outlined"
                        append-icon="mdi:mdi-chevron-down"
                        v-bind="props"
                        class="text-none text-caption ml-2 font-weight-regular"
                        style="border: 1px solid rgba(128, 128, 128, 0.25)"
                      >
                        Select Inflow Type
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
                          v-for="(item, idx) in options"
                          :key="idx"
                          :value="item"
                          >{{ item }}</v-list-item
                        >
                      </v-list>
                    </v-sheet>
                  </v-menu>
                  <v-menu transition="slide-y-transition">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        size="small"
                        variant="outlined"
                        append-icon="mdi:mdi-chevron-down"
                        v-bind="props"
                        class="text-none text-caption ml-2 font-weight-regular"
                        style="border: 1px solid rgba(128, 128, 128, 0.25)"
                      >
                        Amount Descending
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
                          v-for="(item, idx) in options"
                          :key="idx"
                          :value="item"
                          >{{ item }}</v-list-item
                        >
                      </v-list>
                    </v-sheet>
                  </v-menu>
                </div>
                <div>
                  <v-menu transition="slide-y-transition">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        size="small"
                        variant="outlined"
                        append-icon="mdi:mdi-chevron-down"
                        v-bind="props"
                        class="text-none text-caption ml-2 font-weight-regular"
                        style="border: 1px solid rgba(128, 128, 128, 0.25)"
                      >
                        Export
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
                          v-for="(item, idx) in options"
                          :key="idx"
                          :value="item"
                          >{{ item }}</v-list-item
                        >
                      </v-list>
                    </v-sheet>
                  </v-menu>
                  <v-menu transition="slide-y-transition">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        size="small"
                        variant="outlined"
                        append-icon="mdi:mdi-chevron-down"
                        v-bind="props"
                        class="text-none text-caption ml-2 font-weight-regular"
                        style="border: 1px solid rgba(128, 128, 128, 0.25)"
                      >
                        Show/Hide
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
                          v-for="(item, idx) in options"
                          :key="idx"
                          :value="item"
                          >{{ item }}</v-list-item
                        >
                      </v-list>
                    </v-sheet>
                  </v-menu>
                  <v-menu transition="slide-y-transition">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        size="small"
                        variant="outlined"
                        v-bind="props"
                        class="text-none text-caption ml-2 font-weight-regular"
                        style="border: 1px solid rgba(128, 128, 128, 0.25)"
                      >
                        <v-icon icon="mdi:mdi-dots-vertical" />
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
                          v-for="(item, idx) in options"
                          :key="idx"
                          :value="item"
                          >{{ item }}</v-list-item
                        >
                      </v-list>
                    </v-sheet>
                  </v-menu>
                </div>
              </div>
            </v-container>
            <v-data-table-server
              class="text-caption px-4"
              :headers="headers"
              :items-length="totalItems"
              :items="tableData"
              :loading="loading"
              loading-text="Loading...Please Wait"
            ></v-data-table-server>
          </v-card>
        </v-container>
      </v-row>
    </div>
  </v-container>
</template>
