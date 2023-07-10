import { ref } from "vue";
import { defineStore } from "pinia";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
const AXIOSBANK: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BANK_API_BASE_URL}`,
});
export const useUploadStore = defineStore("upload", () => {
  const upload = ref(false);

  const setUploadTrue = () => (upload.value = true);
  const setUploadFalse = () => (upload.value = false);

  const checkForPassword = async (
    file: File
  ): Promise<{ message: string; passwordRequired: boolean }> => {
    const formData = new FormData();
    formData.append("file", file);
    return AXIOSBANK.post("/bank_analysis/check_encryption", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    })
      .then(
        (
          response: AxiosResponse<{
            message: string;
            passwordRequired: boolean;
          }>
        ) => {
          return response.data;
        }
      )
      .catch((error: AxiosError) => {
        throw new Error(error.message);
      });
  };

  return {
    upload,
    setUploadTrue,
    setUploadFalse,
    checkForPassword,
  };
});
