<template>
  <div class="c-image-uploader">

    <div class="ui fluid image" v-show="image">
      <a class="ui right corner label" @click.prevent="removePhoto">
        <i class="remove icon"></i>
      </a>
      <img :src="image" />
    </div>

    <form id="imageForm" action="{{uploadUrl}}" method="post" enctype="multipart/form-data">
      <input type="hidden" name="type" value="image" hidden />
      <input type="file" name="file" accept="image/*" @change.prevent="uploadImage">
    </form>
  </div>
</template>

<style lang="stylus">
.c-image-uploader
  img
    width 100%
</style>

<script>
import API from '../services/API'

export default {
  props: ['image'],
  methods: {
    uploadImage: function (e) {
      let form = new FormData();
      form.append('type', 'image')
      form.append('file', e.target.files[0])
      API.upload(form).then(res => {
        const url = 'http://' + res.url
        this.image = url
      })
    },
    removePhoto: function (e) {
      this.image = ''
    }
  },
  computed: {
    uploadUrl: function () {
      return API.URL + '/qiniu'
    }
  }
}
</script>