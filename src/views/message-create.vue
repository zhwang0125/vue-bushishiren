<template>
  <div class="v-message-create">
    <nav-menu></nav-menu>
    <user-setting-menu></user-setting-menu>
    <div class="ui grid">
      <div class="four wide column">
        <a v-link="{path: '/users/' + uid}"><img class="avatar" :src="avatar"></a>
      </div>

      <div class="eight wide column">
        <div class="ui form segment">
          <h2>Dear {{to.name}}:</h2>
          <div class="field required">
            <textarea name="content" rows="10" placeholder="最多输入 1000 字" v-model="content"></textarea>
          </div>
          <input type="submit" class="ui button" value="发送" @click="createMessage">
          <input type="submit" class="ui button" value="取消" @click="cancel">
        </div>
    </div>
  </div>
</template>

<style lang="stylus">
@import "../variables.styl"

.v-message-create
  width $width
  margin 0 auto
  img
    width 100%
  .avatar
    border-radius 3px
    width 64px
    height 64px
    box-shadow  0 1px 2px #aaa
    float right
</style>

<script>
import API from '../services/API'
import User from '../mixins/User'
import Redirect from '../mixins/Redirect'

export default {
  mixins: [User, Redirect],
  data() {
    return {
      to: {},
      content: ''
    }
  },
  route: {
    data() {
      const uid = this.$route.params.uid
      return {
        to: API.getUser(uid)
      }
    }
  },
  methods: {
    createMessage: function () {
      return API.createMessage(this.to._id, this.content).then(() => {
        this.redirect()
      })
    },
    cancel: function () {
      this.redirect()
    }
  },
  components: {
    'UserSettingMenu': require('../components/User-Setting-Menu.vue'),
    'NavMenu': require('../components/Nav-Menu.vue')
  }
}
</script>
