<template>
  <AppDialog :is-opened="isOpened" @close="$emit('close', false)" title="サークル新規作成">
    <v-form v-model="isValid" ref="form" lazy-validation>
      <!-- チーム画像表示 -->
      <v-row class="mx-2">
        <v-col cols="12" sm="12" md="12" class="text-center">
          <v-avatar size="200px">
            <LoadingImg v-if="teamPhotoURL" :src="teamPhotoURL" width="200" />
            <v-icon v-else large>mdi-account-outline</v-icon>
          </v-avatar>
        </v-col>
      </v-row>

      <!-- サークル名入力 -->
      <v-row class="mx-2">
        <v-col cols="12" sm="12" md="12">
          <v-text-field
            v-model="createTeamInput.name"
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
        <v-col cols="12" sm="12" md="12">
          <InputFile :imageFile="createTeamInput.imageFile" @change-image-file="changeImageFile" />
        </v-col>
      </v-row>
    </v-form>
    <!-- 保存、閉じるボタン -->
    <template slot="buttons">
      <AppButton :disabled="isValid" :loading="isRunning" @click="createTeam">保存する </AppButton>
      <AppButton color="success" outlined :disabled="isRunning" @click="$emit('close', false)"
        >キャンセル
      </AppButton>
    </template>
  </AppDialog>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
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
      createTeamInput: {
        name: '',
        imageFile: null,
        fileName: '',
        photoURL: ''
      },
      nameRules: [v => !!v || '名前は必須です。'],
      isRunning: false,
      isValid: false
    }
  },
  computed: {
    ...mapGetters('modules/team/team', ['teamPhotoURL'])
  },
  methods: {
    // 画像ファイル変換
    changeImageFile(file) {
      this.team.imageFile = file
    },
    // サークル作成
    async createTeam() {
      if (this.createTeamInput.imageFile) {
        await this.uploadTeamImageFile(this.createTeamInput.imageFile)
      } else {
        await this.registrationTeam(this.createTeamInput)
      }
      this.$emit('close', false)
    },

    ...mapActions('modules/team/team', ['registrationTeam', 'uploadTeamImageFile'])
  }
}
</script>
