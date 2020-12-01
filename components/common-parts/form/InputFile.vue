<template>
  <div>
    <v-file-input
      ref="image"
      v-model="innerImageFile"
      accept="image/*"
      show-size
      label="画像ファイル"
      prepend-icon="mdi-file-image-outline"
      @change="changeImageFile"
    >
      <template v-slot:selection="{ text }">
        <v-chip small label color="blue darken-1" class="font-italic white--text">
          <span>
            {{ text }}
          </span>
        </v-chip>
      </template>
    </v-file-input>
  </div>
</template>

<script>
export default {
  props: {
    imageFile: {
      type: null,
      required: false,
      default: null
    }
  },
  computed: {
    innerImageFile: {
      get() {
        return this.imageFile
      },
      set(imageFile) {
        this.$emit('update:image-file', imageFile)
      }
    }
  },
  methods: {
    // 画像をクリックしした時にv-file-inputでファイルを選択できるようにする
    selectUserImageFile() {
      this.$refs.image.$refs.input.click()
    },
    changeImageFile(event) {
      if (event) {
        const file = event
        this.$emit('change-image-file', file)
      }
    }
  }
}
</script>
