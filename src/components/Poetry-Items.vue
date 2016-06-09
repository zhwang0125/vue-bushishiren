<template>
  <div class="c-poetry-items">
    <div class="ui grid">
      
      <div class="four wide column"></div>

      <div class="eight wide column">
        <div class="ui segment">
          <div class="ui minimal comments">
            <h3 class="ui dividing header">目录</h3>
            <div class="comment" v-for="poetryItem in poetryitems">
              <div class="content">
                <span class="date">{{poetryItem.poem._id | idToDay}}</span>
                <a class="title" v-link="{path: '/poems/' + poetryItem.poem._id}">{{poetryItem.poem.title}}</a>
                <div class="actions">
                  <a class="reply" @click.prevent="removePoemFromPoetry(poetryItem.poem._id, poetryItem.poetry, $index)">移除</a>
                </div>
              </div>
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
  props: ['poetryitems'],
  methods: {
    removePoemFromPoetry: function (poemId, poetryId, index) {
      return API.removePoemFromPoetry(poemId, poetryId).then(() => {
        this.poetryitems.splice(index, 1)
      })
    }
  }
}
</script>

<style lang="stylus">
@import "../variables.styl"

.c-poetry-items
  width $width
  margin 0 auto
  .date
    font-size 13px
    color #999
    margin-right 12px
  .title
    font-size 14px
    &:hover
      text-decoration underline
  .reply
    color #aaa !important
</style>
