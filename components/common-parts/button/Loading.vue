<template>
  <div>
    <slot name="loading"></slot>
  </div>
</template>

<style scoped>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
</style>
