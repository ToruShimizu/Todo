<template>
  <v-combobox
    v-model="innnerImprovementRole"
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
    teamMember: {
      type: Object,
      required: true
    },
    improvementRole: {
      type: Array,
      required: false,
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
  },
  computed: {
    innnerImprovementRole: {
      get() {
        return this.teamMember.improvementRole
      },
      set(improvementRole) {
        this.$emit('update:improvementRole', improvementRole)
      }
    }
  }
}
</script>