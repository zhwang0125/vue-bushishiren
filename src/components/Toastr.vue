
<style lang="stylus">
@import "../variables.styl"

.toast
  line-height 16px
  font-size 12px
  font-weight bold
  margin-top 5px !important
  padding-top 10px !important
  padding-bottom 10px !important

.toast-success
  background-color $toast-success

.toast-error
  background-color $toast-error

</style>

<script>
export default {
  ready() {
    toastr.options = {
      positionClass: "toast-top-center",
      preventDuplicates: true
    }
  }
}
</script>