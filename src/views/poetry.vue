<template>
  <div class="v-poetry">
    <nav-menu></nav-menu>
    <user-setting-menu></user-setting-menu>
    <poetry :poetry="poetry"></poetry>
    <poetry-items :poetryitems.sync="poetryItems"></poetry-items>
    <comment :comments="comments" type="poetry" :refe="poetry._id"></comment>
  </div>
</div>
</template>

<style lang="stylus">

</style>

<script>
import API from '../services/API'
import User from '../mixins/User'
import Redirect from '../mixins/Redirect'

export default {
  mixins: [User, Redirect],
  data() {
    return {
      poetry: {
        _id: ''
      },
      comments: [],
      poetryItems: []
    }
  },
  route: {
    data() {
      const poetryId = this.$route.params.poetryId
      return {
        poetry: API.getPoetry(poetryId),
        comments: API.getCommentsByPoetryId(poetryId),
        poetryItems: API.getPoemsByPoetryId(poetryId)
      }
    }
  },
  methods: {
  },
  events: {
    'Poetry:delete': function () {
      return this.redirect.call(this)
    },
    'Comment:success': function () {
      API.getCommentsByPoetryId(this.poetry._id).then((comments) => {
        this.comments = comments
      })
    }
  },
  components: {
    'UserSettingMenu': require('../components/User-Setting-Menu.vue'),
    'NavMenu': require('../components/Nav-Menu.vue'),
    'Poetry': require('../components/Poetry.vue'),
    'PoetryItems': require('../components/Poetry-items.vue'),
    'Comment': require('../components/Comment.vue')
  }
}
</script>