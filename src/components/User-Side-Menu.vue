<template>
  <div class="c-side-menu">
    <div class="ui grid" style="width:100%">
      <div class="four wide column">
        <user-card :user="user"></user-card>
        <user-menu></user-menu>
      </div>
    </div>
  </div>
</template>

<style lang="stylus">
@import "../variables.styl"

.c-side-menu
  width $width
  margin 0 auto
  position fixed
  top 127px
  z-index 999
  .four.wide.column
    position absolute
    top -14px
    right 0
</style>

<script>
  export default {
    props: ['user'],
    ready() {
      const $sideMenu = $('.c-side-menu')
      $(window).scroll(function() {
        const top = $(this).scrollTop()
        if (top > 117) {
          $sideMenu.css('top', 10)
        } else {
          $sideMenu.css('top', 127 - top)
        }
      })
    },
    components: {
      'UserCard': require('./User-Card.vue'),
      'UserMenu': require('./User-Menu.vue')
    }
  }
</script>