<template>
  <div class="history">
    <div class="header-wrapper" ref="headerWrapper">
      <yd-navbar ref="header" title="历史行程" :height="headerHeight" fixed bgcolor="#494c5a" color="#ffffff">
        <yd-navbar-back-icon slot="left" color="#ffffff" @click.native="handleClickToBack"></yd-navbar-back-icon>
      </yd-navbar>
    </div>
    <div class="content-wrapper">
      <div class="content">111111111</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'history',
    data() {
      return {
        headerHeight: '1rem'
      }
    },
    methods: {
      handleClickToBack() {
        setTimeout(() => {
          this.$router.back()
        }, 500)
      }
    },
    mounted() {
      let headerWrapperHeight = this.$refs.headerWrapper.clientHeight
      this.headerHeight = headerWrapperHeight + 'px'
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .history
    height 100%
    width 100%
    display flex
    flex-direction column
    .header-wrapper
      height 1rem
    .content-wrapper
      height 100%
      overflow scroll
      .content
        height 50rem
</style>
