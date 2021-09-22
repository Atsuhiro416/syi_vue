<template>
  <div class="modal-window" @click.self="toggleModal">
    <div class="modal-window__content">
      <p class="modal-window__content--name">フォルダを選択する</p>

      <div class="modal-window__folders-cards">
        <FolderCard
          v-for="folder in folders"
          :key="folder.id"
          :folder="folder"
          :just-display="true"
          @get-the-folder="getTheFolder"
        />
      </div>

      <Close class="modal-window__content--closer" @click="toggleModal" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FoldersRepository from "../repositories/foldersRepository";
import FolderCard from "../components/FolderCard.vue";
import Close from "../components/icons/Close.vue";

interface Folder {
  id: number;
  name: string;
}

export default defineComponent({
  props: {
    toggleModal: Function,
  },
  data(): {
    folders: [];
    selectedFolders: Folder[];
  } {
    return {
      folders: [],
      selectedFolders: [],
    };
  },
  methods: {
    getFolders() {
      FoldersRepository.getUserFolders()
        .then((res) => {
          this.folders = res.data.data;
        })
        .catch((e) => {
          console.log(e.resopnse);
          alert("問題が発生しました。");
        });
    },

    getTheFolder(id: number, name: string) {
      const folder = {
        id: id,
        name: name,
      };
      this.$emit("set-folder", folder);
    },
  },
  created() {
    this.getFolders();
  },
  components: {
    FolderCard,
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

::-webkit-scrollbar {
  width: 5px;

  &-track {
    background: lighten(#000000, 90%);
  }
  &-thumb {
    background: lighten(#000000, 50%);
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
    width: 80%;
    height: 90%;
    border-radius: 20px;
    background-color: #ffffff;
    text-align: center;
    box-sizing: border-box;
    padding: 10vh 5vw 5vh;
    position: relative;

    &--name {
      font-size: 2rem;
      margin-bottom: 5vh;

      @include sp {
        font-size: 1.2rem;
        margin-top: 5vh;
      }
    }

    &--closer {
      position: absolute;
      top: 5%;
      right: 5%;
      color: #000000;
    }
  }

  &__folders-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    height: 85%;
    overflow-y: auto;

    &::after {
      display: block;
      content: "";
      width: 300px;
    }
  }
}
</style>
