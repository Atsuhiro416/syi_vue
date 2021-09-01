<template>
  <div class="list">
    <div class="list__block">
      <p class="list__name">{{ list.name }}</p>
      <div class="list__info">
        <div class="list__dates">
          <span class="list__dates--created"
            >作成日：{{ list.created_at }}</span
          >
          <span class="list__dates--updated"
            >更新日：{{ list.updated_at }}</span
          >
        </div>
        <a class="list__link" v-if="list.link" :href="list.link">
          <Link />
        </a>
      </div>
    </div>
    <!-- ./list__block -->
    <hr class="list__block--endline" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Link from "../components/icons/Link.vue";

export default defineComponent({
  props: {
    list: Object,
  },
  components: {
    Link,
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

@mixin sp-dates {
  display: block;
  height: 22px;
  line-height: 22px;
}

.list {
  margin-top: 2vh;
  padding: 0 3vw;

  &__block {
    padding: 2vh 5vw 1vh;

    &--endline {
      margin: 0;
    }
  }

  &__name {
    font-size: 1.2rem;
    margin-bottom: 2vh;
    white-space: pre-line;
    word-break: break-word;

    @include pc {
      font-size: 1.7rem;
    }
    @include sp {
      font-size: 1rem;
    }
  }

  &__info {
    display: flex;
    height: 45px;

    @include sp {
      justify-content: space-between;
    }
  }

  &__dates {
    font-size: 1rem;
    line-height: 45px;
    margin-right: 5vw;
    color: lighten(#000000, 50%);

    @include pc {
      display: flex;
      flex-direction: column;
      line-height: 20px;
    }
    @include tab {
      font-size: 0.7rem;
    }

    &--created {
      margin-right: 2vw;

      @include sp {
        margin-right: 0;
        @include sp-dates();
      }
    }
    &--updated {
      @include sp {
        @include sp-dates();
      }
    }
  }

  &__link {
    text-decoration: none;

    &:visited {
      color: inherit;
    }

    @include sp {
      margin-right: 5vw;
    }
  }
}
</style>
