import Repository from "./Repository";
import store from "@/store";

const userId = store.getters.getUserInfo.id;

export default {
  getUserLists() {
    return Repository.url.get(`users/${userId}/stacks`);
  },

  createList(payload: any) {
    return Repository.url.post("/stacks", payload);
  },

  showList(id: number) {
    return Repository.url.get(`/stacks/${id}`);
  },

  updateList(id: number, payload: any) {
    return Repository.url.put(`/stacks/${id}`, payload);
  },

  deleteList(id: number) {
    return Repository.url.delete(`/stacks/${id}`);
  },
};
