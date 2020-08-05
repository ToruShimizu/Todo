<script>
export default {
  created() {
    const id = this.$route.params.id

    this.$store.dispatch('fetchTask', { id })
  }
}
</script>
