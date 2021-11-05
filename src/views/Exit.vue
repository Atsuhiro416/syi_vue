<template>
  <div class="exit">
    <router-link class="exit__link" :to="{ name: 'Login' }">
      <h1 class="exit__logo">SYI</h1>
    </router-link>
    <p class="exit__message">ご利用ありがとうございました。</p>
  </div>
</template>

<style lang="scss" scoped>
$tab: 769px;

@mixin tab {
  @media (max-width: ($tab)) {
    @content;
  }
}

.exit {
  text-align: center;
  height: 100vh;

  &__logo {
    color: lighten(#125d98, 20%);
    font-size: 3rem;
    padding-top: 30vh;
    margin-bottom: 2%;

    @include tab {
      margin-bottom: 5%;
    }
  }

  &__message {
    font-size: 1.5rem;
    margin-left: 10px;
  }

  &__link {
    text-decoration: none;
  }
}
</style>
