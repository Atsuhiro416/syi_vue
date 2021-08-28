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

        <transition name="fade">
          <p v-if="isMessage" class="add-list-accordion__error-message">
            {{ message }}
          </p>
        </transition>

        <div class="add-list-accordion__buttons">
          <button
            class="add-list-accordion__buttons--add"
            @click="simpleAddList"
          >
            追加
          </button>
          <button class="add-list-accordion__buttons--create">作成</button>
        </div>
      </div>
    </transition>

    <div class="add-list-accordion__toggle" @click="accordionToggle">
      <transition name="toggle">
        <Up v-if="isOpen" />
        <Down v-else />
      </transition>
    </div>
    <hr class="add-list-accordion--endline" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import listRepository from "../repositories/listRepository";
import store from "@/store";
import Up from "../components/icons/Up.vue";
import Down from "../components/icons/Down.vue";

export default defineComponent({
  data() {
    return {
      name: "",
      message: "",
      isValidatedText: true,
      height: "",
      isOpen: true,
      isMessage: false,
    };
  },
  watch: {
    name() {
      this.resizse();
    },
  },
  methods: {
    simpleAddList() {
      const userId = store.getters.getUserInfo.id;

      if (!this.name.length) {
        this.showMessage();
        this.isValidatedText = false;
        this.message = "入力は必須です";
        return;
      }
      if (this.name.length > 250) {
        this.showMessage();
        this.message = "入力できる文字数は250字以内です";
        return;
      }

      listRepository
        .createList({
          name: this.name,
          link: null,
          comment: null,
          user_id: userId,
        })
        .then((res) => {
          this.message = res.data.message;
          this.showMessage();
          this.name = "";
          this.$emit("get-lists");
        })
        .catch((e) => {
          this.message = e.response.data.error.name[0];
          this.showMessage();
        });
    },

    showMessage() {
      this.isMessage = true;
      setTimeout(() => {
        this.isMessage = false;
      }, 2000);
    },

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

@keyframes open {
  0% {
    opacity: 0;
    transform: translateY(-5px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
.accordion-enter-active {
  animation: open 0.6s ease;
}
.accordion-leave-active {
  animation: open 0.3s ease reverse;
}

@keyframes rotate {
  0% {
    opacity: 0;
    transform: rotateX(180deg);
  }
}

.toggle-enter-active {
  animation: rotate 1s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter-to,
.fade-leave-form {
  opacity: 0.7;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.add-list-accordion {
  padding: 0 2vw;
  position: relative;

  &__inner {
    margin-top: 3vh;
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

  &__error-message {
    position: absolute;
    width: 25vw;
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border: 1px solid #000000;
    border-radius: 5px;
    background: #ffffff;
    z-index: 100;
    top: 30%;
    left: 25%;
    transform: translate(-25%, -50%);

    @include pc {
      width: 50vw;
      height: 8vh;
    }
  }

  &__buttons {
    margin-left: 5vw;
    width: 25vw;

    @include pc {
      width: 40vw;
    }
    @include tab {
      width: 25vw;
    }
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

  &__toggle {
    display: flex;
  }

  &--endline {
    margin: 0;
  }
}
</style>
