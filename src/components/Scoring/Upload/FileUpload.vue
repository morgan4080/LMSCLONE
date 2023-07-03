<script setup lang="ts">
import { ref, computed, ComputedRef, onMounted } from "vue";
import axios from "axios";
import axiosInstance from "@/services/api/axiosInstance";
import { useUploadStore } from "@/store/uploadStore";
const { checkForPassword } = useUploadStore();

const emit = defineEmits(["clear", "checkingPassword"]);

const props = defineProps<{
  statement: {
    document_id: number | null;
    document_type: string;
    document_code: string;
    document_file: File | null;
    document_password: string;
  };
  uploaded_doc_ids: number[];
}>();

const uploadStore = useUploadStore();

const document_password = ref(props.statement.document_password);
const popupOpen = ref(false);
const confirmed = ref(false);
const uploading = ref(false);
const uploaded = ref(false);
const message = ref("");
const timing = ref<number | undefined>();
const progress = ref<number | undefined>();
const progressbar: ComputedRef<number> = computed(() =>
  progress.value !== undefined ? Math.round(100 * progress.value) : 0
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
    formData.append("decrypter", document_password.value);
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
  message.value = "";
  confirmed.value = true;
  uploadFile();
};
const clearUpload = () => {
  message.value = "";
  emit("clear");
};
const retryUpload = async () => {
  try {
    if (props.statement.document_file) {
      message.value = "";
      emit("checkingPassword", true);
      const response = await checkForPassword(props.statement.document_file);
      popupOpen.value = response.passwordRequired;
      emit("checkingPassword", false);
      if (!response.passwordRequired) await uploadFile();
    } else {
      throw new Error("File doesn't exist");
    }
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request
      console.error("Error:", error.message);
    }
  }
};
const cancelUpload = () => controller.abort();

const reUploadWithNewPassword = () => {
  uploadFile();
  popupOpen.value = !popupOpen.value;
};

onMounted(() => {
  console.log("document", props.statement);
});
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
        <button
          type="button"
          class="border rounded px-1 ml-1"
          @click="cancelUpload"
        >
          <v-icon
            size="x-small"
            icon="mdi:mdi-close"
            class=""
          ></v-icon>
        </button>
      </div>
      <div
        class="my-1 d-flex"
        v-if="uploaded"
      >
        <button
          type="button"
          class="border rounded px-1"
          @click="$router.push(`/scoring/mobile/1`)"
        >
          <v-icon
            size="x-small"
            icon="mdi:mdi-eye-outline"
            class=""
          ></v-icon>
        </button>
      </div>
      <button
        type="button"
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
      </button>
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
      {{ timing !== undefined ? Math.round(timing) : 0 }} sec left
    </p>
    <p
      v-if="!uploaded"
      class="text-caption mt-1"
    >
      {{ message }}
    </p>
  </v-list-item>
  <slot name="divider"></slot>
  <v-dialog
    persistent
    v-model="popupOpen"
    class="w-50"
  >
    <v-card>
      <v-container fluid>
        <h1 class="text-h6 font-weight-regular">Document Password</h1>
        <h2 class="text-caption text-grey-darken-2 font-weight-regular">
          Enter Document Password
        </h2>
        <div>
          <v-text-field
            v-model="document_password"
            label="Document Password"
            variant="outlined"
            density="compact"
            class="mt-3"
          ></v-text-field>
          <div class="justify-end d-flex">
            <v-btn
              @click="reUploadWithNewPassword"
              variant="flat"
              color="success"
              class="px-3 text-none"
              >Submit</v-btn
            >
          </div>
        </div>
      </v-container>
    </v-card>
  </v-dialog>
</template>
