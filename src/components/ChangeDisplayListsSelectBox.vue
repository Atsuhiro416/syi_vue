<template>
  <select
    class="select-box"
    name="display"
    v-model="currentDisplayId"
    @change="changeDisplay"
  >
    <option v-for="display in displays" :key="display.id" :value="display.id">
      {{ display.value }}
    </option>
  </select>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      currentDisplayId: 1,
      displays: [
        { id: 1, value: "表示のみ" },
        { id: 2, value: "簡易編集" },
      ],
    };
  },
  methods: {
    changeDisplay() {
      this.$emit("change-display-lists", this.currentDisplayId);
    },
  },
});
</script>

<style lang="scss" scoped>
$sp: 481px;

@mixin sp {
  @media (max-width: ($sp)) {
    @content;
  }
}

.select-box {
  border-radius: 5px;
  padding: 1px 5px;
  font-size: 14px;

  @include sp {
    font-size: 12px;
  }
}
</style>
