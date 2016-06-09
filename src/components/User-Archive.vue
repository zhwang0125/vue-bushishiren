<template>
  <div class="c-user-archive">
    <div class="ui grid">
      
      <div class="four wide column"></div>

      <div class="eight wide column">
        <div class="ui segment">
          <div class="ui minimal comments">
            <div class="comment" v-for="poem in poems">
              <div class="year" v-if="($index === 0) || (getYear(poem._id) !== getYear(poems[$index - 1]._id))">{{getYear(poem._id)}}</div>
              <span class="day">{{poem._id | idToDay}}</span>
              <a class="title" v-link="{path: '/poems/' + poem._id}">{{poem.title}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import API from '../services/API'

export default {
  props: ['poems'],
  methods: {
    getYear: function (id) {
      const date = parseInt(id.substring(0, 8), 16) * 1000
      return new Date(date).getFullYear()
    }
  }
}
</script>

<style lang="stylus">
@import "../variables.styl"

.c-user-archive
  width $width
  margin 0 auto
  .year
    margin-bottom 10px
    font-weight bold
  .day
    font-size 13px
    color #999
    margin-right 12px
  .title
    font-size 14px
    &:hover
      text-decoration underline
</style>
