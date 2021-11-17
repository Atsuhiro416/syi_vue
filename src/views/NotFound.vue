<template>
  <div class="not-found">
    <p class="status-code">404 Not Found</p>
    <p>ページまたはデータが見つかりません。</p>
    <p class="back" @click="$router.back()">戻る</p>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  text-align: center;
  margin-top: 20vh;
  font-size: 1.5rem;
}

.status-code {
  margin-bottom: 10px;
}

.back {
  margin-top: 20px;
  cursor: pointer;
  color: #2a93e6;

  &:hover {
    opacity: 0.7;
  }
}
</style>
