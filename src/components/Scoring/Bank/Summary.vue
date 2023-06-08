<script setup lang="ts">
import Cards from "@/components/Scoring/Bank/Summary/Cards.vue";
import Overview from "@/components/Scoring/Bank/Summary/Overview.vue";
import MonthlyBreakdown from "@/components/Scoring/Bank/Summary/MonthlyBreakdown.vue";
import InflowDougnut from "@/components/Scoring/Bank/Summary/InflowDougnut.vue";
</script>

<template>
  <Cards />
  <InflowDougnut />
  <Overview />
  <MonthlyBreakdown />
</template>
