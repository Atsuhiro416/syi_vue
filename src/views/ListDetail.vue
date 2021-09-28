<template>
  {{ listId }}
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    listId: String,
  },
  data() {
    return {};
  },
});
</script>
