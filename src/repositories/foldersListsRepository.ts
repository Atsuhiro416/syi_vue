import Repository from "./Repository";

export default {
  getListsInFolder(folderId: number) {
    return Repository.url.get(`/folders/${folderId}/stacks`);
  },

  attachListToFolder(folderId: number, listId: number) {
    return Repository.url.post(`/folders/${folderId}/stacks/${listId}`);
  },

  detachListToFolder(folderId: number, listId: number) {
    return Repository.url.delete(`/folders/${folderId}/stacks/${listId}`);
  },
};
