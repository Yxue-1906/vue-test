<template>
  <div class="register-page">
    <el-card class="register-form-layout">
      <el-form autoComplete="on"
               :model="registerForm"
               :rules="registerRules"
               ref="registerForm"
               label-position="left">
        <div style="text-align: center">
          <img :src="logo" style="height: 90px;"/>
        </div>
        <el-form-item prop="username">
          <el-input v-model="registerForm.username"
                    placeholder="请输入用户名">
              <span slot="prefix">
                <svg-icon icon-class="user" class="color-main"></svg-icon>
              </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="name">
          <el-input v-model="registerForm.name"
                    placeholder="请输入姓名">
              <span slot="prefix">
                <svg-icon icon-class="user" class="color-main"></svg-icon>
              </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="studentID">
          <el-input v-model="registerForm.studentID"
                    placeholder="请输入学号">
              <span slot="prefix">
                <svg-icon icon-class="user" class="color-main"></svg-icon>
              </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input v-model="registerForm.phone"
                    placeholder="请输入手机号">
              <span slot="prefix">
                <svg-icon icon-class="user" class="color-main"></svg-icon>
              </span>
          </el-input>
        </el-form-item>
        <el-row type="flex" :gutter="10">
          <el-col>
            <el-form-item prop="password">
              <el-input v-model="registerForm.password"
                        placeholder="请输入密码"
                        show-password>
                <span slot="prefix">
                  <svg-icon icon-class="password" class="color-main"></svg-icon>
                </span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item prop="repeat_password">
              <el-input v-model="repeatPassword"
                        placeholder="请重复密码"
                        show-password>
                <span slot="prefix">
                  <svg-icon icon-class="password" class="color-main"></svg-icon>
                </span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" :gutter="10">
          <el-col>
            <el-form-item prop="grade">
              <el-select placeholder="请选择年级"
                         v-model.number="registerForm.grade">
                <el-option v-for="grade in grades"
                           :label="grade"
                           :value="grade"></el-option>
                <span slot="prefix">
            <svg-icon icon-class="user" class="color-main"></svg-icon>
          </span>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item prop="major">
              <el-select v-model.number="registerForm.major"
                         placeholder="请选择专业">
                <el-option v-for="major in majors"
                           :label="major.major_name"
                           :value="major.major_id"></el-option>
                <span slot="prefix">
                <svg-icon icon-class="user" class="color-main"></svg-icon>
                </span>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item style="text-align: center">
          <el-button style="width: 45%" type="primary" @click.native.prevent="handleRegister">
            注册
          </el-button>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-link @click="$router.replace({path:'/login'})">已有帐号?前往登录</el-link>
        </el-form-item>
      </el-form>
    </el-card>
    <img :src="login_center_bg" class="register-center-layout">
  </div>
</template>

<script>
import {isvalidUsername} from '../../utils/validate';
import login_center_bg from '../../assets/images/login_center_bg.png';
import logo from '../../assets/images/logo.jpg'
import {register} from "../../api/user";
import {getMajorList} from "../../api/info";

export default {
  name: 'register',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    };
    const validateName = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('请输入正确的姓名'))
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
      if (this.repeatPassword != null && this.registerForm.password !== null && this.repeatPassword !== this.registerForm.password) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    };
    return {
      repeatPassword: '',
      grades: [2018, 2019, 2020, 2021],
      majors: [],
      registerForm: {},
      registerRules: {
        username: [{required: true, trigger: 'blur', validator: validateUsername}],
        name: [{required: true, trigger: 'blur', validator: validateName}],
        password: [{required: true, trigger: 'blur', validator: validatePass}],
        repeat_password: [{required: true, trigger: 'blur', validator: validateRepeat}],

      },
      loading: false,
      login_center_bg,
      logo,
    }
  },
  created() {
    new Promise((resolve, reject) => {
      getMajorList().then(response => {
        this.majors = response.data.items;
      })
      resolve();
    }).catch(err => {
      reject(err);
    })
  },
  methods: {
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true;
          let registerData = this.registerForm;
          this.$store.dispatch("Register", registerData).then(() => {
            this.loading = false;
            this.$message({message: "注册成功!", type: "success", duration: 1000})
            setTimeout(() => {
              this.$router.push({path: '/user'});
            }, 1000);
            // this.$router.replace({path: '/login'});
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('参数验证不合法！');
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

.register-form-layout {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 360px;
  max-height: 620px;
  margin: auto;
  border-top: 10px solid #409EFF;
}

.login-title {
  text-align: center;
}

.register-center-layout {
  position: absolute;
  z-index: -1;
  background: #409EFF;
  top: 0;
  bottom: 0;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  /*margin-top: 250px;*/
  margin: auto;
}
</style>
