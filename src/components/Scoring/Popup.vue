<script setup lang="ts">
import { reactive, toRef } from "vue";

const props = defineProps<{
  open: boolean;
}>();

const docPass = reactive<{ password: null | number }>({
  password: null,
});

const dialog = toRef(props, "open");
</script>

<template>
  <v-dialog
    v-model="dialog"
    class="w-50"
  >
    <v-card>
      <v-container fluid>
        <h1 class="text-h6 font-weight-regular">Document Password</h1>
        <h2 class="text-caption text-grey-darken-2 font-weight-regular">
          Enter Document Password (Leave Empty and Click Submit If None)
        </h2>
        <div>
          <v-text-field
            v-model="formData.password"
            type="number"
            label="Document Password"
            variant="outlined"
            density="compact"
            class="mt-3"
          ></v-text-field>
          <div class="d-flex justify-end">
            <v-btn
              variant="flat"
              color="success"
              class=""
              >Submit</v-btn
            >
          </div>
        </div>
      </v-container>
    </v-card>
  </v-dialog>
</template>
