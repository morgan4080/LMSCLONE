<script setup lang="ts">
import { onMounted, watch, ref } from "vue";
import axiosInstance from "@/services/api/axiosInstance";

import FileUpload from "@/components/Scoring/Upload/FileUpload.vue";

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
  type: string | null;
  code: string | null;
  file: File | null;
}

const statementList = ref<Statement[]>([ 
  {title: 'Mobile Statement', value: 'Mobile'},
  {title: 'Bank Statement', value: 'Bank'},
]);
const mobileList = ref<Mobile[]>([ 
  {mobileName: 'M-Pesa', mobileCode: 'MPESA'},
  {mobileName: 'Airtel Money', mobileCode: 'AIRTEL'},
]);
const bankList = ref<Bank[]>([ ]);
const form_upload = ref<Upload>({
  type: null,
  code: null,
  file: null,
})
const uploads= ref<Upload[]>([])

const dragging = ref(false);

function onDropped(event: Event) {
  if (form_upload.value.code !== null) {
    dragging.value = false;
    let files = [...event.dataTransfer.items]
      .filter(item => item.kind === "file")
      .map(item => item.getAsFile());

    files.forEach(file => handleFile(file));
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

const handleFile = (file: File) => {
  if (file !== null){
    form_upload.value.file = file
    uploads.value.unshift(form_upload.value)
    form_upload.value = {type: null,code: null, file: null,}
  }
}

onMounted(() => {
  loadBanks();
  document
    .getElementById("file-input")!
    .addEventListener("change", handleFiles, false);
    function handleFiles() {
      handleFile(this.files[0])
    }
});

watch(() => form_upload.value.type, () => {
  form_upload.value.code = null
});
</script>

<template>
  <v-container fluid>
    <v-responsive>
      <v-row>
        <v-col class="bg-white mr-2 rounded">
          <v-container>
            <h1 class="text-h6 font-weight-regular">Upload Statement</h1>
            <h2 class="text-caption text-grey-darken-2 font-weight-regular">
              Select Statement Type Then Select File To Upload
            </h2>
            <div class="mt-12">
              <!-- Upload Inputs  -->
              <div>
                <label class="text-black">Statement Type <span class="text-red">*</span></label>
                <v-select 
                  v-model="form_upload.type" :items="statementList" 
                  item-title="title" item-value="value" variant="outlined" density="compact" label="Select Statement Type" class="mt-3">
                </v-select>
              </div>
              <div>
                <label class="text-black">{{ form_upload.type ? form_upload.type === "Bank" ? "Bank" : "Mobile" : "Bank/Mobile" }}<span class="text-red"> *</span></label>
                <v-select 
                  v-model="form_upload.code"
                  :items="form_upload.type === 'Bank' ? bankList : mobileList"
                  :item-title="form_upload.type === 'Bank' ? 'bankName' : 'mobileName'" 
                  :item-value="form_upload.type === 'Bank' ? 'bankCode' : 'mobileCode'"
                  :label="form_upload.type ? form_upload.type === 'Bank' ? 'Select Bank' : 'Select Mobile' : 'Select Bank/Mobile'"
                  :disabled="form_upload.type === null"
                  variant="outlined" density="compact" class="mt-3">
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
                    class="mb-3 text-none text-caption px-8"
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
        <v-col class="bg-white ml-2 rounded">
          <v-container>
            <h1 class="text-h6 font-weight-regular">Files In Progress</h1>
            <h2 class="text-caption text-grey-darken-2 font-weight-regular">
              Uploading File(s) Will Be Displayed Here
            </h2>
            <div class="mt-12">
              <v-divider></v-divider>
              <v-list>
                <div
                  v-for="(upload, i) in uploads"
                  :key="i"
                > 
                  <FileUpload
                    :statement="{
                      document_type: upload.type,
                      document_code: upload.code,
                      document_file: upload.file,
                    }"
                    @clear="uploads.splice(i, 1)"
                  ></FileUpload>
                  <v-divider class="mb-2"></v-divider>
                </div>
              </v-list>
            </div>
          </v-container>
        </v-col>
      </v-row>
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
