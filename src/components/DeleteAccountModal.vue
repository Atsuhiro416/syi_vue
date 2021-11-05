<template>
  <div class="modal-window" @click.self="toggleDeleteAccountModal">
    <div class="modal-window__content">
      <h2 class="delete-account__message">本当にアカウントを削除しますか？</h2>
      <button class="delete-account__button" @click="deleteUser">削除</button>
      <Close
        class="modal-window__content--closer"
        @click="toggleDeleteAccountModal"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import usersRepository from "../repositories/usersRepository";
import Close from "./icons/Close.vue";

export default defineComponent({
  props: {
    toggleDeleteAccountModal: Function,
  },
  data() {
    return {};
  },
  methods: {
    deleteUser() {
      const confirmDeleteUser = confirm(
        "この操作は取り消せません\n削除しますか？"
      );

      if (confirmDeleteUser) {
        usersRepository
          .deleteUser()
          .then((res) => {
            this.$router.push("/exit");
          })
          .catch((e) => {
            const error = e.response;
            alert(
              `${error.status} ${error.statusText}\n問題が発生しました。\nもう一度操作してください。`
            );
          });
      }
    },
  },
  components: {
    Close,
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

.delete-account {
  &__message {
    font-size: 2rem;
    margin: 10vh 0;
    overflow-wrap: break-word;
  }

  &__button {
    color: #ffffff;
    background-color: #f44336;
    width: 20vw;
    line-height: 2;
    border-radius: 10px;
    margin-top: 10vh;
    font-size: 20px;
    box-shadow: 0 4px 0 darken(#f44336, 10%);

    &:hover {
      opacity: 0.9;
    }

    &:active {
      transform: translate3d(0, 4px, 0);
      box-shadow: none;
    }

    @include tab {
      margin-top: 5%;
      font-size: 25px;
      width: 70%;
      height: 7vh;
    }

    @include sp {
      margin-top: 10%;
      width: 90%;
    }
  }
}
</style>
