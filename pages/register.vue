<template>
  <div class="register">
    <el-card class="box-card">
      <el-form 
        ref="form" 
        :model="formData" 
        label-width="120px">
        <el-form-item label="お名前:">
          <el-input v-model="formData.name"/>
        </el-form-item>
        <el-form-item label="メールアドレス:">
          <el-input v-model="formData.email"/>
        </el-form-item>
        <el-form-item label="アカウント名:">
          <el-input v-model="formData.account"/>
        </el-form-item>
        <el-form-item 
          label="パスワード:" >
          <el-input 
            v-model="formData.password" 
            type="password"/>
        </el-form-item>
        <div class="submit">
          <el-button 
            type="primary" 
            @click="onSubmit">登録する</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import authApi from '@/api/auth'

export default {
  layout: 'default',
  middleware: ['anonymous'],

  data() {
    return {
      formData: {
        name: '',
        email: '',
        account: '',
        password: ''
      }
    }
  },
  methods: {
    async onSubmit() {
      await authApi
        .register(this, this.formData)
        .then(res => {
          this.$router.push({ name: 'login' })
        })
        .catch(err => {
          console.error(err)
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
