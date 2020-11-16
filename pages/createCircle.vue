<template>
  <v-app>
    <v-col cols="12" sm="12" md="12">
      <v-card width="600px" class="mx-auto">
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="memberName"
                label="名前"
                required
                clearable
                dense
                prepend-inner-icon="mdi-card-account-details-outline"
                :rules="[validRules.nameRules.required]"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-combobox
                v-model="teamMenber.role"
                :items="teamRoles"
                label="サークル役割"
                clearable
                multiple
                small-chips
                persistent-hint
                dense
                prepend-inner-icon="mdi-briefcase-account-outline"
                hint="文字入力の場合はEnterキーを押してください"
                @click:clear="$nextTick(() => (searchedCategoryKeyword = null))"
              >
              </v-combobox>
            </v-col>
            <v-col cols="12" md="6">
              <v-combobox
                v-model="teamMenber.improvementRoles"
                :items="improvementRoles"
                label="改善事例担当"
                clearable
                persistent-hint
                hint="文字入力の場合はEnterキーを押してください"
                multiple
                small-chips
                prepend-inner-icon="mdi-briefcase-outline"
                @click:clear="$nextTick(() => (searchedCategoryKeyword = null))"
              >
              </v-combobox>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="primary" @click="registrationMember">登録</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-app>
</template>

<script>
import FormValidation from '@/mixins/FormValidation.vue'

export default {
  mixins: [FormValidation],
  components: {},
  data() {
    return {
      teamMenber: {
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