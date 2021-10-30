<template>
  <div class="modal-window" @click.self="toggleChangePasswordModal">
    <div class="modal-window__content">
      <Form
        class="change-password__form"
        @submit="changePassword"
        v-slot="{ errors }"
      >
        <div class="change-password__form--field">
          <Field
            placeholder="新しいパスワード"
            name="password"
            :type="[isPassword.main ? 'password' : 'text']"
            v-model.trim="password"
            :class="[
              errors.password || errorMessage.password
                ? 'change-password__form--error-field'
                : '',
              'password-field',
            ]"
            rules="required|alpha_num|min:8"
          />
          <span class="mask" @click="toggleInputType(1)">
            <Eye v-if="isPassword.main" />
            <EyeOff v-else />
          </span>
          <div class="change-password__form--error">
            <span v-if="errors.password">{{ errors.password }}</span>
            <span v-else-if="errorMessage.password">{{
              errorMessage.password
            }}</span>
          </div>
        </div>

        <div class="change-password__form--field">
          <input
            :class="[
              isSamePassword ? '' : 'change-password__form--error-field',
              'password-field',
            ]"
            :type="[isPassword.verifyPassword ? 'password' : 'text']"
            placeholder="新しいパスワード(確認用)"
            v-model.trim="verifyPassword"
          />
          <span class="mask" @click="toggleInputType(2)">
            <Eye v-if="isPassword.verifyPassword" />
            <EyeOff v-else />
          </span>
          <div class="change-password__form--error">
            <span v-if="errorMessage.verifyPassword">{{
              errorMessage.verifyPassword
            }}</span>
          </div>
        </div>
        <button class="change-password__button">変更</button>
      </Form>

      <Close
        class="modal-window__content--closer"
        @click="toggleChangePasswordModal"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Field, Form } from "vee-validate";
import "../plugins/veeValidate";
import Close from "./icons/Close.vue";
import Eye from "./icons/Eye.vue";
import EyeOff from "./icons/EyeOff.vue";

export default defineComponent({
  props: {
    toggleChangePasswordModal: Function,
  },
  data() {
    return {
      password: "",
      verifyPassword: "",
      isPassword: {
        main: true,
        verifyPassword: true,
      },
      isSamePassword: true,
      errorMessage: {
        password: "",
        verifyPassword: "",
      },
    };
  },
  methods: {
    changePassword() {
      const isSameLetter = this.isSameLetter();
      if (!isSameLetter) {
        return false;
      }

      return true;
    },

    isSameLetter() {
      if (this.password === this.verifyPassword) {
        this.isSamePassword = true;
        this.errorMessage.verifyPassword = "";
        return true;
      }

      this.isSamePassword = false;
      this.errorMessage.verifyPassword = "パスワードが一致しません";
      return false;
    },

    toggleInputType(id: number) {
      if (id === 1) {
        this.isPassword.main = !this.isPassword.main;
      }
      if (id === 2) {
        this.isPassword.verifyPassword = !this.isPassword.verifyPassword;
      }
    },
  },
  components: {
    Field,
    Form,
    Close,
    Eye,
    EyeOff,
  },
});
</script>

<style lang="scss" scoped>
$pc: 1024px;
$tab: 769px;
$sp: 481px;

@mixin pc {
  @media (max-width: ($pc)) {
    @content;
  }
}

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

.modal-window {
  position: fixed;
  z-index: 200;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  &__content {
    width: 70%;
    height: 80%;
    border-radius: 20px;
    background-color: #ffffff;
    text-align: center;
    box-sizing: border-box;
    padding: 10vh 5vw;
    position: relative;

    &--closer {
      position: absolute;
      top: 5%;
      right: 5%;
      color: #000000;
    }
  }
}

.change-password {
  &__form {
    margin-top: 5vh;

    &--field {
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
    background-color: #ffa726;
    width: 20vw;
    line-height: 2;
    border-radius: 10px;
    margin-top: 10vh;
    font-size: 20px;
    box-shadow: 0 4px 0 darken(#ffa726, 10%);

    &:hover {
      opacity: 0.9;
    }

    &:active {
      transform: translate3d(0, 4px, 0);
      box-shadow: none;
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
}

.password-field {
  position: relative;
}
.mask {
  position: absolute;
  margin: 9px -35px;
}
</style>
