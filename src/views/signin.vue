<template>
<div class="v-signin">
  <div class="mask">
    <div class="container">
      <p class="title">不是诗人</p>
      <p class="subtitle">一个分享与发现的地方</p>
      <div class="ui left icon input big fluid" style="border-bottom:1px solid #ddd">
        <input class="mobile" type="text" placeholder="手机号" v-model="mobile">
        <i class="user icon"></i>
      </div>
      <div class="ui left icon input big fluid">
        <input class="password" type="password" placeholder="密码" v-model="password">
        <i class="lock icon"></i>
      </div>
      <br>
      <a class="ui button fluid" @click="signin(mobile, password)">登录</a>
      <div style="margin-top:5px">
        <a v-link="{path: '/signup'}" style="float:left;color:#fff">注册</a>
        <a v-link="{path: '/signup'}" style="float:right;color:#fff">忘记密码?</a>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="stylus">
@import "../variables.styl"

.v-signin
  width 100%
  height 100%
  overflow-y scroll
  background-image url("../../static/img/bg.jpg")
  background-size 100% 100%
  background-repeat no-repeat
  background-attachment fixed
  .button:hover
    color #fff !important
  .mask
    width 100%
    height 100%
    background-color rgba(0, 0, 0, 0.3)
  .container
    width 300px
    text-align center
    margin 0 auto
    padding-top 200px
    .title
      font-size 70px
      color #ffffff
      font-family $themeFont
      margin-bottom 0
    .subtitle
      font-size 17px
      color #ffffff
      font-family $themeFont
      margin-top 0
    .mobile
      border-radius 4px 4px 0 0 !important
      border 0 !important
    .password
      border-radius 0 0 4px 4px !important
      border 0 !important
    ::-webkit-input-placeholder
      font-size 15px
</style>

<script>
import API from '../services/API'

export default {
  data() {
    return {
      mobile: '',
      password: ''
    }
  },
  methods: {
    signin: function (mobile, password) {
      mobile = '+86' + mobile
      API.signin(mobile, password).then(user => {
        for (let key in user) {
          localStorage[key] = user[key]
        }
        API.ajaxSetup()//re setup
        const query = this.$route.query
        if (query && query.redirect) {
          this.$route.router.go(decodeURIComponent(query.redirect))
        } else {
          this.$route.router.go('/')
        }
      })
    }
  }
}
</script>