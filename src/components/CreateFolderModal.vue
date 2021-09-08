<template>
  <div class="modal-window" @click.self="closeModal">
    <div class="modal-window__content">
      <p class="modal-window__content--name">フォルダを作成する</p>

      <Form @submit="createFolder" v-slot="{ errors }">
        <div class="modal-window__content--field">
          <Field
            placeholder="フォルダ名"
            name="folder"
            v-model.trim="folderName"
            class="modal-window__content--input"
            :class="[errors.folder ? 'modal-window__content--error-field' : '']"
            rules="required|max:250"
          />
          <div class="modal-window__content--field-error-message">
            <span v-if="errors.folder">{{ errors.folder }}</span>
            <span v-else-if="errorMessage">{{ errorMessage }}</span>
          </div>
        </div>
        <div>
          <button class="modal-window__content--button">作成</button>
        </div>
      </Form>

      <Close class="modal-window__content--closer" @click="closeModal" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Field, Form } from "vee-validate";
import "../plugins/veeValidate";
import FoldersRepository from "../repositories/foldersRepository";
import store from "@/store";
import Close from "../components/icons/Close.vue";

export default defineComponent({
  props: {
    getFolders: Function,
  },
  data() {
    return {
      folderName: "",
      errorMessage: "",
    };
  },
  methods: {
    createFolder() {
      const userId = store.getters.getUserInfo.id;

      FoldersRepository.createFolder({
        name: this.folderName,
        user_id: userId,
      })
        .then((res) => {
          this.folderName = "";
          this.closeModal();
          if (this.$route.path === "/folders") {
            this.getFolders!();
          }
        })
        .catch((e) => {
          this.errorMessage = e.response.data.error.name[0];
        });
    },

    closeModal() {
      this.$emit("toggle-create-modal");
    },
  },
  components: {
    Field,
    Form,
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

    &--field {
      &-error-message {
        color: #ff0000;
        margin-top: 5px;
        height: 10vh;
      }
    }

    &--error-field {
      border: 2px solid #ff0000;
    }

    &--name {
      font-size: 2rem;
      margin-bottom: 10vh;

      @include sp {
        font-size: 1.2rem;
        margin-top: 5vh;
        // margin-bottom: 15vh;
      }
    }

    &--input {
      height: 40px;
      width: 60%;
      font-size: 1.2rem;
      outline: none;

      @include tab {
        width: 70%;
      }
      @include sp {
        width: 90%;
        font-size: 1rem;
      }
    }

    &--button {
      color: #ffffff;
      background-color: lighten(#125d98, 20%);
      width: 10vw;
      line-height: 2;
      border-radius: 10px;
      font-size: 20px;
      border-bottom: solid 4px #125d98;

      &:hover {
        opacity: 0.9;
      }

      &:active {
        transform: translateY(2px);
        border-bottom: none;
      }

      @include pc {
        width: 20vw;
      }
      @include tab {
        margin-top: 5%;
        width: 70%;
        font-size: 1.5rem;
      }
      @include sp {
        margin-top: 10%;
        width: 80%;
      }
    }

    &--closer {
      position: absolute;
      top: 5%;
      right: 5%;
      color: #000000;
    }
  }
}
</style>
