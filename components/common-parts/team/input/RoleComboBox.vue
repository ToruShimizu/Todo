<template>
  <v-combobox
    v-model="roles"
    :items="items"
    :label="label"
    clearable
    multiple
    small-chips
    persistent-hint
    dense
    prepend-inner-icon="mdi-briefcase-account-outline"
    hint="文字入力の場合は入力後Enterキーを押してください"
    @click:clear="$nextTick(() => (innerRole = null))"
  />
</template>

<script>
export default {
  props: {
    roles: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  }
}
</script>
