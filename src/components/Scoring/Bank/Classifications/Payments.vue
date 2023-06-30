<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "@/services/api/axiosInstance";
import formatter from "@/helpers/currency";

interface FlowDataItem {
  count: number;
  highest: string;
  total: string;
  last_draw: string;
}

interface FlowTopData {
  last_draw: string; 
  paymentname: string; 
  description: string; 
  last_amount: string; 
  total: string; 
  count: number; 
}

const route = useRoute();

const open = ref(true);
const loading = ref(false);
const itemsPerPage = ref(5);
const totalItems = computed(()=>flowTopData.value.length);
const options = ["Option 1", "Option 2", "Option 3"];

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
    title: "Outflow Type",
    key: "paymentname",
    align: "start",
    sortable: false,
  },
  { title: "Description", key: "description", align: "start", sortable: false },
  { title: "Total", key: "total", align: "end", sortable: false },
  { title: "Last Amount", key: "last_amount", align: "end", sortable: false },
  { title: "Last On", key: "last_draw", align: "end", sortable: false },
]);

const flowMobileMoney = ref<FlowDataItem[]>([]);
const flowCashWithdrawal = ref<FlowDataItem[]>([]);
const flowReversals = ref<FlowDataItem[]>([]);
const flowOthers = ref<FlowDataItem[]>([]);
const flowTopData = ref<FlowTopData[]>([])

const baseUrl: string = "https://staging-lending.presta.co.ke/bank_scoring/api/v1"

// API Call: Get Flow Mobile Money
const loadFlowMobileMoney = async () => {
  await axiosInstance
    .get(`${baseUrl}/bank_analysis/bank_payments_summary?idNumber=${route.params.slug}&paymentName=MobileMoney&pageSize=100&sortBy=id`)
    .then(response => (flowMobileMoney.value = response.data.content))
    .catch(error => console.error(error));
};

// API Call: Get Flow Cash Withdrawal
const loadFlowCashWithdrawal = async () => {
  await axiosInstance
    .get(`${baseUrl}/bank_analysis/bank_payments_summary?idNumber=${route.params.slug}&paymentName=CashWithdrawal&pageSize=100&sortBy=id`)
    .then(response => (flowCashWithdrawal.value = response.data.content))
    .catch(error => console.error(error));
};

// API Call: Get Flow Reversals
const loadFlowReversals = async () => {
  await axiosInstance
    .get(`${baseUrl}/bank_analysis/bank_payments_summary?idNumber=${route.params.slug}&paymentName=Reversals&pageSize=100&sortBy=id`)
    .then(response => (flowReversals.value = response.data.content))
    .catch(error => console.error(error));
};

// API Call: Get Flow Others
const loadFlowOthers = async () => {
  await axiosInstance
    .get(`${baseUrl}/bank_analysis/bank_payments_summary?idNumber=${route.params.slug}&paymentName=Others&pageSize=100&sortBy=id`)
    .then(response => (flowOthers.value = response.data.content))
    .catch(error => console.error(error));
};

// API Call: Get Top Flow Data
const loadFlowTopData = async () => {
  await axiosInstance
    .get(`${baseUrl}/bank_analysis/top_bank_payment_transactions?idNumber=${route.params.slug}&pageSize=${itemsPerPage.value}&sortBy=id`)
    .then(response => (flowTopData.value = response.data.content))
    .catch(error => console.error(error));
};

onMounted(() => {
  loadFlowMobileMoney();
  loadFlowCashWithdrawal()
  loadFlowReversals()
  loadFlowOthers()
});
</script>

<template>
  <v-container fluid>
    <div
      @click="open = !open"
      class="px-6 py-2 rounded bg-blue-darken-2 hover-cursor-pointer d-flex justify-space-between"
    >
      <p>Payments / Outflows</p>
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
              <div class="mx-4 my-8">
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
                  <v-col class="text-right">{{ flowMobileMoney[0]?.count }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Total</v-col>
                  <v-col class="text-right">{{ formatter(flowMobileMoney[0]?.total) }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Highest</v-col>
                  <v-col class="text-right">{{ formatter(flowMobileMoney[0]?.highest) }}</v-col>
                </v-row>
                <v-divider
                  :thickness="3"
                  class="my-2"
                />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Last On</v-col>
                  <v-col class="text-right">{{ flowMobileMoney[0]?.last_draw }}</v-col>
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
                <h1 class="text-h6 font-weight-regular">Cash Withdrawal</h1>
                <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                  Summary of Cash Withdrawal
                </h2>
              </div>
              <div class="mx-4 my-8">
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
                  <v-col class="text-right">{{ flowCashWithdrawal[0]?.count }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Total</v-col>
                  <v-col class="text-right">{{ formatter(flowCashWithdrawal[0]?.total) }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Highest</v-col>
                  <v-col class="text-right">{{ formatter(flowCashWithdrawal[0]?.highest) }}</v-col>
                </v-row>
                <v-divider
                  :thickness="3"
                  class="my-2"
                />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Last On</v-col>
                  <v-col class="text-right">{{ flowCashWithdrawal[0]?.last_draw }}</v-col>
                </v-row>
                <v-divider class="my-3" />
              </div>
            </v-container>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="my-2">
          <v-card
            class="rounded text-caption"
            variant="flat"
            color="white"
          >
            <v-container fluid>
              <div class="mx-4">
                <h1 class="text-h6 font-weight-regular">Reversals</h1>
                <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                  Summary of Reversals
                </h2>
              </div>
              <div class="mx-4 my-8">
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
                  <v-col class="text-right">{{ flowReversals[0]?.count }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Total</v-col>
                  <v-col class="text-right">{{ formatter(flowReversals[0]?.total) }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Highest</v-col>
                  <v-col class="text-right">{{ formatter(flowReversals[0]?.highest) }}</v-col>
                </v-row>
                <v-divider
                  :thickness="3"
                  class="my-2"
                />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Last On</v-col>
                  <v-col class="text-right">{{ flowReversals[0]?.last_draw }}</v-col>
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
                <h1 class="text-h6 font-weight-regular">Others</h1>
                <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                  Summary of Others
                </h2>
              </div>
              <div class="mx-4 my-8">
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
                  <v-col class="text-right">{{ flowOthers[0]?.count }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Total</v-col>
                  <v-col class="text-right">{{ formatter(flowOthers[0]?.total) }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Highest</v-col>
                  <v-col class="text-right">{{ formatter(flowOthers[0]?.highest) }}</v-col>
                </v-row>
                <v-divider
                  :thickness="3"
                  class="my-2"
                />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Last On</v-col>
                  <v-col class="text-right">{{ flowOthers[0]?.last_draw }}</v-col>
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
            class="py-4 rounded"
            color="white"
          >
            <div class="px-8">
              <h1 class="text-h6 font-weight-regular">
                Top Payments / Outflows Transactions
              </h1>
              <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                Summary of Top Payments / Outflows Transactions
              </h2>
            </div>

            <v-container fluid>
              <div class="my-2 d-flex justify-space-between">
                <div>
                  <v-menu transition="slide-y-transition">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        size="small"
                        variant="outlined"
                        append-icon="mdi:mdi-chevron-down"
                        v-bind="props"
                        class="ml-2 text-none text-caption font-weight-regular"
                        style="border: 1px solid rgba(128, 128, 128, 0.25)"
                      >
                        Select Outflow Type
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
                        class="ml-2 text-none text-caption font-weight-regular"
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
                        class="ml-2 text-none text-caption font-weight-regular"
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
                        class="ml-2 text-none text-caption font-weight-regular"
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
                        class="ml-2 text-none text-caption font-weight-regular"
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
              class="px-4 text-caption"
              v-model:items-per-page="itemsPerPage"
              :headers="headers"
              :items-length="totalItems"
              :items="flowTopData"
              :loading="loading"
              loading-text="Loading...Please Wait"
              item-value="name"
              @update:options="loadFlowTopData()"
            >
            <template v-slot:[`item.highest`]="{ item }"><span>{{ formatter(item.columns.highest) }}</span></template>
            <template v-slot:[`item.last`]="{ item }"><span>{{ formatter(item.columns.last) }}</span></template>
            </v-data-table-server>
          </v-card>
        </v-container>
      </v-row>
    </div>
  </v-container>
</template>
