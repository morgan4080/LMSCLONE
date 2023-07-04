<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "@/services/api/axiosInstance";
import formatter from "@/helpers/currency";

interface AgentDataItem {
  count: number;
  highest: string;
  lowest: string;
  total: string;
  last_draw: string;
  transactiontype: string;
}

interface AgentTopTransData {
  agent_no: string;
  highest: string;
  count: string;
  total: string;
  name: string;
  transactiontype: string;
}

const route = useRoute();

const open = ref(true);
const loading = ref(false);
const itemsPerPage = ref(5);
const totalItems = computed(() => agentTopTransData.value.length);
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
    title: "Transaction Type",
    key: "transactiontype",
    align: "start",
    sortable: false,
  },
  { title: "Agent No", key: "agent_no", align: "start", sortable: false },
  { title: "Description", key: "name", align: "start", sortable: false },
  { title: "Highest", key: "highest", align: "end", sortable: false },
  { title: "Total", key: "total", align: "end", sortable: false },
]);

const agentTransData = ref<AgentDataItem[]>([]);
const agentTopTransData = ref<AgentTopTransData[]>([]);

// API Call: Get Agent Transactions Data
const loadAgentTransData = async () => {
  await axiosInstance
    .get(
      `/e_statement/agent_transaction_summary?idNumber=${route.params.slug}&pageSize=100&sortBy=id`
    )
    .then(response => (agentTransData.value = response.data.content))
    .catch(error => console.error(error));
};

// API Call: Get Top Agent Trans Data
const loadAgentTopTransData = async () => {
  await axiosInstance
    .get(
      `/e_statement/top_agent_transactions?idNumber=${route.params.slug}&pageSize=${itemsPerPage.value}&sortBy=id`
    )
    .then(response => (agentTopTransData.value = response.data.content))
    .catch(error => console.error(error));
};

onMounted(() => {
  loadAgentTransData();
});
</script>

<template>
  <v-container fluid>
    <div
      @click="open = !open"
      class="px-6 py-2 rounded bg-blue-darken-2 hover-cursor-pointer d-flex justify-space-between"
    >
      <p>Agent</p>
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
                <h1 class="text-h6 font-weight-regular">Agent Transactions</h1>
                <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                  Summary of Agent Transactions
                </h2>
              </div>
              <div class="mx-4 my-8">
                <v-row class="justify-space-between d-flex font-weight-bold">
                  <v-col>Title</v-col>
                  <v-col>{{ agentTransData[0]?.transactiontype }}</v-col>
                  <v-col>{{ agentTransData[1]?.transactiontype }}</v-col>
                </v-row>
                <v-divider
                  class="my-3"
                  :thickness="3"
                />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Count</v-col>
                  <v-col>{{ agentTransData[0]?.count }}</v-col>
                  <v-col>{{ agentTransData[1]?.count }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Highest</v-col>
                  <v-col>{{ formatter(agentTransData[0]?.highest) }}</v-col>
                  <v-col>{{ formatter(agentTransData[1]?.highest) }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Lowest</v-col>
                  <v-col>{{ formatter(agentTransData[0]?.lowest) }}</v-col>
                  <v-col>{{ formatter(agentTransData[1]?.lowest) }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Last</v-col>
                  <v-col>{{ agentTransData[0]?.last_draw }}</v-col>
                  <v-col>{{ agentTransData[1]?.last_draw }}</v-col>
                </v-row>
                <v-divider
                  class="my-3"
                  :thickness="3"
                />
                <v-row class="font-weight-bold justify-space-between d-flex">
                  <v-col>Total</v-col>
                  <v-col>{{ formatter(agentTransData[0]?.total) }}</v-col>
                  <v-col>{{ formatter(agentTransData[1]?.total) }}</v-col>
                </v-row>
              </div>
            </v-container>
          </v-card>
        </v-col>
        <v-col></v-col>
      </v-row>
      <!--      Table-->
      <v-row>
        <v-container fluid>
          <v-card
            variant="flat"
            class="py-4 rounded"
            color="white"
          >
            <div class="px-8">
              <h1 class="text-h6 font-weight-regular">
                Top Agent Transactions
              </h1>
              <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                Summary of Agent Transactions
              </h2>
            </div>
            <v-data-table-server
              class="px-4 text-caption"
              v-model:items-per-page="itemsPerPage"
              :headers="headers"
              :items-length="totalItems"
              :items="agentTopTransData"
              :loading="loading"
              loading-text="Loading...Please Wait"
              item-value="name"
              @update:options="loadAgentTopTransData()"
            >
              <template v-slot:[`item.highest`]="{ item }"
                ><span>{{ formatter(item.columns.highest) }}</span></template
              >
              <template v-slot:[`item.total`]="{ item }"
                ><span>{{ formatter(item.columns.total) }}</span></template
              >
            </v-data-table-server>
          </v-card>
        </v-container>
      </v-row>
    </div>
  </v-container>
</template>

<style>
.hover-cursor-pointer :hover {
  cursor: pointer;
}
</style>
