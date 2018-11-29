<template>
  <div class="register">
    <el-card class="box-card">
      <el-form 
        ref="form" 
        :model="formData" 
        label-width="120px">
        <el-form-item label="メールアドレス:">
          <el-input v-model="formData.email"/>
        </el-form-item>
        <el-form-item label="パスワード:">
          <el-input v-model="formData.password"/>
        </el-form-item>
        <div class="submit">
          <el-button 
            type="primary" 
            @click="onSubmit">ログイン</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import authApi from '@/api/auth'

export default {
  layout: 'default',
  data() {
    return {
      formData: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async onSubmit() {
      await authApi
        .login(this, this.formData)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>


<style lang="scss" scoped>
.register {
  width: 100%;
}

.box-card {
  width: 480px;
  margin: 0 auto;
}

.submit {
  text-align: center;
}
</style>
