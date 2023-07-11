<script setup lang="ts">
import { onMounted, watch, ref } from "vue";
import axiosInstance from "@/services/api/axiosInstance";
import FileUpload from "@/components/Scoring/Upload/FileUpload.vue";
import { useUploadStore } from "@/store/uploadStore";
const { checkForPassword } = useUploadStore();
interface Statement {
  title: string;
  value: string;
}

interface Bank {
  bankName: string;
  bankCode: string;
}

interface Mobile {
  mobileName: string;
  mobileCode: string;
}

interface Upload {
  id: number | null;
  type: string | null;
  code: string | null;
  file: File | null;
  password: string | number | null;
}

const statementList = ref<Statement[]>([
  { title: "Mobile Statement", value: "Mobile" },
  { title: "Bank Statement", value: "BANK" },
]);
const mobileList = ref<Mobile[]>([
  { mobileName: "M-Pesa", mobileCode: "MPESA" },
  { mobileName: "Airtel Money", mobileCode: "AIRTEL" },
]);
const bankList = ref<Bank[]>([]);
const form_upload = ref<Upload>({
  id: null,
  type: null,
  code: null,
  file: null,
  password: null,
});
const uploads = ref<Upload[]>([]);

const checkingPassword = ref(false);
const docId = ref(1);
const uploaded_doc_ids = ref<number[]>([]);
const dragging = ref(false);
const popupOpen = ref(false);

function onDropped(event: Event) {
  event.preventDefault();
  if (form_upload.value.code !== null) {
    dragging.value = false;
    let dragItems: DataTransferItemList | undefined = (event as DragEvent)
      .dataTransfer?.items;
    if (dragItems) {
      let files = [...dragItems]
        .filter(item => item.kind === "file")
        .map(item => item.getAsFile());

      files.forEach(file => {
        if (file) handleFile(file);
      });
    }
  } else {
    dragging.value = false;
  }
}

function inputForm() {
  document.getElementById("file-input")!.click();
}

// API Call: Get list of banks
const loadBanks = async () => {
  await axiosInstance
    .get("/banks/list")
    .then(response => {
      bankList.value = response.data;
    })
    .catch(error => console.error(error));
};

const addToProgress = () => {
  popupOpen.value = false;
  uploads.value.unshift(form_upload.value);
  form_upload.value = {
    id: null,
    type: null,
    code: null,
    file: null,
    password: null,
  };
};

const handleFile = async (file: File) => {
  try {
    // check if file requires a password an only open pop up if that is the case
    checkingPassword.value = true;
    const response = await checkForPassword(
      form_upload.value.type === "BANK" ? "BANK" : "MOBILE",
      file
    );
    popupOpen.value = response.passwordRequired;
    form_upload.value.file = file;
    form_upload.value.id = docId.value;
    docId.value = docId.value + 1;
    checkingPassword.value = false;

    if (popupOpen.value == false) {
      console.log("THE DOCUMENT DOESNT REQUIRE ANY PASSWORD", popupOpen.value);
      addToProgress();
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

onMounted(() => {
  loadBanks();
  document
    .getElementById("file-input")!
    .addEventListener("change", handleFiles, false);
  function handleFiles(e: Event) {
    let targetElement = e.target as HTMLInputElement;
    if (targetElement && targetElement.files) {
      handleFile(targetElement.files[0]);
    }
  }
});

watch(
  () => form_upload.value.type,
  () => {
    form_upload.value.code = null;
    form_upload.value.password = null;
  }
);

const setCheckingPassword = (val: boolean) => {
  checkingPassword.value = val;
};
</script>

<template>
  <v-container fluid>
    <!-- <p>{{ form_upload }}</p> -->
    <!-- <p>{{ uploads }}</p> -->
    <v-responsive>
      <v-row>
        <v-col class="mr-2 bg-white rounded">
          <v-container>
            <h1 class="text-h6 font-weight-regular">Upload Statement</h1>
            <h2 class="text-caption text-grey-darken-2 font-weight-regular">
              Select Statement Type Then Select File To Upload
            </h2>
            <div class="mt-12">
              <!-- Upload Inputs  -->
              <div>
                <label class="text-black">
                  Statement Type <span class="text-red">*</span>
                </label>
                <v-select
                  v-model="form_upload.type"
                  :items="statementList"
                  item-title="title"
                  item-value="value"
                  variant="outlined"
                  density="compact"
                  label="Select Statement Type"
                  class="mt-3"
                >
                </v-select>
              </div>
              <div>
                <label class="text-black"
                  >{{
                    form_upload.type
                      ? form_upload.type === "BANK"
                        ? "Bank"
                        : "Mobile"
                      : "Bank/Mobile"
                  }}<span class="text-red"> *</span></label
                >
                <v-select
                  v-model="form_upload.code"
                  :items="form_upload.type === 'BANK' ? bankList : mobileList"
                  :item-title="
                    form_upload.type === 'BANK' ? 'bankName' : 'mobileName'
                  "
                  :item-value="
                    form_upload.type === 'BANK' ? 'bankCode' : 'mobileCode'
                  "
                  :label="
                    form_upload.type
                      ? form_upload.type === 'BANK'
                        ? 'Select Bank'
                        : 'Select Mobile'
                      : 'Select Bank/Mobile'
                  "
                  :disabled="form_upload.type === null"
                  variant="outlined"
                  density="compact"
                  class="mt-3"
                  :loading="checkingPassword"
                >
                </v-select>
              </div>
              <!-- <div>
                <label class="text-black">Assign To</label>
                <v-select
                  class="mt-3"
                  :disabled="formStatements.document_code === null"
                  v-model="formStatements.customer"
                  density="compact"
                  label="Select Customer"
                  :items="customers"
                  variant="outlined"
                ></v-select>
              </div> -->
              <div
                @drop.prevent.stop="onDropped"
                @dragover.prevent.stop="dragging = true"
                @dragleave.prevent.stop="dragging = false"
              >
                <v-sheet
                  border
                  rounded
                  :class="dragging ? 'border-blue' : 'border-gray'"
                  class="px-6 py-10 d-flex flex-column align-center dashed"
                >
                  <v-btn
                    @click="inputForm"
                    class="px-8 mb-3 text-none text-caption"
                    variant="flat"
                    :color="form_upload.code !== null ? 'info' : ''"
                    :disabled="form_upload.code === null"
                    >Select PDF File To Upload</v-btn
                  >
                  <v-file-input
                    id="file-input"
                    label="File input"
                    class="d-none"
                  ></v-file-input>
                  <p class="text-gray text-caption">
                    Or Drag & Drop PDF File Here
                  </p>
                </v-sheet>
              </div>
            </div>
          </v-container>
        </v-col>
        <v-col class="ml-2 bg-white rounded">
          <v-container>
            <h1 class="text-h6 font-weight-regular">Files In Progress</h1>
            <h2 class="text-caption text-grey-darken-2 font-weight-regular">
              Uploading File(s) Will Be Displayed Here
            </h2>
            <div class="mt-12">
              <v-divider></v-divider>
              <v-list>
                <FileUpload
                  v-for="(upload, i) in uploads"
                  :key="upload.id"
                  :statement="{
                      document_id: upload.id,
                      document_type: `${upload.type}`,
                      document_code: `${upload.code}`,
                      document_file: upload.file as File,
                      document_password: `${upload.password}`
                    }"
                  :uploaded_doc_ids="uploaded_doc_ids"
                  @clear="uploads.splice(i, 1)"
                  @checkingPassword="setCheckingPassword"
                >
                  <template v-slot:divider>
                    <v-divider class="mb-2"></v-divider>
                  </template>
                </FileUpload>
              </v-list>
            </div>
          </v-container>
        </v-col>
      </v-row>

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
                v-model="form_upload.password"
                label="Document Password"
                variant="outlined"
                density="compact"
                class="mt-3"
              ></v-text-field>
              <div class="justify-end d-flex">
                <v-btn
                  @click="addToProgress"
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
    </v-responsive>
  </v-container>
</template>

<style>
.dashed {
  border-style: dashed !important;
}
.border-gray {
  border-color: #e4e4e4 !important;
}

.border-blue {
  border-color: #286efa !important;
}
.text-gray {
  color: #828282;
}
</style>
