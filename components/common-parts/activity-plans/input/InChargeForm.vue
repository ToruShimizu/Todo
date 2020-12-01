<template>
  <v-combobox
    v-model="innnerInchargeMember"
    :items="items"
    label="担当"
    clearable
    persistent-hint
    hint="文字入力の場合は入力後Enterキーを押してください"
    multiple
    small-chips
    prepend-inner-icon="mdi-account-tie-outline"
    @click:clear="$nextTick(() => (innnerInchargeMember = []))"
  />
</template>

<script>
export default {
  props: {
    inChargeMember: {
      type: Array,
      required: false,
      default: () => []
    },
    items: {
      type: Array,
      required: true
    }
  },
  computed: {
    innnerInchargeMember: {
      get() {
        return this.inChargeMember
      },
      set(inChargeMember) {
        this.$emit('update:in-charge-member', inChargeMember)
      }
    }
  }
}
</script>