<template>
  <div class="v-poetry-edit">
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
            <input placeholder="诗集名称" type="text" name="name" v-model="poetry.name">
          </div>
          <div class="field required">
            <label>封面</label>
            <image-uploader :image.sync="poetry.cover"></image-uploader>
          </div>
          <div class="field required">
            <label>描述</label>
            <textarea name="description" rows="5" v-model="poetry.description"></textarea>
          </div>
          <input type="submit" class="ui button" value="保存修改" @click="updatePoetry">
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus">
@import "../variables.styl"

.v-poetry-edit
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
      poetry: {}
    }
  },
  route: {
    data() {
      const poetryId = this.$route.params.poetryId
      return {
        poetry: API.getPoetry(poetryId)
      }
    }
  },
  methods: {
    updatePoetry: function () {
      const poetry = this.poetry
      API.updatePoetry(poetry._id, {
        name: poetry.name,
        cover: poetry.cover || '',
        description: poetry.description,
      }).then(() => {
        this.$route.router.go('/poetries/' + poetry._id)
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
