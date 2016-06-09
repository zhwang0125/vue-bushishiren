<template>
  <div class="c-user">
    <div class="ui grid" v-show="user">
      
      <div class="four wide column">
        <a v-if="user" v-link="{path: '/users/' + user._id}"><img class="avatar" :src="user.avatar"></a>
      </div>

      <div class="ten wide column">
        <div class="ui grid">
          <div class="five wide column list" v-for="poem in user.poems">
            <a v-link="{path: '/poems/' + poem._id}">
              <div class="ui segment">
                <h3 class="title">{{poem.title}}</h3>
                <pre class="content">{{poem.content}}</pre>
              </div>
            </a>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
  export default {
    props: ['user']
  }
</script>

<style lang="stylus">
@import "../variables.styl"

.c-user
  width $width
  margin 0 auto
  .avatar
    border-radius 3px
    width 64px
    height 64px
    box-shadow  0 1px 2px #aaa
    float right
  .list
    padding-right 0 !important
    a:hover
      color #000 !important
  .content
    width 100%
    max-height 250px
    margin-bottom 0
    overflow hidden
</style>
