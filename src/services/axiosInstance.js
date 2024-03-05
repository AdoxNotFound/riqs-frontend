import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://apicaniob.caniob.org/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json", // Set default headers for all requests
  },
});

export default axiosInstance;
