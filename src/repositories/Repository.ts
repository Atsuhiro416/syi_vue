import axios from "axios";

const baseDomain: string = process.env.local.VUE_APP_API_BASE_UR;
const baseURL = `${baseDomain}/api`;

const url = axios.create({
  baseURL: baseURL,
});

export default {
  url,
};
