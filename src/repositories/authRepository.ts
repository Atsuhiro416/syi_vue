import Repository from "./Repository";

export default {
  register(payload: any) {
    return Repository.url.post("/register", payload);
  },
};
