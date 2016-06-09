<template>
  <div class="v-poem">
    <nav-menu></nav-menu>
    <user-setting-menu></user-setting-menu>
    <poem :poem="poem" :poetries="poetries"></poem>
    <comment :comments="comments" type="poem" :refe="poem._id"></comment>
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
      poem: {
        _id: ''
      },
      poetries: [],
      comments: []
    }
  },
  route: {
    data() {
      const poemId = this.$route.params.poemId
      return {
        poem: API.getPoem(poemId),
        poetries: this.uid ? API.getPoetries(this.uid) : [],
        comments: API.getCommentsByPoemId(poemId)
      }
    }
  },
  methods: {
  },
  events: {
    'Poem:delete': function () {
      return this.redirect.call(this)
    },
    'Comment:success': function () {
      API.getCommentsByPoemId(this.poem._id).then(comments => {
        this.comments = comments
      })
    }
  },
  components: {
    'UserSettingMenu': require('../components/User-Setting-Menu.vue'),
    'NavMenu': require('../components/Nav-Menu.vue'),
    'Poem': require('../components/Poem.vue'),
    'Comment': require('../components/Comment.vue')
  }
}
</script>