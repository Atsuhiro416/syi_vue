<template>
  <div class="folder-contents">
    <SideMenu />

    <div class="folder-contents-main">
      <logged-header>
        <template #header-name>{{ limitedFolerName }}</template>
      </logged-header>

      <AddListAccordion @get-lists="getLists" />

      <div class="select-boxes">
        <SortListsSelectBox @sort-lists="sortLists" />
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
import LoggedHeader from "../components/Header.vue";
import SideMenu from "../components/SideMenu.vue";
import AddListAccordion from "../components/AddListAccordion.vue";
import List from "../components/List.vue";
import EditableList from "../components/EditableList.vue";
import SortListsSelectBox from "../components/SortListsSelectBox.vue";
import ChangeDisplayLists from "../components/ChangeDisplayListsSelectBox.vue";
import foldersRepository from "../repositories/foldersRepository";
import foldersListsRepository from "../repositories/foldersListsRepository";

interface ListInterface {
  id: number;
  name: string;
  link: string;
  comment: string;
  created_at: string;
  updated_at: string;
}
export default defineComponent({
  props: {
    folderId: String,
  },
  data() {
    return {
      lists: [],
      folder: {},
      folderName: "",
      sortListsId: 1,
      displayListsId: 1,
    };
  },
  methods: {
    getTheFolder() {
      foldersRepository
        .showFolder(this.convertFolderId)
        .then((res) => {
          const data = res.data.data;
          this.folder = data;
          this.folderName = data.name;
        })
        .catch((e) => {
          console.log(e);
          alert("問題が発生しました。");
        });
    },

    getLists() {
      foldersListsRepository
        .getListsInFolder(this.convertFolderId)
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

    convertFolderId(): number {
      return parseInt(this.folderId!);
    },

    limitedFolerName(): string {
      const width = window.innerWidth;
      const folderName = this.folderName;
      const folderNameLength = this.folderName.length;

      if (width <= 1024 && folderNameLength > 10) {
        return folderName.substring(0, 10) + "...";
      }

      if (width <= 1200 && folderNameLength > 15) {
        return folderName.substring(0, 15) + "...";
      }

      if (folderNameLength > 20) {
        return folderName.substring(0, 20) + "...";
      }

      return folderName;
    },
  },
  created() {
    this.getTheFolder();
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

.folder-contents {
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
