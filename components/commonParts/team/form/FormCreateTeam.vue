<template>
  <FormDialog :form-dialog="teamDialog">
    <template v-slot:dialog>
      <FormView :title="title">
        <template v-slot:form>
          <v-form ref="form" lazy-validation>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12" class="text-center">
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
                    :rules="nameRules"
                    clearable
                  />
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <InputFile :imageFile="team.imageFile" @change-image-file="changeImageFile" />
                </v-col>
              </v-row>
            </v-container>
            <SaveAndCloseButton
              :close-button-title="'close'"
              :save-button-title="'save'"
              :loader="null"
              @close-button="closeTeamDialog"
              @save-button="handleSaveTeam"
            >
              <template v-slot:save>
                <v-icon left>mdi-account-plus</v-icon>
              </template>
            </SaveAndCloseButton>
          </v-form>
        </template>
      </FormView>
    </template>
  </FormDialog>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import FormDialog from '@/components/commonParts/dialog/FormDialog'
import InputFile from '@/components/commonParts/form/InputFile'

export default {
  components: {
    FormDialog,
    InputFile
  },

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
      nameRules: [(v) => !!v || '名前は必須です。']
    }
  },
  computed: {
    ...mapGetters('modules/team/team', ['teamPhotoURL'])
  },
  methods: {
    changeImageFile(file) {
      this.team.imageFile = file
    },
    closeTeamDialog() {
      this.$refs.form.reset()
      this.team.name = ''
      this.$emit('close-team-dialog')
    },
    handleSaveTeam() {
      if (!this.team.name) {
        this.$refs.form.validate()
        return
      }
      const team = this.team
      this.$emit('save-team', team)
    }
  }
}
</script>