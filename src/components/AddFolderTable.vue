<template>
  <div class="add-folder">
    <div class="add-folder__top">
      <p class="add-folder__name">フォルダ</p>
      <Plus @click="toggleModal" />
    </div>
    <hr class="add-folder__line" />
    <div class="add-folder__folder-lists">
      <div
        v-for="folder in folders"
        :key="folder.id"
        class="add-folder__folder"
      >
        <p class="add-folder__folder-name">{{ folder.name }}</p>
      </div>
    </div>
  </div>

  <AddFolderModal
    v-if="isModal"
    :toggle-modal="toggleModal"
    @set-folder="setFolder"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AddFolderModal from "./AddFolderModal.vue";
import Plus from "./icons/Plus.vue";

interface Folder {
  id: number;
  name: string;
}

export default defineComponent({
  data(): {
    isModal: boolean;
    folders: Folder[];
  } {
    return {
      isModal: false,
      folders: [],
    };
  },
  methods: {
    setFolder(folder: Folder) {
      const isFolder = this.folders.some((e) => e.id === folder.id);
      if (!isFolder) {
        this.folders.push(folder);
      }
    },

    toggleModal() {
      this.isModal = !this.isModal;
    },
  },
  components: {
    AddFolderModal,
    Plus,
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

.add-folder {
  width: 50%;
  margin: 5px auto 0;

  @include tab {
    width: 70vw;
  }

  &__top {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }

  &__name {
    font-size: 1.5rem;
    height: 30px;
    line-height: 35px;
    margin-right: 20px;
  }

  &__line {
    margin: 0;
    border-top: 2px solid #cccccc;
  }

  &__folder {
    margin-top: 20px;
    padding-bottom: 5px;
    font-size: 1.5rem;
    border-bottom: 2px solid #cccccc;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    @include tab {
      width: 70vw;
    }

    &-name {
      white-space: pre-line;
      word-break: break-word;
      width: 80%;
    }
  }
}
</style>
