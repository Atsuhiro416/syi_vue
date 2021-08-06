import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

interface State {
  user: any;
  apiToken: string | null;
  isAuth: boolean;
}

export default createStore({
  state: {
    user: {},
    apiToken: "",
    isAuth: false,
  },
  getters: {
    getUserInfo(state: State) {
      return state.user;
    },

    getApiToken(state: State) {
      return state.apiToken;
    },

    hasAuthenticated(state: State) {
      return state.isAuth;
    },
  },
  mutations: {
    user(state: State, user: any) {
      state.user = user;
    },

    apiToken(state: State, apiToken: string) {
      state.apiToken = apiToken;
    },

    auth(state: State, auth: boolean) {
      state.isAuth = auth;
    },

    login(state: State, responseLogin: any) {
      const data = responseLogin.data;
      if (responseLogin.status === 200) {
        state.user = data.data;
        state.apiToken = data.data.api_token;
        state.isAuth = data.auth;
      } else {
        alert("もう一度ログインしてください");
      }
    },
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()],
});
