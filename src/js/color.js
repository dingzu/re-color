export function mergeSimilarColors(palette, threshold = 30) {
    const mergedPalette = [];
    palette.forEach(color => {
        const similarColor = mergedPalette.find(c => colorDistance(c.color, color) < threshold);
        if (similarColor) {
            similarColor.count += 1;
            similarColor.color = averageColors(similarColor.color, color);
        } else {
            mergedPalette.push({ color, count: 1 });
        }
    });
    return mergedPalette;
}

export function adaptiveMerge(palette) {
    let minDistance = Infinity;
    let pair = null;

    for (let i = 0; i < palette.length; i++) {
        for (let j = i + 1; j < palette.length; j++) {
            const distance = colorDistance(palette[i].color, palette[j].color);
            if (distance < minDistance) {
                minDistance = distance;
                pair = [i, j];
            }
        }
    }

    if (pair) {
        const [i, j] = pair;
        const newColor = averageColors(palette[i].color, palette[j].color);
        const newCount = palette[i].count + palette[j].count;
        palette[i] = { color: newColor, count: newCount };
        palette.splice(j, 1);
    }

    return palette;
}

export function calculateAverageColor(palette) {
    const sum = palette.reduce((acc, color) => [acc[0] + color[0], acc[1] + color[1], acc[2] + color[2]], [0, 0, 0]);
    return sum.map(v => Math.round(v / palette.length));
}

export function calculateColorTemperature(rgb) {
    // 将 RGB 值归一化到 0-1 范围
    const r = rgb[0] / 255.0;
    const g = rgb[1] / 255.0;
    const b = rgb[2] / 255.0;

    // 计算色度坐标
    let X = 0.4124 * r + 0.3576 * g + 0.1805 * b;
    let Y = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    let Z = 0.0193 * r + 0.1192 * g + 0.9505 * b;

    // 计算 xy 色度
    let x = X / (X + Y + Z);
    let y = Y / (X + Y + Z);

    // 计算 CCT (相关色温)
    let n = (x - 0.3320) / (0.1858 - y);
    let cct = 449 * Math.pow(n, 3) + 3525 * Math.pow(n, 2) + 6823.3 * n + 5520.33;

    return cct
}

export function getTemperatureCategory(temp) {
    if (temp <= 3500) return "暖色";
    if (temp >= 5500) return "冷色";
    return "中性";
}

export function colorDistance(c1, c2) {
    return Math.sqrt(
        Math.pow(c1[0] - c2[0], 2) +
        Math.pow(c1[1] - c2[1], 2) +
        Math.pow(c1[2] - c2[2], 2)
    );
}

export function averageColors(c1, c2) {
    return [
        Math.round((c1[0] + c2[0]) / 2),
        Math.round((c1[1] + c2[1]) / 2),
        Math.round((c1[2] + c2[2]) / 2)
    ];
}

export function rgbToHex(rgb) {
    return "#" + rgb.map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }).join('');
}

export function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h * 360, s * 100, l * 100];
} 