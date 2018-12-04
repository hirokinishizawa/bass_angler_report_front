<template>
  <div class="app__wrapper">
    <Header/>
    <div class="app__container">
      <nuxt/>
    </div>
  </div>
</template>

<script>
import Header from '~/components/Global/Header.vue'

export default {
  components: {
    Header
  }
}
</script>

<style lang="scss" scoped>
.app {
  &__wrapper {
    padding-top: 80px;
    padding-bottom: 50px;
    background-color: whitesmoke;
  }
  &__container {
    margin: 0 auto;
    display: block;
    max-width: 810px;
    width: auto;
    min-height: calc(100vh - 80px);
  }
}
</style>
