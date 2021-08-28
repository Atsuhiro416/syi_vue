<template>
  <div class="list">
    <div class="list__block">
      <textarea
        class="list__name"
        :class="[isValidatedText ? '' : 'list__name--error']"
        ref="area"
        :style="styles"
        v-model="name"
        @input="validateText"
      ></textarea>
      <span class="list__name--length">{{ name.length }}/250</span>

      <transition name="fade">
        <p v-if="isMessage" class="list__block--message">{{ message }}</p>
      </transition>

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
        <div class="list__buttons">
          <button class="list__buttons--update" @click="simpleUpdateList">
            更新
          </button>
          <button class="list__buttons--delete" @click="deleteList(list.name)">
            削除
          </button>
        </div>
      </div>
    </div>
    <!-- ./list__block -->
    <hr class="list__block--endline" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Link from "../components/icons/Link.vue";
import listRepository from "../repositories/listRepository";

interface List {
  id: number;
  name: string;
  link: string | null;
  comment: string | null;
  created_at: string;
  updated_at: string;
}

export default defineComponent({
  props: {
    list: Object as PropType<List>,
  },
  data() {
    return {
      name: "",
      height: "",
      isMessage: false,
      message: "",
      isValidatedText: true,
    };
  },
  watch: {
    name() {
      this.resizse();
    },
  },
  methods: {
    simpleUpdateList() {
      if (this.getListName === this.name) {
        return;
      }

      listRepository
        .updateList(this.list!.id, {
          name: this.name,
        })
        .then((res) => {
          this.message = res.data.message;
          this.showMessage();
          this.$emit("get-lists");
        })
        .catch((e) => {
          if (this.name.length <= 250) {
            this.setListName();
          }

          if (this.name.length > 250) {
            this.name = this.name.substring(0, 250);
            this.isValidatedText = true;
          }

          this.message = e.response.data.error.name[0];
          this.showMessage();
        });
    },

    deleteList(name: string) {
      const confirmDeleteList = confirm(`${name}\nを本当に削除しますか？`);
      if (confirmDeleteList) {
        listRepository
          .deleteList(this.list!.id)
          .then((res) => {
            alert(res.data.message);
            this.$emit("get-lists");
          })
          .catch((e) => {
            alert(e.response.data.message);
          });
      }
    },

    showMessage() {
      this.isMessage = true;
      setTimeout(() => {
        this.isMessage = false;
      }, 2000);
    },

    validateText() {
      this.isValidatedText = true;

      if (!this.name) {
        this.isValidatedText = false;
        this.message = "入力は必須です";
        this.showMessage();
      }

      if (this.name.length > 250) {
        this.isValidatedText = false;
        this.message = "入力できる文字数は250字以内です";
        this.showMessage();
      }
    },

    setListName() {
      this.name = this.getListName;
      this.isValidatedText = true;
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
    getListName(): string {
      return this.list!.name;
    },

    styles(): any {
      return {
        height: this.height,
      };
    },
  },
  mounted() {
    this.setListName();
    this.resizse();
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

@mixin tab-dates {
  display: block;
  height: 22px;
  line-height: 22px;
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

.list {
  margin-top: 2vh;
  padding: 0 3vw;

  &__block {
    padding: 2vh 5vw 1vh;
    position: relative;

    &--message {
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
      top: 50%;
      left: 25%;
      transform: translate(-25%, -50%);

      @include pc {
        width: 60vw;
      }
    }

    &--endline {
      margin: 0;
    }
  }

  &__name {
    font-size: 1.2rem;
    margin-bottom: 2vh;
    width: 50vw;
    white-space: pre-line;
    outline: none;

    @include pc {
      font-size: 1.7rem;
    }
    @include tab {
      width: 70vw;
    }
    @include sp {
      font-size: 1rem;
    }

    &--error {
      border: 2px solid #ff0000;
    }

    &--length {
      position: absolute;
      font-size: 10px;
    }
  }

  &__info {
    display: flex;
    justify-content: space-between;
    width: 65vw;
    height: 45px;

    @include tab {
      width: 75vw;
    }
  }

  &__dates {
    font-size: 1rem;
    color: lighten(#000000, 50%);
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    @include pc {
      font-size: 0.7rem;
    }
    @include sp {
      display: none;
    }

    &--created {
      @include tab {
        @include tab-dates();
      }
      @include sp {
        margin-right: 5vw;
      }
    }
    &--updated {
      @include tab {
        @include tab-dates();
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

  &__buttons {
    margin-left: 5vw;
    width: 25vw;

    @include sp {
      width: 50vw;
    }

    &--update {
      margin-right: 2vw;

      @include button(#125d98);
      @include sp {
        margin-right: 5vw;
      }
    }

    &--delete {
      @include button(#e60000);
    }
  }
}
</style>
