
export default {
  ready: function () {
    $(window).scroll(() => {
      if (this.loading) {
        return
      }
      if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
        this.loading = true
        if (this.loadMore && ('function' === typeof this.loadMore)) {
          this.loadMore()
        }
      }
    })
  }
}
