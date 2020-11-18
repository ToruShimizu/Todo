<template>
  <v-app>
    <v-col cols="12" sm="12" md="12">
      <v-card width="400px" class="mx-auto">
        <v-card-title class="justify-center font-italic grey--text darken">
          <span class="headline">{{ title }}</span>
        </v-card-title>
        <v-divider />
        <v-card-text>
          <slot name="form"></slot>
        </v-card-text>
      </v-card>
    </v-col>
  </v-app>
</template>

<script>
export default {
  props: { title: String }
}
</script>