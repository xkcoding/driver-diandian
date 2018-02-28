<template>
  <div id="app">
    <keep-alive>
      <transition :name="viewTransition" :css="!!direction">
        <router-view/>
      </transition>
    </keep-alive>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'app',
    data() {
      return {}
    },
    computed: {
      ...mapGetters([
        'direction'
      ]),
      viewTransition() {
        if (!this.direction) {
          return ''
        }
        return 'driver-pop-' + (this.direction === 'forward' ? 'in' : 'out')
      }
    },
    mounted() {
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  #app
    height 100%
    .driver-pop-out-enter-active,
    .driver-pop-out-leave-active,
    .driver-pop-in-enter-active,
    .driver-pop-in-leave-active
      will-change transform
      transition all 500ms
      height 100%
      top 0
      position absolute
      backface-visibility hidden
      perspective 1000
    .driver-pop-out-enter
      opacity 0
      transform translate3d(-100%, 0, 0)
    .driver-pop-out-leave-active
      opacity 0
      transform translate3d(100%, 0, 0)
    .driver-pop-in-enter
      opacity 0
      transform translate3d(100%, 0, 0)
    .driver-pop-in-leave-active
      opacity 0
      transform translate3d(-100%, 0, 0)

</style>
