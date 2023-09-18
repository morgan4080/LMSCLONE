<script setup lang="ts">
import { ref, computed, ComputedRef, onMounted } from "vue";
import axios from "axios";
import axiosMobileInstance from "@/services/api/axiosInstance";
import axiosBankInstance from "@/services/api/axiosbank";
import { useUploadStore } from "@/store/uploadStore";
import stores from "@/store";
const { checkForPassword } = useUploadStore();
const authStore = stores.authStore;
const emit = defineEmits(["clear", "checkingPassword", "pushDuplicate"]);

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
const duplicateFileId = ref(null);
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
    formData.append(
      "sender",
      authStore.getLoggedInUser ? `${authStore.getLoggedInUser.email}` : ""
    );
    formData.append("decrypter", document_password.value);
    formData.append("remote_identifier", "2320092");
    formData.append(
      "identifier",
      authStore.getLoggedInUser
        ? `${authStore.getLoggedInUser.firstName} ${authStore.getLoggedInUser.lastName}`
        : ""
    );
    formData.append(
      "createdBy",
      authStore.getLoggedInUser
        ? `${authStore.getLoggedInUser.firstName} ${authStore.getLoggedInUser.lastName}`
        : ""
    );
    formData.append(
      "updatedBy",
      authStore.getLoggedInUser
        ? `${authStore.getLoggedInUser.firstName} ${authStore.getLoggedInUser.lastName}`
        : ""
    );

    const call = async () => {
      if (props.statement.document_type == "Mobile") {
        return await axiosMobileInstance.post(
          "/e_statement/upload_statement",
          formData,
          {
            signal: controller.signal,
            onUploadProgress: event => {
              progress.value = event.progress;
              timing.value = event.estimated;
            },
          }
        );
      } else {
        return await axiosBankInstance.post(
          "/bank_analysis/upload_bank_statement",
          formData,
          {
            signal: controller.signal,
            onUploadProgress: event => {
              progress.value = event.progress;
              timing.value = event.estimated;
            },
          }
        );
      }
    };

    call()
      .then(response => {
        if (response.data.status === "400" && response.data.error === "DUPLICATE") {
          message.value = "Duplicate statement uploaded.";
          duplicateFileId.value = response.data.fileUniqueId;
          uploaded.value = false;
        } else {
          if (response.data.status === "200") {
            uploaded.value = true;
            uploadStore.setUploadTrue();
          } else {
            uploaded.value = false;
          }

          message.value = response.data.message;
        }
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
      const response = await checkForPassword(
        props.statement.document_type == "Mobile" ? "MOBILE" : "BANK",
        props.statement.document_file
      );
      popupOpen.value = response.passwordRequired;
      emit("checkingPassword", false);
      if (popupOpen.value == false) {
        console.log("THE DOCUMENT DOESNT REQUIRE ANY PASSWORD");
        uploadFile();
      }
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

const showFileDuplicateStatement = () => {
  if (duplicateFileId.value) {
    console.log("ëmiting to uploader")
    emit("pushDuplicate", duplicateFileId.value)
  }
}


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
        <v-btn
          variant="tonal"
          density="compact"
          type="button"
          class="px-1 ml-1"
          @click="clearUpload"
          icon
        >
          <v-icon
            color="red"
            size="x-small"
            icon="mdi:mdi-close"
            class=""
          ></v-icon>
        </v-btn>
      </div>
      <div
        class="my-1 d-flex"
        v-if="uploading"
      >
        <v-btn
          variant="tonal"
          density="compact"
          type="button"
          class="px-1 ml-1"
          @click="cancelUpload"
          icon
        >
          <v-icon
            size="x-small"
            icon="mdi:mdi-close"
            class=""
          ></v-icon>
        </v-btn>
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
      <button v-if="duplicateFileId" @click="showFileDuplicateStatement" style="color: #2196f3">View Statement</button>
    </p>
  </v-list-item>
  <slot name="divider"></slot>
  <v-dialog
    :persistent="true"
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
