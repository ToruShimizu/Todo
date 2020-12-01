<template>
  <v-card-text class="text-center font-italic">
    <slot name="text"></slot>
  </v-card-text>
</template>

<script>
export default {
  props: { title: String }
}
</script>