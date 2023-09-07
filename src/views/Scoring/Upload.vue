<script setup lang="ts">
import Header from "@/components/Scoring/Upload/Header.vue";
import Upload from "@/components/Scoring/Upload/Upload.vue";
import Statements from "@/components/Scoring/Upload/Statements.vue";
import { ref } from "vue";
const duplicateFileId = ref<string | null>(null)
const setDuplicateId = (id: string) => {
  duplicateFileId.value = id;
}
</script>

<template>
  <Header />
  <Upload @pushDuplicate="setDuplicateId" />
  <Statements :duplicateFileId="duplicateFileId" />
</template>
