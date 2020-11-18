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
              <FormUserEmail
                :user-email.sync="editUser.email"
                :email-label="'新しいメールアドレス'"
              />
            </v-card-text>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" lazy-validation @submit.prevent="updateEmail">
              <SaveAndCloseButton
                @save-button="handleUpdateEmail"
                @close-button="selectUpdateEmail = 'closeUpdateEmail'"
              >
                <template v-slot:save
                  ><v-icon left>mdi-email-edit-outline</v-icon></template
                ></SaveAndCloseButton
              >
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-app>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SaveAndCloseButton from '@/components/commonParts/button/SaveAndCloseButton'
import FormUserEmail from '@/components/commonParts/user/form/FormUserEmail'

export default {
  components: {
    FormUserEmail,
    SaveAndCloseButton
  },
  props: {
    updateEmailDialog: {
      type: Boolean,
      required: true
    },
    selectUpdateUserInfo: {
      type: String,
      required: false,
      default: ''
    },
    editUser: {
      type: Object,
      required: false,
      default: () => {}
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
      const editUserEmail = this.editUser.email
      console.log(editUserEmail)
      if (!editUserEmail) {
        this.$refs.form.validate()
        return
      }
      await this.updateEmail({
        email: editUserEmail
      })
      this.$emit('update:close-update-email', 'closeUpdateEmail')
    },
    ...mapActions('modules/user/userInfo', ['updateEmail'])
  }
}
</script>
