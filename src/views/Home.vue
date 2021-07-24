<template>
  <div class="home">
    <h1 class="home__logo">SYI</h1>
    <auth-form :link-name="name" @button-action="login">
      <template #cardTitle>ログイン</template>
      <template #buttonName>ログイン</template>
      <template #link>アカウントを作る</template>
    </auth-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AuthForm from "../components/AuthForm.vue";

export default defineComponent({
  data() {
    return {
      name: "About",
      email: "",
      password: "",
    };
  },
  methods: {
    login(email: string, password: string) {
      this.email = email;
      this.password = password;
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
