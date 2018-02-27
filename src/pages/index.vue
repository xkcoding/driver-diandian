<template>
  <div class="index">
    <div class="title-wrapper">
      <div class="user-wrapper">
        <yd-icon name="ucenter" color="#707070" size=".8rem" @click.native="toggle()"></yd-icon>
      </div>
      <div class="title">欢迎使用<span class="slogan">点点代驾</span></div>
    </div>
    <div class="content-wrapper">
      内容
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
      handleClickToHistory() {
        this.show = false
        this.$router.push('/history')
      },
      handleClickToCoupon() {
        this.show = false
        this.$router.push('/coupon')
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
              txt: '点击确认退出按钮'
            }).show()
            console.log('确认退出')
          },
          onCancel: () => {
            this.$createToast({
              type: 'warn',
              time: 1000,
              txt: '点击取消按钮'
            }).show()
            console.log('取消退出')
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
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .index
    width 100%
    height 100%
    .title-wrapper
      position relative
      width 100%
      height 1rem
      .user-wrapper
        position absolute
        top .1rem
        right .1rem
        bottom .1rem
        left .1rem
      .title
        text-align center
        font-size .4rem
        font-weight normal
        line-height 1rem
        .slogan
          color #ffcc00
    .menu-wrapper
      position relative
      height 100%
      width 100%
      color: #ffffff
      font-size .4rem
      background #494c5a
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
