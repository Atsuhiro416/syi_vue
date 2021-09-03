<template>
  <div class="folders">
    <FoldersCard v-for="folder in folders" :key="folder.id" :folder="folder" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FoldersCard from "../components/FolderCard.vue";
import FoldersRepository from "../repositories/foldersRepository";

export default defineComponent({
  data() {
    return {
      folders: [],
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
  },
  created() {
    this.getFolders();
  },
  components: {
    FoldersCard,
  },
});
</script>

<style lang="scss" scoped>
.folders {
  display: flex;
  flex-wrap: wrap;
}
</style>
