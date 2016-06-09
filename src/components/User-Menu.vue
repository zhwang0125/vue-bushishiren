<template>
  <div class="c-user-menu">
    <div class="ui vertical right tabular menu">
      <a class="item" :class="{'active': path === '' || path === '/poems'}" v-link="{path: urlPrefix}">诗</a>
      <a class="item" :class="{'active': path === '/poetries'}" v-link="{path: urlPrefix + '/poetries'}">诗集</a>
      <a class="item" :class="{'active': path === '/groups'}" v-link="{path: urlPrefix + '/groups'}">诗社</a>
      <a class="item" :class="{'active': path === '/archive'}" v-link="{path: urlPrefix + '/archive'}">归档</a>
      <a class="item" :class="{'active': path === '/messages'}" v-link="{path: urlPrefix + '/messages'}" v-if="uid === userId">私信</a>
    </div>
  </div>
</template>

<style lang="stylus">

</style>

<script>
import User from '../mixins/User'

export default {
  mixins: [User],
  computed: {
    userId: function () {
      return this.$route.params.uid;
    },
    path: function () {
      return this.$route.path.replace('/users/' + this.userId, '')
    },
    urlPrefix: function () {
      return '/users/' + this.userId
    }
  }
}
</script>