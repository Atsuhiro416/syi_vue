<template>
  <div class="home">
    <logged-header>
      <template #header-name>リスト</template>
    </logged-header>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoggedHeader from "../components/Header.vue";

export default defineComponent({
  data() {
    return {};
  },
  computed: {},
  components: {
    LoggedHeader,
  },
});
</script>
