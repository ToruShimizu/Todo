<template>
  <FormDialog :form-dialog="teamDialog">
    <template v-slot:dialog>
      <v-card width="500px" class="mx-auto">
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
                v-model="team.name"
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
              <InputFile :imageFile="team.imageFile" @change-image-file="changeImageFile" />
            </v-col>
          </v-row>
          <!-- 保存、閉じるボタン -->
          <AppButton :disabled="isValid" :loading="isRunning" @click="handleSaveTeam"
            >保存する
          </AppButton>
          <AppButton color="success" outlined :disabled="isRunning" @click="closeTeamDialog"
            >キャンセル
          </AppButton>
        </v-form>
      </v-card>
    </template>
  </FormDialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    title: String,
    team: {
      type: Object,
      required: true
    },
    teamDialog: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
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
    // サークル作成ダイアログを閉じる
    closeTeamDialog() {
      this.$refs.form.reset()
      this.team.name = ''
      this.$emit('close-team-dialog')
    },
    // サークル作成
    handleSaveTeam() {
      if (!this.team.name) {
        this.$refs.form.validate()
        return
      }
      this.$emit('save-team')
    }
  }
}
</script>
