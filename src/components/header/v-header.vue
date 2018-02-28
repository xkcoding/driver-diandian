<template>
  <div class="v-header">
    <div class="left-wrapper" slot="left">
      <yd-navbar-back-icon color="#ffffff" @click.native="handleClickToBack">返回</yd-navbar-back-icon>
    </div>
    <h1 class="text">{{title}}</h1>
    <div class="right-wrapper" slot="right">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'v-header',
    props: {
      title: {
        type: String,
        required: true
      }
    },
    methods: {
      handleClickToBack() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .v-header
    position relative
    height $height-header
    line-height $height-header
    background $color-app-theme
    color $color-text
    .left-wrapper
      position absolute
      top 0
      left .1rem
      height $height-header
      font-size $font-size-header-back
    .text
      text-align center
      font-size $font-size-header
    .right-wrapper
      position absolute
      top 0
      right .1rem
      height $height-header
      font-size $font-size-header-back
</style>
