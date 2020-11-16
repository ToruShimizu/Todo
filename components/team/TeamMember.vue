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
            <template>
              <transition>
                <tr>
                  <td></td>
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