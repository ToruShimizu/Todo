<template>
  <v-dialog
    v-model="updateTeamDialog"
    persistent
    max-width="400px"
    transition="scroll-y-transition"
  >
    <v-app>
      <v-col cols="12" sm="12" md="12">
        <v-card class="mx-auto text-center">
          <v-card-title>
            <h4 class="headline fill-width">サークル編集</h4>
          </v-card-title>
          <v-form ref="form" lazy-validation>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-avatar size="100px">
                    <v-img v-if="teamPhotoURL" :src="teamPhotoURL" :lazy-src="teamPhotoURL">
                    </v-img>
                    <v-icon v-else large>mdi-account-outline</v-icon>
                  </v-avatar>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    prepend-icon="mdi-card-account-details-outline"
                    label="サークル名"
                    persistent-hint
                    hint="サークル名を入力してください"
                    :rules="[validRules.nameRules.required]"
                    clearable
                  />
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-file-input
                    ref="image"
                    v-model="teamImageFile"
                    accept="image/*"
                    show-size
                    label="サークルアイコン"
                    persistent-hint
                    hint="ファイル選択画面が開きます"
                    prepend-icon="mdi-image"
                    @change="changeTeamImageFile"
                  />
                </v-col>
              </v-row>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeUpdateTeam">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="handleUpdateTeam">Save</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-app>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FormValidation from '@/mixins/FormValidation.vue'

export default {
  mixins: [FormValidation],

  props: {
    updateTeamDialog: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      teamImageFile: null
    }
  },
  computed: {
    ...mapGetters('modules/team/team', ['teamPhotoURL'])
  },
  methods: {
    changeTeamImageFile(event) {
      const file = event
      this.teamImageFile = file
    },
    handleUpdateTeam() {
      this.uploadTeamImageFile(this.teamImageFile)
    },
    closeUpdateTeam() {
      this.$emit('close-update-team')
    },
    ...mapActions('modules/team/team', ['updateTeam', 'uploadTeamImageFile'])
  }
}
</script>