<script setup lang="ts">
import { ref } from "vue";

const fuliza = {
  count: {
    received: 182,
    paid: 76,
  },
  highest: {
    received: 182,
    paid: 76,
  },
  lowest: {
    received: 182,
    paid: 76,
  },
  last: {
    received: 182,
    paid: 76,
  },
  total: {
    received: 182,
    paid: 76,
  },
};
const open = ref(true);
</script>

<template>
  <v-container fluid>
    <div
      @click="open = !open"
      class="bg-blue-darken-2 px-6 py-2 rounded d-flex justify-space-between hover-cursor-pointer"
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
              <h1 class="text-h6 font-weight-regular">Fuliza</h1>
              <h2 class="text-caption text-grey-darken-2 font-weight-regular">
                Summary of Fuliza
              </h2>
            </div>
            <div class="my-8 mx-4">
              <v-row class="justify-space-between d-flex font-weight-bold">
                <v-col>Title</v-col>
                <v-col>Received</v-col>
                <v-col>Paid</v-col>
              </v-row>
              <v-divider
                class="my-3"
                :thickness="3"
              />
              <v-row class="justify-space-between d-flex">
                <v-col class="font-weight-medium">Count</v-col>
                <v-col>{{ fuliza.count.received }}</v-col>
                <v-col>{{ fuliza.count.paid }}</v-col>
              </v-row>
              <v-divider class="my-2" />
              <v-row class="justify-space-between d-flex">
                <v-col class="font-weight-medium">Highest</v-col>
                <v-col>{{ fuliza.highest.received }}</v-col>
                <v-col>{{ fuliza.highest.paid }}</v-col>
              </v-row>
              <v-divider class="my-2" />
              <v-row class="justify-space-between d-flex">
                <v-col class="font-weight-medium">Lowest</v-col>
                <v-col>{{ fuliza.lowest.received }}</v-col>
                <v-col>{{ fuliza.lowest.paid }}</v-col>
              </v-row>
              <v-divider class="my-2" />
              <v-row class="justify-space-between d-flex">
                <v-col class="font-weight-medium">Last</v-col>
                <v-col>{{ fuliza.last.received }}</v-col>
                <v-col>{{ fuliza.last.paid }}</v-col>
              </v-row>
              <v-divider
                class="my-3"
                :thickness="3"
              />
              <v-row class="font-weight-bold justify-space-between d-flex">
                <v-col>Total</v-col>
                <v-col>{{ fuliza.total.received }}</v-col>
                <v-col>{{ fuliza.total.paid }}</v-col>
              </v-row>
            </div>
          </v-container>
        </v-card>
      </v-col>
      <v-col></v-col>
    </v-row>
  </v-container>
</template>
