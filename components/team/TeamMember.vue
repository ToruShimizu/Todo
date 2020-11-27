<template>
  <v-layout class="justify-center mb-8">
    <v-data-table
      :headers="memberHeaders"
      :items="teamMember"
      :search="searchMember"
      :options.sync="pageOptions"
      sort-by="名前"
      class="elevation-1"
      style="width: 80%"
    >
      <template v-slot:top>
        <v-toolbar flat dense>
          <v-spacer />
          <v-text-field
            v-model="searchMember"
            prepend-inner-icon="mdi-magnify"
            label="検索"
            clearable
            single-line
            hide-details
          />
          <v-divider class="mx-4" inset vertical />
          <BlueDialogButton
            @dialog-button="openRegistrationMember"
            :icon="'mdi-account-plus-outline'"
          />
          <v-spacer />
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <TextButtonXSmall :icon="'mdi-pencil'" @handle-text-button="openUpdateMember(item)" />
        <TextButtonXSmall :icon="'mdi-delete'" @handle-text-button="handleRemoveMember(item)" />
      </template>
    </v-data-table>
    <UpdateMember
      :edit-member="editMember"
      :improvement-roles="improvementRoles"
      :team-roles="teamRoles"
      :update-member-dialog="updateMemberDialog"
      @close-update-member="closeUpdateMember"
    />
  </v-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import UpdateMember from '@/components/team/edit/UpdateMember'
import BlueDialogButton from '@/components/commonParts/button/BlueDialogButton'
import TextButtonXSmall from '@/components/commonParts/button/textButton/TextButtonXSmall'

export default {
  components: {
    UpdateMember,
    BlueDialogButton,
    TextButtonXSmall
  },
  props: {
    teamRoles: {
      type: Array,
      required: true
    },
    improvementRoles: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    memberHeaders: [
      {
        text: '名前',
        align: 'start',
        sortable: true,
        value: 'name'
      },
      { text: '役割', value: 'role', sortable: true },
      { text: '改善', value: 'improvementRole', sortable: true },
      { text: '編集or削除', value: 'actions', sortable: false }
    ],
    searchMember: '',
    pageOptions: {
      page: 1,
      itemsPerPage: 5
    },
    editMember: {},
    updateMemberDialog: false
  }),

  computed: {
    ...mapState('modules/team/team', ['teamMember'])
  },
  methods: {
    handleRemoveMember(item) {
      if (!confirm(item.name + 'を削除しますか？')) return
      this.removeMember(item)
    },
    openRegistrationMember() {
      this.$emit('open-registration-member')
    },
    openUpdateMember(item) {
      this.editMember = Object.assign({}, item)
      this.updateMemberDialog = true
    },
    closeUpdateMember() {
      this.updateMemberDialog = false
    },
    ...mapActions('modules/team/team', ['removeMember'])
  }
}
</script>