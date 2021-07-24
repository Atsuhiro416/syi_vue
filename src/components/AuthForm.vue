<template>
  <div class="auth-card">
    <h2 class="auth-card__title">
      <slot name="cardTitle"></slot>
    </h2>
    <div class="auth-card__inputs">
      <div class="auth-card__inputs--field">
        <input type="email" placeholder="メールアドレス" v-model="email" />
      </div>
      <div class="auth-card__inputs--field">
        <input type="password" placeholder="パスワード" v-model="password" />
      </div>
    </div>
    <button class="auth-card__button" @click="action">
      <slot name="buttonName"></slot>
    </button>
    <div class="auth-card__link">
      <router-link :to="{ name: linkName }">
        <slot name="link"></slot>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    linkName: String,
    buttonAction: Function,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    action() {
      this.$emit("button-action", this.email, this.password);
    },
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

.auth-card {
  text-align: center;
  margin: 0 auto;
  background-color: #ffffff;
  height: 70%;
  width: 50%;
  border-radius: 10px;
  padding: 30px;

  &__title {
    font-size: 1.5rem;
    margin-bottom: 8%;

    @include sp {
      font-size: 1.2rem;
      margin-bottom: 15%;
    }
  }

  &__inputs {
    &--field {
      padding-bottom: 5%;

      @include tab {
        padding-bottom: 10%;
      }

      @include sp {
        padding-bottom: 20%;
      }

      input {
        height: 40px;
        width: 60%;
        font-size: 1.2rem;

        @include tab {
          width: 70%;
        }

        @include sp {
          width: 90%;
          font-size: 1rem;
        }
      }
    }
  }

  &__button {
    color: #ffffff;
    background-color: lighten(#3c8dad, 10%);
    width: 40%;
    height: 10%;
    border-radius: 10px;
    margin-top: 5%;
    font-size: 20px;
    border-bottom: solid 4px #3c8dad;

    &:hover {
      opacity: 0.9;
    }

    &:active {
      transform: translateY(2px);
      border-bottom: none;
    }

    @include tab {
      margin-top: 5%;
      width: 70%;
    }

    @include sp {
      margin-top: 10%;
      width: 90%;
    }
  }

  &__link {
    margin-top: 10%;
    font-size: 20px;

    &:hover {
      opacity: 0.7;
    }

    @include tab {
      margin-top: 20%;
    }

    @include sp {
      margin-top: 30%;
    }
  }
}
</style>
