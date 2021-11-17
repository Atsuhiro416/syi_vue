import axios from "axios";
import router from "../router/index";
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

url.interceptors.response.use(
  (res) => {
    return res;
  },
  (e) => {
    if (e.response.status === 404) {
      router.replace("/not-found");
    }

    return Promise.reject(e);
  }
);

export default {
  url,
};
