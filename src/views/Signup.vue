<template>
  <div class="signup">
    <h1 class="signup__logo">SYI</h1>
    <auth-form
      @button-action="signup"
      :link-name="linkName"
      :email-error-message="emailErrorMessage"
      :password-error-message="passwordErrorMessage"
    >
      <template #cardTitle>新規登録</template>
      <template #buttonName>新規登録</template>
      <template #link>ログインする</template>
    </auth-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AuthForm from "../components/AuthForm.vue";
import authRepository from "../repositories/authRepository";

export default defineComponent({
  data() {
    return {
      linkName: "Login",
      emailErrorMessage: "",
      passwordErrorMessage: "",
    };
  },
  methods: {
    signup(email: string, password: string) {
      authRepository
        .register({
          email: email,
          password: password,
        })
        .then((res) => {
          this.$router.push({
            name: "Login",
            params: { userRegisteredMessage: res.data.message },
          });
        })
        .catch((e) => {
          this.emailErrorMessage = "";
          this.passwordErrorMessage = "";
          const emailMessage: string = e.response.data.errors.email;
          if (emailMessage) {
            this.emailErrorMessage = emailMessage[0];
          }
          const passwordMessage: string = e.response.data.errors.password;
          if (passwordMessage) {
            this.passwordErrorMessage = passwordMessage[0];
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

.signup {
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
