<template>
  <div class="folders">
    <SideMenu />
    <div class="folders-main">
      <logged-header>
        <template #header-name>フォルダ</template>
      </logged-header>
      <div class="folders-cards">
        <FoldersCard
          v-for="folder in folders"
          :key="folder.id"
          :folder="folder"
          :get-folders="getFolders"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoggedHeader from "../components/Header.vue";
import SideMenu from "../components/SideMenu.vue";
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
    LoggedHeader,
    SideMenu,
    FoldersCard,
  },
});
</script>

<style lang="scss" scoped>
$pc: 1024px;
$large-tab: 917px;
$tab: 769px;
$sp: 481px;

@mixin pc {
  @media (max-width: ($pc)) {
    @content;
  }
}

@mixin large-tab {
  @media (max-width: ($large-tab)) {
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

.folders {
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

  &-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 5vh 5vw;

    &::after {
      display: block;
      content: "";
      width: 300px;
    }

    @include large-tab {
      justify-content: center;
    }
  }
}
</style>
