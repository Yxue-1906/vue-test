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
              <el-tab-pane label="AdminPanel" name="admin_panel">
                <admin-panel/>
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
import AdminPanel from "./components/AdminPanel";

export default {
  name: 'user',
  components: {AdminPanel, Account},
}
</script>
