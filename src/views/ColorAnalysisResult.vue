<!-- ColorAnalysisResult.vue -->
<template>
    <div class="color-analysis-result">
        <div class="line">
            <div class="text-group">
            <p class="label">平均颜色:{{ averageColorHex }}</p>
            <div class="color-box" :style="{ backgroundColor: averageColorRGB }"></div>
        </div>
        <div class="text-group">
            <p class="label">颜色温度:{{ colorTemp }}K</p>
            <div class="span-wrp">
                <span 
                  v-for="temp in ['冷色', '中性', '暖色']" 
                  :key="temp"
                  class="temperature-option" 
                  :class="{ selected: temp === colorTempCategory }"
                >
                  {{ temp }}
                </span>
            </div>
        </div>
        </div>
      <table>
        <tr>
          <th>主要颜色</th>
          <th>十六进制</th>
          <th>HSL</th>
          <th>百分比</th>
          <th>与平均值的距离</th>
        </tr>
        <tr v-for="color in sortedPalette" :key="color.hex">
          <td><div class="color-box" :style="{ backgroundColor: color.rgb }"></div></td>
          <td>{{ color.hex }}</td>
          <td>{{ color.hsl }}</td>
          <td>{{ color.percentage }}%</td>
          <td>{{ color.distance }}</td>
        </tr>
      </table>
      <div class="des">
        <p>0-50: 非常接近平均颜色</p>
        <p>51-100: 与平均颜色有中等程度的差异</p>
        <p>101-200: 与平均颜色有显著差异</p>
        <p>201+: 与平均颜色有极大差异</p>
      </div>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { getTemperatureCategory ,rgbToHex} from '../js/color.js';
  
  export default {
    name: 'ColorAnalysisResult',
    props: {
      averageColor: Array,
      colorTemp: Number,
      sortedPalette: Array
    },
    setup(props) {
      const averageColorRGB = computed(() => `rgb(${props.averageColor.join(',')})`);
      const averageColorHex = computed(() => `${rgbToHex(props.averageColor)}`);
      const colorTempCategory = computed(() => getTemperatureCategory(props.colorTemp));
  
      return {
        averageColorRGB,
        averageColorHex,
        colorTempCategory
      };
    }
  }
</script>
  
<style lang="stylus">
.color-analysis-result
    background-color #444
    border-radius 0
    padding 12px
    .line
        overflow hidden
    .des p
      font-size 12px
      color #eee
.span-wrp
    height 32px
.text-group
    margin-bottom 0px
    background-color #fff
    border-radius 0
    border 1px solid #222
    padding 8px
    float left
    width 240px
    margin-right 12px
    .label
        font-size 14px
        color #222
        line-height 20px
        margin-bottom 8px
.color-box
  width 60px
  height 28px
  border-radius 4px
  display inline-block
  margin-right 10px
  vertical-align middle
  border 2px solid rgba(0,0,0,.2)
.temperature-option
  display block
  float left
  margin-right 8px
  width 60px
  height 30px
  border 1px solid #ccc
  border-radius 5px
  cursor pointer
  font-size 13px
  line-height 30px
  text-align center
  &.selected
    background-color #222
    border 1px solid transparent
    color white
table
  background-color #fff
  border-collapse collapse
  width 100%
  margin 12px 0

th, td
  border 1px solid #000
  padding 8px
  text-align left
  font-size 13px

th
  background-color #f2f2f2

input[type="file"]
  margin-bottom 20px
</style>