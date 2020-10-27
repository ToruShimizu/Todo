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
              <h4 class="fill-width">メールアドレス変更</h4>
            </v-card-title>
            <v-card-title>
              <v-card-text>
                現在登録されているユーザー名<br />
                <v-icon left>mdi-account-outline</v-icon>{{ userName }}
              </v-card-text>
            </v-card-title>
            <v-form ref="form" lazy-validation @submit.prevent="updateUserName">
              <v-text-field
                v-model="editUserName"
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
                  @click="updateUserName"
                  :loading="loadingUpdateUserName"
                  :disabled="loadingUpdateUserName"
                >
                  <v-icon left>mdi-account</v-icon>SAVE
                </v-btn>
              </v-card-actions>
            </v-form>
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
    updateUserNameDialog: {
      type: Boolean
    },
    selectedUpdateUserInfo: {
      type: String
    }
  },
  computed: {
    selectedUpdateUserName: {
      get() {
        return this.selectedUpdateUserInfo
      },
      set(value) {
        this.$emit('update:selectedUpdateUserName', value)
        this.editUserName = ''
      }
    },
    ...mapGetters('modules/auth', ['userName'])
  },
  data() {
    return {
      loadingUpdateUserName: false,
      editUserName: '',
      validate: true
    }
  },
  methods: {
    updateUserName() {
      this.loader = 'loadingUpdateUserName'
      this.$store.dispatch('modules/auth/updateUserName', {
        userName: this.editUserName
      })
      this.editUserName = ''
      this.$emit('update:selectedUpdateUserName', 'closeUpdateUserName')
    }
  }
}
</script>
