<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "@/services/api/axiosInstance";
import formatter from "@/helpers/currency";

interface SummaryData {
  total_send_amt: string;
  total_received_amt: string;
  total_agent_deposit: string;
  total_agent_withdrawal: string;
  total_lipa_na_mpesa_paybill: string;
  total_lipa_na_mpesa_buygoods: number;
  total_paid_in: number;
  total_paid_out: number;
  total_paid_in_average: number;
  total_paid_out_average: number;
  total_others: string;
  mpesa_balance: string;
}

const route = useRoute();

const summaryData = ref<SummaryData>({
  total_send_amt: "",
  total_received_amt: "",
  total_agent_deposit: "",
  total_agent_withdrawal: "",
  total_lipa_na_mpesa_paybill: "",
  total_lipa_na_mpesa_buygoods: 0,
  total_paid_in: 0,
  total_paid_out: 0,
  total_paid_in_average: 0,
  total_paid_out_average: 0,
  total_others: "",
  mpesa_balance: "",
});

// API Call: Get summary overview
const loadData = async () => {
  await axiosInstance
    .get(`/e_statement/account_summary?refId=${route.params.slug}`)
    .then(response => (summaryData.value = response.data.content[0]))
    .catch(error => console.error(error));
};

onMounted(() => {
  loadData();
});
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
              {{ summaryData ? formatter(summaryData.total_send_amt) : "" }}
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
              {{ summaryData ? formatter(summaryData.total_received_amt) : "" }}
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
              {{
                summaryData ? formatter(summaryData.total_agent_deposit) : ""
              }}
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
              {{
                summaryData ? formatter(summaryData.total_agent_withdrawal) : ""
              }}
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
              {{
                summaryData
                  ? formatter(summaryData.total_lipa_na_mpesa_paybill)
                  : ""
              }}
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
              {{
                summaryData
                  ? formatter(summaryData.total_lipa_na_mpesa_buygoods)
                  : ""
              }}
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
              {{ summaryData ? formatter(summaryData.total_paid_in) : "" }}
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
              {{ summaryData ? formatter(summaryData.total_paid_out) : "" }}
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
              {{
                summaryData ? formatter(summaryData.total_paid_in_average) : ""
              }}
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
              {{
                summaryData ? formatter(summaryData.total_paid_out_average) : ""
              }}
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
              {{ summaryData ? formatter(summaryData.total_others) : "" }}
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
              {{ summaryData ? formatter(summaryData.mpesa_balance) : "" }}
            </h3>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
