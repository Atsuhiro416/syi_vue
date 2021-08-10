<template>
  <select
    class="select-box"
    name="sort"
    v-model="currentSortId"
    @change="sortLists"
  >
    <option v-for="sort in sorts" :key="sort.id" :value="sort.id">
      {{ sort.value }}
    </option>
  </select>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      currentSortId: 1,
      sorts: [
        { id: 1, value: "作成日順：古" },
        { id: 2, value: "作成日順：新" },
        { id: 3, value: "更新日順：古" },
        { id: 4, value: "更新日順：新" },
      ],
    };
  },
  methods: {
    sortLists() {
      this.$emit("sort-lists", this.currentSortId);
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
