<template>
  <div class="home">
    <logged-header>
      <template #header-name>リスト</template>
    </logged-header>
    <div class="lists">
      <List v-for="list in lists" :key="list.id" :list="list" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoggedHeader from "../components/Header.vue";
import List from "../components/List.vue";
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
  },
  created() {
    this.getLists();
  },
  components: {
    LoggedHeader,
    List,
  },
});
</script>
