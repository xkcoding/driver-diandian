<template>
  <div class="driver-mask" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
  import {addClass, removeClass, getScrollview, isIOS} from 'common/js/assist'

  export default {
    name: 'v-mask',
    data() {
      return {
        show: this.value
      }
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      bgcolor: {
        type: String,
        default: '#000'
      },
      zindex: {
        default: 1500
      },
      opacity: {
        default: 0.4
      },
      animated: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      value(val) {
        this.show = val
        if (isIOS) {
          if (val) {
            addClass(this.scrollView, 'g-fix-ios-overflow-scrolling-bug')
          } else {
            setTimeout(() => {
              removeClass(this.scrollView, 'g-fix-ios-overflow-scrolling-bug')
            }, 200)
          }
        }
      }
    },
    computed: {
      styles() {
        const style = {'z-index': this.zindex, 'background-color': this.bgcolor}
        if (this.show) {
          style['opacity'] = this.opacity
          style['pointer-events'] = 'auto'
        }
        return style
      }
    },
    mounted() {
      this.scrollView = getScrollview(this.$el)
    },
    destroyed() {
      isIOS && removeClass(this.scrollView, 'g-fix-ios-overflow-scrolling-bug')
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .driver-mask
    position fixed
    bottom 0
    right 0
    left 0
    top 0
    display flex
    justify-content center
    align-items center
    pointer-events none
    transition opacity .2s ease-in
    opacity 0
</style>
