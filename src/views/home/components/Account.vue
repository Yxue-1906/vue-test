<template>
  <el-form>
    <el-form-item label="Username">
      <el-input v-model.trim="user.username" :disabled="true"/>
    </el-form-item>
    <el-form-item label="Name">
      <el-input v-model.trim="user.name"/>
    </el-form-item>
    <el-form-item label="New Password">
      <el-input v-model.trim="user.new_password"/>
    </el-form-item>
    <el-form-item label="Student ID">
      <el-input v-model.trim="user.studentID"/>
    </el-form-item>
    <el-form-item label="Grade">
      <el-input v-model.trim="user.grade"/>
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
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          username: '',
          name: '',
          new_password: '',
          studentID: '',
          grade: 0,
          major: 0
        }
      }
    }
  },
  methods: {
    submit() {
      this.$message({
        message: 'User information has been updated successfully',
        type: 'success',
        duration: 3 * 1000
      })
    }
  }
}
</script>
