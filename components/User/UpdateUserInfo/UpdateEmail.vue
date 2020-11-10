<template>
  <v-dialog
    v-model="updateEmailDialog"
    persistent
    max-width="400px"
    transition="scroll-y-transition"
  >
    <v-app>
      <v-col cols="12" sm="12" md="12">
        <v-card width="500px" class="mx-auto text-center">
          <v-card-title class="text-center">
            <!-- FIXME classはscssに記述する -->
            <h4 class="fill-width">メールアドレス変更</h4>
          </v-card-title>
          <v-divider />
          <v-card-title>
            <v-card-text>
              現在登録されているメールアドレス<br /><v-icon left>mdi-email-outline</v-icon
              >{{ gettersUserEmail }}
            </v-card-text>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" lazy-validation @submit.prevent="updateEmail">
              <v-text-field
                v-model="updateUser.email"
                prepend-inner-icon="mdi-email-outline"
                label="新しいメールアドレスを入力"
                :rules="[validRules.emailRules.required, validRules.emailRules.regex]"
                clearable
              />
              <v-card-actions>
                <v-btn color="primary" @click="selectUpdateEmail = 'closeUpdateEmail'">
                  <v-icon left>mdi-login-variant</v-icon>戻る
                </v-btn>
                <v-spacer />
                <v-btn
                  color="success"
                  :loading="loadingUpdateEmail"
                  :disabled="loadingUpdateEmail"
                  @click="handleUpdateEmail"
                >
                  <v-icon left>mdi-email-plus</v-icon>SAVE
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-app>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FormValidation from '@/mixins/FormValidation.vue'
import LoadingView from '@/mixins/LoadingView.vue'

export default {
  mixins: [FormValidation, LoadingView],
  props: {
    updateEmailDialog: {
      type: Boolean,
      required: true
    },
    selectUpdateUserInfo: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      updateUser: {
        email: ''
      },
      loadingUpdateEmail: false
    }
  },
  computed: {
    selectUpdateEmail: {
      get() {
        return this.selectEditUserInfo
      },
      set(closeUpdateEmail) {
        this.$emit('update:close-update-email', closeUpdateEmail)
        this.$refs.form.reset()
      }
    },
    ...mapGetters('modules/user/auth', ['gettersUserEmail'])
  },
  methods: {
    async handleUpdateEmail() {
      const updateUserEmail = this.updateUser.email
      if (!updateUserEmail) {
        this.$refs.form.validate()
        return
      }
      this.loader = 'loadingUpdateEmail'
      await this.updateEmail({
        email: updateUserEmail
      })
      this.$emit('update:selected-update-email', 'closeUpdateEmail')
      this.loader = null
      this.$refs.form.reset()
    },
    ...mapActions('modules/user/userInfo', ['updateEmail'])
  }
}
</script>
