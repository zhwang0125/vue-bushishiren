<template>
  <div class="c-setting-menu">
    <div class="ui buttons">
      <div class="ui floating dropdown button">
        <i class="icon bars"></i>
        <div class="menu" v-if="!!uid">
          <a class="item" v-link="{path: '/users/' + uid}">个人中心</a>
          <div class="divider"></div>
          <div class="item">
            创建
            <div class="left menu">
              <a class="item" v-link="{path: '/poems/create'}">诗</a>
              <a class="item" v-link="{path: '/poetries/create'}">诗集</a>
              <a class="item" v-link="{path: '/groups/create'}">诗社</a>
            </div>
          </div>
          <a class="item" @click="logout()">登出</a>
        </div>
        <div class="menu" v-else>
          <a class="item" v-link="{path: '/signin?redirect=' + encodeURIComponent($route.path)}">登录</a>
          <a class="item" v-link="{path: '/signup'}">注册</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus">
@import "../variables.styl"

.c-setting-menu
  position fixed
  right 30px
  top 35px
  z-index 999
  div
    font-family $menuFont
  .ui.dropdown.button
    padding 10px 10px 0 10px !important
    background-color $bgColor !important
  .icon.bars
    color #000
    font-size 18px
</style>

<script>
import User from '../mixins/User'

export default {
  mixins: [User],
  ready() {
    $('.ui.dropdown').dropdown()
  },
  methods: {
    logout: function () {
      localStorage.clear()
      window.location.reload()
    }
  }
}
</script>