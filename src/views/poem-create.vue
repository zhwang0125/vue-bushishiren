<template>
  <div class="v-poem-create">
    <nav-menu></nav-menu>
    <user-setting-menu></user-setting-menu>
    <div class="ui grid">
      <div class="four wide column">
        <a v-link="{path: '/users/' + uid}"><img class="avatar" :src="avatar"></a>
      </div>

      <div class="eight wide column">
        <div class="ui form segment">
          <div class="field required">
            <label>标题</label>
            <input placeholder="标题" type="text" name="title" v-model="poem.title">
          </div>
          <div class="field">
            <label>图片</label>
            <image-uploader :image.sync="poem.photo"></image-uploader>
          </div>
          <div class="field required">
            <label>标签</label>
            <input placeholder="至少添加一个标签，多个标签以逗号分隔" type="text" name="tags" v-model="poem.tags">
          </div>
          <div class="field required">
            <label>内容</label>
            <textarea name="content" rows="10" v-model="poem.content"></textarea>
          </div>
          <input type="submit" class="ui button" value="发布" @click="createPoem">
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus">
@import "../variables.styl"

.v-poem-create
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
      poem: {}
    }
  },
  methods: {
    createPoem: function () {
      API.createPoem(this.poem).then((poem) => {
        this.$route.router.go('/poems/' + poem._id)
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
