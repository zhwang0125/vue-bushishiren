<template>
  <div class="c-user-card">
    <div class="ui cards">
      <div class="card">
        <div class="content">
          <div class="userInfo">
            <img :src="user.avatar">
            <div class="info">
              <p class="name">{{user.name}}</p>
              <p class="meta">{{genderMapping(user.gender)}}</p>
            </div>
          </div>
          <div class="description">
            {{user.bio}}
          </div>
        </div>

        <div class="extra content" v-if="uid === user._id">
          <a v-link="'/users/' + uid + '/edit'"><i class="write icon"></i>编辑个人资料</a>
        </div>
        <div class="extra content" v-else>
          <a v-link="{path: '/users/' + user._id + '/message'}"><i class="send icon"></i>私信</a>
          <a class="right floated" v-show="!user.hasFollowed" @click.prevent="follow(user._id)"><i class="plus icon"></i>关注</a>
          <a class="right floated" v-else @click.prevent="unfollow(user._id)"><i class="minus icon"></i>取消关注</a>
        </div>

      </div>
    </div>
  </div>
</template>

<style lang="stylus">
@import "../variables.styl"

.c-user-card
  width 100%
  margin-bottom 15px
  .ui.cards
    width 100%
  .userInfo
    height 48px
    margin-bottom 10px
    img
      border-radius 3px
      width 48px
      height 48px
      float left
      margin-right 14px
    .info
      .name
        overflow-x hidden
</style>

<script>
import API from '../services/API'
import User from '../mixins/User'

export default {
  mixins: [User],
  props: ['user'],
  methods: {
    genderMapping: function (gender) {
      const mapping = {
        M: '男',
        F: '女',
        X: '保密'
      }
      return mapping[gender]
    },
    follow: function (to) {
      return API.followUser(to).then(() => {
        this.user.hasFollowed = true
      })
    },
    unfollow: function (to) {
      return API.unfollowUser(to).then(() => {
        this.user.hasFollowed = false
      })
    }
  }
}
</script>