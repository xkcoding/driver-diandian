<template>
  <div class="coupon">
    <v-header title="优惠券"/>
    <div class="content-wrapper">
      <divider text="暂无优惠券"/>
      <div class="content">
        <yd-icon name="coupon" custom color="#999" size="2rem"></yd-icon>
      </div>
    </div>
  </div>
</template>

<script>
  import vHeader from 'components/header/v-header'
  import divider from 'components/divider/divider'

  export default {
    name: 'coupon',
    components: {
      vHeader, divider
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .coupon
    height 100%
    width 100%
    display flex
    flex-direction column
    .content-wrapper
      height 100%
      overflow scroll
      .content
        text-align center
</style>
