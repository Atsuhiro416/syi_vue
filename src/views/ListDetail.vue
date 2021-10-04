<template>
  <div class="list-detail">
    <SideMenu />
    <div class="list-detail-main">
      <logged-header>
        <template #header-name>{{ limitedListName }}</template>
      </logged-header>

      <div class="list-detail__form">
        <div class="form__field">
          <p class="form__field--name">名前</p>
          <AdjustableTextArea
            class="form__field--input"
            :class="[isValidatedName ? '' : 'form__field--error']"
            :input="list.name"
            @get-text="getName"
            @validate-text="validateName"
          />
          <span class="form__field--input-length"
            >{{ list.name.length }}/250</span
          >
          <div v-if="isValidatedName" class="form__field--empty"></div>
          <p class="form__field--error-message" v-if="!isValidatedName">
            {{ errorMessage.name }}
          </p>
        </div>

        <div class="form__field">
          <div class="form__field--name">
            <p class="form__field--list-name">リンク</p>
            <a
              class="form__field--list-link"
              target="_blank"
              rel="noopener noreferrer"
              v-if="list.link"
              :href="list.link"
            >
              <Link />
            </a>
          </div>
          <Form v-slot="{ errors }">
            <Field
              name="link"
              v-model.trim="list.link"
              class="form__field--input"
              :class="[
                errors.link || errorMessage.link ? 'form__field--error' : '',
              ]"
              rules="max:250"
              @input="clearLinkErrorMessage"
            />
            <span class="form__field--input-length"
              >{{ listLinkLength }}/250</span
            >
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
            :input="list.comment"
            @get-text="getComment"
            @validate-text="validateComment"
          />
          <span class="form__field--input-length"
            >{{ listCommentLength }}/250</span
          >
          <div v-if="isValidatedComment" class="form__field--empty"></div>
          <p class="form__field--error-message" v-if="!isValidatedComment">
            {{ errorMessage.comment }}
          </p>
        </div>
      </div>
      <!-- /.list-detail__form -->

      <AddFolderTable
        @get-folder-ids="getFolderIds"
        @delete-folder-id="deleteFolderId"
        ref="folders"
      />
      <div class="list-detail__buttons">
        <button class="list-detail__buttons--update" @click="updateList">
          更新
        </button>
        <button class="list-detail__buttons--delete" @click="deleteList">
          削除
        </button>
      </div>
    </div>
    <!-- /.list-detail-main -->
  </div>
  <!-- /.list-detail -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoggedHeader from "../components/Header.vue";
import SideMenu from "../components/SideMenu.vue";
import AdjustableTextArea from "../components/AjustableTextArea.vue";
import AddFolderTable from "../components/AddFolderTable.vue";
import Link from "../components/icons/Link.vue";
import listRepository from "../repositories/listRepository";
import { Field, Form } from "vee-validate";
import "../plugins/veeValidate";

interface List {
  id: number;
  name: string;
  link: string;
  comment: string;
  folders: Folder[];
  created_at: string;
  updated_at: string;
}

interface Folder {
  id: number;
  name: string;
}

export default defineComponent({
  props: {
    listId: String,
  },
  data(): {
    list: List;
    listName: string;
    listLink: string;
    listComment: string;
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
      list: {
        id: 0,
        name: "",
        link: "",
        comment: "",
        folders: [],
        created_at: "",
        updated_at: "",
      },
      //slotの#header-nameがlist.nameを参照するとv-modelで値が変更されるのでlistNameを見るようにする
      listName: "",
      listLink: "",
      listComment: "",
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
    getList() {
      listRepository
        .showList(this.convertListId)
        .then((res) => {
          const data = res.data.data[0];
          this.list = data;
          this.listName = data.name;
          this.listLink = data.link;
          this.listComment = data.comment;
          //中間テーブルの情報が取得されるので削除
          for (const folder of data.folders) {
            delete folder.pivot;
          }
        })
        .catch((e) => {
          const error = e.response;
          alert(
            `${error.status} ${error.statusText}\n問題が発生しました。\nもう一度操作してください。`
          );
        });
    },

    updateList() {
      if (
        !this.validateName(this.list.name) ||
        !this.validateComment(this.list.comment)
      ) {
        return false;
      }
      if (
        !this.comparisonListName() &&
        !this.comparisonListLink() &&
        !this.comparisonListComment()
      ) {
        return false;
      }

      listRepository
        .updateList(this.convertListId, {
          name: this.list.name,
          link: this.list.link,
          comment: this.list.comment,
        })
        .then((res) => {
          this.getList();
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
        });
    },

    deleteList() {
      const confirmDeleteList = confirm(
        `${this.listName}\nを本当に削除しますか？`
      );
      if (confirmDeleteList) {
        listRepository
          .deleteList(this.list!.id)
          .then((res) => {
            alert(res.data.message);
            this.$router.push({ name: "CreateList" });
          })
          .catch((e) => {
            alert(e.response.data.message);
          });
      }
    },

    getName(text: string) {
      this.list.name = text;
    },

    getComment(text: string) {
      this.list.comment = text;
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

      if (text === null) {
        return true;
      }

      if (text.length > 250) {
        this.isValidatedComment = false;
        this.errorMessage.comment = "入力できる文字数は250字以内です";
        return false;
      }

      return true;
    },

    comparisonListName() {
      if (this.listName === this.list.name) {
        return false;
      }
      return true;
    },
    comparisonListLink() {
      if (this.listLink === this.list.link) {
        return false;
      }
      return true;
    },
    comparisonListComment() {
      if (this.listComment === this.list.comment) {
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
  computed: {
    convertListId(): number {
      return parseInt(this.listId!);
    },

    listLinkLength(): number {
      if (this.list.link === null) {
        return 0;
      }
      return this.list.link.length;
    },

    listCommentLength(): number {
      if (this.list.comment === null) {
        return 0;
      }
      return this.list.comment.length;
    },

    limitedListName(): string {
      const width = window.innerWidth;
      const listName = this.listName;
      const listNameLength = this.listName.length;

      if (width <= 1024 && listNameLength > 10) {
        return listName.substring(0, 10) + "...";
      }

      if (width <= 1200 && listNameLength > 15) {
        return listName.substring(0, 15) + "...";
      }

      if (listNameLength > 20) {
        return listName.substring(0, 20) + "...";
      }

      return listName;
    },
  },
  created() {
    this.getList();
  },
  components: {
    LoggedHeader,
    SideMenu,
    AdjustableTextArea,
    AddFolderTable,
    Link,
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

@mixin button($color) {
  color: #ffffff;
  background-color: lighten($color, 20%);
  width: 20%;
  height: 2;
  line-height: 2;
  padding: 2px 5px;
  border-radius: 10px;
  font-size: 20px;
  border-bottom: solid 3px lighten($color, 10%);

  @include pc {
    width: 10vw;
  }
  @include sp {
    width: 20vw;
  }

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: translateY(2px);
    border-bottom: none;
  }
}

.list-detail {
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

  &__buttons {
    width: 100%;
    margin: 5vh 0;
    text-align: center;

    @include tab {
      margin: 2vh 0;
    }

    &--update {
      @include button(#125d98);
      margin-right: 5vw;
    }
    &--delete {
      @include button(#e60000);
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
        display: flex;
        align-items: center;

        @include tab {
          width: 70vw;
        }
      }

      &--list {
        &-name {
          margin-right: 10px;
        }
        &-link {
          text-decoration: none;

          &:visited {
            color: inherit;
          }

          @include sp {
            margin-right: 5vw;
          }
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
  }
}
</style>
