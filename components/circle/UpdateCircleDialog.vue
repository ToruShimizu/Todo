<template>
  <AppDialog
    :is-opened="isOpened"
    class="update-circle-dialog"
    title="サークル編集"
    @close="$emit('close', false)"
  >
    <v-form v-model="isValid" ref="form" lazy-validation>
      <!-- チーム画像表示 -->
      <v-row class="mx-2">
        <v-col cols="12" class="text-center">
          <v-avatar size="200px">
            <LoadingImg v-if="circlePhotoURL" :src="circlePhotoURL" width="200" />
            <v-icon v-else large>mdi-account-outline</v-icon>
          </v-avatar>
        </v-col>
      </v-row>

      <!-- サークル名入力 -->
      <v-row class="mx-2">
        <v-col>
          <v-text-field
            v-model="editCircleInput.name"
            prepend-icon="mdi-card-account-details-outline"
            label="サークル名"
            persistent-hint
            hint="サークル名を入力してください"
            :rules="nameRules"
            clearable
          />
        </v-col>
      </v-row>

      <!-- サークル画像選択 -->
      <v-row class="mx-2">
        <v-col>
          <InputFile :imageFile="editCircleInput.imageFile" @change-image-file="changeImageFile" />
        </v-col>
      </v-row>
    </v-form>
    <!-- 保存、閉じるボタン -->
    <template slot="buttons">
      <AppButton :disabled="isValid" :loading="isRunning" @click="runUpdateCircle"
        >保存する
      </AppButton>
      <AppButton color="success" outlined :disabled="isRunning" @click="$emit('close', false)"
        >キャンセル
      </AppButton>
    </template>
  </AppDialog>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'UpdateCircleDialog',
  model: {
    prop: 'isOpened',
    event: 'close'
  },
  props: {
    isOpened: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      nameRules: [v => !!v || '名前は必須です。'],
      editCircleInput: {
        name: '',
        imageFile: null,
        fileName: '',
        photoURL: ''
      },
      isRunning: false,
      isValid: false
    }
  },
  computed: {
    ...mapGetters('modules/circle', ['circlePhotoURL'])
  },
  methods: {
    // サークル更新
    async runUpdateCircle() {
      if (this.editCircleInput.imageFile) {
        await this.updateCircleImageFile(this.editCircleInput)
      } else {
        await this.updateCircle(this.editCircleInput)
      }
      this.$emit('close', false)
    },
    // 画像ファイル変換
    changeImageFile(file) {
      this.circle.imageFile = file
    },

    ...mapActions('modules/circle', ['updateCircle', 'updateCircleImageFile'])
  }
}
</script>
