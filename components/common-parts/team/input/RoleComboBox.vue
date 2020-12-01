<template>
  <v-combobox
    v-model="innerRole"
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
    teamMember: {
      type: Object,
      required: true
    },
    role: {
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
    innerRole: {
      get() {
        return this.teamMember.role
      },
      set(role) {
        this.$emit('update:role', role)
      }
    }
  }
}
</script>