<template>
  <div class="home">
    <logged-header>
      <template #header-name>リスト</template>
    </logged-header>

    <div class="select-boxes">
      <SortListsSelectBox @sort-lists="sortLists" />
      <ChangeDisplayLists @change-display-lists="changeDisplayLists" />
    </div>

    <div class="lists" v-if="displayListsId === 1">
      <List v-for="list in lists" :key="list.id" :list="list" />
    </div>
    <div class="lists" v-if="displayListsId === 2">
      <EditableList
        v-for="list in lists"
        :key="list.id"
        :list="list"
        @get-lists="getLists"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoggedHeader from "../components/Header.vue";
import List from "../components/List.vue";
import EditableList from "../components/EditableList.vue";
import SortListsSelectBox from "../components/SortListsSelectBox.vue";
import ChangeDisplayLists from "../components/ChangeDisplayListsSelectBox.vue";
import listRepository from "../repositories/listRepository";

export default defineComponent({
  data() {
    return {
      lists: [],
      displayListsId: 1,
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

    changeDisplayLists(id: number) {
      if (id === 1) {
        this.displayListsId = 1;
      }
      if (id === 2) {
        this.displayListsId = 2;
      }
    },
  },
  created() {
    this.getLists();
  },
  components: {
    LoggedHeader,
    List,
    EditableList,
    SortListsSelectBox,
    ChangeDisplayLists,
  },
});
</script>

<style lang="scss" scoped>
.select-boxes {
  margin-top: 2vh;
  margin-left: 8vw;
}
</style>
