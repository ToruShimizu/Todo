<template>
  <FormDialog :form-dialog="teamDialog">
    <template v-slot:dialog>
      <v-col cols="12" sm="12" md="12">
        <v-card class="mx-auto text-center">
          <v-card-title>
            <h4 class="headline fill-width">{{ title }}</h4>
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
                    v-model="team.name"
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
                    v-model="team.imageFile"
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
              <v-btn color="blue darken-1" text @click="closeTeamDialog">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="saveTeam">Save</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </template>
  </FormDialog>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import FormValidation from '@/mixins/FormValidation.vue'

export default {
  mixins: [FormValidation],

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
  computed: {
    ...mapGetters('modules/team/team', ['teamPhotoURL'])
  },
  methods: {
    changeTeamImageFile(event) {
      const file = event
      this.team.imageFile = file
    },
    closeTeamDialog() {
      this.$emit('close-team-dialog')
    },
    saveTeam() {
      const team = this.team
      this.$emit('save-team', team)
    }
  }
}
</script>