// 示例数据库，包含一些 RGB 颜色数组
const colorDatabase = {
  main: [
    [40, 152, 255], // 蓝色
    [150, 67, 255], // 紫色
    [255, 0, 153], // 洋红
    [255, 107, 0], // 橘色
    [255, 0, 255], // 洋红
    [0, 255, 255], // 青色
    [187, 210, 40], // 绿色
  ],
};

// 计算两个颜色之间的欧几里得距离
function colorDistance(color1, color2) {
  return Math.sqrt(
    Math.pow(color1[0] - color2[0], 2) +
      Math.pow(color1[1] - color2[1], 2) +
      Math.pow(color1[2] - color2[2], 2)
  );
}

// 将 RGB 数组转换为 16 进制字符串
export function rgbToHex(rgb) {
  return (
    "#" +
    rgb
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

// 查找最接近的颜色
export function findClosestColor(inputColor, dataBase) {
  let closestColor = colorDatabase[dataBase][0];
  let minDistance = colorDistance(inputColor, closestColor);

  for (let i = 1; i < colorDatabase[dataBase].length; i++) {
    const distance = colorDistance(inputColor, colorDatabase[dataBase][i]);
    if (distance < minDistance) {
      minDistance = distance;
      closestColor = colorDatabase[dataBase][i];
    }
  }

  return {
    rgb: closestColor,
    hex: rgbToHex(closestColor),
  };
}

// 转换背景色
export function transformColor(hexColor, options = {}) {
  console.log("hexColor", hexColor);
  const { hOffset = 50, newS = 100, newL = 88 } = options;

  // 将 hex 转换为 RGB
  let r = parseInt(hexColor.slice(1, 3), 16) / 255;
  let g = parseInt(hexColor.slice(3, 5), 16) / 255;
  let b = parseInt(hexColor.slice(5, 7), 16) / 255;

  // 计算最大值和最小值
  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);

  // 计算 Hue
  let h;
  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * ((g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else {
    h = 60 * (4 + (r - g) / (max - min));
  }
  h = (h + 360) % 360; // 确保 h 在 0-360 范围内

  // 计算第二个颜色的 Hue
  const h2 = (h - hOffset + 360) % 360;

  // 将 HSL 转换回 RGB，然后转换为 Hex
  function hslToHex(h, s, l) {
    s /= 100;
    l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r, g, b;

    if (h >= 0 && h < 60) {
      [r, g, b] = [c, x, 0];
    } else if (h >= 60 && h < 120) {
      [r, g, b] = [x, c, 0];
    } else if (h >= 120 && h < 180) {
      [r, g, b] = [0, c, x];
    } else if (h >= 180 && h < 240) {
      [r, g, b] = [0, x, c];
    } else if (h >= 240 && h < 300) {
      [r, g, b] = [x, 0, c];
    } else {
      [r, g, b] = [c, 0, x];
    }

    r = Math.round((r + m) * 255)
      .toString(16)
      .padStart(2, "0");
    g = Math.round((g + m) * 255)
      .toString(16)
      .padStart(2, "0");
    b = Math.round((b + m) * 255)
      .toString(16)
      .padStart(2, "0");

    return `#${r}${g}${b}`;
  }

  const color1 = hslToHex(h, newS, newL);
  const color2 = hslToHex(h2, newS, newL);

  return { color1, color2 };
}
