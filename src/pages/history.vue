<template>
  <div class="history">
    <v-header title="历史行程"/>
    <div class="content-wrapper">
      <divider text="无记录"/>
      <div class="content">
        <yd-icon name="history" custom color="#999" size="2rem"></yd-icon>
      </div>
    </div>
  </div>
</template>

<script>
  import vHeader from 'components/header/v-header'
  import divider from 'components/divider/divider'

  export default {
    name: 'history',
    components: {
      vHeader, divider
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .history
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
