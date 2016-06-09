<template>
  <div class="c-poem">
    <div class="ui grid" v-show="poem.author">
      
      <div class="four wide column">
        <a v-if="poem.author" v-link="{path: '/users/' + poem.author._id}"><img class="avatar" :src="poem.author.avatar"></a>
      </div>

      <div class="eight wide column">
        <div class="ui segment">
          <img class="photo" v-if="poem.photo" :src="poem.photo"/>
          <h3 class="title"><a v-link="{path: '/poems/' + poem._id}">{{poem.title}}</a></h3>
          <pre>{{poem.content}}</pre>
          <div><span class="tag" v-for="tag in poem.tags">#{{tag}}</span></div>
          <div>
            <span class="tag">{{poem._id | idToFromNow}}</span>
            <span class="tag right">
              <a v-link="{path: '/poems/' + poem._id}">浏览({{poem.pv}})</a>&nbsp;&nbsp;
              <a v-link="{path: '/poems/' + poem._id}">收藏({{poem.poetries_count}})</a>&nbsp;&nbsp;
              <a v-link="{path: '/poems/' + poem._id}">留言({{poem.comments_count}})</a>
              <div class="ui inline dropdown">
                <div class="text"></div>
                <i class="dropdown icon"></i>
                <div class="menu">
                  <div class="item" data-text="" @click="recommend('poem', poem._id)">推荐置顶</div>
                  <div class="item" data-text="" @click="report('poem', poem._id)">举报</div>

                  <div class="divider" v-if="!!isAuthor"></div>
                  <div class="item" data-text="" v-if="!!poetries && poetries.length">
                    收藏到
                    <div class="menu">
                      <div class="item" v-for="poetry in poetries" data-text="" @click="addPoemToPoetry(poem._id, poetry._id)">{{poetry.name}}</div>
                    </div>
                  </div>
                  <div class="item" data-text="" v-if="isAuthor" v-link="{path: '/poems/' + poem._id + '/edit'}">编辑</div>
                  <div class="item" data-text="" v-if="isAuthor" @click="deletePoem">删除</div>

                </div>
              </div>
            </span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import API from '../services/API'
import User from '../mixins/User'

export default {
  props: ['poem', 'poetries'],
  mixins: [User],
  ready() {
    $('.ui.dropdown').dropdown()
    $('.ui.dropdown .item').removeClass('active')
  },
  methods: {
    addPoemToPoetry: function (poemId, poetryId) {
      return API.addPoemToPoetry(poemId, poetryId).then(() => {
        this.$route.router.go('/poetries/' + poetryId)
      })
    },
    recommend: API.recommend,
    report: API.report,
    deletePoem: function () {
      const poemId = this.poem._id
      return API.deletePoem(poemId).then(() => {
        this.$dispatch('Poem:delete', poemId)
      })
    }
  },
  computed: {
    isAuthor: function () {
      return this.uid === (this.poem.author && this.poem.author._id)
    }
  }
}
</script>

<style lang="stylus">
@import "../variables.styl"

.c-poem
  width $width
  margin 0 auto
  .photo
    width 100%
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
    &.right
      float right
      margin-right 0
      a
        color #999
</style>
