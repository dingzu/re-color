<template>
  <div class="banner">
    <h1>Banner</h1>
  </div>
</template>

<script>
export default {
  name: "BannerTest",
  props: {
    Image: String,
  },
  setup(props) {
    return {};
  },
};
</script>

<style lang="stylus">
.banner
    width 356px
    height 150px
    background-color #000
</style>
