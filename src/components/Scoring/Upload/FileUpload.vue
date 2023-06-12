<script setup lang="ts">
import { ref, computed } from 'vue';
import axiosInstance from "@/services/api/axiosInstance"
import axios from 'axios';

interface Statement {
  document: string;
  provider: string;
  file: File | null;
}

const emit = defineEmits(['clear'])

const props = defineProps({
  statement: {
    type: Object as () => Statement,
    default: () => ({
      document: '',
      provider: '',
      file: null
    }),
    required: true
  }
});

const confirmed = ref(false)
const uploading = ref(false)
const uploaded = ref(false)
const message = ref('')
const timing = ref<number | undefined>();
const progress = ref<number | undefined>();
const progressbar = computed(() => progress.value !== undefined ? Math.round(100 * progress.value) : undefined)

const controller = new AbortController()

const uploadFile = async () => {
  if (props.statement.file) {
    uploaded.value = false
    progress.value = 0;
    uploading.value = true;

    const formData = new FormData();
    formData.append('file', props.statement.file)
    formData.append("document_type", "MPESA");
    formData.append("organization_code", "PRESTA");
    formData.append("bank_code", "MPESA");
    formData.append("sender", "jane@gmail.com");
    formData.append("decrypter", "2320092");
    formData.append("remote_identifier", "2320092");
    formData.append("identifier", "Jane");
    formData.append("createdBy", "Jane");
    formData.append("updatedBy", "string");

    await axiosInstance.post("/e_statement/upload_statement", formData, {
      signal: controller.signal,
      onUploadProgress: (event) => {
        progress.value = event.progress
        timing.value = event.estimated
      },
    })
      .then(response => {
        uploaded.value = response.data.status === "200" ? true : false
        message.value = response.data.message
      })
      .catch(error => {
        progress.value = undefined
        uploaded.value = false
        if (axios.isCancel(error)) {
          message.value = "Upload cancelled by user"
        } else if (axios.isAxiosError(error)) {
          message.value = "Upload error occured!"
        } else {
          message.value = "An unexpected error occured!"
        }
      })
      .finally(() => (uploading.value = false))
  }
};

const confirmUpload = () => {
  confirmed.value = true
  uploadFile()
}
const clearUpload = () => emit('clear')
const retryUpload = () => uploadFile()
const cancelUpload = () => controller.abort();
</script>
  
<template>
  <v-list-item>
    <div class="d-flex justify-space-between">
      {{ props.statement.file?.name }}
      <div class="my-1 d-flex" v-if="!confirmed">
        <p class="mx-4 text-caption">Confirm File?</p>
        <div class="border rounded px-1" v-if="!uploading" @click="confirmUpload">
          <v-icon color="green" size="x-small" icon="mdi:mdi-check" class=""></v-icon>
        </div>
        <div class="border rounded px-1 ml-1" @click="clearUpload">
          <v-icon color="red" size="x-small" icon="mdi:mdi-close" class=""></v-icon>
        </div>
      </div>
      <div class="my-1 d-flex" v-if="uploading">
        <div class="border rounded px-1"><v-icon size="x-small" icon="mdi:mdi-eye-outline" class=""></v-icon></div>
        <div class="border rounded px-1 ml-1" @click="cancelUpload"><v-icon size="x-small" icon="mdi:mdi-close"
            class=""></v-icon>
        </div>
      </div>
      <div class="my-1 d-flex" v-if="confirmed && !uploading && !uploaded">
        <v-icon color="info" size="x-small" icon="mdi:mdi-reload" class="" @click="retryUpload"></v-icon>
      </div>
    </div>
    <v-progress-linear v-if="uploading" color="info" rounded class="mt-1" :model-value="progressbar"
      :indeterminate="progress === -1"></v-progress-linear>
    <p v-if="uploading" class="text-caption mt-1">{{ timing !== undefined ? Math.round(1 * timing) : 0 }} sec left</p>
    <p v-if="!uploaded" class="text-caption mt-1">{{ message }}</p>
  </v-list-item>
</template>