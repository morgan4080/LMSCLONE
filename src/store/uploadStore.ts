import { ref } from "vue";
import { defineStore } from "pinia";

export const useUploadStore = defineStore("upload", () => { 

  const upload =  ref(false)
  
  const setUploadTrue = ()=> upload.value = true
  const setUploadFalse = ()=> upload.value = false
  
    return {
        upload, 
        setUploadTrue,
        setUploadFalse
    };
});