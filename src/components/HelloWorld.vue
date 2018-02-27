<template>
  <div class="hello">
    <div class="wrapper">{{msg}}</div>
    <cube-button @click="showToast">show toast</cube-button>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        toastTxt: 'cube toast content'
      }
    },
    methods: {
      showToast() {
        this.$createToast({
          txt: this.toastTxt
        }).show()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
