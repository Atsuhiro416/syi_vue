<template>
  <div class="modal-window" @click.self="closeModal">
    <div class="modal-window__content">
      <p class="modal-window__content--name">フォルダを編集する</p>

      <Form v-slot="{ errors }">
        <div class="modal-window__content--field">
          <Field
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
          <div class="modal-window__content--dates">
            <p>作成日：{{ folder.created_at.substring(0, 10) }}</p>
            <p>更新日：{{ folder.updated_at.substring(0, 10) }}</p>
          </div>
        </div>
      </Form>

      <div class="modal-window__buttons">
        <button class="modal-window__buttons--update" @click="updateFolder">
          更新
        </button>
        <button class="modal-window__buttons--delete" @click="deleteFolder">
          削除
        </button>
      </div>

      <Close class="modal-window__content--closer" @click="closeModal" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Field, Form } from "vee-validate";
import "../plugins/veeValidate";
import FoldersRepository from "../repositories/foldersRepository";
import Close from "./icons/Close.vue";

interface Folder {
  id: number;
  name: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export default defineComponent({
  props: {
    folder: Object as PropType<Folder>,
    getFolders: Function,
  },
  data() {
    return {
      folderName: "",
      errorMessage: "",
    };
  },
  methods: {
    updateFolder() {
      if (
        this.folder!.name === this.folderName ||
        !this.folderName ||
        this.folderName.length > 250
      ) {
        return;
      }

      FoldersRepository.updateFolder(this.folder!.id, {
        name: this.folderName,
      })
        .then((res) => {
          this.getFolders!();
          this.closeModal();
        })
        .catch((e) => {
          this.errorMessage = e.response.data.error.name[0];
        });
    },

    deleteFolder() {
      const confirmDeleteFolder = confirm(
        `${this.folder!.name}\nを本当に削除しますか？`
      );

      if (confirmDeleteFolder) {
        FoldersRepository.deleteFolder(this.folder!.id)
          .then((res) => {
            this.closeModal();
            alert(res.data.message);
            this.getFolders!();
          })
          .catch((e) => {
            alert(e.response.data.message);
          });
      }
    },

    getFolderName() {
      this.folderName = this.folder!.name;
    },

    closeModal() {
      this.$emit("toggle-update-folder-modal");
    },
  },
  created() {
    this.getFolderName();
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

@mixin button($color) {
  color: #ffffff;
  background-color: lighten($color, 20%);
  width: 10vw;
  line-height: 2;
  border-radius: 10px;
  font-size: 20px;
  border-bottom: solid 4px $color;

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
    width: 40%;
    font-size: 1.5rem;
  }
  @include sp {
    margin-top: 10%;
    width: 80%;
  }
}

.modal-window {
  position: fixed;
  top: 0;
  left: 0;
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
        height: 7vh;
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

    &--dates {
      margin-bottom: 5vh;

      @include sp {
        font-size: 1rem;
      }
    }

    &--closer {
      position: absolute;
      top: 5%;
      right: 5%;
      color: #000000;
    }
  }

  &__buttons {
    display: flex;
    justify-content: space-evenly;

    @include sp {
      flex-wrap: wrap;
    }

    &--update {
      @include button(#125d98);
    }

    &--delete {
      @include button(#e60000);
    }
  }
}
</style>
