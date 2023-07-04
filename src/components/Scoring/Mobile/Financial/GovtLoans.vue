<script setup lang="ts">
import { ref, onMounted } from "vue";
// import axiosInstance from "@/services/api/axiosInstance";

const hustler = {
  count: {
    received: 0,
    paid: 0,
  },
  highest: {
    received: 0,
    paid: 0,
  },
  lowest: {
    received: 0,
    paid: 0,
  },
  last: {
    received: 0,
    paid: 0,
  },
  total: {
    received: 0,
    paid: 0,
  },
};
const open = ref(true);

// const hustlerData = ref([])

// API Call: Get Govt Loans Data
const loadHustlerData = async () => {
  // await axiosInstance
  //   .get("/e_statement/")
  //   .then(response => (hustlerData.value = response.data))
  //   .catch(error => console.error(error));
};

onMounted(() => {
  loadHustlerData();
});
</script>

<template>
  <v-container fluid>
    <div
      @click="open = !open"
      class="bg-blue-darken-2 px-6 py-2 rounded d-flex justify-space-between hover-cursor-pointer"
    >
      <p>Government Digital Loans</p>
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
              <h1 class="text-h6 font-weight-regular">Hustler Fund</h1>
              <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                Summary of Hustler Fund
              </h2>
            </div>
            <div class="my-8 mx-4">
              <v-row class="justify-space-between d-flex font-weight-bold">
                <v-col>Title</v-col>
                <v-col>Disbursed</v-col>
                <v-col>Paid</v-col>
              </v-row>
              <v-divider
                class="my-3"
                :thickness="3"
              />
              <v-row class="justify-space-between d-flex">
                <v-col class="font-weight-medium">Count</v-col>
                <v-col>{{ hustler.count.received }}</v-col>
                <v-col>{{ hustler.count.paid }}</v-col>
              </v-row>
              <v-divider class="my-2" />
              <v-row class="justify-space-between d-flex">
                <v-col class="font-weight-medium">Highest</v-col>
                <v-col>{{ hustler.highest.received }}</v-col>
                <v-col>{{ hustler.highest.paid }}</v-col>
              </v-row>
              <v-divider class="my-2" />
              <v-row class="justify-space-between d-flex">
                <v-col class="font-weight-medium">Lowest</v-col>
                <v-col>{{ hustler.lowest.received }}</v-col>
                <v-col>{{ hustler.lowest.paid }}</v-col>
              </v-row>
              <v-divider class="my-2" />
              <v-row class="justify-space-between d-flex">
                <v-col class="font-weight-medium">Last</v-col>
                <v-col>{{ hustler.last.received }}</v-col>
                <v-col>{{ hustler.last.paid }}</v-col>
              </v-row>
              <v-divider
                class="my-3"
                :thickness="3"
              />
              <v-row class="font-weight-bold justify-space-between d-flex">
                <v-col>Total</v-col>
                <v-col>{{ hustler.total.received }}</v-col>
                <v-col>{{ hustler.total.paid }}</v-col>
              </v-row>
            </div>
          </v-container>
        </v-card>
      </v-col>
      <v-col></v-col>
    </v-row>
  </v-container>
</template>
