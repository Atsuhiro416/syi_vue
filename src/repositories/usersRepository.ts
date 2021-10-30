import Repository from "./Repository";
import store from "@/store";

const userId = store.getters.getUserInfo.id;

export default {
  showUser() {
    return Repository.url.get(`users/${userId}`);
  },

  updateUser(payload: any) {
    return Repository.url.put(`users/${userId}`, payload);
  },

  deleteUser() {
    return Repository.url.delete(`users/${userId}`);
  },
};
