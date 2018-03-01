<template>
  <div class="index">
    <div class="title-wrapper">
      <div class="user-wrapper">
        <yd-icon name="ucenter" color="#707070" size=".8rem" @click.native="toggleNav()"></yd-icon>
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
          <yd-icon name="user" class="user-icon" custom color="#bfbfbf" size=".4rem"></yd-icon>
          换联系人代叫
        </div>
        <div class="call">
          <yd-button class="btn-call" :bgcolor="user?'#494c5a':'#cccccc'" :color="user?'#ffffff':'#f0f0f0'"
                     @click.native="handleClickCall">呼叫代驾
          </yd-button>
        </div>
      </div>
      <div class="addition" @click="handleClickToServicePrice">
        服务价格
      </div>
    </div>
    <cube-dialog ref="loginDialog" type="alert" :confirmBtn="confirmBtn" showClose @close="handleClickCloseDialog"
                 @confirm="openCodePopup">
      <div class="login-dialog-title-wrapper" slot="title">
        <h4 class="title">登录</h4>
      </div>
      <div class="login-dialog-content-wrapper" slot="content">
        <yd-input class="login-dialog-content" v-model="mobile" ref="inputMobile" :show-success-icon="false"
                  :show-error-icon="false" regex="mobile" type="tel" placeholder="请输入手机号码"></yd-input>
      </div>
    </cube-dialog>
    <v-popup v-model="showNav" position="left" width="60%">
      <div class="menu-wrapper">
        <div class="item" @click="handleClickToHistory">我的行程</div>
        <div class="item" @click="handleClickToCoupon">优惠券</div>
        <div class="item logout" @click="handleClickToLogout">退出</div>
      </div>
    </v-popup>
    <code-dialog v-model="showCode" width="80%" height="4.5rem" :close-on-masker="false">
      <div class="code-wrapper">
        <div class="code-control-wrapper">
          <div class="code-back-wrapper">
            <i class="cubeic-back" @click="handleClickToLoginDialog"></i>
          </div>
          <div class="code-close-wrapper">
            <i class="cubeic-close" @click="handleClickToCloseCodeDialog"></i>
          </div>
        </div>
        <div class="code-title-wrapper">
          <div class="code-title">输入验证码</div>
        </div>
        <div class="code-content-wrapper">
          <div class="code-content">
            <div class="code-content-msg">验证码将发送至 {{formatPhone}}</div>
            <div class="btn-resend">
              <yd-sendcode v-model="send"
                           @click.native="sendCode"
                           init-str="获取验证码"
                           second="5"
                           run-str="{%s}s后重发"
                           reset-str="重新获取验证码"
                           bgcolor="#494c5a"
                           color="#ffffff"
              ></yd-sendcode>
            </div>
          </div>
        </div>
      </div>
    </code-dialog>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {getGpsEnabled, setGpsEnabled} from 'common/js/cache'
  import vPopup from 'components/popup/v-popup'
  import codeDialog from 'components/code-dialog/code-dialog'

  export default {
    name: 'index',
    components: {
      vPopup, codeDialog
    },
    data() {
      return {
        showNav: false,
        showCode: false,
        mobile: '18601224166',
        isMobile: false,
        send: false
      }
    },
    computed: {
      formatPhone() {
        let start = this.mobile.substr(0, 3)
        let middle = this.mobile.substr(3, 4)
        let end = this.mobile.substr(7)
        return `${start} ${middle} ${end}`
      },
      confirmBtn() {
        this.checkMobile()
        return {
          text: '下一步',
          active: this.isMobile,
          disabled: !this.isMobile
        }
      },
      ...mapGetters([
        'user'
      ])
    },
    methods: {
      toggleNav() {
        if (this.user) {
          this.showNav = true
        } else {
          // this.openLoginPopup()
          this.openCodePopup()
        }
      },
      openCodePopup() {
        this.showCode = true
      },
      sendCode() {
        this.$dialog.loading.open('发送中...')
        setTimeout(() => {
          this.send = true
          this.$dialog.loading.close()

          this.$dialog.toast({
            mes: '已发送',
            icon: 'success',
            timeout: 1500
          })
        }, 1000)
      },
      handleClickToLoginDialog() {
        this.handleClickToCloseCodeDialog()
        this.openLoginPopup()
      },
      handleClickToCloseCodeDialog() {
        this.showCode = false
        this.mobile = ''
      },
      handleClickCall() {
        if (this.user) {
          console.log('呼叫代驾')
        } else {
          this.openLoginPopup()
        }
      },
      handleClickCloseDialog() {
        this.mobile = ''
      },
      openLoginPopup() {
        this.$refs.loginDialog.show()
      },
      checkMobile() {
        let reg = new RegExp('^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\\d{8}$')
        this.isMobile = reg.test(this.mobile)
      },
      handleClickToServicePrice() {
        this.$router.push('/service-price')
      },
      handleClickToHistory() {
        this.showNav = false
        this.$router.push('/history')
      },
      handleClickToCoupon() {
        this.showNav = false
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
              setGpsEnabled(false)
            }
          }, {
            txt: '好',
            color: '#0066ff',
            callback: () => {
              setGpsEnabled(true)
            }
          }]
        })
      },
      handleClickToLogout() {
        this.showNav = false
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
        let driverGpsEnabled = getGpsEnabled()
        if (driverGpsEnabled === null || driverGpsEnabled === '') {
          this.openGPSConfrim()
        }
      }
    },
    watch: {
      mobile() {
        this.checkMobile()
      }
    },
    mounted() {
      this.__init()
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .index
    display flex
    flex-direction column
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
    .code-wrapper
      display flex
      flex-direction column
      .code-control-wrapper
        display flex
        .code-back-wrapper, .code-close-wrapper
          flex 1
          font-size .5rem
          color $color-text-gray
          margin .1rem .2rem
        .code-back-wrapper
          text-align left
        .code-close-wrapper
          text-align right
      .code-title-wrapper
        width 100%
        height $font-size-app
        text-align center
        .code-title
          font-size $font-size-app
          height $font-size-app
          line-height $font-size-app
      .code-content-wrapper
        height 100%
        .code-content-msg
          font-size $font-size-app
          font-weight bolder
          text-align center
          line-height .8rem
          margin-top .2rem
          height .8rem
          color $color-text-gray
        .btn-resend
          height 1rem
          text-align center
          line-height 1rem
    .login-dialog-title-wrapper
      width 100%
      .title
        margin .4rem 0
    .login-dialog-content-wrapper
      width 100%
      .login-dialog-content
        height .4rem
        width 80%
        margin-left 10%
        margin-right 10%
        border-bottom 1px solid #cccccc
        font-size .3rem
</style>
