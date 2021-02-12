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
          <AppButton @click="openRegistrationMember">メンバー追加 </AppButton>

          <v-spacer />
        </v-toolbar>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon class="pr-1" color="success" @click="openUpdateMember(item)">mdi-pencil</v-icon>
        <v-icon class="pl-1" color="success" @click="handleRemoveMember(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
    <UpdateMember
      :edit-member="editMember"
      :improvement-roles="improvementRoles"
      :team-roles="teamRoles"
      :update-member-dialog="isOpenedUpdateMemberDialog"
      @close-update-member="isOpenedUpdateMemberDialog = true"
    />
  </v-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'

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
    isOpenedUpdateMemberDialog: false
  }),

  computed: {
    ...mapState('modules/team/team', ['teamMember'])
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
