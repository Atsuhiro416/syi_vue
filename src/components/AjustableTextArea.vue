<template>
  <textarea
    class="text-area"
    ref="area"
    :style="styles"
    v-model="text"
    @input="sendText"
  ></textarea>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    input: null,
  },
  data() {
    return {
      text: "",
      height: "",
    };
  },
  watch: {
    input() {
      this.inputText();
    },
    text() {
      this.resize();
    },
  },
  methods: {
    inputText() {
      this.text = this.input;
    },

    sendText() {
      this.$emit("get-text", this.text);
      this.$emit("validate-text", this.text);
    },

    resize() {
      const area: any = this.$refs.area;
      this.height = "auto";
      this.$nextTick(() => {
        this.height = area.scrollHeight + "px";
      });
    },
  },
  mounted() {
    this.inputText();
    this.resize();
  },
  computed: {
    styles(): any {
      return {
        height: this.height,
      };
    },
  },
});
</script>

<style lang="scss" scoped>
.text-area {
  white-space: pre-line;
  outline: none;
}
</style>
