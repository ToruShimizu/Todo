<template>
  <v-combobox
    v-model="improvementRole"
    :items="items"
    :label="label"
    clearable
    persistent-hint
    hint="文字入力の場合は入力後Enterキーを押してください"
    multiple
    small-chips
    prepend-inner-icon="mdi-briefcase-outline"
    @click:clear="$nextTick(() => (innnerImprovementRole = null))"
  />
</template>

<script>
export default {
  props: {
    improvementRole: {
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
