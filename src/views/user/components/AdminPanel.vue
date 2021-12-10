<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>管理员列表</span>
      <el-button
        class="btn-add"
        @click="addVisible = true"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="adminTable"
                :data="adminList"
                style="width: 100%"
                border>
        <el-table-column label="Admin Id" min-width="15%" align="center" h>
          <template slot-scope="scope">{{ scope.row.account }}</template>
        </el-table-column>
        <el-table-column label="Admin Username" min-width="15%" align="center">
          <template slot-scope="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <el-table-column label="Notes" min-width="60%" align="center">
          <template slot-scope="scope">{{ scope.row.remark }}</template>
        </el-table-column>
<!--        <el-table-column label="Operation" min-width="10%" align="center">-->
<!--          <template slot-scope="scope">-->
<!--            <p>-->
<!--              <el-button @click="handleDeleteAdmin(scope)">删除</el-button>-->
<!--            </p>-->
<!--          </template>-->
<!--        </el-table-column>-->
      </el-table>
    </div>
    <el-dialog title="添加管理员" :visible.sync="addVisible">
      <el-form :rules="addAdminRules"
               :model="addAdminDetail"
               ref="addAdminForm">
        <el-form-item prop="username" label="管理员用户名" :label-width="'120px'">
          <el-input @keyup.enter.native="handleAddAdmin"
                    v-model="addAdminDetail.username"
                    placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="管理员密码" :label-width="'120px'">
          <el-input @keyup.enter.native="handleAddAdmin"
                    v-model="addAdminDetail.password"
                    placeholder="请设置管理员密码"></el-input>
        </el-form-item>
        <el-form-item prop="repeat" label="重复密码" :label-width="'120px'">
          <el-input @keyup.enter.native="handleAddAdmin"
                    v-model="repeatPassword"
                    placeholder="请重复一遍密码"></el-input>
        </el-form-item>
        <el-form-item label="备注信息" :label-width="'120px'">
          <el-input @keyup.enter.native="handleAddAdmin"
                    v-model="addAdminDetail.remark"
                    placeholder="请输入备注信息或留空"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancelAdd">取 消</el-button>
        <el-button type="primary" @click="handleAddAdmin">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import {isvalidUsername} from "../../../utils/validate";
import {addAdmin, getAdminList} from "../../../api/admin";

export default {
  label: "A",
  name: "admin-panel",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else if (value.length > 16) {
        callback(new Error('密码长度应小于16位'))
      } else callback();
    };
    const validateRepeat = (rule, value, callback) => {
      if (this.repeatPassword !== this.addAdminDetail.password)
        callback(new Error('两次输入的密码不一致'))
      else callback();
    };
    return {
      addAdminDetail: {},
      repeatPassword: '',
      adminList: [],
      addVisible: false,
      addAdminRules: {
        username: [{required: true, trigger: 'blur', validator: validateUsername}],
        password: [{required: true, trigger: 'blur', validator: validatePass}],
        repeat: [{required: true, trigger: 'blur', validator: validateRepeat}]
      }
    }
  },
  created() {
    getAdminList().then(response => {
      this.adminList = response.data.items;
    })
  },
  methods: {
    handleCancelAdd() {
      this.addVisible = false;
      this.addAdminDetail = Object.assign({}, {});
      this.repeatPassword = "";
    },
    handleAddAdmin() {
      this.$refs.addAdminForm.validate(valid => {
        if (valid) {
          addAdmin(this.addAdminDetail).then(response => {
            this.$message({message: "添加成功!", type: "success", duration: 1000});
            this.addAdminDetail = Object.assign({}, {});
            this.repeatPassword = "";
            this.addVisible = false;
            getAdminList().then(response => {
              this.adminList = response.data.items;
            })
          }).catch(err => {

          })
        } else {
          this.$message({message: "输入的管理员信息不合法, 请检查后重新提交", type: "error", duration: 1000})
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .user-block {

    .username,
    .description {
      display: block;
      margin-left: 50px;
      padding: 2px 0;
    }

    .username {
      font-size: 16px;
      color: #000;
    }

    :after {
      clear: both;
    }

    .img-circle {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      float: left;
    }

    span {
      font-weight: 500;
      font-size: 12px;
    }
  }

  .post {
    font-size: 14px;
    border-bottom: 1px solid #d2d6de;
    margin-bottom: 15px;
    padding-bottom: 15px;
    color: #666;

    .image {
      width: 100%;
      height: 100%;

    }

    .user-images {
      padding-top: 20px;
    }
  }

  .list-inline {
    padding-left: 0;
    margin-left: -5px;
    list-style: none;

    li {
      display: inline-block;
      padding-right: 5px;
      padding-left: 5px;
      font-size: 13px;
    }

    .link-black {

      &:hover,
      &:focus {
        color: #999;
      }
    }
  }

}

.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}
</style>
