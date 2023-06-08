<script setup lang="ts">
import Cards from "@/components/Scoring/Mobile/Summary/Cards.vue";
import Overview from "@/components/Scoring/Mobile/Summary/Overview.vue";
import MonthlyBreakdown from "@/components/Scoring/Mobile/Summary/MonthlyBreakdown.vue";
import FlowDougnut from "@/components/Scoring/Mobile/Summary/FlowDougnut.vue";
import FlowLineChart from "@/components/Scoring/Mobile/Summary/FlowLineChart.vue";
</script>

<template>
  <Cards />
  <FlowDougnut />
  <Overview />
  <FlowLineChart />
  <MonthlyBreakdown />
</template>
