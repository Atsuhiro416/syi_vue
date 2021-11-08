import Repository from "./Repository";

export default {
  getUserLists(userId: number) {
    return Repository.url.get(`users/${userId}/stacks`);
  },

  getUserListCounts(userId: number) {
    return Repository.url.get(`users/${userId}/stack-counts`);
  },

  createList(payload: any) {
    return Repository.url.post("/stacks", payload);
  },

  showList(listId: number) {
    return Repository.url.get(`/stacks/${listId}`);
  },

  updateList(listId: number, payload: any) {
    return Repository.url.put(`/stacks/${listId}`, payload);
  },

  deleteList(listId: number) {
    return Repository.url.delete(`/stacks/${listId}`);
  },
};
