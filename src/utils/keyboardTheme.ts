// ─── Colores y medidas del teclado 3D ────────────────────────
export interface KeyTone {
  face: string; // cara superior (clara)
  edge: string; // borde y laterales (versión oscura del mismo color)
  icon: string; // color del ícono
}

export const keyTones: KeyTone[] = [
  { face: '#f9d3b8', edge: '#eb8f5a', icon: '#b8582a' }, // durazno
  { face: '#f5cf99', edge: '#d9a04f', icon: '#8f5f1a' }, // arena
  { face: '#bfe1f4', edge: '#6fb0d6', icon: '#2f6f95' }, // cielo
  { face: '#fbf3ea', edge: '#d9b99c', icon: '#c4682f' }, // crema
];

// Índices de keyTones: ninguna tecla repite color con su vecina
const tonePattern: number[] = [
  0, 2, 1, 3,
  1, 3, 0, 2,
  3, 1, 2, 0,
  2, 0, 3, 1,
];

export function getKeyTone(index: number): KeyTone {
  return keyTones[tonePattern[index % tonePattern.length]];
}

export const trayColors = {
  body: '#f0b38d',
  rim: '#d68a5a',
  shadow: '#74594a',
};

export const keyLayout = {
  size: 1, // ancho de la base de la tecla
  height: 0.8, // altura del cuerpo
  radius: 0.2, // redondeo de las esquinas
  taper: 0.18, // cuánto se angosta la tecla hacia arriba
  pitch: 1.18, // distancia entre centros de teclas
  trayPadding: 0.42,
  trayHeight: 0.5,
  hoverDepth: 0.1,
  pressDepth: 0.26,
};

export const cameraConfig = {
  azimuth: (38 * Math.PI) / 180,
  elevation: (40 * Math.PI) / 180,
  margin: 1.08,
};