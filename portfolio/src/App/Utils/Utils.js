import * as THREE from "three";
export function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

export function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

export function brightenColor(color, factor = 0.1) {
    // Convert color to THREE.Color object if it's not already
    const col = new THREE.Color(color);

    // Lerp (interpolate) towards white
    col.lerp(new THREE.Color(0xffffff), factor);

    return col.getHex(); // Return as hex color
}

  
