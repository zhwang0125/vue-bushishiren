<template>
  <div class="v-group-edit">
    <nav-menu></nav-menu>
    <user-setting-menu></user-setting-menu>
    <div class="ui grid">
      <div class="four wide column">
        <a v-link="{path: '/users/' + uid}"><img class="avatar" :src="avatar"></a>
      </div>

      <div class="eight wide column">
        <div class="ui form segment">
          <div class="field required">
            <label>名称</label>
            <input placeholder="诗社名称" type="text" name="name" v-model="group.name">
          </div>
          <div class="field required">
            <label>封面</label>
            <image-uploader :image.sync="group.cover"></image-uploader>
          </div>
          <div class="field required">
            <label>诗社简介</label>
            <textarea name="description" rows="10" v-model="group.description"></textarea>
          </div>
          <input type="submit" class="ui button" value="保存修改" @click="updateGroup">
        </div>
    </div>
  </div>
</template>

<style lang="stylus">
@import "../variables.styl"

.v-group-edit
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
      group: {}
    }
  },
  route: {
    data() {
      const groupId = this.$route.params.groupId
      return {
        group: API.getGroup(groupId)
      }
    }
  },
  methods: {
    updateGroup: function () {
      const group = this.group
      API.updateGroup(group._id, group).then(() => {
        this.$route.router.go('/groups/' + group._id)
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
