import axios from "axios";

const backend = "http://localhost:8080";

// Create an Axios instance with base URL
const instance = axios.create({
  baseURL: backend,
  timeout: 5000, // optional: timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;