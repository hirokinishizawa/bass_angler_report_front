<template>
  <div class="header">
    <div class="logo">
      <nuxt-link to="/">
        <img src="~assets/img/d-bass.png">
      </nuxt-link>
    </div>
    <div class="header-right">
      <template v-if="loggedIn">
        <span 
          class="column" 
          @click="isShow = true">
          投稿する
        </span>
        <span class="column">
          <nuxt-link to="/my-page">マイページ</nuxt-link>
        </span>
      </template>
      <template v-else>
        <span class="column">
          <nuxt-link to="/login">ログイン</nuxt-link>
        </span>
        <span class="column">
          <nuxt-link to="/register">アカウント登録</nuxt-link>
        </span>
      </template>
    </div>
    <create-report-modal　v-if="isShow" 
      @cancel="cancelModal" 
      @submit="onSubmit"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CreateReportModal from '@/components/Report/CreateReportModal'

export default {
  name: 'Header',
  components: {
    CreateReportModal
  },
  data() {
    return {
      isShow: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user'
    }),
    loggedIn() {
      return this.user != null
    },
    userId() {
      return this.user ? this.user.id : null
    },
    userName() {
      return this.user ? `${this.user.sei}${this.user.mei}` : ''
    }
  },
  methods: {
    ...mapActions({
      createReport: 'report/createReport'
    }),
    cancelModal() {
      this.isShow = false
    },
    async onSubmit(data) {
      try {
        await this.createReport(data)
        this.isShow = false
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 50px;
  width: 100%;
  font-size: 16px;
  line-height: 50px;
  background-color: white;
  border-bottom: 1px solid #eee;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;

  .logo {
    float: left;
    width: 50px;
    background-color: lightblue;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }

    a {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    img {
      position: relative;
      display: block;
      height: 40px;
    }
  }
}

.header-right {
  display: flex;
  align-items: center;
  line-height: 50px;
  .column {
    color: gray;
    position: relative;
    display: inline-block;
    cursor: pointer;
    padding: 0 10px;
    transition: all 0.3s ease;
    font-weight: bold;
    &:hover {
      background-color: rgb(241, 241, 241);
    }
  }
}

a {
  color: gray;
  display: block;
  width: 100%;
  text-align: center;
  text-decoration: none;
}
</style>
