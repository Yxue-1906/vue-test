<template>
  <div class="app-container">
    <div>
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <!--          <user-card :user="user"/>-->
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs active-name="account">
              <el-tab-pane label="Account" name="account">
                <account/>
              </el-tab-pane>
              <el-tab-pane v-for="comp in comps" :label="comp.label">
                <component :is="comp.app"></component>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Account from './components/Account'

export default {
  name: 'user',
  components: {
    Account,
  },
  data() {
    return {
      comps: []
    }
  },
  created() {
    if (this.$store.getters.authority < 1)
      this.comps.push({label: "Admin Panel", app: () => import("./components/AdminPanel")});
    if (this.$store.getters.authority < 2)
      this.comps.push({label: "Course Panel", app: () => import("./components/CoursePanel")})
    // if(this.$store.getters.account<2)
    //   this.comps.push()
  }
}
</script>
