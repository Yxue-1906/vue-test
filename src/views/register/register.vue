<template>
  <div>
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
          <el-input name="username"
                    type="text"
                    v-model="registerForm.username"
                    autoComplete="on"
                    placeholder="请输入用户名">
              <span slot="prefix">
                <svg-icon icon-class="user" class="color-main"></svg-icon>
              </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="name">
          <el-input name="name"
                    type="text"
                    ref="name"
                    v-model="registerForm.name"
                    autoComplete="on"
                    placeholder="请输入姓名">
              <span slot="prefix">
                <svg-icon icon-class="user" class="color-main"></svg-icon>
              </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="studentID">
          <el-input name="studentID"
                    type="text"
                    ref="studentID"
                    v-model="registerForm.studentID"
                    autoComplete="on"
                    placeholder="请输入学号">
              <span slot="prefix">
                <svg-icon icon-class="user" class="color-main"></svg-icon>
              </span>
          </el-input>
        </el-form-item>
        <el-row type="flex" :gutter="10">
          <el-col>
            <el-form-item prop="password">
              <el-input name="password"
                        ref="password"
                        @keyup.enter.native="handleRegister"
                        v-model="registerForm.password"
                        autoComplete="on"
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
              <el-input name="repeat_password"
                        ref="repeat_password"
                        @keyup.enter.native="handleRegister"
                        v-model="registerForm.repeat_password"
                        autoComplete="on"
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
              <el-select name="grade"
                         ref="grade"
                         v-model="registerForm.grade"
                         autoComplete="on"
                         placeholder="请选择年级"
                         v-model.number="registerForm.grade">
                <el-option v-for="grade in grades"
                           :key="grade.value"
                           :label="grade.label"
                           :value="grade.value"></el-option>
                <span slot="prefix">
            <svg-icon icon-class="user" class="color-main"></svg-icon>
          </span>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item prop="major">
              <el-select name="major"
                         ref="major"
                         v-model="registerForm.major"
                         autoComplete="on"
                         placeholder="请选择院系">
                <el-option v-for="major in majors"
                           :key="major.value"
                           :label="major.label"
                           :value="major.value"></el-option>
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
          <el-link @click="$router.push({path:'/login'})">已有帐号?前往登录</el-link>
        </el-form-item>
      </el-form>
    </el-card>
    <img :src="login_center_bg" class="register-center-layout">
  </div>
</template>

<script>
import {isvalidUsername} from '@/utils/validate';
import {setSupport, getSupport, setCookie, getCookie} from '@/utils/support';
import login_center_bg from '@/assets/images/login_center_bg.png';
import logo from '@/assets/images/logo.jpg'

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
      if (value.length < 3) {
        callback(new Error('密码不能小于3位'))
      } else {
        callback()
      }
    };
    const validateRepeat = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      grades: [
        {
          value: 2018,
          label: '2018级'
        },
        {
          value: 2019,
          label: '2019级'
        },
        {
          value: 2020,
          label: '2020级'
        },
        {
          value: 2021,
          label: '2021级'
        }
      ],
      majors: [
        {
          value: 2,
          label: '自动化系'
        },
        {
          value: 6,
          label: '计算机系'
        }
      ],
      registerForm: {
        username: '',
        name: '',
        password: '',
        repeat_password: '',
        studentID: "",
        grade: 2018,
        major: 6
      },
      registerRules: {
        username: [{required: true, trigger: 'blur', validator: validateUsername}],
        name: [{required: true, trigger: 'blur', validator: validateName}],
        password: [{required: true, trigger: 'blur', validator: validatePass}],
        repeat_password: [{required: true, trigger: 'blur', validator: validateRepeat}]
      },
      loading: false,
      login_center_bg,
      logo,
    }
  },
  created() {
    this.registerForm.username = '';
    this.registerForm.password = '';
    this.registerForm.repeat_password = '';
  },
  methods: {
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          // let isSupport = getSupport();
          // if(isSupport===undefined||isSupport==null){
          //   this.dialogVisible =true;
          //   return;
          // }
          this.loading = true;
          this.$store.dispatch('Register', this.registerForm).then(() => {
            this.loading = false;
            this.$message({message: "注册成功!", type: "success"})
            this.$router.push({path: '/login'})
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
  left: 0;
  right: 0;
  width: 360px;
  margin: 140px auto;
  border-top: 10px solid #409EFF;
}

.login-title {
  text-align: center;
}

.register-center-layout {
  background: #409EFF;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  margin-top: 200px;
}
</style>
