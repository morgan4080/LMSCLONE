<script setup lang="ts">
import Cards from "@/components/Scoring/Bank/Summary/Cards.vue";
import Overview from "@/components/Scoring/Bank/Summary/Overview.vue";
import MonthlyBreakdown from "@/components/Scoring/Bank/Summary/MonthlyBreakdown.vue";
import FlowDougnut from "@/components/Scoring/Bank/Summary/FlowDougnut.vue";
import FlowLineChart from "@/components/Scoring/Bank/Summary/FlowLineChart.vue";
</script>

<template>
  <Cards />
  <FlowDougnut />
  <Overview />
  <FlowLineChart />
  <MonthlyBreakdown />
</template>
