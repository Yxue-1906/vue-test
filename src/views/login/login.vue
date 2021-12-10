<template>
  <div>
    <el-card class="login-form-layout">
      <el-form autoComplete="on"
               :model="loginForm"
               :rules="loginRules"
               ref="loginForm"
               label-position="left">
        <div style="text-align: center">
          <img :src="logo" style="height: 90px;"/>
        </div>
        <el-form-item prop="username">
          <el-input name="username"
                    type="text"
                    v-model="loginForm.username"
                    autoComplete="on"
                    placeholder="请输入用户名">
          <span slot="prefix">
            <svg-icon icon-class="user" class="color-main"></svg-icon>
          </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input name="password"
                    @keyup.enter.native="handleLogin"
                    v-model="loginForm.password"
                    autoComplete="on"
                    placeholder="请输入密码"
                    show-password>
          <span slot="prefix">
            <svg-icon icon-class="password" class="color-main"></svg-icon>
          </span>
          </el-input>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button style="width: 45%" type="primary" :loading="loading" @click.native.prevent="handleLogin">
            登录
          </el-button>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-link @click="$router.replace({path:'/register'})">没有账号?前往注册</el-link>
        </el-form-item>
      </el-form>
    </el-card>
    <img :src="login_center_bg" class="login-center-layout">
  </div>
</template>

<script>
import {isvalidUsername} from '@/utils/validate';
import {setSupport, getSupport, setCookie, getCookie} from '@/utils/support';
import login_center_bg from '@/assets/images/login_center_bg.png';
import logo from '@/assets/images/logo.jpg'

export default {
  name: 'login',
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
      } else {
        callback()
      }
    };
    return {
      loginForm: {
        username: '',
        password: '',
      },
      loginRules: {
        username: [{required: true, trigger: 'blur', validator: validateUsername}],
        password: [{required: true, trigger: 'blur', validator: validatePass}]
      },
      loading: false,
      pwdType: 'password',
      login_center_bg,
      logo,
      dialogVisible: false,
      supportDialogVisible: false
    }
  },
  created() {
    this.loginForm.username = getCookie("username");
    this.loginForm.password = '';
    this.loginForm.username = '';
    this.loginForm.password = '';
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // let isSupport = getSupport();
          // if(isSupport===undefined||isSupport==null){
          //   this.dialogVisible =true;
          //   return;
          // }
          this.loading = true;
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false;
            this.$router.push({path: '/'})
          }).catch(() => {
            this.loading = false;
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
.login-form-layout {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  max-height: 400px;
  width: 360px;
  margin: auto;
  border-top: 10px solid #409EFF;
}

.login-title {
  text-align: center;
}

.login-center-layout {
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
