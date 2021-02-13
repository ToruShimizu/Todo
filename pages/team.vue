<template>
  <div class="my-6">
    <v-row class="justify-center mb-5">
      <template>
        <v-avatar size="70px">
          <!-- チーム画像 -->
          <template v-if="teamPhotoURL">
            <LoadingImg v-if="teamPhotoURL" :src="teamPhotoURL" width="70" height="70" />
          </template>
          <v-icon v-else class="blue--grey darken-1">mdi-account-outline</v-icon>
        </v-avatar>
      </template>
      <h2 class="blue--grey--text darken-1 font-italic mt-3 ml-2">{{ teamName }}</h2>
      <!-- チーム編集・削除選択リスト -->
      <EditTeamList class="mt-3" />
    </v-row>

    <v-row class="justify-center mb-8">
      <v-data-table
        :headers="memberHeaders"
        :items="teamMember"
        :search="searchWord"
        :options.sync="DEFAULT_PAGE_OPTIONS"
        sort-by="名前"
        class="elevation-1"
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
      <!-- メンバー追加ダイアログ -->
      <RegistrationMember
        v-model="isOpenedRegistrationMemberDialog"
        :team-roles="teamRoles"
        :improvement-roles="improvementRoles"
      />
      <!-- メンバー編集ダイアログ -->
      <UpdateMember
        v-model="isOpenedUpdateMemberDialog"
        :edit-member="editMember"
        :team-roles="teamRoles"
        :improvement-roles="improvementRoles"
      />
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

// テーブルに渡す
const DEFAULT_PAGE_OPTIONS = {
  page: 1,
  itemsPerPage: 7
}

export default {
  middleware: 'authenticated',

  data() {
    return {
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
      isOpenedUpdateMemberDialog: false,
      isOpenedRegistrationMemberDialog: false,
      teamRoles: ['リーダー', 'サブリーダー', 'レクリエーション', '安全', '6S', '書記', '改善'],
      improvementRoles: [
        'テーマリーダー',
        'サブリーダー',
        'テーマの選定',
        '選定理由',
        '活動計画',
        '目標設定',
        '現状の把握',
        '解析',
        '対策立案',
        '対策実施',
        '効果の確認',
        '標準化',
        '今後の進め方'
      ]
    }
  },
  computed: {
    ...mapState('modules/team/team', ['teamMember']),
    ...mapGetters('modules/team/team', ['teamName', 'teamPhotoURL'])
  },
  methods: {
    openUpdateMember(item) {
      this.editMember = item
      this.isOpenedUpdateMemberDialog = true
    }
  }
}
</script>
