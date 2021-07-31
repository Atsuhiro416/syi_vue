<template>
  <div class="auth-card">
    <h2 class="auth-card__title">
      <slot name="cardTitle"></slot>
    </h2>
    <Form class="auth-card__form" @submit="action" v-slot="{ errors }">
      <div class="auth-card__form--field">
        <Field
          placeholder="メールアドレス"
          name="email"
          type="email"
          v-model.trim="email"
          :class="[
            errors.email || emailErrorMessage
              ? 'auth-card__form--error-field'
              : '',
            ' email-field',
          ]"
          rules="required|email"
        />
        <div class="auth-card__form--error">
          <span v-if="errors.email">{{ errors.email }}</span>
          <span v-else-if="emailErrorMessage">{{ emailErrorMessage }}</span>
        </div>
      </div>
      <!-- ./auth-card__form--field -->
      <div class="auth-card__form--field">
        <Field
          placeholder="パスワード"
          name="password"
          :type="[isPassword ? 'password' : 'text']"
          v-model.trim="password"
          :class="[
            errors.password || passwordErrorMessage
              ? 'auth-card__form--error-field'
              : '',
            'password-field',
          ]"
          rules="required|alpha_num|min:8"
        />
        <span class="mask" @click="isSeePassword">
          <Eye v-if="isPassword" />
          <EyeOff v-else />
        </span>
        <div class="auth-card__form--error">
          <span v-if="errors.password">{{ errors.password }}</span>
          <span v-else-if="passwordErrorMessage">{{
            passwordErrorMessage
          }}</span>
        </div>
      </div>
      <!-- ./auth-card__form--field -->
      <button class="auth-card__button">
        <slot name="buttonName"></slot>
      </button>
    </Form>
    <div class="auth-card__link">
      <router-link :to="{ name: linkName }">
        <slot name="link"></slot>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Form, Field } from "vee-validate";
import "../plugins/veeValidate";
import Eye from "./icons/Eye.vue";
import EyeOff from "./icons/EyeOff.vue";

export default defineComponent({
  props: {
    linkName: String,
    buttonAction: Function,
    emailErrorMessage: String,
    passwordErrorMessage: String,
  },
  components: {
    Form,
    Field,
    Eye,
    EyeOff,
  },
  data() {
    return {
      email: "",
      password: "",
      isPassword: true,
    };
  },
  methods: {
    action() {
      this.$emit("button-action", this.email, this.password);
    },

    isSeePassword() {
      this.isPassword = !this.isPassword;
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

  &__form {
    &--field {
      // padding-bottom: 5%;

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

    &--error {
      display: block;
      color: #ff0000;
      margin-top: 5px;
      height: 40px;

      @include tab {
        height: 30px;
      }

      @include sp {
        height: 10px;
      }

      &-field {
        border: 2px solid #ff0000;
      }
    }
  }

  &__button {
    color: #ffffff;
    background-color: lighten(#3c8dad, 10%);
    width: 40%;
    line-height: 2;
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
      font-size: 16px;
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

  .password-field {
    position: relative;
  }
  .mask {
    position: absolute;
    margin: 9px -35px;
  }
}
</style>
