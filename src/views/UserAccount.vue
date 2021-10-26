<template>
  <div class="account">
    <SideMenu />

    <div class="account-main">
      <logged-header>
        <template #header-name>アカウント</template>
      </logged-header>

      <div class="account-info">
        <p class="account-info__detail">メールアドレス：{{ userEmail }}</p>
        <p class="account-info__detail">
          リスト数：{{ numberWithDigits(counts.list) }}
        </p>
        <p class="account-info__detail">
          フォルダ数：{{ numberWithDigits(counts.folder) }}
        </p>
      </div>

      <div class="account-buttons">
        <button class="account-buttons__change">パスワード変更</button>
        <button class="account-buttons__delete">アカウント削除</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import LoggedHeader from "../components/Header.vue";
import SideMenu from "../components/SideMenu.vue";
import listRepository from "../repositories/listRepository";
import foldersRepository from "../repositories/foldersRepository";

export default defineComponent({
  data() {
    return {
      userEmail: "",
      counts: {
        list: 0,
        folder: 0,
      },
    };
  },
  methods: {
    getUserInfo() {
      const user = store.getters.getUserInfo;
      this.userEmail = user.email;
    },

    getListCounts() {
      listRepository
        .getUserListCounts()
        .then((res) => {
          this.counts.list = res.data.counts;
        })
        .catch((e) => {
          const error = e.response;
          alert(
            `${error.status} ${error.statusText}\n問題が発生しました。\nもう一度操作してください。`
          );
        });
    },
    getFolderCounts() {
      foldersRepository
        .getUserFolderCounts()
        .then((res) => {
          this.counts.folder = res.data.counts;
        })
        .catch((e) => {
          const error = e.response;
          alert(
            `${error.status} ${error.statusText}\n問題が発生しました。\nもう一度操作してください。`
          );
        });
    },
  },
  computed: {
    //数字を三桁ごとにカンマ区切りにする
    numberWithDigits() {
      return (num: number) => {
        return num.toLocaleString("ja-JP");
      };
    },
  },
  created() {
    this.getUserInfo();
    this.getListCounts();
    this.getFolderCounts();
  },
  components: {
    LoggedHeader,
    SideMenu,
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

@mixin button($color) {
  display: block;
  margin: 5vh auto;
  color: #ffffff;
  background-color: $color;
  width: 20vw;
  line-height: 2;
  border-radius: 10px;
  font-size: 20px;
  box-shadow: 0 4px 0 darken($color, 10%);

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: translate3d(0, 4px, 0);
    box-shadow: none;
  }

  @include tab {
    margin-top: 5%;
    width: 40%;
    font-size: 1.5rem;
  }
  @include sp {
    margin-top: 10%;
    width: 80%;
  }
}

.account {
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

  &-info {
    margin: 10vh 10vw;
    font-size: 1.4rem;

    &__detail {
      margin-bottom: 20px;
      line-height: 1.25;
      overflow-wrap: break-word;
      padding-left: 1.2em;
      text-indent: -1.2em;
    }
  }

  &-buttons {
    &__change {
      @include button(#ffa726);
    }

    &__delete {
      @include button(#f44336);
    }
  }
}
</style>
