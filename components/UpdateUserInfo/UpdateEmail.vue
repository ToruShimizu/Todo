<template>
  <v-app>
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
                  v-model="editUserEmail.email"
                  prepend-inner-icon="mdi-email-outline"
                  label="新しいメールアドレスを入力"
                  :rules="[validRules.emailRules.required, validRules.emailRules.regex]"
                  clearable
                />
                <v-card-actions>
                  <v-btn color="primary" @click="selectedUpdateEmail = 'closeUpdateEmail'">
                    <v-icon left>mdi-login-variant</v-icon>戻る
                  </v-btn>
                  <v-spacer />
                  <v-btn
                    color="success"
                    @click="updateEmail"
                    :loading="loadingUpdateEmail"
                    :disabled="loadingUpdateEmail"
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
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import FormValidation from '@/mixins/FormValidation.vue'
import LoadingView from '@/mixins/LoadingView.vue'

export default {
  mixins: [FormValidation, LoadingView],
  props: {
    updateEmailDialog: {
      type: Boolean
    },
    selectedUpdateUserInfo: {
      type: String
    }
  },
  data() {
    return {
      editUserEmail: {
        email: ''
      },
      loadingUpdateEmail: false
    }
  },
  computed: {
    selectedUpdateEmail: {
      get() {
        return this.selectedUpdateUserInfo
      },
      set(value) {
        this.$emit('update:selected-update-email', value)
        this.editUserEmail.email = ''
        this.$refs.form.reset()
      }
    },
    ...mapGetters('modules/user/auth', ['gettersUserEmail'])
  },
  methods: {
    async updateEmail() {
      if (!this.editUserEmail.email) {
        this.$refs.form.validate()
        return
      }
      this.loader = 'loadingUpdateEmail'
      await this.$store.dispatch('modules/user/userInfo/updateEmail', {
        email: this.editUserEmail.email
      })
      this.editUserEmail.email = ''
      this.loader = null
      this.$refs.form.reset()
      this.$emit('update:selected-update-email', 'closeUpdateEmail')
    }
  }
}
</script>
