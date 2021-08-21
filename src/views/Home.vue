<template>
  <div class="home">
    <SideMenu />

    <div class="home-main">
      <logged-header>
        <template #header-name>リスト</template>
      </logged-header>

      <AddListAccordion @get-lists="getLists" />

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
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoggedHeader from "../components/Header.vue";
import SideMenu from "../components/SideMenu.vue";
import AddListAccordion from "../components/AddListAccordion.vue";
import List from "../components/List.vue";
import EditableList from "../components/EditableList.vue";
import SortListsSelectBox from "../components/SortListsSelectBox.vue";
import ChangeDisplayLists from "../components/ChangeDisplayListsSelectBox.vue";
import listRepository from "../repositories/listRepository";

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
      this.sortListsId = id;

      if (this.sortListsId === 1) {
        lists.sort((a: any, b: any) => {
          return a.created_at < b.created_at ? -1 : 1;
        });
      }
      if (this.sortListsId === 2) {
        lists.sort((a: any, b: any) => {
          return a.created_at < b.created_at ? 1 : -1;
        });
      }
      if (this.sortListsId === 3) {
        lists.sort((a: any, b: any) => {
          return a.updated_at < b.updated_at ? -1 : 1;
        });
      }
      if (this.sortListsId === 4) {
        lists.sort((a: any, b: any) => {
          return a.updated_at < b.updated_at ? 1 : -1;
        });
      }
    },

    changeDisplayLists(id: number) {
      this.displayListsId = id;
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
    SortListsSelectBox,
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
  width: 100vw;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 15vw 85vw;
  grid-template-areas: "nav main";

  @include pc {
    grid-template-columns: 20vw 80vw;
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
