<template>
  <nav class="side-nav">
    <h2 class="app-name">SYI</h2>
    <ul class="side-nav__lists">
      <li class="side-nav__list">
        <router-link class="side-nav__list-link" :to="{ name: Home }"
          >アカウント</router-link
        >
      </li>
      <li class="side-nav__list">
        <router-link class="side-nav__list-link" :to="{ name: Home }"
          >リスト</router-link
        >
        <Plus />
      </li>
      <li class="side-nav__list">
        <router-link class="side-nav__list-link" :to="{ name: Home }"
          >フォルダ</router-link
        >
        <Plus />
      </li>
      <li class="side-nav__list">
        <p class="side-nav__logout">ログアウト</p>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Plus from "../components/icons/Plus.vue";

export default defineComponent({
  data() {
    return {};
  },
  components: {
    Plus,
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
    display: none;
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
}
</style>
