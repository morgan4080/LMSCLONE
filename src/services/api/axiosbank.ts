import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BANK_API_BASE_URL}`,
  // timeout: 1000,
  //   headers: {'Authorization': 'foobar'}
});

export default instance;
