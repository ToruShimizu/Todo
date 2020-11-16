<template>
  <v-app>
    <v-expansion-panels v-model="registrationPanel" multiple class="mb-4">
      <v-expansion-panel>
        <v-expansion-panel-header expand-icon="mdi-menu-down" class="font-weight-medium">
          <span class="font-weight-bold text-center"> メンバー登録 </span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <RegistrationTeam
            :team-member="teamMember"
            :team-roles="teamRoles"
            :improvement-roles="improvementRoles"
        /></v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <TeamMenber />
  </v-app>
</template>

<script>
import RegistrationTeam from '@/components/team/RegistrationTeam'
import TeamMenber from '@/components/team/teamMember'

export default {
  components: {
    RegistrationTeam,
    TeamMenber
  },
  data() {
    return {
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
  methods: {
    registrationMember() {}
  }
}
</script>