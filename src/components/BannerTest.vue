<template>
  <div class="banner-test">
    <!--文字-->
    <h1>综合服饰<br />官方经营指南</h1>
    <p class="sub-title">商家业务中心</p>
    <img class="logo" src="../assets/test-banner/logo.svg" alt="" />
    <!--主图素材-->
    <img :src="image" alt="Banner Image" class="banner-image" />
    <!--Svg 素材-->
    <ArrowSvg backgroundColor="#000" class="arrow-svg cus-svg" />
    <TagSvg
      class="tag-svg cus-svg"
      mainColor="#FF0000"
      accentColor="#00FF00"
      shadowColor="#0000FF"
    />
    <!--背景点-->
    <img
      class="bg-dot"
      style="left: 24px; top: -28px"
      src="../assets/test-banner/dot.svg"
      alt=""
    />
    <img
      class="bg-dot"
      style="left: 151px; top: 58px"
      src="../assets/test-banner/dot.svg"
      alt=""
    />
    <img
      class="bg-dot"
      style="left: 250px; top: -34px"
      src="../assets/test-banner/dot.svg"
      alt=""
    />
  </div>
</template>

<script>
import ArrowSvg from "./svg/ArrowSvg.vue";
import TagSvg from "./svg/TagSvg.vue";
export default {
  name: "BannerTest",
  props: {
    image: String,
  },
  setup(props) {
    return {};
  },
  components: {
    ArrowSvg,
    TagSvg,
  },
};
</script>

<style lang="stylus">
.banner-test
    width 356px
    height 150px
    background-color #ccc
    position relative
    overflow hidden
    .banner-image
      width 130px
      height 130px
      position absolute
      right 12px
      bottom 10px
      z-index 6
    .cus-svg
      position absolute
      z-index 11
    .tag-svg
      left 0px
      top 30px
    .arrow-svg
      left 195px
      top 86px
    .bg-dot
      position absolute
      opacity 0.1
      z-index 1
    .logo
      height 14px
      position absolute
      top 18px
      left 50%
      transform translateX(-50%)
      z-index 10
    h1
      position absolute
      top 50px
      left 24px
      font-size 28px
      font-weight bold
      line-height 32px
      z-index 10
    .sub-title
      font-size 8px
      position absolute
      left 27px
      top 120px
      letter-spacing 6px
      z-index 10
</style>
