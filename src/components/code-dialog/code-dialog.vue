<template>
  <div>
    <v-mask v-model="show" @click.native="close"></v-mask>
    <div :class="classes" :style="styles" ref="box">
      <div class="driver-popup-content">
        <div ref="content" class="content">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {preventScroll} from 'common/js/assist'
  import vMask from 'components/mask/v-mask'

  export default {
    name: 'code-dialog',
    components: {
      vMask
    },
    data() {
      return {
        show: this.value
      }
    },
    props: {
      height: {
        type: String,
        default: 'auto'
      },
      width: {
        type: String,
        default: 'auto'
      },
      value: {
        type: Boolean
      },
      closeOnMasker: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      value(val) {
        val ? preventScroll.lock() : preventScroll.unlock()
        this.show = val
      }
    },
    computed: {
      classes() {
        return 'driver-popup-center ' + (this.show ? ' driver-popup-show ' : '')
      },
      styles() {
        return {width: this.width, height: this.height}
      }
    },
    methods: {
      close() {
        if (this.closeOnMasker) {
          this.show = false
          this.$emit('input', false)
        }
      }
    },
    destroyed() {
      preventScroll.unlock()
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .driver-popup {
    position: fixed;
    background-color: #FFF;
    z-index: 1501;
    transition: transform .2s;
    pointer-events: none;
    display: flex;
    flex-direction: column;
  }

  .driver-popup-content {
    flex: 1;
    position: relative;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .driver-popup-content .content {
    height: 100%;
  }

  .driver-popup-show {
    pointer-events: auto;
    transform: translate(0, 0);
  }

  .driver-popup-center {
    background-color: #FFF;
    z-index: 1502;
    position: fixed;
    top: 50%;
    left: 50%;
    opacity: 0;
    transform: translate(-50%, -50%) scale(.95);
    transform-origin: 50% 50%;
    transition: transform .1s;
    border-radius: 2px;
    pointer-events: none;
  }

  .driver-popup-center * {
    pointer-events: none;
  }

  .driver-popup-center.driver-popup-show {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
    pointer-events: auto;
  }

  .driver-popup-center.driver-popup-show * {
    pointer-events: auto;
  }

</style>
