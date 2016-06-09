<template>
  <div class="c-poetry">
    <div class="ui grid" v-show="poetry.author">
      <div class="four wide column">
        <a v-if="poetry.author" v-link="{path: '/users/' + poetry.author._id}"><img class="avatar" :src="poetry.author.avatar"></a>
      </div>

      <div class="eight wide column">
        <div class="ui segment">
          <a v-link="{path: '/poetries/' + poetry._id}"><img class="photo" v-if="poetry.cover" :src="poetry.cover"/></a>
          <h3 class="title"><a v-link="{path: '/poetries/' + poetry._id}">《{{poetry.name}}》</a></h3>
          <pre>{{poetry.description}}</pre>
          <!-- <div><span class="tag" v-for="tag in poetry.tags">#{{tag}}</span></div> -->
          <div>
            <span class="tag">{{poetry._id | idToFromNow}}</span>
            <span class="tag right">
              <!-- <a v-link="{path: '/poetries/' + poetry._id}">诗({{154}})</a>&nbsp;&nbsp; -->
              <a v-link="{path: '/poetries/' + poetry._id}">浏览({{poetry.pv}})</a>&nbsp;&nbsp;
              <a v-link="{path: '/poetries/' + poetry._id}">留言({{poetry.comments_count}})</a>
              <div class="ui inline dropdown">
                <div class="text"></div>
                <i class="dropdown icon"></i>
                <div class="menu">
                  <div class="item" data-text="" @click="recommend('poetry', poetry._id)">推荐置顶</div>
                  <div class="item" data-text="" @click="report('poetry', poetry._id)">举报</div>
                  <div class="divider" v-if="!!isAuthor"></div>
                  <div class="item" data-text="" v-if="isAuthor" v-link="{path: '/poetries/' + poetry._id + '/edit'}">编辑</div>
                  <div class="item" data-text="" v-if="isAuthor" @click="deletePoetry">删除</div>
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
  props: ['poetry'],
  mixins: [User],
  ready() {
    $('.ui.dropdown').dropdown()
    $('.ui.dropdown .item').removeClass('active')
  },
  methods: {
    recommend: API.recommend,
    report: API.report,
    deletePoetry: function () {
      const poetryId = this.poetry._id
      return API.deletePoetry(poetryId).then(() => {
        this.$dispatch('Poetry:delete', poetryId)
      })
    }
  },
  computed: {
    isAuthor: function () {
      return this.uid === (this.poetry.author && this.poetry.author._id)
    }
  }
}
</script>

<style lang="stylus">
@import "../variables.styl"

.c-poetry
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
