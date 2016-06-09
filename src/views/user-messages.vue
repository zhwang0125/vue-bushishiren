<template>
  <div class="v-messages">
    <nav-menu></nav-menu>
    <user-setting-menu></user-setting-menu>

    <div class="ui grid" v-show="messages.length">
      <div class="four wide column"></div>

      <div class="eight wide column">
        <div class="ui segment">
          <div class="ui minimal comments">
            <h3 class="ui dividing header">私信</h3>
            <div class="comment" v-for="message in messages">
              <a class="avatar" v-link="{path: '/users/' + message.from._id}">
                <img :src="message.from.avatar">
              </a>
              <div class="content" v-if="!isAuthor(message.from._id)">
                <a class="author" v-link="{path: '/users/' + message.from._id}">{{message.from.name}}</a>
                <div class="metadata">
                  <span class="date">{{message._id | idToFromNow}}</span>
                </div>
                <div class="text">{{message.content}}</div>
                <div class="actions">
                  <a class="reply" @click.prevent="deleteMessage(message._id)">删除</a>
                  <a class="reply" v-link="{path: '/users/' + message.from._id + '/message'}">回复</a>
                </div>
              </div>
              <div class="content" v-else>
                <span class="reply">回复</span> <a class="author" v-link="{path: '/users/' + message.to._id}">{{message.to.name}}</a>
                <div class="metadata">
                  <span class="date">{{message._id | idToFromNow}}</span>
                </div>
                <div class="text">{{message.content}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <user-side-menu :user="user"></user-side-menu>
  </div>
</template>

<style lang="stylus">
@import "../variables.styl"

.v-messages
  width $width
  margin 0 auto
  .reply
    font-size 12px
    color #999
</style>

<script>
import API from '../services/API'
import User from '../mixins/User'
import LoadMore from '../mixins/LoadMore'

export default {
  mixins: [User, LoadMore],
  data() {
    return {
      user: {},
      messages: []
    }
  },
  route: {
    data() {
      const uid = this.$route.params.uid
      return {
        user: API.getUser(uid),
        messages: API.getMessages()
      }
    }
  },
  methods: {
    isAuthor: function (from) {
      return this.uid === from
    },
    loadMore: function () {
      const messages = this.messages
      const limit = 50
      if (!messages.length) return
      return API.getMessages(limit, messages[messages.length - 1]._id).then(_messages => {
        this.messages = messages.concat(_messages)
        if (_messages.length === limit) {
          this.loading = false
        }
      })
    },
    deleteMessage: function (messageId) {
      return API.deleteMessage(messageId).then(() => {
        this.messages = this.messages.filter(message => {
          return message._id !== messageId
        })
      })
    }
  },
  components: {
    'UserSettingMenu': require('../components/User-Setting-Menu.vue'),
    'NavMenu': require('../components/Nav-Menu.vue'),
    'UserSideMenu': require('../components/User-Side-Menu.vue')
  }
}
</script>