<template>
  <transition name="fade">
    <nav v-if="isMenu" class="side-nav">
      <h2 class="app-name">SYI</h2>
      <ul class="side-nav__lists">
        <li class="side-nav__list">
          <router-link class="side-nav__list-link" :to="{ name: 'Account' }"
            >アカウント</router-link
          >
        </li>
        <li class="side-nav__list">
          <router-link
            class="side-nav__list-link"
            :to="{ name: 'Home' }"
            @click="closeMenuForUnderTabScreen"
            >リスト</router-link
          >
          <Plus @click="$router.push({ name: 'CreateList' })" />
        </li>
        <li class="side-nav__list">
          <router-link class="side-nav__list-link" :to="{ name: 'Folders' }"
            >フォルダ</router-link
          >
          <Plus @click="toggleCreateModal" />
        </li>
        <li class="side-nav__list">
          <p class="side-nav__logout" @click="logout">ログアウト</p>
        </li>
      </ul>
    </nav>
  </transition>

  <div class="side-nav__toggle" @click="toggleMenu">
    <transition name="rotate">
      <Close v-if="isMenu" />
      <Menu v-else />
    </transition>
  </div>

  <CreateFolderModal
    v-if="isModal"
    :get-folders="getFolders"
    @toggle-create-modal="toggleCreateModal"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import CreateFolderModal from "./CreateFolderModal.vue";
import Plus from "../components/icons/Plus.vue";
import Menu from "../components/icons/Menu.vue";
import Close from "../components/icons/Close.vue";

export default defineComponent({
  props: {
    getFolders: Function,
  },
  data() {
    return {
      isMenu: true,
      isModal: false,
    };
  },
  methods: {
    logout() {
      store.dispatch("logout");
    },

    displayMenu() {
      window.addEventListener("resize", () => {
        if (window.innerWidth > 769) {
          this.isMenu = true;
        }

        this.closeMenuForUnderTabScreen();
      });
    },

    closeMenuForUnderTabScreen() {
      if (window.innerWidth <= 769) {
        this.isMenu = false;
      }
    },

    toggleMenu() {
      this.isMenu = !this.isMenu;
    },

    toggleCreateModal() {
      this.isModal = !this.isModal;
    },
  },
  created() {
    this.closeMenuForUnderTabScreen();
  },
  mounted() {
    this.displayMenu();
  },
  beforeUnmount() {
    this.displayMenu();
  },
  components: {
    CreateFolderModal,
    Plus,
    Menu,
    Close,
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

@keyframes open {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}
.fade-enter-active {
  animation: open 0.3s ease;
}
.fade-leave-active {
  animation: open 0.3s ease reverse;
}

@keyframes rotate {
  100% {
    transform: rotate(180deg);
  }
}

.rotate-enter-active {
  animation: rotate 0.5s ease;
}

.side-nav {
  color: #ffffff;
  background-color: lighten(#125d98, 10%);
  width: 15vw;
  height: 100vh;
  padding-top: 5vh;
  position: fixed;
  z-index: 50;

  @include pc {
    width: 20vw;
  }
  @include tab {
    width: 100vw;
  }

  & .app-name {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 7vh;
  }

  &__list {
    margin-bottom: 5vh;
    margin-left: 2vw;
    width: 11vw;
    font-size: 1.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @include pc {
      width: 15vw;
      font-size: 1rem;
    }
    @include tab {
      font-size: 1.5rem;
      width: 30vw;
      margin: 5vh auto;
    }
    @include sp {
      width: 50vw;
    }

    &-link {
      color: #ffffff;
      text-decoration: none;

      &:hover {
        opacity: 0.7;
      }
    }
  }

  &__logout {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }

  &__toggle {
    display: none;

    @include tab {
      display: block;
      position: fixed;
      overflow: hidden;
      width: 30px;
      height: 30px;
      z-index: 100;
      top: 5vh;
      right: 5vw;
    }
    @include sp {
      top: 3vh;
      right: 2vw;
    }
  }
}
</style>
