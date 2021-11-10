import Repository from "./Repository";

export default {
  getUserFolders(userId: number) {
    return Repository.url.get(`users/${userId}/folders`);
  },

  getUserFolderCounts(userId: number) {
    return Repository.url.get(`users/${userId}/folder-counts`);
  },

  createFolder(payload: any) {
    return Repository.url.post("/folders", payload);
  },

  showFolder(folderId: number) {
    return Repository.url.get(`/folders/${folderId}`);
  },

  updateFolder(folderId: number, payload: any) {
    return Repository.url.put(`/folders/${folderId}`, payload);
  },

  deleteFolder(folderId: number) {
    return Repository.url.delete(`/folders/${folderId}`);
  },
};
