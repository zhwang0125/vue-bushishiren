<template>
  <div class="c-nav-menu">
    <div class="ui grid">
      <div class="four wide column"></div>

      <div class="eight wide column">
        <ul class="menu">
          <li><a v-link="{path: '/'}" class="nav-link" :class="{'active': path === '/' }">首页</a></li>
         <!--  <li>
            <div class="ui dropdown">
                  <div class="text">首页</div>
                  <div class="menu">
                    <div class="header">Adjust time span</div>
                    <div class="active item" data-text="today">Today</div>
                    <div class="item" data-text="this week">This Week</div>
                    <div class="item" data-text="this month">This Month</div>
                  </div>
                </div>
          </li> -->
          <li><a v-link="{path: '/poetries'}" class="nav-link" :class="{'active': path === '/poetries' }">诗集</a></li>
          <li><a v-link="{path: '/groups'}" class="nav-link" :class="{'active': path === '/groups' }">诗社</a></li>
          <li><a v-link="{path: '/users'}" class="nav-link" :class="{'active': path === '/users' }">诗人</a></li>
          <li><a v-link="{path: '/announcements'}" class="nav-link" :class="{'active': path === '/announcements' }">公告</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="stylus">
@import "../variables.styl"

.c-nav-menu
  width $width
  margin 40px auto 0 auto
  height 100px
  z-index 999
  .menu
    list-style none
    padding 0
    width auto
    font-size 16px
    font-weight 300
    li
      font-family $menuFont
      float left
      a
        color rgb(127, 140, 141)
        display block
        line-height 1.5em
        margin 4px 15px
        text-decoration none
        white-space nowrap
        &.active, &:hover
          color rgb(127, 140, 141)
          text-decoration none
          border-bottom 3px solid $themeColor
</style>

<script>
export default {
  computed: {
    path: function () {
      return this.$route.path
    }
  }
}
</script>