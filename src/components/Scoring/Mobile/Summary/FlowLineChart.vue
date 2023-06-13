<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "@/services/api/axiosInstance";
import LineChart from "@/components/Scoring/LineChart.vue";

const options = ["Option 1", "Option 2", "Option 3", "Option 4"];


interface Flow {
  id: number;
  idnum: string;
  name: string;
  value: number;
  expenseflowname: string;
}

// interface FlowData {
//   labels: string[];
//   data: string[];
// }

const route = useRoute();

const apiData = ref<Flow[]>([])

// const data = ref<FlowData>({
//   labels: [],
//   data: []
// })

const getMonthName = (month: number): string => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[month - 1];
};

const inflow = computed(() => {
  const labels: string[] = [];
  const data: string[] = [];

  for (const item of apiData.value) {
    if (item.expenseflowname === 'Inflow') {
      const [month] = item.name.split('/').map(Number);
      const label = getMonthName(month);
      const monthIndex = labels.indexOf(label);

      if (monthIndex === -1) {
        labels.push(label);
        data.push(String(item.value));
      } else {
        const currentValue = parseFloat(data[monthIndex]);
        data[monthIndex] = String(currentValue + item.value);
      }
    }
  }

  return { labels, data };
});

const outflow = computed(() => {
  const labels: string[] = [];
  const data: string[] = [];

  for (const item of apiData.value) {
    if (item.expenseflowname === 'Outflow') {
      const [month] = item.name.split('/').map(Number);
      const label = getMonthName(month);
      const monthIndex = labels.indexOf(label);

      if (monthIndex === -1) {
        labels.push(label);
        data.push(String(item.value));
      } else {
        const currentValue = parseFloat(data[monthIndex]);
        data[monthIndex] = String(currentValue + item.value);
      }
    }
  }

  return { labels, data };
});

const flow = ref<string>('Inflow');

// API Call: Get In-Out Flow Data
const loadFlowData = async () => {
  await axiosInstance
    .get(`/income/income_expense_flow?idNumber=${route.params.slug}&pageSize=100&sortBy=id`)
    .then(response => (apiData.value = response.data.content))
    .catch(error => console.error(error));
};

onMounted(() => {
  loadFlowData() 
})
</script>

<template>
  <v-container fluid>
    <v-card
      variant="flat"
      color="white"
      class="rounded h-100"
    >
      <v-container fluid>
        <div class="d-flex justify-space-between">
          <div>
            <h1 class="text-h6 font-weight-regular">{{ flow }}</h1>
            <h2 class="text-caption text-grey-darken-2 font-weight-regular">
              Summary Of {{ flow }} Transactions
            </h2>
          </div>
          <div class="d-flex">
            <v-btn
              variant="outlined"
              @click="
                () => {
                  flow = 'Inflow';
                }
              "
              :class="
                flow.toLowerCase() === 'inflow'
                  ? 'bg-black text-white'
                  : 'bg-white text-black'
              "
              class="text-none font-weight-regular rounded-e-0 border"
              >Inflow</v-btn
            >
            <v-btn
              variant="outlined"
              @click="
                () => {
                  flow = 'Outflow';
                }
              "
              :class="
                flow.toLowerCase() === 'outflow'
                  ? 'bg-black text-white'
                  : 'bg-white text-black'
              "
              class="text-none font-weight-regular rounded-s-0 border"
              >Outflow</v-btn
            >
          </div>
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
          <LineChart
            :propData="inflow"
            v-if="flow.toLowerCase() === 'inflow'"
            class="h-75 w-75"
          />
          <LineChart
            :propData="outflow"
            v-if="flow.toLowerCase() === 'outflow'"
            class="h-75 w-75"
          />
        </div>
      </v-container>
    </v-card>
  </v-container>
</template>
