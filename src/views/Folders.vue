<template>
  <div class="folders">folders</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
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
});
</script>

<style lang="scss" scoped></style>
