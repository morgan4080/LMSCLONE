<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "@/services/api/axiosbank";
import formatter from "@/helpers/currency";

interface FlowDataItem {
  count: number;
  highest: string;
  total: string;
  last_draw: string;
}

interface FlowTopData {
  last_draw: string;
  sourcename: string;
  description: string;
  last_amount: string;
  total: string;
  count: number;
}

type optionTypes =
  | "BankTransfers"
  | "CashDeposit"
  | "MobileMoney"
  | "Reversals"
  | "ChequeDeposit"
  | "AgentDeposit"
  | "CardPayment"
  | "All"
  | "ATMDeposit";

const route = useRoute();

const open = ref(true);
const loading = ref(false);
const itemsPerPage = ref(5);
const totalItems = computed(() => flowTopData.value.length);

const options: optionTypes[] = [
  "All",
  "BankTransfers",
  "CashDeposit",
  "MobileMoney",
  "Reversals",
  "ChequeDeposit",
  "AgentDeposit",
  "CardPayment",
  "ATMDeposit",
];

const currentInflowType = ref<optionTypes>(options[0]);

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
    key: "sourcename",
    align: "start",
    sortable: false,
  },
  { title: "Description", key: "description", align: "start", sortable: false },
  { title: "Total", key: "total", align: "end", sortable: false },
  { title: "Last Amount", key: "last_amount", align: "end", sortable: false },
  { title: "Last On", key: "last_draw", align: "end", sortable: false },
]);

const flowMobileMoney = ref<FlowDataItem[]>([]);
const flowCashDeposit = ref<FlowDataItem[]>([]);
const flowBankTransfers = ref<FlowDataItem[]>([]);
const flowReversals = ref<FlowDataItem[]>([]);
const flowChequeDeposit = ref<FlowDataItem[]>([]);
const flowAgentDeposit = ref<FlowDataItem[]>([]);
const flowCardPayment = ref<FlowDataItem[]>([]);
const flowATMDeposit = ref<FlowDataItem[]>([]);
const flowTopData = ref<FlowTopData[]>([]);

// API Call: Get Flow Cash Deposit
const loadFlow = async (sourceName: optionTypes) => {
  await axiosInstance
    .get(
      `/bank_analysis/bank_sources_summary?refId=${route.params.slug}&sourceName=${sourceName}&pageSize=100&sortBy=id`
    )
    .then(response => {
      switch (sourceName) {
        case "BankTransfers":
          flowBankTransfers.value = response.data.content;
          break;

        case "CashDeposit":
          flowCashDeposit.value = response.data.content;
          break;

        case "MobileMoney":
          flowMobileMoney.value = response.data.content;
          break;

        case "Reversals":
          flowReversals.value = response.data.content;
          break;

        case "ChequeDeposit":
          flowChequeDeposit.value = response.data.content;
          break;

        case "AgentDeposit":
          flowAgentDeposit.value = response.data.content;
          break;

        case "CardPayment":
          flowCardPayment.value = response.data.content;
          break;

        case "ATMDeposit":
          flowATMDeposit.value = response.data.content;
          break;
      }
    })
    .catch(error => console.error(error));
};

// API Call: Get Top Flow Data
const loadFlowTopData = async () => {
  await axiosInstance
    .get(
      currentInflowType.value == "All"
        ? `/bank_analysis/top_bank_sources_transactions?refId=${route.params.slug}&pageSize=${itemsPerPage.value}&sortBy=id`
        : `/bank_analysis/top_bank_sources_transactions?refId=${route.params.slug}&pageSize=${itemsPerPage.value}&sortBy=id&sourceName=${currentInflowType.value}`
    )
    .then(response => (flowTopData.value = response.data.content))
    .catch(error => console.error(error));
};

onMounted(async () => {
  await Promise.all([
    loadFlow("BankTransfers"),
    loadFlow("MobileMoney"),
    loadFlow("Reversals"),
    loadFlow("CashDeposit"),
    loadFlow("ChequeDeposit"),
    loadFlow("AgentDeposit"),
    loadFlow("CardPayment"),
    loadFlow("ATMDeposit"),
    loadFlowTopData(),
  ]);
});
</script>

<template>
  <v-container fluid>
    <div
      @click="open = !open"
      class="px-6 py-2 rounded bg-blue-darken-2 hover-cursor-pointer d-flex justify-space-between"
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
                <h1 class="text-h6 font-weight-regular">
                  Mobile Money & Bank Transfers
                </h1>
                <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                  Summary Of Mobile Money & Bank Transfers
                </h2>
              </div>
              <div class="mx-4 my-8">
                <v-row class="justify-space-between d-flex font-weight-bold">
                  <v-col>Title</v-col>
                  <v-col class="text-right">Mobile Money</v-col>
                  <v-col class="text-right">Bank Transfer</v-col>
                </v-row>
                <v-divider
                  class="my-3"
                  :thickness="3"
                />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Count</v-col>
                  <v-col class="text-right">{{
                    flowMobileMoney[0]?.count
                  }}</v-col>
                  <v-col class="text-right">{{
                    flowBankTransfers[0]?.count
                  }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Total</v-col>
                  <v-col class="text-right">{{
                    formatter(flowMobileMoney[0]?.total)
                  }}</v-col>
                  <v-col class="text-right">{{
                    flowBankTransfers[0]?.total
                  }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Highest</v-col>
                  <v-col class="text-right">{{
                    formatter(flowMobileMoney[0]?.highest)
                  }}</v-col>
                  <v-col class="text-right">{{
                    flowBankTransfers[0]?.highest
                  }}</v-col>
                </v-row>
                <v-divider
                  :thickness="3"
                  class="my-2"
                />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Last On</v-col>
                  <v-col class="text-right">{{
                    flowMobileMoney[0]?.last_draw
                  }}</v-col>
                  <v-col class="text-right">{{
                    flowBankTransfers[0]?.last_draw
                  }}</v-col>
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
                <h1 class="text-h6 font-weight-regular">
                  Cash Deposit & Cheque Deposit
                </h1>
                <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                  Summary Of Cash Deposit & Cheque Deposit
                </h2>
              </div>
              <div class="mx-4 my-8">
                <v-row class="justify-space-between d-flex font-weight-bold">
                  <v-col>Title</v-col>
                  <v-col class="text-right">Cash Deposit</v-col>
                  <v-col class="text-right">Cheque Deposit</v-col>
                </v-row>
                <v-divider
                  class="my-3"
                  :thickness="3"
                />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Count</v-col>
                  <v-col class="text-right">{{
                    flowCashDeposit[0]?.count
                  }}</v-col>
                  <v-col class="text-right">
                    {{ flowChequeDeposit[0]?.count }}
                  </v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Total</v-col>
                  <v-col class="text-right">{{
                    formatter(flowCashDeposit[0]?.total)
                  }}</v-col>
                  <v-col class="text-right">
                    {{ flowChequeDeposit[0]?.total }}
                  </v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Highest</v-col>
                  <v-col class="text-right">{{
                    formatter(flowCashDeposit[0]?.highest)
                  }}</v-col>
                  <v-col class="text-right">
                    {{ flowChequeDeposit[0]?.highest }}
                  </v-col>
                </v-row>
                <v-divider
                  :thickness="3"
                  class="my-2"
                />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Last On</v-col>
                  <v-col class="text-right">{{
                    flowCashDeposit[0]?.last_draw
                  }}</v-col>
                  <v-col class="text-right">
                    {{ flowChequeDeposit[0]?.last_draw }}
                  </v-col>
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
                <h1 class="text-h6 font-weight-regular">
                  Agent Deposit & Reversals
                </h1>
                <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                  Summary Of Agent Deposit & Reversals
                </h2>
              </div>
              <div class="mx-4 my-8">
                <v-row class="justify-space-between d-flex font-weight-bold">
                  <v-col>Title</v-col>
                  <v-col class="text-right">Agent Deposit</v-col>
                  <v-col class="text-right">Reversal</v-col>
                </v-row>
                <v-divider
                  class="my-3"
                  :thickness="3"
                />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Count</v-col>
                  <v-col class="text-right">{{
                    flowAgentDeposit[0]?.count
                  }}</v-col>
                  <v-col class="text-right">{{
                    flowReversals[0]?.count
                  }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Total</v-col>
                  <v-col class="text-right">{{
                    formatter(flowAgentDeposit[0]?.total)
                  }}</v-col>
                  <v-col class="text-right">{{
                    flowReversals[0]?.total
                  }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Highest</v-col>
                  <v-col class="text-right">{{
                    formatter(flowAgentDeposit[0]?.highest)
                  }}</v-col>
                  <v-col class="text-right">{{
                    flowReversals[0]?.highest
                  }}</v-col>
                </v-row>
                <v-divider
                  :thickness="3"
                  class="my-2"
                />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Last On</v-col>
                  <v-col class="text-right">{{
                    flowAgentDeposit[0]?.last_draw
                  }}</v-col>
                  <v-col class="text-right">{{
                    flowReversals[0]?.last_draw
                  }}</v-col>
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
                <h1 class="text-h6 font-weight-regular">
                  Card Payment & ATM Deposit
                </h1>
                <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                  Summary Of Card Payment & ATM Deposit
                </h2>
              </div>
              <div class="mx-4 my-8">
                <v-row class="justify-space-between d-flex font-weight-bold">
                  <v-col>Title</v-col>
                  <v-col class="text-right">Card Payment</v-col>
                  <v-col class="text-right">ATM Deposit</v-col>
                </v-row>
                <v-divider
                  class="my-3"
                  :thickness="3"
                />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Count</v-col>
                  <v-col class="text-right">{{
                    flowCardPayment[0]?.count
                  }}</v-col>
                  <v-col class="text-right">
                    {{ flowATMDeposit[0]?.count }}
                  </v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Total</v-col>
                  <v-col class="text-right">{{
                    formatter(flowCardPayment[0]?.total)
                  }}</v-col>
                  <v-col class="text-right">
                    {{ flowATMDeposit[0]?.total }}
                  </v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Highest</v-col>
                  <v-col class="text-right">{{
                    formatter(flowCardPayment[0]?.highest)
                  }}</v-col>
                  <v-col class="text-right">
                    {{ flowATMDeposit[0]?.highest }}
                  </v-col>
                </v-row>
                <v-divider
                  :thickness="3"
                  class="my-2"
                />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Last On</v-col>
                  <v-col class="text-right">{{
                    flowCardPayment[0]?.last_draw
                  }}</v-col>
                  <v-col class="text-right">
                    {{ flowATMDeposit[0]?.last_draw }}
                  </v-col>
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
                Top Sources / Inflow Transactions
              </h1>
              <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                Summary of Top Sources / Inflow Transactions
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
                          @click="currentInflowType = item"
                          >{{ item }}</v-list-item
                        >
                      </v-list>
                    </v-sheet>
                  </v-menu>
                  <!--                  <v-menu transition="slide-y-transition">
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
                  </v-menu>-->
                </div>
                <div>
                  <!--                  <v-menu transition="slide-y-transition">-->
                  <!--                    <template v-slot:activator="{ props }">-->
                  <!--                      <v-btn-->
                  <!--                        size="small"-->
                  <!--                        variant="outlined"-->
                  <!--                        append-icon="mdi:mdi-chevron-down"-->
                  <!--                        v-bind="props"-->
                  <!--                        class="ml-2 text-none text-caption font-weight-regular"-->
                  <!--                        style="border: 1px solid rgba(128, 128, 128, 0.25)"-->
                  <!--                      >-->
                  <!--                        Export-->
                  <!--                      </v-btn>-->
                  <!--                    </template>-->
                  <!--                    <v-sheet-->
                  <!--                      border-->
                  <!--                      rounded-->
                  <!--                    >-->
                  <!--                      <v-list-->
                  <!--                        nav-->
                  <!--                        density="compact"-->
                  <!--                        role="listbox"-->
                  <!--                      >-->
                  <!--                        <v-list-item-->
                  <!--                          v-for="(item, idx) in options"-->
                  <!--                          :key="idx"-->
                  <!--                          :value="item"-->
                  <!--                          >{{ item }}</v-list-item-->
                  <!--                        >-->
                  <!--                      </v-list>-->
                  <!--                    </v-sheet>-->
                  <!--                  </v-menu>-->
                  <!--                  <v-menu transition="slide-y-transition">-->
                  <!--                    <template v-slot:activator="{ props }">-->
                  <!--                      <v-btn-->
                  <!--                        size="small"-->
                  <!--                        variant="outlined"-->
                  <!--                        append-icon="mdi:mdi-chevron-down"-->
                  <!--                        v-bind="props"-->
                  <!--                        class="ml-2 text-none text-caption font-weight-regular"-->
                  <!--                        style="border: 1px solid rgba(128, 128, 128, 0.25)"-->
                  <!--                      >-->
                  <!--                        Show/Hide-->
                  <!--                      </v-btn>-->
                  <!--                    </template>-->
                  <!--                    <v-sheet-->
                  <!--                      border-->
                  <!--                      rounded-->
                  <!--                    >-->
                  <!--                      <v-list-->
                  <!--                        nav-->
                  <!--                        density="compact"-->
                  <!--                        role="listbox"-->
                  <!--                      >-->
                  <!--                        <v-list-item-->
                  <!--                          v-for="(item, idx) in options"-->
                  <!--                          :key="idx"-->
                  <!--                          :value="item"-->
                  <!--                          >{{ item }}</v-list-item-->
                  <!--                        >-->
                  <!--                      </v-list>-->
                  <!--                    </v-sheet>-->
                  <!--                  </v-menu>-->
                  <!--                  <v-menu transition="slide-y-transition">-->
                  <!--                    <template v-slot:activator="{ props }">-->
                  <!--                      <v-btn-->
                  <!--                        size="small"-->
                  <!--                        variant="outlined"-->
                  <!--                        v-bind="props"-->
                  <!--                        class="ml-2 text-none text-caption font-weight-regular"-->
                  <!--                        style="border: 1px solid rgba(128, 128, 128, 0.25)"-->
                  <!--                      >-->
                  <!--                        <v-icon icon="mdi:mdi-dots-vertical" />-->
                  <!--                      </v-btn>-->
                  <!--                    </template>-->
                  <!--                    <v-sheet-->
                  <!--                      border-->
                  <!--                      rounded-->
                  <!--                    >-->
                  <!--                      <v-list-->
                  <!--                        nav-->
                  <!--                        density="compact"-->
                  <!--                        role="listbox"-->
                  <!--                      >-->
                  <!--                        <v-list-item-->
                  <!--                          v-for="(item, idx) in options"-->
                  <!--                          :key="idx"-->
                  <!--                          :value="item"-->
                  <!--                          >{{ item }}</v-list-item-->
                  <!--                        >-->
                  <!--                      </v-list>-->
                  <!--                    </v-sheet>-->
                  <!--                  </v-menu>-->
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
              <template v-slot:[`item.highest`]="{ item }"
                ><span>{{ formatter(item.columns.highest) }}</span></template
              >
              <template v-slot:[`item.last`]="{ item }"
                ><span>{{ formatter(item.columns.last) }}</span></template
              >
            </v-data-table-server>
          </v-card>
        </v-container>
      </v-row>
    </div>
  </v-container>
</template>
