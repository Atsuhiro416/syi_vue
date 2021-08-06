import axios from "axios";

const baseDomain: string = process.env.VUE_APP_API_BASE_URL;
const baseURL = `${baseDomain}/api`;

const url = axios.create({
  baseURL: baseURL,
});

export default {
  url,
};
