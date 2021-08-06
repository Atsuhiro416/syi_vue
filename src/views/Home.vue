<template>
  <div class="top">
    {{ user }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";

export default defineComponent({
  data() {
    return {};
  },
  computed: {
    user() {
      return store.state.user;
    },
  },
});
</script>
