<template>
  <div class="c-comment">
    <div class="ui grid">
      
      <div class="four wide column"></div>

      <div class="eight wide column">
        <div class="ui segment">
          <div class="ui minimal comments">
            <h3 class="ui dividing header">留言</h3>
            <div class="comment" v-for="comment in comments">
              <a class="avatar" v-link="{path: '/users/' + comment.author._id}">
                <img :src="comment.author.avatar">
              </a>
              <div class="content">
                <a class="author" v-link="{path: '/users/' + comment.author._id}">{{comment.author.name}}</a>
                <div class="metadata">
                  <span class="date">{{comment._id | idToFromNow}}</span>
                </div>
                <div class="text">{{comment.content}}</div>
                <div class="actions">
                  <a class="reply" v-if="isAuthor(comment)" @click.prevent="deleteComment(comment._id)">删除</a>
                  <!-- <a class="reply">回复</a> -->
                </div>
              </div>
            </div>

            <form class="ui reply form">
              <div class="field">
                <textarea v-model="content"></textarea>
              </div>
              <div class="ui blue submit icon button" @click.prevent="createComment">留言</div>
            </form>
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
  mixins: [User],
  props: ['comments', 'type', 'refe'],
  data() {
    return {
      content: ''
    }
  },
  methods: {
    isAuthor: function (comment) {
      return this.uid === (comment.author && comment.author._id)
    },
    createComment: function () {
      return API.createComment({
        type: this.type,
        content: this.content,
        refe: this.refe
      }).then(() => {
        this.content = ''
        this.$dispatch('Comment:success')
      })
    },
    deleteComment: function (commentId) {
      return API.deleteComment(commentId).then((res) => {
        this.comments = this.comments.filter(function (comment) {
          return comment._id !== commentId
        })
      })
    }
  }
}
</script>

<style lang="stylus">
@import "../variables.styl"

.c-comment
  width $width
  margin 0 auto
</style>
