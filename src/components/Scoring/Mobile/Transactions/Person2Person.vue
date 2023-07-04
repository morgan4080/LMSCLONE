<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

import axiosInstance from "@/services/api/axiosInstance";
import formatter from "@/helpers/currency";

interface Rerson2personDataItem {
  count: number;
  highest: string;
  lowest: string;
  total: string;
}

interface Person2personTopTransData {
  person2person_no: string;
  highest: string;
  count: string;
  total: string;
  name: string;
  phone: string;
  transactiontype: string;
}

const route = useRoute();

const open = ref(true);
const loading = ref(false);
const itemsPerPage = ref(5);
const totalItems = computed(() => person2personTopTransData.value.length);
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
  { title: "Phone No", key: "phone", align: "start", sortable: false },
  { title: "Name", key: "name", align: "start", sortable: false },
  { title: "Highest", key: "highest", align: "end", sortable: false },
  { title: "Total", key: "total", align: "end", sortable: false },
]);

const person2personTransReceivedData = ref<Rerson2personDataItem[]>([]);
const person2personTransSentData = ref<Rerson2personDataItem[]>([]);
const person2personTopTransData = ref<Person2personTopTransData[]>([]);

// API Call: Get Rerson2person Transactions Data
const loadRerson2personTransReceivedData = async () => {
  await axiosInstance
    .get(
      `/e_statement/top_customers_received?idNumber=${route.params.slug}&pageSize=${itemsPerPage.value}&sortBy=id`
    )
    .then(response => {
      person2personTransReceivedData.value = response.data.content;
    })
    .catch(error => console.error(error));
};

const loadRerson2personTransSentData = async () => {
  await axiosInstance
    .get(
      `/e_statement/top_customers_sent?idNumber=${route.params.slug}&pageSize=${itemsPerPage.value}&sortBy=id`
    )
    .then(
      response => (person2personTransSentData.value = response.data.content)
    )
    .catch(error => console.error(error));
};

// API Call: Get Top Person2person Trans Data
const loadPerson2personTopTransData = async () => {
  try {
    // Top Customers Received
    const customerReceived = await axiosInstance.get(
      `/e_statement/top_customers_received?idNumber=${route.params.slug}&pageSize=${itemsPerPage.value}&sortBy=id`
    );
    const received = customerReceived.data.content.map(
      (obj: Person2personTopTransData) => ({
        ...obj,
        transactiontype: "Received",
      })
    );

    // Top Customers Sent
    const customerSent = await axiosInstance.get(
      `/e_statement/top_customers_sent?idNumber=${route.params.slug}&pageSize=${itemsPerPage.value}&sortBy=id`
    );
    const sent = customerSent.data.content.map(
      (obj: Person2personTopTransData) => ({ ...obj, transactiontype: "Sent" })
    );

    person2personTopTransData.value = [received, ...sent].flat();
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  loadRerson2personTransReceivedData();
  loadRerson2personTransSentData();
});
</script>

<template>
  <v-container fluid>
    <div
      @click="open = !open"
      class="px-6 py-2 rounded bg-blue-darken-2 hover-cursor-pointer d-flex justify-space-between"
    >
      <p>Person To Person</p>
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
                  Person To Person Transactions
                </h1>
                <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                  Summary of Person To Person Transactions
                </h2>
              </div>
              <div class="mx-4 my-8">
                <v-row class="justify-space-between d-flex font-weight-bold">
                  <v-col>Title</v-col>
                  <v-col>Received</v-col>
                  <v-col>Sent</v-col>
                </v-row>
                <v-divider
                  class="my-3"
                  :thickness="3"
                />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Count</v-col>
                  <v-col>{{ person2personTransReceivedData[0]?.count }}</v-col>
                  <v-col>{{ person2personTransSentData[0]?.count }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Highest</v-col>
                  <v-col>{{
                    formatter(person2personTransReceivedData[0]?.highest)
                  }}</v-col>
                  <v-col>{{
                    formatter(person2personTransSentData[0]?.highest)
                  }}</v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row class="justify-space-between d-flex">
                  <v-col class="font-weight-medium">Lowest</v-col>
                  <v-col>{{
                    formatter(person2personTransReceivedData[0]?.lowest)
                  }}</v-col>
                  <v-col>{{
                    formatter(person2personTransSentData[0]?.lowest)
                  }}</v-col>
                </v-row>
                <v-divider
                  class="my-3"
                  :thickness="3"
                />
                <v-row class="font-weight-bold justify-space-between d-flex">
                  <v-col>Total</v-col>
                  <v-col>{{
                    formatter(person2personTransReceivedData[0]?.total)
                  }}</v-col>
                  <v-col>{{
                    formatter(person2personTransSentData[0]?.total)
                  }}</v-col>
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
                Top Person To Person Transactions
              </h1>
              <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                Summary of Person To Person Transactions
              </h2>
            </div>
            <v-data-table-server
              class="px-4 text-caption"
              v-model:items-per-page="itemsPerPage"
              :headers="headers"
              :items-length="totalItems"
              :items="person2personTopTransData"
              :loading="loading"
              loading-text="Loading...Please Wait"
              item-value="name"
              @update:options="loadPerson2personTopTransData()"
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
