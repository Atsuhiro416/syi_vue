<template>
  <div class="add-list-accordion">
    <transition name="accordion">
      <div class="add-list-accordion__inner" v-if="isOpen">
        <textarea
          class="add-list-accordion__text-field"
          :class="[
            isValidatedText ? '' : 'add-list-accordion__text-field--error',
          ]"
          ref="area"
          :style="styles"
          v-model="name"
          @input="validateText"
        ></textarea>
        <span class="add-list-accordion__text-field--length">
          {{ name.length }}/250
        </span>

        <div class="add-list-accordion__buttons">
          <button class="add-list-accordion__buttons--add">追加</button>
          <button class="add-list-accordion__buttons--create">作成</button>
        </div>
      </div>
    </transition>

    <div @click="accordionToggle">
      <Up v-if="isOpen" />
      <Down v-else />
    </div>
    <hr class="add-list-accordion--endline" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Up from "../components/icons/Up.vue";
import Down from "../components/icons/Down.vue";

export default defineComponent({
  data() {
    return {
      name: "",
      isValidatedText: true,
      height: "",
      isOpen: true,
    };
  },
  watch: {
    name() {
      this.resizse();
    },
  },
  methods: {
    validateText() {
      this.isValidatedText = true;

      if (this.name.length > 250) {
        this.isValidatedText = false;
      }
    },

    accordionToggle() {
      this.isOpen = !this.isOpen;
    },

    resizse() {
      const area: any = this.$refs.area;
      this.height = "auto";
      this.$nextTick(() => {
        this.height = area.scrollHeight + "px";
      });
    },
  },
  computed: {
    styles(): any {
      return {
        height: this.height,
      };
    },
  },
  components: {
    Up,
    Down,
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
  color: #ffffff;
  background-color: lighten($color, 20%);
  width: 5vw;
  height: 35px;
  line-height: 2;
  padding: 2px 5px;
  border-radius: 10px;
  font-size: 1rem;
  border-bottom: solid 3px lighten($color, 10%);

  @include pc {
    width: 10vw;
  }
  @include sp {
    width: 20vw;
  }

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: translateY(2px);
    border-bottom: none;
  }
}

.add-list-accordion {
  margin-top: 5vh;
  padding: 0 2vw;
  // position: fixed;

  @include sp {
    margin-top: 2vh;
  }

  &__inner {
    margin-bottom: 2vh;
    padding: 0 6vw;
    display: flex;

    @include sp {
      margin-bottom: 2vh;
    }
  }

  &__text-field {
    font-size: 1.2rem;
    width: 50vw;
    white-space: pre-line;
    outline: none;

    @include pc {
      font-size: 1.7rem;
    }
    @include sp {
      font-size: 1rem;
      width: 80vw;
    }

    &--error {
      border: 2px solid #ff0000;
    }

    &--length {
      width: 5vw;
      font-size: 10px;
    }
  }

  &__buttons {
    margin-left: 5vw;
    width: 25vw;

    @include sp {
      width: 50vw;
      height: 10vh;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
    }

    &--add {
      margin-right: 4vw;

      @include button(#125d98);
      @include pc {
        margin-right: 2vw;
      }
      @include sp {
        margin-right: 0;
        margin-bottom: 2vh;
      }
    }

    &--create {
      @include button(#125d98);
    }
  }

  &--endline {
    margin: 0;
  }
}
</style>
