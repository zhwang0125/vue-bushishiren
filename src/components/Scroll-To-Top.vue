<template>
  <div class="c-scroll-to-top">
    <i class="angle up icon"></i>
  </div>
</template>

<style lang="stylus">
@import "../variables.styl"

.c-scroll-to-top
  position fixed
  right 30px
  bottom 35px
  cursor pointer
  font-size 35px
  color #aaa
  padding 10px
  z-index 999
</style>

<script>
export default {
  ready() {
    const duration = 500
    const $scrollToTop = $('.c-scroll-to-top')

    $scrollToTop.hide()
    $(window).scroll(function() {
      if ($(this).scrollTop() > 0) {
        $scrollToTop.show()
      } else {
        $scrollToTop.hide()
      }
    })
    $scrollToTop.on('click', function(event) {
      event.preventDefault()
      $('body').animate({
        scrollTop: 0,
      }, duration)
    })
  }
}
</script>