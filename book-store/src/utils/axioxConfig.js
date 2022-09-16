import axios from "axios";

const BaseUrl = "http://localhost:5000/api/v1/auth";

// axios.defaults.withCredentials = true;

const instance = axios.create({
  baseURL: BaseUrl,
});

export default instance;
