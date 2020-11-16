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
            <template v-for="member in teamMember">
              <transition :key="member.name" name="list">
                <tr>
                  <td>{{ member.name }}</td>

                  <td>
                    {{ member.role }}
                  </td>
                  <td>{{ member.improvementRole }}</td>
                  <td>
                    <v-btn icon>
                      <v-icon>mdi-delete-outline</v-icon>
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
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState('modules/team/team', ['teamMember'])
  }
}
</script>