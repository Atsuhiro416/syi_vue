<template>
  <div class="home">
    <SideMenu />

    <div class="home-main">
      <logged-header>
        <template #header-name>リスト</template>
      </logged-header>

      <AddListAccordion @get-lists="getLists" />

      <div class="select-boxes">
        <SortByDateSelectBox @sort-by-date="sortLists" />
        <ChangeDisplayLists @change-display-lists="changeDisplayLists" />
      </div>

      <div class="lists" v-if="displayListsId === 1">
        <List v-for="list in sortedLists" :key="list.id" :list="list" />
      </div>
      <div class="lists" v-if="displayListsId === 2">
        <EditableList
          v-for="list in sortedLists"
          :key="list.id"
          :list="list"
          @get-lists="getLists"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import LoggedHeader from "../components/Header.vue";
import SideMenu from "../components/SideMenu.vue";
import AddListAccordion from "../components/AddListAccordion.vue";
import List from "../components/List.vue";
import EditableList from "../components/EditableList.vue";
import SortByDateSelectBox from "../components/SortByDateSelectBox.vue";
import ChangeDisplayLists from "../components/ChangeDisplayListsSelectBox.vue";
import listRepository from "../repositories/listRepository";

interface ListInterface {
  id: number;
  name: string;
  link: string;
  comment: string;
  created_at: string;
  updated_at: string;
}

export default defineComponent({
  data() {
    return {
      lists: [],
      sortListsId: 1,
      displayListsId: 1,
    };
  },
  methods: {
    getLists() {
      listRepository
        .getUserLists(store.getters.getUserInfo.id)
        .then((res) => {
          this.lists = res.data.data;
        })
        .catch((e) => {
          console.log(e.response);
          alert("問題が発生しました。");
        });
    },

    sortLists(id: number) {
      this.sortListsId = id;
    },

    changeDisplayLists(id: number) {
      this.displayListsId = id;
    },
  },
  computed: {
    sortedLists() {
      const sortedLists: ListInterface[] = this.lists;
      const sortId = this.sortListsId;

      sortedLists.sort((a: ListInterface, b: ListInterface): any => {
        if (sortId === 1) {
          return a.created_at < b.created_at ? -1 : 1;
        }
        if (sortId === 2) {
          return a.created_at < b.created_at ? 1 : -1;
        }
        if (sortId === 3) {
          return a.updated_at < b.updated_at ? -1 : 1;
        }
        if (sortId === 4) {
          return a.updated_at < b.updated_at ? 1 : -1;
        }
      });

      return sortedLists;
    },
  },
  created() {
    this.getLists();
  },
  updated() {
    this.sortLists(this.sortListsId);
  },
  components: {
    LoggedHeader,
    SideMenu,
    AddListAccordion,
    List,
    EditableList,
    SortByDateSelectBox,
    ChangeDisplayLists,
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

.home {
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
}
.select-boxes {
  margin-top: 2vh;
  margin-left: 8vw;
}
</style>
