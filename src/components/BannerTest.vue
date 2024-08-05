<template>
  <div class="banner-test" :style="bgStyle">
    <!--文字-->
    <h1>综合服饰<br />官方经营指南</h1>
    <p class="sub-title">商家业务中心</p>
    <img class="logo" src="../assets/test-banner/logo.svg" alt="" />
    <!--主图素材-->
    <div class="banner-image-container">
      <img :src="image" alt="Banner Image" class="banner-image" />
    </div>
    <!--Svg 素材-->
    <ArrowSvg :backgroundColor="closestColor" class="arrow-svg cus-svg" />
    <TagSvg
      class="tag-svg cus-svg"
      :mainColor="closestColor"
      :shadowColor="closestColor"
      :accentColor="secondColor"
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
import { findClosestColor, transformColor } from "../js/resBannerColor.js";

export default {
  name: "BannerTest",
  props: {
    image: String,
    averageColor: Array,
    colorTemp: Number,
    colorTempRGB: String,
    sortedPalette: Array,
  },
  setup(props) {
    // 生成主色
    // const closestColor = findClosestColor(props.averageColor, "main");
    const closestColor = transformColor(props.sortedPalette[0].hex, {
      hOffset: 50,
      newS: 100,
      newL: 60,
    }).color1;
    // 提取副色
    let secondColor = "#000";
    if (props.sortedPalette.length > 1) {
      secondColor = props.sortedPalette[1].hex;
    } else {
      secondColor = props.sortedPalette[0].hex;
    }
    // 生成背景
    let BgColor = transformColor(closestColor, {
      hOffset: 50,
      newS: 100,
      newL: 88,
    });
    let bgStyle = `background: linear-gradient(80deg, #FFF -3.16%, ${BgColor.color2} 65.44%, ${BgColor.color1} 97.42%);`;
    return { closestColor, secondColor, bgStyle };
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

  .banner-image-container
    width 130px
    height 130px
    position absolute
    overflow hidden
    right 12px
    bottom 10px
    z-index 6

  .banner-image
    position absolute
    top: 50% /* 垂直居中 */
    left: 50% /* 水平居中 */
    transform: translate(-50%, -50%) /* 调整图片位置，确保居中 */
    max-width: 100% /* 图片最大宽度为容器宽度 */
    max-height: 100% /* 图片最大高度为容器高度 */
    width: auto /* 保持图片原始宽高比 */
    height: auto /* 保持图片原始宽高比 */
    object-fit: contain /* 确保图片完全显示，可能会留白 */

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
