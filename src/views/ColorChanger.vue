<template>
  <div class="container">
    <h1>图像颜色分析</h1>
    <input type="file" @change="handleImageUpload" accept="image/*">
    <br><br>
    <img v-if="imageSrc" :src="imageSrc" style="max-width: 100%;">
    <br><br>
    <div v-if="showColorInfo">
      <h3>平均颜色</h3>
      <div class="color-box" :style="{ backgroundColor: averageColorRGB }"></div>
      <p>{{ averageColorHex }}</p>
      <h3>颜色温度</h3>
      <div id="colorTemperature">
        <span 
          v-for="temp in ['冷色', '中性', '暖色']" 
          :key="temp"
          class="temperature-option" 
          :class="{ selected: temp === colorTempCategory }"
        >
          {{ temp }}
        </span>
        <p>色温: {{ colorTemp }}K</p>
      </div>
    </div>
    <table v-if="showColorInfo">
      <tr>
        <th>颜色</th>
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
    <div v-if="showColorInfo">
      <h3>与平均值距离的解释：</h3>
      <p>0-50: 非常接近平均颜色</p>
      <p>51-100: 与平均颜色有中等程度的差异</p>
      <p>101-200: 与平均颜色有显著差异</p>
      <p>201+: 与平均颜色有极大差异</p>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import ColorThief from 'colorthief';
import { 
  mergeSimilarColors, 
  adaptiveMerge, 
  calculateAverageColor, 
  calculateColorTemperature,
  getTemperatureCategory,
  colorDistance,
  rgbToHex,
  rgbToHsl
} from '../js/color.js';

export default {
  name: 'App',
  setup() {
    const imageSrc = ref('');
    const showColorInfo = ref(false);
    const averageColor = ref([]);
    const colorTemp = ref(0);
    const sortedPalette = ref([]);

    const colorThief = new ColorThief();

    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        imageSrc.value = event.target.result;
        const img = new Image();
        img.onload = () => analyzeColors(img);
        img.src = event.target.result;
      };

      reader.readAsDataURL(file);
    };

    const analyzeColors = (img) => {
      const palette = colorThief.getPalette(img, 30);
      let mergedPalette = mergeSimilarColors(palette);

      while (mergedPalette.length > 5) {
        mergedPalette = adaptiveMerge(mergedPalette);
      }

      const totalCount = mergedPalette.reduce((sum, color) => sum + color.count, 0);
      averageColor.value = calculateAverageColor(palette);
      colorTemp.value = Math.round(calculateColorTemperature(averageColor.value));

      sortedPalette.value = mergedPalette
        .sort((a, b) => b.count - a.count)
        .map(color => ({
          rgb: `rgb(${color.color.join(',')})`,
          hex: rgbToHex(color.color),
          hsl: `hsl(${rgbToHsl(color.color[0], color.color[1], color.color[2]).map(Math.round).join(', ')})`,
          percentage: ((color.count / totalCount) * 100).toFixed(2),
          distance: Math.round(colorDistance(color.color, averageColor.value))
        }));

      showColorInfo.value = true;
    };

    const averageColorRGB = computed(() => `rgb(${averageColor.value.join(',')})`);
    const averageColorHex = computed(() => `十六进制: ${rgbToHex(averageColor.value)}`);
    const distinctiveColorRGB = computed(() => `rgb(${distinctiveColor.value.join(',')})`);
    const distinctiveColorHex = computed(() => `十六进制: ${rgbToHex(distinctiveColor.value)}`);
    const colorTempCategory = computed(() => getTemperatureCategory(colorTemp.value));

    return {
      imageSrc,
      showColorInfo,
      handleImageUpload,
      averageColorRGB,
      averageColorHex,
      distinctiveColorRGB,
      distinctiveColorHex,
      colorTemp,
      colorTempCategory,
      sortedPalette
    };
  }
}
</script>

<style>
body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    max-width: 960px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f4f4f4;
}

.container {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

table {
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 20px;
}

th,
td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
}

.temperature-option {
    display: inline-block;
    margin-right: 10px;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
}

.selected {
    background-color: #4CAF50;
    color: white;
}

.color-box {
    width: 50px;
    height: 50px;
    display: inline-block;
    margin-right: 10px;
    vertical-align: middle;
    border: 1px solid #ddd;
}

input[type="file"] {
    margin-bottom: 20px;
}
</style>