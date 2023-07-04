import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "https://staging-lending.presta.co.ke/scoring/api/v1",
  // timeout: 1000,
  //   headers: {'Authorization': 'foobar'}
});

export default instance;
