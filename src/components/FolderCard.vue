<template>
  <div class="folder-card" @click.self="transitionToTheFolder">
    <p class="folder-card__name" @click="transitionToTheFolder">
      {{ limitedFolderName }}
    </p>
    <Edit
      v-if="!justDisplay"
      class="folder-card__edit"
      @click="toggleUpdateFolderModal"
    />
  </div>
  <UpdateFolderModal
    v-if="isModal"
    :folder="folder"
    :get-folders="getFolders"
    @toggle-update-folder-modal="toggleUpdateFolderModal"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import UpdateFolderModal from "./UpdateFolderModal.vue";
import Edit from "../components/icons/Edit.vue";

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
    justDisplay: Boolean,
  },
  emits: ["getTheFolder"],
  data() {
    return {
      isModal: false,
    };
  },
  methods: {
    toggleUpdateFolderModal() {
      this.isModal = !this.isModal;
    },

    transitionToTheFolder() {
      if (this.justDisplay) {
        this.sendFolderIdName();
        return;
      }

      this.$router.push({
        name: "FolderContents",
        params: {
          folderId: this.folder!.id,
        },
      });
    },

    sendFolderIdName() {
      this.$emit("getTheFolder", this.folder!.id, this.folder!.name);
    },
  },
  computed: {
    limitedFolderName(): string {
      if (this.folder!.name.length >= 82) {
        return this.folder!.name.substring(0, 82) + "...";
      }
      return this.folder!.name;
    },
  },
  components: {
    UpdateFolderModal,
    Edit,
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
.folder-card {
  border: 2px solid #000000;
  width: 300px;
  height: 200px;
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 6px 6px 2px #c8c6c6;
  cursor: pointer;
  position: relative;
  padding: 30px;
  margin-right: 20px;
  margin-bottom: 5vh;

  @include tab {
    margin-right: 10px;
  }
  @include sp {
    margin-right: 0;
  }

  &:hover {
    transform: scale(1.03);
    transition: 0.2s all;
  }

  &__name {
    font-size: 1.2rem;
  }

  &__edit {
    position: absolute;
    bottom: 5%;
    right: 5%;
  }
}
</style>
