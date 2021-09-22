<template>
  <div class="create-list">
    <SideMenu />
    <div class="create-list-main">
      <logged-header>
        <template #header-name>リスト作成</template>
      </logged-header>

      <div class="create-list__form">
        <div class="form__field">
          <p class="form__field--name">名前</p>
          <AdjustableTextArea
            class="form__field--input"
            :class="[isValidatedName ? '' : 'form__field--error']"
            :input="name"
            @get-text="getName"
            @validate-text="validateName"
          />
          <span class="form__field--input-length">{{ name.length }}/250</span>
          <div v-if="isValidatedName" class="form__field--empty"></div>
          <p class="form__field--error-message" v-if="!isValidatedName">
            {{ errorMessage.name }}
          </p>
        </div>

        <div class="form__field">
          <p class="form__field--name">リンク</p>
          <Form v-slot="{ errors }">
            <Field
              name="link"
              v-model.trim="link"
              class="form__field--input"
              :class="[
                errors.link || errorMessage.link ? 'form__field--error' : '',
              ]"
              rules="max:250"
              @input="clearLinkErrorMessage"
            />
            <span class="form__field--input-length">{{ link.length }}/250</span>
            <div
              :class="[
                errors.link || errorMessage.link ? '' : 'form__field--empty',
              ]"
            ></div>
            <p class="form__field--error-message" v-if="errors.link">
              {{ errors.link }}
            </p>
            <p class="form__field--error-message" v-else-if="errorMessage.link">
              {{ errorMessage.link }}
            </p>
          </Form>
        </div>

        <div class="form__field">
          <p class="form__field--name">コメント</p>
          <AdjustableTextArea
            class="form__field--input"
            :class="[isValidatedComment ? '' : 'form__field--error']"
            :input="comment"
            @get-text="getComment"
            @validate-text="validateComment"
          />
          <span class="form__field--input-length"
            >{{ comment.length }}/250</span
          >
          <div v-if="isValidatedComment" class="form__field--empty"></div>
          <p class="form__field--error-message" v-if="!isValidatedComment">
            {{ errorMessage.comment }}
          </p>
        </div>
      </div>
      <!-- /.create-list__form -->

      <AddFolderTable
        @get-folder-ids="getFolderIds"
        @delete-folder-id="deleteFolderId"
      />
      <div class="create-list__button">
        <button class="form__button" @click="createList">作成</button>
      </div>
    </div>
    <!-- /.create-list-main -->
  </div>
  <!-- /.create-list -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import LoggedHeader from "../components/Header.vue";
import SideMenu from "../components/SideMenu.vue";
import AdjustableTextArea from "../components/AjustableTextArea.vue";
import AddFolderTable from "../components/AddFolderTable.vue";
import listRepository from "../repositories/listRepository";
import { Field, Form } from "vee-validate";
import "../plugins/veeValidate";

export default defineComponent({
  data(): {
    name: string;
    link: string;
    comment: string;
    isValidatedName: boolean;
    isValidatedComment: boolean;
    errorMessage: {
      name: string;
      comment: string;
      link: string;
    };
    selectedFolderIds: number[];
  } {
    return {
      name: "",
      link: "",
      comment: "",
      isValidatedName: true,
      isValidatedComment: true,
      errorMessage: {
        name: "",
        comment: "",
        link: "",
      },
      selectedFolderIds: [],
    };
  },
  methods: {
    createList() {
      if (
        !this.validateName(this.name) ||
        !this.validateComment(this.comment)
      ) {
        return false;
      }

      const userId = store.getters.getUserInfo.id;

      listRepository
        .createList({
          name: this.name,
          link: this.link,
          comment: this.comment,
          user_id: userId,
        })
        .then((res) => {
          //分割代入でname,link,commentを空に
          [this.name, this.link, this.comment] = ["", "", ""];
        })
        .catch((e) => {
          const error = e.response;
          if (error.status === 400) {
            this.errorMessage.link = error.data.error.link[0];
            return false;
          }
          alert(
            `${error.status} ${error.statusText}\n問題が発生しました。\nもう一度操作してください。`
          );
          return false;
        });
    },

    getName(text: string) {
      this.name = text;
    },

    getComment(text: string) {
      this.comment = text;
    },

    validateName(text: string) {
      this.isValidatedName = true;

      if (!text) {
        this.isValidatedName = false;
        this.errorMessage.name = "入力は必須です";
        return false;
      }

      if (text.length > 250) {
        this.isValidatedName = false;
        this.errorMessage.name = "入力できる文字数は250字以内です";
        return false;
      }

      return true;
    },
    validateComment(text: string) {
      this.isValidatedComment = true;
      if (text.length > 250) {
        this.isValidatedComment = false;
        this.errorMessage.comment = "入力できる文字数は250字以内です";
        return false;
      }

      return true;
    },

    clearLinkErrorMessage() {
      this.errorMessage.link = "";
    },

    getFolderIds(id: number) {
      this.selectedFolderIds.push(id);
    },

    deleteFolderId(id: number) {
      const remainFolders = this.selectedFolderIds.filter((e) => e !== id);
      this.selectedFolderIds = remainFolders;
    },
  },
  components: {
    LoggedHeader,
    SideMenu,
    AdjustableTextArea,
    AddFolderTable,
    Form,
    Field,
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

.create-list {
  width: 100%;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 15% 85%;
  grid-template-areas: "nav main";

  @include pc {
    grid-template-columns: 20% 80%;
  }
  @include tab {
    grid-template-areas: "main main";
  }

  &-main {
    grid-area: main;
  }
  &-nav {
    grid-area: nav;
  }

  &__form {
    width: 100%;
    margin-top: 5vh;
    text-align: center;
  }

  &__button {
    width: 100%;
    margin: 5vh 0;
    text-align: center;

    @include tab {
      margin: 2vh 0;
    }
  }

  .form {
    &__field {
      margin-bottom: 5vh;

      &--name {
        font-size: 1.5rem;
        margin-bottom: 5px;
        width: 50%;
        margin: 5px auto 0;
        text-align: left;

        @include tab {
          width: 70vw;
        }
      }

      &--input {
        font-size: 1.2rem;
        width: 50%;

        @include pc {
          font-size: 1.7rem;
        }
        @include tab {
          width: 70vw;
        }
        @include sp {
          font-size: 1rem;
        }

        &-length {
          position: absolute;
          font-size: 10px;
        }
      }

      &--empty {
        height: 22px;
      }

      &--error {
        border: 2px solid #ff0000;

        &-message {
          color: #ff0000;
          margin-top: 5px;
        }
      }
    }

    &__button {
      color: #ffffff;
      background-color: lighten(#125d98, 20%);
      width: 20%;
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

      @include tab {
        margin-top: 5%;
        width: 40%;
      }

      @include sp {
        margin-top: 10%;
        width: 60%;
        font-size: 16px;
      }
    }
  }
}
</style>
