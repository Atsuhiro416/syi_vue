<template>
  <div class="home">
    <h1 class="home__logo">SYI</h1>
    <auth-form
      @button-action="login"
      :link-name="linkName"
      :email-error-message="emailErrorMessage"
      :password-error-message="passwordErrorMessage"
    >
      <template #cardTitle>ログイン</template>
      <template #buttonName>ログイン</template>
      <template #link>アカウントを作る</template>
    </auth-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AuthForm from "../components/AuthForm.vue";
import Repository from "../repositories/Repository";
import authRepository from "../repositories/authRepository";
import store from "@/store";

export default defineComponent({
  props: {
    userRegisteredMessage: String,
  },
  data() {
    return {
      linkName: "Signup",
      emailErrorMessage: "",
      passwordErrorMessage: "",
    };
  },
  methods: {
    login(email: string, password: string) {
      authRepository
        .login({
          email: email,
          password: password,
        })
        .then((res) => {
          store.commit("login", res);
          Repository.url.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.data.data.api_token}`;
          this.$router.push("/home");
        })
        .catch((e) => {
          this.emailErrorMessage = "";
          this.passwordErrorMessage = "";
          const status: number = e.response.status;
          const errorMessage: string = e.response.data.message;
          if (status === 404) {
            this.emailErrorMessage = errorMessage;
          }
          if (status === 401) {
            this.passwordErrorMessage = errorMessage;
          }
        });
    },
  },
  components: {
    AuthForm,
  },
});
</script>

<style lang="scss" scoped>
$tab: 769px;
$sp: 481px;

@mixin tab {
  @media (max-width: ($tab)) {
    @content;
  }
}

@mixin sp {
  @media (max-width: ($sp)) {
    @content;
  }
}

.home {
  text-align: center;
  background-color: lighten(#125d98, 20%);
  height: 100%;

  &__logo {
    color: #ffffff;
    font-size: 2rem;
    padding-top: 2%;
    margin-bottom: 2%;

    @include tab {
      padding-top: 5%;
      margin-bottom: 5%;
    }
  }
}
</style>
