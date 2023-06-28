<script setup lang="ts"> 
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "@/services/api/axiosInstance";

interface SafaricomDataItem {
  count: number;
  highest: string;
  total: string;
  last: string;
  last_amount: string;
  transactiontype: string;
}

interface FulizaDataItem {
  count: number;
  highest: string;
  lowest: string;
  total: string;
  last: string;
  last_amount: string;
  status: string;
}

const route = useRoute();

const open = ref(true);

const mshwariData = ref<SafaricomDataItem[]>([]);
const kcbMpesaData = ref<SafaricomDataItem[]>([]);
const fulizaData = ref<FulizaDataItem[]>([]);

// API Call: Get Safaricom Mshwari Data
const loadMshariData = async () => {
  await axiosInstance
    .get(
      `/e_statement/mshwari_summary?/e_statement/mshwari_summary?idNumber=${route.params.slug}&pageSize=100&sortBy=id`
    )
    .then(response => (mshwariData.value = response.data.content))
    .catch(error => console.error(error));
};

// API Call: Get Safaricom Mshwari Data
const loadKcbMpesaData = async () => {
  await axiosInstance
    .get(
      `/e_statement/kcb_mpesa_summary?/e_statement/kcb_mpesa_summary?idNumber=${route.params.slug}&pageSize=100&sortBy=id`
    )
    .then(response => (kcbMpesaData.value = response.data.content))
    .catch(error => console.error(error));
};

// API Call: Get Safaricom Mshwari Data
const loadFulizaData = async () => {
  await axiosInstance
    .get(
      `/e_statement/fuliza_summary?/e_statement/fuliza_summary?idNumber=${route.params.slug}&pageSize=100&sortBy=id`
    )
    .then(response => (fulizaData.value = response.data.content))
    .catch(error => console.error(error));
};

onMounted(() => {
  loadMshariData();
  loadKcbMpesaData();
  loadFulizaData();
});
</script>

<template>
  <v-container fluid>
    <div
      @click="open = !open"
      class="px-6 py-2 rounded bg-blue-darken-2 d-flex justify-space-between hover-cursor-pointer"
    >
      <p>Safaricom</p>
      <v-icon
        icon="mdi:mdi-arrow-down-thin-circle-outline"
        :class="open ? 'fa-rotate-180' : ''"
      ></v-icon>
    </div>
    <v-row v-if="open">
      <v-col class="my-2">
        <v-card
          class="rounded text-caption"
          variant="flat"
          color="white"
        >
          <v-container fluid>
            <div class="mx-4">
              <h1 class="text-h6 font-weight-regular">Mshwari</h1>
              <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                Summary of Mshwari
              </h2>
            </div>
            <div class="mx-4 my-8">
              <v-row class="justify-space-between d-flex font-weight-bold">
                <v-col>Title</v-col>
                <v-col>{{ mshwariData[0]?.transactiontype }}</v-col>
                <v-col>{{ mshwariData[1]?.transactiontype }}</v-col>
                <v-col>{{ mshwariData[2]?.transactiontype }}</v-col>
                <v-col>{{ mshwariData[3]?.transactiontype }}</v-col>
              </v-row>
              <v-divider
                class="my-3"
                :thickness="3"
              />
              <v-row class="justify-space-between d-flex">
                <v-col class="font-weight-medium">Count</v-col>
                <v-col>{{ mshwariData[0]?.count }}</v-col>
                <v-col>{{ mshwariData[1]?.count }}</v-col>
                <v-col>{{ mshwariData[2]?.count }}</v-col>
                <v-col>{{ mshwariData[3]?.count }}</v-col>
              </v-row>
              <v-divider class="my-2" />
              <v-row class="justify-space-between d-flex">
                <v-col class="font-weight-medium">Highest</v-col>
                <v-col>{{ mshwariData[0]?.highest }}</v-col>
                <v-col>{{ mshwariData[1]?.highest }}</v-col>
                <v-col>{{ mshwariData[2]?.highest }}</v-col>
                <v-col>{{ mshwariData[3]?.highest }}</v-col>
              </v-row>
              <v-divider class="my-2" />
              <v-row class="justify-space-between d-flex">
                <v-col class="font-weight-medium">Lowest</v-col>
                <v-col>{{ mshwariData[0]?.last }}</v-col>
                <v-col>{{ mshwariData[1]?.last }}</v-col>
                <v-col>{{ mshwariData[2]?.last }}</v-col>
                <v-col>{{ mshwariData[3]?.last }}</v-col>
              </v-row>
              <v-divider class="my-2" />
              <v-row class="justify-space-between d-flex">
                <v-col class="font-weight-medium">Last</v-col>
                <v-col>{{ mshwariData[0]?.last_amount }}</v-col>
                <v-col>{{ mshwariData[1]?.last_amount }}</v-col>
                <v-col>{{ mshwariData[2]?.last_amount }}</v-col>
                <v-col>{{ mshwariData[3]?.last_amount }}</v-col>
              </v-row>
              <v-divider
                class="my-3"
                :thickness="3"
              />
              <v-row class="font-weight-bold justify-space-between d-flex">
                <v-col>Total</v-col>
                <v-col>{{ mshwariData[0]?.total }}</v-col>
                <v-col>{{ mshwariData[1]?.total }}</v-col>
                <v-col>{{ mshwariData[2]?.total }}</v-col>
                <v-col>{{ mshwariData[3]?.total }}</v-col>
              </v-row>
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
              <h1 class="text-h6 font-weight-regular">KCB Mpesa</h1>
              <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                Summary of KCB MPesa
              </h2>
            </div>
            <div class="mx-4 my-8">
              <v-row class="justify-space-between d-flex font-weight-bold">
                <v-col>Title</v-col>
                <v-col>{{ kcbMpesaData[0]?.transactiontype }}</v-col>
                <v-col>{{ kcbMpesaData[1]?.transactiontype }}</v-col>
                <v-col>{{ kcbMpesaData[2]?.transactiontype }}</v-col>
                <v-col>{{ kcbMpesaData[3]?.transactiontype }}</v-col>
              </v-row>
              <v-divider
                class="my-3"
                :thickness="3"
              />
              <v-row class="justify-space-between d-flex">
                <v-col class="font-weight-medium">Count</v-col>
                <v-col>{{ kcbMpesaData[0]?.count }}</v-col>
                <v-col>{{ kcbMpesaData[1]?.count }}</v-col>
                <v-col>{{ kcbMpesaData[2]?.count }}</v-col>
                <v-col>{{ kcbMpesaData[3]?.count }}</v-col>
              </v-row>
              <v-divider class="my-2" />
              <v-row class="justify-space-between d-flex">
                <v-col class="font-weight-medium">Highest</v-col>
                <v-col>{{ kcbMpesaData[0]?.highest }}</v-col>
                <v-col>{{ kcbMpesaData[1]?.highest }}</v-col>
                <v-col>{{ kcbMpesaData[2]?.highest }}</v-col>
                <v-col>{{ kcbMpesaData[3]?.highest }}</v-col>
              </v-row>
              <v-divider class="my-2" />
              <v-row class="justify-space-between d-flex">
                <v-col class="font-weight-medium">Last On</v-col>
                <v-col>{{ kcbMpesaData[0]?.last }}</v-col>
                <v-col>{{ kcbMpesaData[1]?.last }}</v-col>
                <v-col>{{ kcbMpesaData[2]?.last }}</v-col>
                <v-col>{{ kcbMpesaData[3]?.last }}</v-col>
              </v-row>
              <v-divider class="my-2" />
              <v-row class="justify-space-between d-flex">
                <v-col class="font-weight-medium">Last Amount</v-col>
                <v-col>{{ kcbMpesaData[0]?.last_amount }}</v-col>
                <v-col>{{ kcbMpesaData[1]?.last_amount }}</v-col>
                <v-col>{{ kcbMpesaData[2]?.last_amount }}</v-col>
                <v-col>{{ kcbMpesaData[3]?.last_amount }}</v-col>
              </v-row>
              <v-divider
                class="my-3"
                :thickness="3"
              />
              <v-row class="font-weight-bold justify-space-between d-flex">
                <v-col>Total</v-col>
                <v-col>{{ kcbMpesaData[0]?.total }}</v-col>
                <v-col>{{ kcbMpesaData[1]?.total }}</v-col>
                <v-col>{{ kcbMpesaData[2]?.total }}</v-col>
                <v-col>{{ kcbMpesaData[3]?.total }}</v-col>
              </v-row>
            </div>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="open">
      <v-col class="my-2">
        <v-card
          class="rounded text-caption"
          variant="flat"
          color="white"
        >
          <v-container fluid>
            <div class="mx-4">
              <h1 class="text-h6 font-weight-regular">Fuliza</h1>
              <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                Summary of Fuliza
              </h2>
            </div>
            <div class="mx-4 my-8">
              <v-row class="justify-space-between d-flex font-weight-bold">
                <v-col>Title</v-col>
                <v-col>{{ fulizaData[0]?.status }}</v-col>
                <v-col>{{ fulizaData[1]?.status }}</v-col>
              </v-row>
              <v-divider
                class="my-3"
                :thickness="3"
              />
              <v-row class="justify-space-between d-flex">
                <v-col class="font-weight-medium">Count</v-col>
                <v-col>{{ fulizaData[0]?.count }}</v-col>
                <v-col>{{ fulizaData[1]?.count }}</v-col>
              </v-row>
              <v-divider class="my-2" />
              <v-row class="justify-space-between d-flex">
                <v-col class="font-weight-medium">Highest</v-col>
                <v-col>{{ fulizaData[0]?.highest }}</v-col>
                <v-col>{{ fulizaData[1]?.highest }}</v-col>
              </v-row>
              <v-divider class="my-2" />
              <v-row class="justify-space-between d-flex">
                <v-col class="font-weight-medium">Lowest</v-col>
                <v-col>{{ fulizaData[0]?.lowest }}</v-col>
                <v-col>{{ fulizaData[1]?.lowest }}</v-col>
              </v-row>
              <v-divider class="my-2" />
              <v-row class="justify-space-between d-flex">
                <v-col class="font-weight-medium">Last Amount</v-col>
                <v-col>{{ fulizaData[0]?.last }}</v-col>
                <v-col>{{ fulizaData[1]?.last }}</v-col>
              </v-row>
              <v-divider
                class="my-3"
                :thickness="3"
              />
              <v-row class="font-weight-bold justify-space-between d-flex">
                <v-col>Total</v-col>
                <v-col>{{ fulizaData[0]?.total }}</v-col>
                <v-col>{{ fulizaData[1]?.total }}</v-col>
              </v-row>
            </div>
          </v-container>
        </v-card>
      </v-col>
      <v-col></v-col>
    </v-row>
  </v-container>
</template>
