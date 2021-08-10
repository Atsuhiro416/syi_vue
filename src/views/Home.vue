<template>
  <div class="home">
    <logged-header>
      <template #header-name>リスト</template>
    </logged-header>

    <div class="select-boxes">
      <SortListsSelectBox @sort-lists="sortLists" />
    </div>

    <div class="lists">
      <List v-for="list in lists" :key="list.id" :list="list" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoggedHeader from "../components/Header.vue";
import List from "../components/List.vue";
import SortListsSelectBox from "../components/SortListsSelectBox.vue";
import listRepository from "../repositories/listRepository";

export default defineComponent({
  data() {
    return {
      lists: [],
    };
  },
  methods: {
    getLists() {
      listRepository
        .getUserLists()
        .then((res) => {
          this.lists = res.data.data;
        })
        .catch((e) => {
          console.log(e.response);
          alert("問題が発生しました。");
        });
    },

    sortLists(id: number) {
      const lists = this.lists;

      if (id === 1) {
        lists.sort((a: any, b: any) => {
          return a.created_at < b.created_at ? -1 : 1;
        });
      }
      if (id === 2) {
        lists.sort((a: any, b: any) => {
          return a.created_at < b.created_at ? 1 : -1;
        });
      }
      if (id === 3) {
        lists.sort((a: any, b: any) => {
          return a.updated_at < b.updated_at ? -1 : 1;
        });
      }
      if (id === 4) {
        lists.sort((a: any, b: any) => {
          return a.updated_at < b.updated_at ? 1 : -1;
        });
      }
    },
  },
  created() {
    this.getLists();
  },
  components: {
    LoggedHeader,
    List,
    SortListsSelectBox,
  },
});
</script>

<style lang="scss" scoped>
.select-boxes {
  margin-top: 2vh;
  margin-left: 8vw;
}
</style>
