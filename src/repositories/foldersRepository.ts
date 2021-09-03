import Repository from "./Repository";
import store from "@/store";

const userId = store.getters.getUserInfo.id;

export default {
  getUserFolders() {
    return Repository.url.get(`users/${userId}/folders`);
  },

  createFolder(payload: any) {
    return Repository.url.post("/folders", payload);
  },

  showFolder(id: number) {
    return Repository.url.get(`/folders/${id}`);
  },

  updateFolder(id: number, payload: any) {
    return Repository.url.put(`/folders/${id}`, payload);
  },

  deleteFolder(id: number) {
    return Repository.url.delete(`/folders/${id}`);
  },
};
