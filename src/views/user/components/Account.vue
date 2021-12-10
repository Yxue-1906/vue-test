<template>
  <el-form :model="user" :rules="updateRules" ref="updateForm"
           label-width="130px" size="mini" class="update_form" label-position="right">
    <el-form-item label="Username">
      <el-input v-model="user.username" :disabled="this.$store.getters.authority>1"/>
    </el-form-item>
    <el-form-item label="Name">
      <el-input v-model="user.name"/>
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
    <el-form-item prop="grade" label="Grade">
      <el-select name="grade"
                 ref="grade"
                 v-model.number="user.grade">
        <el-option v-for="grade in grades"
                   :label="grade"
                   :value="grade"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Major">
      <el-select name="major"
                 ref="major"
                 v-model="user.major">
        <el-option v-for="major in majors"
                   :key="major.major_id"
                   :label="major.major_name"
                   :value="major.major_id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">Update</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {mapGetters} from "vuex";
import {getCookie} from "../../../utils/support";
import {getMajorList} from "../../../api/info";

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
      if (this.repeat !== this.user.password) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    };
    return {
      grades: [2018, 2019, 2020, 2021],
      majors: [],
      user: {},
      repeat: '',
      updateRules: {
        new_password: [{trigger: 'blur', validator: validatePass}],
        repeat_new_password: [{trigger: 'blur', validator: validateRepeat}]
      }
    }
  },
  created() {
    this.user = {
      username: this.$store.getters.username,
      name: this.$store.getters.name,
      studentID: this.$store.getters.studentID,
      grade: this.$store.getters.grade,
      major: this.$store.getters.major,
    }
    new Promise((resolve, reject) => {
      getMajorList().then(response => {
        this.majors = response.data.items;
      })
      resolve();
    }).catch(err => {
      reject(err);
    });
  },
  methods: {
    submit() {
      this.$refs.updateForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.user.password === '' || this.user.password == null)
            delete this.user.password;
          this.$store.dispatch("UpdateInfo", this.user).then(() => {
            this.loading = false;
            this.$message({
              message: '用户信息更新成功!',
              type: 'success',
              duration: 3 * 1000
            })
            setTimeout("location.reload()", 3 * 1000);
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
