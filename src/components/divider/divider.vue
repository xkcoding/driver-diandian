<template>
  <div class="divider">
    <div :class="dashed?'text-dashed':'text'" v-if="text">{{text}}</div>
    <div :class="dashed?'no-text-dashed':'no-text'" v-if="!text"></div>
  </div>
</template>

<script>
  export default {
    name: 'divider',
    props: {
      text: {
        type: String,
        required: false
      },
      dashed: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .divider
    width 100%
    .text
      font-size $font-size-app
      font-weight bolder
      color $color-text-gray
      margin .5rem auto
      position relative
      text-align center
      &:before
        content ''
        border-top 1px solid $color-text-gray
        display block
        position absolute
        width 20%
        top 50%
        left 10%
      &:after
        content ''
        border-top 1px solid $color-text-gray
        display block
        position absolute
        width 20%
        top 50%
        right 10%
    .text-dashed
      font-size $font-size-app
      font-weight bolder
      color $color-text-gray
      margin .5rem auto
      position relative
      text-align center
      &:before
        content ''
        border-top 1px dashed $color-text-gray
        display block
        position absolute
        width 20%
        top 50%
        left 10%
      &:after
        content ''
        border-top 1px dashed $color-text-gray
        display block
        position absolute
        width 20%
        top 50%
        right 10%
    .no-text
      height 1px
      margin .2rem 0
      border-top 1px solid $color-text-gray
    .no-text-dashed
      height 1px
      margin .2rem 0
      border-top 1px dashed $color-text-gray
</style>
