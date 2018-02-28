<template>
  <div class="index">
    <div class="title-wrapper">
      <div class="user-wrapper">
        <yd-icon name="ucenter" color="#707070" size=".8rem" @click.native="toggle()"></yd-icon>
      </div>
      <div class="title">欢迎使用<span class="slogan">点点代驾</span></div>
    </div>
    <div class="content-wrapper">
      <div class="content">
        <div class="distance-wrapper">“最近空闲司机距您3.7公里”</div>
        <div class="start-place-wrapper">
          <div class="point-wrapper">
            <div class="point"></div>
          </div>
          <div class="start-place">零点生活超市</div>
        </div>
        <div class="change-contact">
          <yd-icon name="user" class="user-icon" custom color="#bfbfbf" size=".4rem"></yd-icon>换联系人代叫
        </div>
        <div class="call">
          <yd-button class="btn-call" type="disabled" disabled>呼叫代驾</yd-button>
        </div>
      </div>
      <div class="addition" @click="handleClickToServicePrice">
        服务价格
      </div>
    </div>
    <yd-popup v-model="show" position="left" ref="popup" width="60%" height="10%">
      <div class="menu-wrapper">
        <div class="item" @click="handleClickToHistory">我的行程</div>
        <div class="item" @click="handleClickToCoupon">优惠券</div>
        <div class="item logout" @click="handleClickToLogout">退出</div>
      </div>
    </yd-popup>
  </div>
</template>

<script>
  import storage from 'good-storage'
  import * as consts from 'common/js/const'

  export default {
    name: 'index',
    data() {
      return {
        show: false
      }
    },
    methods: {
      toggle() {
        this.show = true
        this.$refs.popup.$refs.content.style.height = '100%'
      },
      handleClickToServicePrice() {
        this.$router.push('/service-price')
      },
      handleClickToHistory() {
        this.show = false
        this.$router.push('/history')
      },
      handleClickToCoupon() {
        this.show = false
        this.$router.push('/coupon')
      },
      openGPSConfrim() {
        this.$dialog.confirm({
          title: '',
          mes: '“https://cyzc.dddriver.com” 想使用您当前的位置',
          opts: [{
            txt: '不允许',
            color: '#0066ff',
            callback: () => {
              storage.session.set(consts.DRIVER_GPS_ENABLED, false)
            }
          }, {
            txt: '好',
            color: '#0066ff',
            callback: () => {
              storage.session.set(consts.DRIVER_GPS_ENABLED, true)
            }
          }]
        })
      },
      handleClickToLogout() {
        this.show = false
        this.$createDialog({
          type: 'confirm',
          confirmBtn: {
            text: '确认退出',
            active: true,
            disabled: false,
            href: 'javascript:;'
          },
          cancelBtn: {
            text: '取消',
            active: false,
            disabled: false,
            href: 'javascript:;'
          },
          onConfirm: () => {
            this.$createToast({
              type: 'warn',
              time: 1000,
              txt: '退出成功'
            }).show()
            storage.remove(consts.USER)
          },
          onCancel: () => {
          }
        }, (createElement) => {
          return [
            createElement('div', {
              'style': {
                'margin': '.2rem 0'
              },
              slot: 'title'
            }, [
              createElement('yd-icon', {
                props: {
                  name: 'warn',
                  color: '#bfbfbf',
                  size: '1.2rem'
                }
              })
            ]),
            createElement('p', {
              'style': {
                'textAlign': 'center',
                'fontSize': '.36rem'
              },
              slot: 'content'
            }, '您确定要退出登录吗？')
          ]
        }).show()
      },
      __init() {
        let driverGpsEnabled = storage.session.get(consts.DRIVER_GPS_ENABLED)
        if (driverGpsEnabled === undefined || driverGpsEnabled === '') {
          this.openGPSConfrim()
        }
      }
    },
    mounted() {
      this.__init()
      console.log()
      // if (!storage.get(consts.DRIVER_GPS_ENABLED)) {
      //   this.openConfrim()
      // }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .index
    width 100%
    height 100%
    background $color-background
    .title-wrapper
      position relative
      width 100%
      height $height-header
      .user-wrapper
        position absolute
        top .1rem
        right .1rem
        bottom .1rem
        left .1rem
      .title
        text-align center
        font-size $font-size-menu
        font-weight normal
        line-height $height-header
        .slogan
          color $color-text-slogan
    .content-wrapper
      height 100%
      font-size $font-size-app
      padding .2rem
      .content
        display flex
        flex-direction column
        height 5rem
        text-align center
        border 1px solid $color-text
        border-radius 6px
        background $color-background-white
        .distance-wrapper
          height 1rem
          line-height 1rem
          border-bottom 1px solid $color-background
        .start-place-wrapper
          display flex
          height 1.5rem
          line-height 1.5rem
          font-size $font-size-menu
          color $color-text-slogan
          border-bottom 1px solid $color-background
          .point-wrapper
            position relative
            flex 2
            .point
              position absolute
              width .2rem
              height .2rem
              top 50%
              right 0
              margin-top -.1rem
              background $color-text-slogan
              border-radius 50%
          .start-place
            flex 8
            text-align left
            margin-left .5rem
        .change-contact
          height 1rem
          line-height 1rem
          border-bottom 1px solid $color-background
          .user-icon
            margin-right .2rem
        .call
          height 1.5rem
          line-height 1.5rem
          .btn-call
            height 1rem
            width 80%
            font-size $font-size-app
      .addition
        position absolute
        right .2rem
        margin .2rem
        cursor pointer
    .menu-wrapper
      position relative
      height 100%
      width 100%
      color: $color-text
      font-size $font-size-menu
      background $color-app-theme
      .item
        height 1.5rem
        line-height 1.5rem
        text-align center
        border-bottom 1px solid #ffffff
        &:last-child
          border-bottom 0
        &.logout
          position absolute
          right 0
          bottom 0
          left 0
          text-align center
          margin 0
          background #ff0000
</style>
