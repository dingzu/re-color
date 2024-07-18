<template>
  <div class="container">
    <h1>图像颜色分析</h1>
    <div class="input">
      <input type="file" @change="handleImageUpload" accept="image/*" class="button">
    </div>
    <div class="img-wrp">
      <div v-for="(image, index) in images" :key="index" class="image-container" 
        :class="selectedImageIndex == index ? 'active' : 'not-active'">
      <img :src="image.src" @click="selectImage(index)" style="max-width: 100%; cursor: pointer;">
    </div>
    </div>
    <ColorAnalysisResult 
      v-if="selectedImageIndex !== null"
      :averageColor="selectedImage?.averageColor"
      :colorTemp="selectedImage?.colorTemp"
      :sortedPalette="selectedImage?.sortedPalette"
    />
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import ColorThief from 'colorthief';
import ColorAnalysisResult from './ColorAnalysisResult.vue';
import { 
  mergeSimilarColors, 
  adaptiveMerge, 
  calculateAverageColor, 
  calculateColorTemperature,
  colorDistance,
  rgbToHex,
  rgbToHsl
} from '../js/color.js';

export default {
  name: 'App',
  components: {
    ColorAnalysisResult
  },
  setup() {
    const images = ref([]);
    const selectedImageIndex = ref(null);

    const colorThief = new ColorThief();

    const selectedImage = computed(() => 
      selectedImageIndex.value !== null ? images.value[selectedImageIndex.value] : null
    );

    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const imageData = analyzeColors(img);
          images.value.push({
            src: event.target.result,
            ...imageData
          });
        };
        img.src = event.target.result;
      };

      reader.readAsDataURL(file);
    };

    const analyzeColors = (img) => {
      const palette = colorThief.getPalette(img, 30);
      console.log('色彩分析1',palette)
      let mergedPalette = mergeSimilarColors(palette);
      console.log('色彩分析2',mergedPalette)

      while (mergedPalette.length > 5) {
        mergedPalette = adaptiveMerge(mergedPalette);
      }

      const totalCount = mergedPalette.reduce((sum, color) => sum + color.count, 0);
      const averageColor = calculateAverageColor(palette);
      console.log('色彩分析3-平均',averageColor)
      const colorTemp = Math.round(calculateColorTemperature(averageColor));
      
      const sortedPalette = mergedPalette
        .sort((a, b) => b.count - a.count)
        .map(color => ({
          rgb: `rgb(${color.color.join(',')})`,
          hex: rgbToHex(color.color),
          hsl: `hsl(${rgbToHsl(color.color[0], color.color[1], color.color[2]).map(Math.round).join(', ')})`,
          percentage: ((color.count / totalCount) * 100).toFixed(2),
          distance: Math.round(colorDistance(color.color, averageColor))
        }));

      return { averageColor, colorTemp, sortedPalette };
    };

    const selectImage = (index) => {
      selectedImageIndex.value = selectedImageIndex.value === index ? null : index;
    };

    return {
      images,
      selectedImageIndex,
      selectedImage,
      handleImageUpload,
      selectImage
    };
  }
}
</script>

<style lang="stylus">
.image-container 
  margin-bottom 20px
  overflow hidden
  float left
  width 120px
  height 120px
  box-sizing border-box
  padding 12px
  background-color #000
  margin-right 20px
  position relative
  border-radius 12px
  transition 0.4s all ease-in-out
  &:hover
    border 4px solid #108cee
  &.active
    border 4px solid #108cee
  img
    position absolute
    top 50%
    left 50%
    transform translate(-50%,-50%)
    width 100px
.img-wrp
  overflow hidden
</style>