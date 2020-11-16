<template>
  <v-layout class="justify-center">
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
          <v-btn color="primary" dark>
            <v-icon>mdi-account-plus-outline </v-icon>
          </v-btn>
          <v-spacer />
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn text x-small>
          <v-icon small> mdi-pencil </v-icon>
        </v-btn>
        <v-btn text x-small @click="removeMember(item)">
          <v-icon small> mdi-delete </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data: () => ({
    memberHeaders: [
      {
        text: '名前',
        align: 'start',
        sortable: true,
        value: 'name'
      },
      { text: '役割', value: 'role', sortable: true },
      { text: '改善', value: 'improvementRoles', sortable: true },
      { text: '編集or削除', value: 'actions', sortable: false }
    ],
    searchMember: '',
    pageOptions: {
      page: 1,
      itemsPerPage: 5
    }
  }),

  computed: {
    ...mapState('modules/team/team', ['teamMember'])
  },
  methods: {
    removeMember(item) {
      this.removeMember(item)
    },
    ...mapActions('modules/team/team', ['removeMember'])
  }
}
</script>