<script setup lang="ts">
import Header from "@/components/Scoring/Mobile/Header.vue";
import { ref } from "vue";
import Summary from "@/components/Scoring/Mobile/Summary/Cards.vue";

const selected = ref(0);
</script>

<template>
  <Header @option="(id) => (selected = id)" />
  <Summary v-if="selected === 0" />
</template>
