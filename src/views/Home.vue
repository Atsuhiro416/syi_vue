<template>
  <div class="home">
    <logged-header>
      <template #header-name>リスト</template>
    </logged-header>
    <List />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoggedHeader from "../components/Header.vue";
import List from "../components/List.vue";

export default defineComponent({
  data() {
    return {};
  },
  computed: {},
  components: {
    LoggedHeader,
    List,
  },
});
</script>
