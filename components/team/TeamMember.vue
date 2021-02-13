<template>
  <v-layout class="justify-center mb-8">
    <v-data-table
      :headers="memberHeaders"
      :items="teamMember"
      :search="searchWord"
      :options.sync="DEFAULT_PAGE_OPTIONS"
      sort-by="名前"
      class="elevation-1"
      style="width: 80%"
    >
      <template v-slot:top>
        <v-toolbar flat dense>
          <v-spacer />
          <v-text-field
            v-model="searchWord"
            prepend-inner-icon="mdi-magnify"
            label="検索"
            clearable
            single-line
            hide-details
          />
          <v-divider class="mx-4" inset vertical />
          <AppButton @click="isOpenedRegistrationMemberDialog = true">メンバー追加 </AppButton>

          <v-spacer />
        </v-toolbar>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon class="pr-1" color="success" @click="openUpdateMember(item)">mdi-pencil</v-icon>
        <v-icon class="pl-1" color="success" @click="handleRemoveMember(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
    <RegistrationMember
      v-model="isOpenedRegistrationMemberDialog"
      :team-member="teamMember"
      :team-roles="teamRoles"
      :improvement-roles="improvementRoles"
    />
    <UpdateMember
      v-model="isOpenedUpdateMemberDialog"
      :edit-member="editMember"
      :team-roles="teamRoles"
    />
  </v-layout>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
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
    DEFAULT_PAGE_OPTIONS,
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
    searchWord: '',

    editMember: {},
    isOpenedUpdateMemberDialog: false
  }),

  computed: {
    ...mapState('modules/team/team', ['teamMember']),
    ...mapGetters('modules/team/team', ['teamName', 'teamPhotoURL'])
  },
  methods: {
    // メンバー削除
    handleRemoveMember(item) {
      if (!confirm(item.name + 'を削除しますか？')) return
      this.removeMember(item)
    },
    openRegistrationMember() {
      this.$emit('open-registration-member')
    },
    // メンバー編集ダイアログを開く
    openUpdateMember(item) {
      this.editMember = Object.assign({}, item)
      this.isOpened = true
    },

    ...mapActions('modules/team/team', ['removeMember'])
  }
}
</script>
