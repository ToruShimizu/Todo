<template>
  <v-app>
    <v-card>
      <v-simple-table>
        <template>
          <thead>
            <tr>
              <th class="text-left">名前</th>
              <th class="text-left">役割</th>
              <th class="text-left">改善</th>
              <th class="text-left">削除</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="contents in displayActivityPlans">
              <transition :key="contents.catgorys" name="list">
                <tr>
                  <td>
                    <v-btn icon @click="toggleDoneActivityPlan(contents)">
                      <v-icon :class="(!contents.done && 'grey--text') || 'primary--text'"
                        >mdi-check-circle-outline</v-icon
                      >
                    </v-btn>
                  </td>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <td
                        v-bind="attrs"
                        :class="(contents.done && 'grey--text') || 'primary--text'"
                        v-on="on"
                        @click="openUpdateActivityPlan(contents)"
                      >
                        {{ contents.category }}
                      </td>
                    </template>
                    <span>{{ contents.category }}の詳細を開く</span>
                  </v-tooltip>
                  <td :class="(contents.done && 'grey--text') || 'black--text'" class="pa-0">
                    {{ contents.date }}
                  </td>
                  <td>
                    <v-btn icon>
                      <v-icon @click="handleRemoveActivityPlan(contents)"
                        >mdi-delete-outline</v-icon
                      >
                    </v-btn>
                  </td>
                </tr>
              </transition>
            </template>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      teamMemberHeaders: [
        { text: '名前', value: 'name', align: 'start' },
        {
          text: ' 役割',
          value: 'teamRoles'
        },
        { text: '期限', value: 'date' },
        { text: '削除', value: 'remove', sortable: false }
      ]
    }
  }
}
</script>