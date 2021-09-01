<template>
  <header class="header">
    <p class="header__name">
      <slot name="header-name"></slot>
    </p>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    HeaderName: String,
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

.header {
  background-color: lighten(#125d98, 20%);
  height: 15vh;
  width: 100wh;
  padding: 0 5vw;
  display: flex;
  align-items: center;

  @include tab {
    justify-content: space-around;
  }
  @include sp {
    height: 10vh;
  }

  &__name {
    color: #ffffff;
    font-size: 2.5rem;

    @include pc {
      font-size: 3rem;
    }
    @include sp {
      font-size: 1.5rem;
    }
  }
}
</style>
