<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="minus"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
</template>

<style lang="scss" scoped>
.minus {
  width: 30px;
  height: 30px;
  color: #ff0000;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
}
</style>
