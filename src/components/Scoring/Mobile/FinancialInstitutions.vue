<script setup lang="ts">
import Safaricom from "@/components/Scoring/Mobile/Financial/Safaricom.vue";
import GovtLoans from "@/components/Scoring/Mobile/Financial/GovtLoans.vue";
import Banks from "@/components/Scoring/Mobile/Financial/Banks.vue";
import MFI from "@/components/Scoring/Mobile/Financial/MFI.vue";
import MobileLenders from "@/components/Scoring/Mobile/Financial/MobileLenders.vue";
import Saccos from "@/components/Scoring/Mobile/Financial/Saccos.vue";
import Insurance from "@/components/Scoring/Mobile/Financial/Insurance.vue";
import International from "@/components/Scoring/Mobile/Financial/International.vue";
</script>

<template>
  <Safaricom />
  <GovtLoans />
  <Banks />
  <MFI />
  <MobileLenders />
  <Saccos />
  <Insurance />
  <International />
</template>
