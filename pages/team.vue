<template>
  <div class="my-6">
    <TeamName />

    <RegistrationMember
      :member-dialog="registrationMemberDialog"
      :team-member="teamMember"
      :team-roles="teamRoles"
      :improvement-roles="improvementRoles"
      @close-registration-member="closeRegistrationMember"
    />
    <TeamMember
      @open-registration-member="openRegistrationMember"
      :improvement-roles="improvementRoles"
      :team-roles="teamRoles"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import RegistrationMember from '@/components/team/RegistrationMember'
import TeamMember from '@/components/team/teamMember'
import TeamName from '@/components/team/TeamName'

export default {
  middleware: 'authenticated',
  components: {
    RegistrationMember,
    TeamName
  },
  data() {
    return {
      registrationMemberDialog: false,
      registrationPanel: [0, 1],
      teamMember: {
        name: '',
        role: [],
        improvementRole: []
      },
      teamRoles: ['リーダー', 'サブリーダー', 'レクリエーション', '安全', '6S'],
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
    ...mapGetters('modules/team/team', ['teamName'])
  },
  methods: {
    openRegistrationMember() {
      this.registrationMemberDialog = true
    },
    closeRegistrationMember() {
      this.registrationMemberDialog = false
    }
  }
}
</script>