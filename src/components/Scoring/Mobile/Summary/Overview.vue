<script setup lang="ts">

const data = {
  total_sent: "KES 824,404",
  total_received: "KES 24,404",
  total_agent_deposit: "KES 824,404",
  total_agent_withdrawal: "KES 824,404",
  total_paybill: "KES 82,404",
  total_till: "KES 824",
  total_paid_in: "KES 824,404",
  total_paid_out: "KES 824,304",
  total_paid_in_average: "KES 824,404",
  total_paid_out_average: "KES 824,404",
  total_others: "KES 824,404",
  balance: "KES 404",
};
</script>

<template>
  <v-container fluid>
    <v-container
      ><h1 class="text-h6 font-weight-regular text-grey-darken-2">
        Overview
      </h1></v-container
    >
    <v-row>
      <v-col>
        <v-card
          border
          color="white"
          variant="flat"
        >
          <v-container fluid>
            <h1 class="text-caption font-weight-regular">Total Sent (DR)</h1>
            <h3 class="text-subtitle-1 font-weight-regular text-blue">
              {{ data.total_sent }}
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
            <h1 class="text-caption font-weight-regular">
              Total Received (CR)
            </h1>
            <h3 class="text-subtitle-1 font-weight-regular text-blue">
              {{ data.total_received }}
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
            <h1 class="text-caption font-weight-regular">
              Total Agent Deposit (CR)
            </h1>
            <h3 class="text-subtitle-1 font-weight-regular text-blue">
              {{ data.total_agent_deposit }}
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
            <h1 class="text-caption font-weight-regular">
              Total Agent Withdrawal (DR)
            </h1>
            <h3 class="text-subtitle-1 font-weight-regular text-blue">
              {{ data.total_agent_withdrawal }}
            </h3>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card
          border
          color="white"
          variant="flat"
        >
          <v-container fluid>
            <h1 class="text-caption font-weight-regular">
              Total Lipa Na MPESA Paybill (DR)
            </h1>
            <h3 class="text-subtitle-1 font-weight-regular text-blue">
              {{ data.total_paybill }}
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
            <h1 class="text-caption font-weight-regular">
              Total Lipa Na MPESA Buy Goods (DR)
            </h1>
            <h3 class="text-subtitle-1 font-weight-regular text-blue">
              {{ data.total_till }}
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
            <h1 class="text-caption font-weight-regular">Total Paid In (CR)</h1>
            <h3 class="text-subtitle-1 font-weight-regular text-blue">
              {{ data.total_paid_in }}
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
            <h1 class="text-caption font-weight-regular">
              Total Paid Out (DR)
            </h1>
            <h3 class="text-subtitle-1 font-weight-regular text-blue">
              {{ data.total_paid_out }}
            </h3>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card
          border
          color="white"
          variant="flat"
        >
          <v-container fluid>
            <h1 class="text-caption font-weight-regular">
              Total Paid In Average
            </h1>
            <h3 class="text-subtitle-1 font-weight-regular text-blue">
              {{ data.total_paid_in_average }}
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
            <h1 class="text-caption font-weight-regular">
              Total Paid Out Average
            </h1>
            <h3 class="text-subtitle-1 font-weight-regular text-blue">
              {{ data.total_paid_out_average }}
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
            <h1 class="text-caption font-weight-regular">Total Others</h1>
            <h3 class="text-subtitle-1 font-weight-regular text-blue">
              {{ data.total_others }}
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
            <h1 class="text-caption font-weight-regular">MPESA Balance</h1>
            <h3 class="text-subtitle-1 font-weight-regular text-blue">
              {{ data.balance }}
            </h3>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
