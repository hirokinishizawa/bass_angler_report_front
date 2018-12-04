<template>
  <div class="register">
    <el-card class="box-card">
      <el-form 
        ref="form" 
        :model="formData" 
        label-width="120px">
        <el-form-item label="アカウント名:">
          <el-input v-model="formData.account"/>
          <p 
            v-if="hasError" 
            class="error">アカウントまたはパスワードが間違っています。</p>
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
  middleware: ['anonymous'],
  asyncData({ query }) {
    return {
      next: query.next ? decodeURIComponent(query.next) : null
    }
  },
  data() {
    return {
      formData: {
        account: '',
        password: ''
      },
      isBusy: false,
      hasError: false
    }
  },
  methods: {
    validatePath(path) {
      return /^\/.+$/.test(path)
    },
    async onSubmit() {
      if (this.isBusy) {
        return
      }
      this.hasError = false
      this.isBusy = true
      try {
        await this.$store.dispatch('auth/fetchAccessToken', this.formData)
        const to = this.validatePath(this.next) ? this.next : '/'
        this.$router.push(to)
      } catch (error) {
        console.error(error)
        this.hasError = true
      } finally {
        this.isBusy = false
      }
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

.error {
  margin: 0.5rem 0 0;
  color: #dc3339;
  letter-spacing: 0;
  font-size: 12px;
  font-weight: normal;
  line-height: 1;
}
</style>
