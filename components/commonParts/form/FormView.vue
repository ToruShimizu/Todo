<template>
  <v-card width="100%" class="mx-auto">
    <v-card-title class="justify-center font-italic grey--text darken">
      <span class="headline">{{ title }}</span>
    </v-card-title>
    <v-divider />
    <v-card-text>
      <slot name="form"></slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: { title: String }
}
</script>