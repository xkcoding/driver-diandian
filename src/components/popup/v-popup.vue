<template>
  <div>
    <v-mask v-model="show" @click.native="close"></v-mask>
    <div :class="classes" :style="styles" ref="box">
      <div v-if="!!$slots.top && position != 'center'" ref="top">
        <slot name="top"></slot>
      </div>
      <div class="driver-popup-content">
        <div ref="content" class="content">
          <slot></slot>
        </div>
      </div>
      <div v-if="!!$slots.bottom && position != 'center'" ref="bottom">
        <slot name="bottom"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import {preventScroll} from 'common/js/assist'
  import vMask from 'components/mask/v-mask'

  export default {
    name: 'v-popup',
    components: {
      vMask
    },
    data() {
      return {
        show: this.value
      }
    },
    props: {
      position: {
        validator(value) {
          return ['bottom', 'center', 'left', 'right'].indexOf(value) > -1
        },
        default: 'bottom'
      },
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
        return (this.position === 'center' ? 'driver-popup-center ' : 'driver-popup driver-popup-' + this.position) +
          (this.show ? ' driver-popup-show ' : '')
      },
      styles() {
        if (this.position === 'left' || this.position === 'right') {
          return {width: this.width, height: '100%'}
        } else if (this.position === 'bottom') {
          return {width: '100%', height: this.height}
        } else {
          return {width: this.width, height: this.height}
        }
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

  .driver-popup-left {
    transform: translate(-100%, 0);
    left: 0;
    top: 0;
    height: 100%;
  }

  .driver-popup-right {
    transform: translate(100%, 0);
    right: 0;
    top: 0;
    height: 100%;
  }

  .driver-popup-bottom {
    transform: translate(0, 100%);
    right: 0;
    bottom: 0;
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
