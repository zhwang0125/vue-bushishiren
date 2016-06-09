<template>
  <div class="c-announcement" v-show="announcement.author">
    <div class="ui grid">
      
      <div class="four wide column">
        <a v-if="announcement.author" v-link="{path: '/users/'  + announcement.author._id}"><img class="avatar" :src="announcement.author.avatar"></a>
      </div>
      <div class="eight wide column">
        <div class="ui segment">
        {{{announcement.content}}}
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    props: ['announcement']
  }
</script>

<style lang="stylus">
@import "../variables.styl"

.c-announcement
  width $width
  margin 0 auto
  img
    width 100%
  a
    color $themeColor
    &:hover
      text-decoration underline
  .avatar
    border-radius 3px
    width 64px
    height 64px
    box-shadow  0 1px 2px #aaa
    float right
  .tag
    font-family $menuFont
    font-size 13px
    margin-right 5px
    color #999
</style>
