<template>
  <div class="v-user-edit">
    <nav-menu></nav-menu>
    <user-setting-menu></user-setting-menu>
    <div class="ui grid">
      <div class="four wide column">
        <a v-link="{path: '/users/' + uid}"><img class="avatar" :src="avatar"></a>
      </div>

      <div class="eight wide column">
        <div class="ui form segment">
          <div class="field required">
            <label>用户名</label>
            <input placeholder="用户名" type="text" name="name" v-model="user.name">
          </div>
          <div class="field required">
            <label>性别</label>
            <select class="ui compact selection dropdown" v-if="user.gender" v-model="user.gender">
              <option value="M">男</option>
              <option value="F">女</option>
              <option value="X">保密</option>
            </select>
          </div>
          <div class="field required">
            <label>年龄</label>
            <input placeholder="年龄" type="text" name="age" v-model="user.age">
          </div>
          <div class="field required">
            <label>头像</label>
            <image-uploader :image.sync="user.avatar"></image-uploader>
          </div>
          <div class="field required">
            <label>个人简介</label>
            <textarea name="bio" rows="5" v-model="user.bio"></textarea>
          </div>
          <input type="submit" class="ui button" value="保存修改" @click="updateUser">
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus">
@import "../variables.styl"

.v-user-edit
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

export default {
  mixins: [User],
  data() {
    return {
      user: {}
    }
  },
  route: {
    data() {
      const uid = this.$route.params.uid
      return {
        user: API.getUser(uid)
      }
    }
  },
  methods: {
    updateUser: function () {
      API.updateUser(this.user._id, this.user).then((user) => {
        for (let key in user) {
          localStorage[key] = user[key]
        }
        this.$route.router.go('/users/' + this.uid)
      })
    }
  },
  components: {
    'UserSettingMenu': require('../components/User-Setting-Menu.vue'),
    'NavMenu': require('../components/Nav-Menu.vue'),
    'ImageUploader': require('../components/Image-Uploader.vue')
  }
}
</script>
