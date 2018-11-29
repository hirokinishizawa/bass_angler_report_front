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
    margin-bottom: 100px;
  }
  &__container {
    display: block;
    max-width: 800px;
    width: auto;
    min-height: calc(100% - 130px);
    margin: 80px auto 0;
  }
}
</style>
