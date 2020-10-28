<template>
  <v-app>
    <v-dialog
      v-model="updateEmailAddressDialog"
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
              <v-form ref="form" lazy-validation @submit.prevent="updateEmailAddress">
                <v-text-field
                  v-model="getUserEmail"
                  prepend-inner-icon="mdi-email-outline"
                  label="新しいメールアドレスを入力"
                  :rules="[validRules.emailRules.required, validRules.emailRules.regex]"
                  clearable
                />
                <v-card-actions>
                  <v-btn
                    color="primary"
                    @click="selectedUpdateEmailAddress = 'closeUpdateEmailAddress'"
                  >
                    <v-icon left>mdi-login-variant</v-icon>戻る
                  </v-btn>
                  <v-spacer />
                  <v-btn
                    color="success"
                    @click="updateEmailAddress"
                    :loading="loadingUpdateEmailAddress"
                    :disabled="loadingUpdateEmailAddress"
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
import StateUserEmail from '@/mixins/UserInfo/StateUserEmail.vue'

export default {
  mixins: [FormValidation, LoadingView, StateUserEmail],
  props: {
    updateEmailAddressDialog: {
      type: Boolean
    },
    selectedUpdateUserInfo: {
      type: String
    }
  },
  data() {
    return {
      loadingUpdateEmailAddress: false,
      validate: true
    }
  },
  computed: {
    selectedUpdateEmailAddress: {
      get() {
        return this.selectedUpdateUserInfo
      },
      set(value) {
        this.$emit('update:selectedUpdateEmailAddress', value)
        this.getUserEmail = ''
      }
    },
    ...mapGetters('modules/auth', ['gettersUserEmail'])
  },
  methods: {
    updateEmailAddress() {
      if (!this.getUserEmail) {
        this.$refs.form.validate()
        return
      }
      this.loader = 'loadingUpdateEmailAddress'
      this.$store.dispatch('modules/auth/updateEmailAddress', { email: this.getUserEmail })
      this.getUserEmail = ''
      this.$refs.form.reset()
      this.$emit('update:selectedUpdateEmailAddress', 'closeUpdateEmailAddress')
    }
  }
}
</script>
