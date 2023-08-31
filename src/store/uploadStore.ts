import { ref } from "vue";
import { defineStore } from "pinia";
import { AxiosError,  AxiosResponse } from "axios";
import axiosBank from "@/services/api/axiosbank";
import axiosMobile from "@/services/api/axiosInstance";
export const useUploadStore = defineStore("upload", () => {
  const upload = ref(false);

  const setUploadTrue = () => (upload.value = true);
  const setUploadFalse = () => (upload.value = false);

  const checkForPassword = async (
    context: "BANK" | "MOBILE",
    file: File
  ): Promise<{ message: string; passwordRequired: boolean }> => {
    const formData = new FormData();
    formData.append("file", file);
    const axiosCall = () => {
      if (context == "BANK") {
        return axiosBank.post("/bank_analysis/check_encryption", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        });
      } else {
        return axiosMobile.post("/e_statement/check_encryption", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        });
      }
    };
    return axiosCall()
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
