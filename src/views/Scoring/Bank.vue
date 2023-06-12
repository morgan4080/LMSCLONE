<script setup lang="ts">
import { ref } from "vue";
import Header from "@/components/Scoring/Bank/Header.vue";
import Summary from "@/components/Scoring/Bank/Summary.vue";
import Classifications from "@/components/Scoring/Bank/Classifications.vue";

const selected = ref(0);
</script>

<template>
  <Header @clickedTab="id => (selected = id)" />
  <Summary v-if="selected === 0" />
  <Classifications v-if="selected === 1" />
</template>
