<template>
  <el-form :model="user" :rules="updateRules" ref="updateForm"
           label-width="130px" size="mini" class="update_form" label-position="right">
    <el-form-item label="Username">
      <el-input v-model.trim="user.username" :disabled="true"/>
    </el-form-item>
    <el-form-item label="Name">
      <el-input v-model.trim="user.name"/>
    </el-form-item>
    <el-form-item label="New Password" prop="password">
      <el-input v-model="user.password" show-password/>
    </el-form-item>
    <el-form-item label="Repeat Password" prop="repeat_new_password">
      <el-input v-model="repeat" show-password/>
    </el-form-item>
    <el-form-item label="Student ID">
      <el-input v-model.trim="user.studentID"/>
    </el-form-item>
    <el-form-item label="Grade">
      <el-select name="Grade"
                 ref="grade"
                 v-model="user.grade"
                 autocomplete="on"></el-select>
      <el-option v-for="grade in grades"
                 :key="grade.value"
                 :label="grade.label"
                 :value
    </el-form-item>
    <el-form-item label="Major">
      <el-input v-model.trim="user.major"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">Update</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {mapGetters} from "vuex";
import {getCookie} from "../../../utils/support";

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length < 6 && value.length !== 0) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    };
    const validateRepeat = (rule, value, callback) => {
      if (value !== this.user.password) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    };
    return {
      user: {
        username: this.$store.getters.username,
        name: '',
        password: '',
        studentID: '',
        grade: 0,
        major: 0
      },
      repeat: "",
      updateRules: {
        new_password: [{trigger: 'blur', validator: validatePass}],
        repeat_new_password: [{trigger: 'blur', validator: validateRepeat}]
      }
    }
  },
  computed: {
    ...mapGetters([
      "username",
      "name",
      "studentID",
      "grade",
      "major"
    ])
  },
  created() {
    this.user.username = this.username;
    this.user.name = this.name;
    this.user.studentID = this.studentID;
    this.user.grade = this.grade;
    this.user.major = this.major;
  },
  methods: {
    submit() {
      this.$refs.updateForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (!this.user.password) {
            delete this.user.password
          }
          delete this.user.repeat_new_password
          this.$store.dispatch("UpdateInfo", this.user).then(() => {
            this.loading = false;
            this.$message({
              message: '用户信息更新成功!',
              type: 'success',
              duration: 3 * 1000
            })
          }).catch(error => {
            this.loading = false;
          })
        } else {
          this.$message({
            message: '输入不符合要求',
            type: 'error',
            duration: 3 * 1000
          })
          return false;
        }
      })
    }
  }
}
</script>
<style>
.update_form {
  width: 400px;
}
</style>
