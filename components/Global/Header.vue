<template>
  <div class="header">
    <div class="logo">
      <nuxt-link to="/">
        <img src="~assets/img/d-bass.png">
      </nuxt-link>
    </div>
    <div 
      v-if="loggedIn" 
      class="header-right"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Header',
  computed: {
    ...mapGetters({
      accessToken: 'auth/accessToken',
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

a {
  display: block;
  width: 100%;
  text-align: center;
  text-decoration: none;
}
</style>
