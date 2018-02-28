<template>
  <div class="service-price">
    <v-header title="服务价格"/>
    <div class="content-wrapper">
    </div>
  </div>
</template>

<script>
  import vHeader from 'components/header/v-header'

  export default {
    name: 'service-price',
    components: {
      vHeader
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .service-price
    height 100%
    width 100%
    display flex
    flex-direction column
    .content-wrapper
      height 100%
      overflow scroll
</style>
