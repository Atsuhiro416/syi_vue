import axios from "axios";
import store from "@/store";

const baseDomain: string = process.env.VUE_APP_API_BASE_URL;
const baseURL = `${baseDomain}/api`;

const url = axios.create({
  baseURL: baseURL,
});

const apiToken = store.getters.getApiToken;
if (apiToken) {
  url.defaults.headers.common["Authorization"] = `Bearer ${apiToken}`;
}

export default {
  url,
};
