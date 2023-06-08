<script setup lang="ts">
import { ref } from "vue";
import Header from "@/components/Scoring/Mobile/Header.vue";
import Summary from "@/components/Scoring/Mobile/Summary.vue";
import FinancialInstitutions from "@/components/Scoring/Mobile/FinancialInstitutions.vue";
import Lifestyle from "@/components/Scoring/Mobile/Lifestyle.vue";
import Utilities from "@/components/Scoring/Mobile/Utilities.vue";
import Transactions from "@/components/Scoring/Mobile/Transactions.vue";

const selected = ref(0);
</script>

<template>
  <Header @clickedTab="id => (selected = id)" />
  <Summary v-if="selected === 0" />
  <FinancialInstitutions v-if="selected === 1" />
  <Lifestyle v-if="selected === 2" />
  <Utilities v-if="selected === 3" />
  <Transactions v-if="selected === 4" />
</template>
