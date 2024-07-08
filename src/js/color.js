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
    const [r, g, b] = rgb;
    const X = (-0.14282 * r) + (1.54924 * g) + (-0.95641 * b);
    const Y = (-0.32466 * r) + (1.57837 * g) + (-0.73191 * b);
    const Z = (-0.68202 * r) + (0.77073 * g) + (0.56332 * b);

    const x = X / (X + Y + Z);
    const y = Y / (X + Y + Z);

    const n = (x - 0.3320) / (0.1858 - y);
    return 449 * Math.pow(n, 3) + 3525 * Math.pow(n, 2) + 6823.3 * n + 5520.33;
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