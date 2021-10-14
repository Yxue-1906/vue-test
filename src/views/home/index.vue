<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="user"/>
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="Account" name="account">
                <account :user="user"/>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Account from './components/Account'

export default {
  name: 'home',
  components: {Account},
  data() {
    return {
      user: {},
      activeTab: 'account'
    }
  },
  computed: {
    ...mapGetters([
      'username',
      'name',
      'studentID',
      'grade',
      'major'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        username: this.username,
        name: this.name,
        studentID: this.studentID,
        grade: this.grade,
        major: this.major
        // role: this.roles.join(' | '),
        // email: 'admin@test.com',
        // avatar: this.avatar
      }
    }
  }
}
</script>
