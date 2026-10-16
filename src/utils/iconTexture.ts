import * as THREE from 'three';
import type { KeyIconData } from '@utils/data';

const textureSize = 256;

function buildIconSvg(icon: KeyIconData, color: string): string {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${icon.width} ${icon.height}" ` +
    `width="${textureSize}" height="${textureSize}" style="color:${color};fill:${color}">` +
    `${icon.body}</svg>`
  );
}

// Convierte el SVG de simple-icons en una textura transparente para la tecla
export function loadIconTexture(
  icon: KeyIconData,
  color: string,
  anisotropy: number,
): Promise<THREE.CanvasTexture> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = textureSize;
      canvas.height = textureSize;

      const context = canvas.getContext('2d');
      if (!context) {
        reject(new Error('Canvas 2D no disponible'));
        return;
      }

      context.drawImage(image, 0, 0, textureSize, textureSize);

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = anisotropy;
      resolve(texture);
    };

    image.onerror = () => reject(new Error(`No se pudo cargar el ícono ${icon.name}`));
    image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(buildIconSvg(icon, color))}`;
  });
}