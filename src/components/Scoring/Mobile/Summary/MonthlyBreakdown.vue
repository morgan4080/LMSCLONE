<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "@/services/api/axiosInstance";

const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

interface MonthlyData {
  month: string;
  debits: number;
  credits: number;
  closing: number;
}
const route = useRoute();
const tableData = ref<MonthlyData[]>([]);

const headers = ref<
  { title: string; key: string; align: string; sortable: boolean }[]
>([
  {
    title: "Month",
    align: "start",
    sortable: false,
    key: "month",
  },
  {
    title: "Debits (Dr)",
    key: "debits",
    align: "end",
    sortable: false,
  },
  { title: "Credits (CR)", key: "credits", align: "end", sortable: false },
  { title: "Closing", key: "closing", align: "end", sortable: false },
]);
const itemsPerPage = ref(100);
const totalItems = computed(() => tableData.value.length);
const loading = ref(false);

// API Call: Get monthly breakdown
const loadMonthlyBreakdown = async () => {
  await axiosInstance
    .get(`income/income_expense_tabulated?idNumber=${route.params.slug}&pageSize=100&sortBy=id`)
    .then(response => (tableData.value = response.data.content))
    .catch(error => console.error(error));
};
</script>

<template>
  <v-container
    fluid
    class="my-4"
  >
    <v-card
      variant="flat"
      color="white"
      class="rounded h-100"
    >
      <div class="mx-4">
        <v-container
          fluid
          class="mx-auto"
        >
          <div>
            <h1 class="text-h6 font-weight-regular">Monthly Breakdown</h1>
            <h2 class="text-caption text-grey-darken-2 font-weight-regular">
              Summary Of Upcoming Collections
            </h2>
          </div>

          <div class="my-10">
            <div class="d-flex justify-space-between">
              <div>
                <v-menu transition="slide-y-transition">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      variant="outlined"
                      append-icon="mdi:mdi-chevron-down"
                      v-bind="props"
                      class="text-none text-caption ml-2"
                      style="border: 1px solid rgba(128, 128, 128, 0.25)"
                    >
                      Select Year
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
                      variant="outlined"
                      append-icon="mdi:mdi-chevron-down"
                      v-bind="props"
                      class="text-none text-caption ml-2"
                      style="border: 1px solid rgba(128, 128, 128, 0.25)"
                    >
                      Select Month
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
                      variant="outlined"
                      append-icon="mdi:mdi-chevron-down"
                      v-bind="props"
                      class="text-none text-caption ml-2"
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
                      variant="outlined"
                      append-icon="mdi:mdi-chevron-down"
                      v-bind="props"
                      class="text-none text-caption ml-2"
                      style="border: 1px solid rgba(128, 128, 128, 0.25)"
                    >
                      Show / Hide
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
                      variant="outlined"
                      append-icon="mdi:mdi-chevron-down"
                      v-bind="props"
                      class="text-none text-caption ml-2"
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
          </div>

          <div>
            <VDataTableServer
              v-model:items-per-page="itemsPerPage"
              class="text-caption px-4"
              :headers="headers"
              :items-length="totalItems"
              :items="tableData"
              :loading="loading"
              item-value="name"
              loading-text="Loading...Please Wait"
              @update:options="loadMonthlyBreakdown"
            >
              <template v-slot:bottom> </template>
            </VDataTableServer>
          </div>
        </v-container>
      </div>
    </v-card>
  </v-container>
</template>
