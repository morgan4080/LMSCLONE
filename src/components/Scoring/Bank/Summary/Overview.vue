<script setup lang="ts">
const data = {
  totalInflow: "738,530.00",
  totalOutflow: "720,686.00",
  monthlyDisposable: "736,892.00",
};
</script>

<template>
  <v-container fluid>
    <h1 class="text-h6 font-weight-regular text-grey-darken-2">Overview</h1>

    <v-row>
      <v-col>
        <v-card
          border
          color="white"
          variant="flat"
        >
          <v-container fluid>
            <h1 class="text-caption font-weight-regular">Total Inflow (CR)</h1>
            <h3 class="text-subtitle-1 font-weight-regular text-blue">
              {{ data.totalInflow }}
            </h3>
          </v-container>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          border
          color="white"
          variant="flat"
        >
          <v-container fluid>
            <h1 class="text-caption font-weight-regular">Total Outflow (CR)</h1>
            <h3 class="text-subtitle-1 font-weight-regular text-blue">
              {{ data.totalOutflow }}
            </h3>
          </v-container>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          border
          color="white"
          variant="flat"
        >
          <v-container fluid>
            <h1 class="text-caption font-weight-regular">Monthly Disposable</h1>
            <h3 class="text-subtitle-1 font-weight-regular text-blue">
              {{ data.monthlyDisposable }}
            </h3>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
