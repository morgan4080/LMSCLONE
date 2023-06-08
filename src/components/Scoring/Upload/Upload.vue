<script setup lang="ts">
import { reactive, ref } from "vue";

const statements = ["Bank Statement", "Mobile Statement"];
const banks = ["NCBA Bank", "KCB Bank", "Equity Bank", "Coop Bank"];
const mobile = ["M-Pesa", "Airtel Money"];
const customers = ["Duggan Kimani", "Tom Kimani"];

const media = ref<any[]>([]);

const dragging = ref(false);

const formStatements = reactive({
  type: null,
  provider: null,
  customer: null,
});

function onDropped(event: Event) {
  dragging.value = false;
  let files = [...event.dataTransfer.items]
    .filter(item => item.kind === "file")
    .map(item => item.getAsFile());

  files.forEach(file => {
    media.value.unshift({
      file,
      progress: 0,
    });
  });
}

function inputForm() {
  document.getElementById("file-input")!.click();
}
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
              <div>
                <label class="text-black"
                  >Statement Type <span class="text-red">*</span></label
                >
                <v-select
                  class="mt-3"
                  v-model="formStatements.type"
                  density="compact"
                  label="Select Statement Type"
                  :items="statements"
                  variant="outlined"
                ></v-select>
              </div>
              <div>
                <label class="text-black"
                  >{{
                    formStatements.type
                      ? formStatements.type === "Bank Statement"
                        ? "Bank"
                        : "Mobile"
                      : "Bank/Mobile"
                  }}
                  <span class="text-red"> *</span></label
                >
                <v-select
                  v-model="formStatements.provider"
                  class="mt-3"
                  :disabled="formStatements.type === null"
                  density="compact"
                  :label="
                    formStatements.type
                      ? formStatements.type === 'Bank Statement'
                        ? 'Select Bank'
                        : 'Select Mobile'
                      : 'Select Bank/Mobile'
                  "
                  :items="
                    formStatements.type === 'Bank Statement' ? banks : mobile
                  "
                  variant="outlined"
                ></v-select>
              </div>
              <div>
                <label class="text-black">Assign To</label>
                <v-select
                  class="mt-3"
                  :disabled="formStatements.provider === null"
                  v-model="formStatements.customer"
                  density="compact"
                  label="Select Customer"
                  :items="customers"
                  variant="outlined"
                ></v-select>
              </div>
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
                    :color="formStatements.provider !== null ? 'info' : ''"
                    :disabled="formStatements.provider === null"
                    >Select PDF File To Upload</v-btn
                  >
                  <v-file-input
                    class="d-none"
                    id="file-input"
                    label="File input"
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
                  v-for="(item, idx) in media"
                  :key="idx"
                >
                  <v-list-item>
                    <div class="d-flex justify-space-between">
                      {{ item.file.name }}
                      <div class="border rounded">
                        <v-icon
                          size="x-small"
                          icon="mdi:mdi-eye-outline"
                        ></v-icon>
                      </div>
                    </div>
                    <v-progress-linear
                      color="info"
                      rounded
                      class="mt-1"
                      model-value="20"
                    ></v-progress-linear>
                    <p class="text-caption mt-1">48 sec left</p>
                  </v-list-item>
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
