<script setup lang="ts">
import { ref, computed } from "vue";
import axios from "axios";
import axiosInstance from "@/services/api/axiosInstance";
import { useUploadStore } from "@/store/uploadStore";

interface Statement {
  document_type: string;
  document_code: string;
  document_file: File | null;
  document_password: string;
}

const emit = defineEmits(["clear"]);

const props = defineProps({
  statement: {
    type: Object as () => Statement,
    default: () => ({
      document_type: "",
      document_code: "",
      document_file: null,
      document_password: "",
    }),
    required: true,
  },
});

const uploadStore = useUploadStore();

const confirmed = ref(false);
const uploading = ref(false);
const uploaded = ref(false);
const message = ref("");
const timing = ref<number | undefined>();
const progress = ref<number | undefined>();
const progressbar = computed(() =>
  progress.value !== undefined ? Math.round(100 * progress.value) : undefined
);

const controller = new AbortController();

const uploadFile = async () => {
  if (props.statement.document_file) {
    uploaded.value = false;
    progress.value = 0;
    uploading.value = true;

    const formData = new FormData();
    formData.append("file", props.statement.document_file);
    formData.append("document_type", props.statement.document_type);
    formData.append("bank_code", props.statement.document_code);
    formData.append("sender", "jane@gmail.com");
    formData.append("decrypter", props.statement.document_password);
    formData.append("remote_identifier", "2320092");
    formData.append("identifier", "Jane");
    formData.append("createdBy", "Jane");
    formData.append("updatedBy", "string");

    await axiosInstance
      .post("/e_statement/upload_statement", formData, {
        signal: controller.signal,
        onUploadProgress: event => {
          progress.value = event.progress;
          timing.value = event.estimated;
        },
      })
      .then(response => {
        if (response.data.status === "200") {
          uploaded.value = true;
          uploadStore.setUploadTrue();
        } else {
          uploaded.value = false;
        }

        message.value = response.data.message;
      })
      .catch(error => {
        progress.value = undefined;
        uploaded.value = false;
        if (axios.isCancel(error)) {
          message.value = "Upload cancelled by user";
        } else if (axios.isAxiosError(error)) {
          message.value = "Upload error occured!";
        } else {
          message.value = "An unexpected error occured!";
        }
      })
      .finally(() => (uploading.value = false));
  }
};

const confirmUpload = () => {
  confirmed.value = true;
  uploadFile();
};
const clearUpload = () => emit("clear");
const retryUpload = () => uploadFile();
const cancelUpload = () => controller.abort();
</script>

<template>
  <v-list-item>
    <div class="d-flex justify-space-between">
      <p style="max-width: 300px; word-wrap: break-word">
        {{ props.statement.document_file?.name }}
      </p>
      <div
        class="my-1 d-flex align-baseline"
        v-if="!confirmed"
      >
        <p class="mx-4 text-caption">Confirm File?</p>
        <button
          type="button"
          class="border rounded px-1"
          v-if="!uploading"
          @click="confirmUpload"
        >
          <v-icon
            color="green"
            size="x-small"
            icon="mdi:mdi-check"
            class=""
          ></v-icon>
        </button>
        <button
          type="button"
          class="border rounded px-1 ml-1"
          @click="clearUpload"
        >
          <v-icon
            color="red"
            size="x-small"
            icon="mdi:mdi-close"
            class=""
          ></v-icon>
        </button>
      </div>
      <div
        class="my-1 d-flex"
        v-if="uploading"
      >
        <div
          class="border rounded px-1 ml-1"
          @click="cancelUpload"
        >
          <v-icon
            size="x-small"
            icon="mdi:mdi-close"
            class=""
          ></v-icon>
        </div>
      </div>
      <div
        class="my-1 d-flex"
        v-if="uploaded"
      >
        <div
          class="border rounded px-1"
          @click="$router.push(`/scoring/mobile/1`)"
        >
          <v-icon
            size="x-small"
            icon="mdi:mdi-eye-outline"
            class=""
          ></v-icon>
        </div>
      </div>
      <div
        class="my-1 d-flex"
        @click="retryUpload"
        v-if="confirmed && !uploading && !uploaded"
      >
        <v-icon
          color="info"
          size="x-small"
          icon="mdi:mdi-reload"
          class=""
        ></v-icon>
      </div>
    </div>
    <v-progress-linear
      v-if="uploading"
      color="info"
      rounded
      class="mt-1"
      :model-value="progressbar"
      :indeterminate="progress === -1"
    ></v-progress-linear>
    <p
      v-if="uploading"
      class="text-caption mt-1"
    >
      {{ timing !== undefined ? Math.round(1 * timing) : 0 }} sec left
    </p>
    <p
      v-if="!uploaded"
      class="text-caption mt-1"
    >
      {{ message }}
    </p>
  </v-list-item>
</template>
