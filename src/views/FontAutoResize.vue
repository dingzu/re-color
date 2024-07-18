<template>
  <div class="container">
    <div class="inputs">
      <div>
        <label for="preview-text">预览文字：</label>
        <textarea id="preview-text" v-model="previewText" rows="3"></textarea>
      </div>
      <div>
        <label for="font-size">字号（px）：</label>
        <input id="font-size" type="number" v-model="userFontSize" min="1">
      </div>
      <div>
        <label for="container-width">渲染区域宽度（px）：</label>
        <input id="container-width" type="number" v-model="containerWidth" min="1">
      </div>
    </div>
    <div class="preview-container" :style="containerStyle" ref="previewContainer">
      <div class="preview-text" :style="textStyle">{{ previewText }}</div>
    </div>
    <div class="info">
      实际字号：{{ calculatedFontSize }}px
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted, nextTick } from 'vue'

export default {
  name: 'TextPreview',
  setup() {
    const previewText = ref('请输入预览文字')
    const userFontSize = ref(16)
    const containerWidth = ref(300)
    const calculatedFontSize = ref(16)
    const previewContainer = ref(null)

    const containerStyle = computed(() => ({
      width: `${containerWidth.value}px`,
    }))

    const textStyle = computed(() => ({
      fontSize: `${calculatedFontSize.value}px`,
      wordWrap: 'break-word',
      whiteSpace: 'pre-wrap',
    }))

    const calculateFontSize = async () => {
      await nextTick()
      const container = previewContainer.value
      if (!container) return

      let fontSize = userFontSize.value
      let isValid = false

      while (!isValid && fontSize > 1) {
        container.style.fontSize = `${fontSize}px`
        const lines = getTextLines(container)
        isValid = lines.every(line => line.trim().length > 1)
        
        if (!isValid) {
          fontSize--
        }
      }

      calculatedFontSize.value = fontSize
    }

    const getTextLines = (element) => {
      const text = element.innerText
      const words = text.split('')
      const lines = []
      let line = ''

      for (const word of words) {
        const testLine = line + word
        const testLineWidth = getTextWidth(testLine, element)

        if (testLineWidth > containerWidth.value) {
          lines.push(line)
          line = word
        } else {
          line = testLine
        }
      }

      if (line) {
        lines.push(line)
      }

      return lines
    }

    const getTextWidth = (text, element) => {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      context.font = getComputedStyle(element).font
      return context.measureText(text).width
    }

    watch([previewText, userFontSize, containerWidth], calculateFontSize)

    onMounted(calculateFontSize)

    return {
      previewText,
      userFontSize,
      containerWidth,
      calculatedFontSize,
      containerStyle,
      textStyle,
      previewContainer,
    }
  }
}
</script>

<style scoped>

.inputs {
  margin-bottom: 20px;
}

.inputs > div {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input, textarea {
  width: 100%;
  padding: 5px;
}

.preview-container {
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 20px;
}

.preview-text {
  word-break: break-word;
}

.info {
  margin-top: 10px;
  font-size: 14px;
  color: #666;
}
</style>