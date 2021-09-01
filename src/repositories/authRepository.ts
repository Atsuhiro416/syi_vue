import Repository from "./Repository";

export default {
  register(payload: any) {
    return Repository.url.post("/register", payload);
  },

  login(payload: any) {
    return Repository.url.post("/login", payload);
  },

  logout(payload: any) {
    return Repository.url.post("/logout", payload);
  },
};
