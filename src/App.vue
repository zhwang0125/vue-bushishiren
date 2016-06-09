<template>
  <div>
    <toastr></toastr>
    <router-view
      class="view"
      transition="fade"
      transition-mode="in-out">
    </router-view>
    <scroll-to-top></scroll-to-top>
  </div>
</template>

<style lang="stylus">
@import "./variables.styl"

@font-face
  font-family 'fangzhengqingkebenyuesongjianti'
  src url('../static/font/fangzhengqingkebenyuesongjianti.ttf')

@font-face
  font-family 'fangzhengqitijianti'
  src url('../static/font/fangzhengqitijianti.ttf')

html, body, #app
  height 100%
  margin 0

body
  background-color $bgColor
  -webkit-font-smoothing antialiased

a
  color #000
  &:hover
    color $themeColorDeep !important
pre
  font-family $themeFont
  font-size 15px
  line-height 22px
  white-space pre-wrap

.button
  background-color $themeColor !important
  color #fff !important

</style>

<script>
export default {
  components: {
    'ScrollToTop': require('./components/Scroll-To-Top.vue'),
    'Toastr': require('./components/Toastr.vue')
  }
}
</script>
