<template>
  <v-app>
    <v-dialog
      v-model="updateUserNameDialog"
      persistent
      max-width="400px"
      transition="scroll-y-transition"
    >
      <v-app>
        <v-col cols="12" sm="12" md="12">
          <v-card width="400px" class="mx-auto text-center">
            <v-card-title class="text-center">
              <!-- FIXME classはscssに記述する -->
              <h4 class="fill-width">ユーザー名変更</h4>
            </v-card-title>
            <v-divider />
            <v-card-title>
              <v-card-text>
                現在登録されているユーザー名<br />
                <v-icon left>mdi-account-outline</v-icon>{{ gettersUserName }}さん
              </v-card-text>
            </v-card-title>
            <v-card-text>
              <v-form ref="form" lazy-validation @submit.prevent="updateUserName">
                <v-text-field
                  v-model="updateUser.name"
                  prepend-inner-icon="mdi-card-account-details-outline"
                  label="新しい名前を入力してください"
                  :rules="[validRules.nameRules.required]"
                  clearable
                />
                <v-card-actions>
                  <v-btn color="primary" @click="selectedUpdateUserName = 'closeUpdateUserName'">
                    <v-icon left>mdi-login-variant</v-icon>戻る
                  </v-btn>
                  <v-spacer />
                  <v-btn
                    color="success"
                    :loading="loadingUpdateUserName"
                    :disabled="loadingUpdateUserName"
                    @click="handleUpdateUserName"
                  >
                    <v-icon left> mdi-badge-account-horizontal-outline </v-icon>SAVE
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-app>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FormValidation from '@/mixins/FormValidation.vue'
import LoadingView from '@/mixins/LoadingView.vue'

export default {
  mixins: [FormValidation, LoadingView],

  props: {
    updateUserNameDialog: {
      type: Boolean,
      required: true
    },
    selectedUpdateUserInfo: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      updateUser: {
        name: ''
      },
      loadingUpdateUserName: false
    }
  },
  computed: {
    selectedUpdateUserName: {
      get() {
        return this.selectedUpdateUserInfo
      },
      set(closeUpdateUserName) {
        this.$emit('update:selected-update-user-name', closeUpdateUserName)
        this.$refs.form.reset()
      }
    },
    ...mapGetters('modules/user/auth', ['gettersUserName'])
  },
  methods: {
    async handleUpdateUserName() {
      const updateUser = this.updateUser
      if (!updateUser.name) {
        this.$refs.form.validate()
        return
      }
      this.loader = 'loadingUpdateUserName'
      await this.updateUserName({
        userName: updateUser.name
      })
      this.$emit('update:selected-update-user-name', 'closeUpdateUserName')
      this.loader = null
      this.$refs.form.reset()
    },
    ...mapActions('modules/user/userInfo', ['updateUserName'])
  }
}
</script>
