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
          <v-card width="400px" class="mx-auto mt-5 text-center">
            <v-card-title>
              <h2>メールアドレス変更</h2>
            </v-card-title>
            <v-card-text>
              <v-form ref="form" lazy-validation @submit.prevent="updateEmailAddress">
                <v-text-field
                  v-model="newEmailAddress"
                  prepend-inner-icon="mdi-email-outline"
                  label="新しいメールアドレス"
                  :rules="[validRules.emailRules.required, validRules.emailRules.regex]"
                  clearable
                />
                <v-card-actions>
                  <v-btn
                    color="success"
                    @click="updateEmailAddress"
                    :loading="loadingUpdateEmailAddress"
                    :disabled="loadingUpdateEmailAddress"
                  >
                    <v-icon left>mdi-email-plus</v-icon>SAVE
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    @click="selectedUpdateEmailAddress = 'closeUpdateEmailAddress'"
                  >
                    <v-icon left>mdi-login-variant</v-icon>戻る
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
import FormValidation from '@/mixins/FormValidation.vue'
export default {
  mixins: [FormValidation],
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
      newEmailAddress: '',
      loader: null,
      loadingUpdateEmailAddress: false,
      validate: true
    }
  },
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    }
  },
  computed: {
    selectedUpdateEmailAddress: {
      get() {
        return this.selectedUpdateUserInfo
      },
      set(value) {
        this.$emit('update:selectedUpdateEmailAddress', value)
        this.newEmailAddress = ''
      }
    }
  },
  methods: {
    updateEmailAddress() {
      this.loader = 'loadingUpdateEmailAddress'
      this.$store.dispatch('modules/auth/updateEmailAddress', { email: this.newEmailAddress })
      this.newEmailAddress = ''
      this.$emit('update:selectedUpdateEmailAddress', 'closeUpdateEmailAddress')
    }
  }
}
</script>
