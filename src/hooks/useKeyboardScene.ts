import { useEffect, useState } from 'react';
import type { RefObject } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import type { KeyIconData } from '@utils/data';
import { cameraConfig, getKeyTone, keyLayout, trayColors } from '@utils/keyboardTheme';
import { loadIconTexture } from '@utils/iconTexture';

export type SceneStatus = 'loading' | 'ready' | 'error';

interface KeyState {
  group: THREE.Group;
  x: number;
  z: number;
  current: number; // cuánto está hundida ahora
  target: number; // cuánto debería estar hundida
}

// Tecla con forma de keycap: una caja redondeada que se angosta hacia arriba
function createKeycapGeometry(): THREE.BufferGeometry {
  const { size, height, radius, taper } = keyLayout;
  const geometry = new RoundedBoxGeometry(size, height, size, 4, radius);
  const position = geometry.attributes.position;

  for (let i = 0; i < position.count; i += 1) {
    const heightRatio = (position.getY(i) + height / 2) / height;
    const scale = 1 - taper * heightRatio;
    position.setX(i, position.getX(i) * scale);
    position.setZ(i, position.getZ(i) * scale);
  }

  position.needsUpdate = true;
  return geometry;
}

export function useKeyboardScene(
  stageRef: RefObject<HTMLDivElement | null>,
  tooltipRef: RefObject<HTMLSpanElement | null>,
  keys: KeyIconData[],
  columns: number,
): SceneStatus {
  const [status, setStatus] = useState<SceneStatus>('loading');

  useEffect(() => {
    const stage = stageRef.current;
    const tooltip = tooltipRef.current;
    if (!stage || !tooltip) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setStatus('error');
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    stage.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
    const disposables: Array<{ dispose: () => void }> = [];
    const track = <T extends { dispose: () => void }>(item: T): T => {
      disposables.push(item);
      return item;
    };

    // ─── Medidas del tablero ─────────────────────────────────
    const { pitch, trayPadding, trayHeight, height, size } = keyLayout;
    const rows = Math.ceil(keys.length / columns);
    const boardWidth = (columns - 1) * pitch + size + trayPadding * 2;
    const boardDepth = (rows - 1) * pitch + size + trayPadding * 2;

    // ─── Luces ───────────────────────────────────────────────
    scene.add(new THREE.HemisphereLight('#fff6ee', '#e9c9b0', 1.4));

    const sun = new THREE.DirectionalLight('#ffffff', 2.2);
    sun.position.set(-3, 9, 6);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.bias = -0.0005;
    sun.shadow.normalBias = 0.02;
    sun.shadow.radius = 4;
    const shadowRange = Math.max(boardWidth, boardDepth);
    sun.shadow.camera.left = -shadowRange;
    sun.shadow.camera.right = shadowRange;
    sun.shadow.camera.top = shadowRange;
    sun.shadow.camera.bottom = -shadowRange;
    sun.shadow.camera.far = 40;
    scene.add(sun);

    // ─── Base del teclado y sombra sobre el fondo ────────────
    const trayGeometry = track(
      new RoundedBoxGeometry(boardWidth, trayHeight, boardDepth, 4, 0.3),
    );
    const trayMaterial = track(
      new THREE.MeshStandardMaterial({ color: trayColors.body, roughness: 0.6 }),
    );
    const tray = new THREE.Mesh(trayGeometry, trayMaterial);
    tray.position.y = -trayHeight / 2;
    tray.castShadow = true;
    tray.receiveShadow = true;
    scene.add(tray);

    const groundGeometry = track(new THREE.PlaneGeometry(60, 60));
    const groundMaterial = track(
      new THREE.ShadowMaterial({ color: trayColors.shadow, opacity: 0.2 }),
    );
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -trayHeight - 0.02;
    ground.receiveShadow = true;
    scene.add(ground);

    // ─── Teclas ──────────────────────────────────────────────
    const bodyGeometry = track(createKeycapGeometry());
    const topSize = size * (1 - keyLayout.taper) - 0.14;
    const plateHeight = 0.06;
    const plateGeometry = track(new RoundedBoxGeometry(topSize, plateHeight, topSize, 3, 0.12));
    const iconSize = topSize * 0.62;
    const iconGeometry = track(new THREE.PlaneGeometry(iconSize, iconSize));
    const iconY = height + plateHeight / 2 + 0.012;

    const keyStates: KeyState[] = [];
    const pickTargets: THREE.Mesh[] = [];
    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    let disposed = false;

    keys.forEach((keyData, index) => {
      const column = index % columns;
      const row = Math.floor(index / columns);
      const x = (column - (columns - 1) / 2) * pitch;
      const z = (row - (rows - 1) / 2) * pitch;
      const tone = getKeyTone(index);

      const bodyMaterial = track(
        new THREE.MeshStandardMaterial({
          color: new THREE.Color(tone.face).lerp(new THREE.Color(tone.edge), 0.6),
          roughness: 0.5,
        }),
      );
      const plateMaterial = track(
        new THREE.MeshStandardMaterial({ color: tone.face, roughness: 0.4 }),
      );
      const iconMaterial = track(
        new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false }),
      );

      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.position.y = height / 2;
      body.castShadow = true;
      body.receiveShadow = true;
      body.userData.index = index;

      const plate = new THREE.Mesh(plateGeometry, plateMaterial);
      plate.position.y = height;
      plate.receiveShadow = true;
      plate.userData.index = index;

      const icon = new THREE.Mesh(iconGeometry, iconMaterial);
      icon.rotation.x = -Math.PI / 2;
      icon.position.y = iconY;
      icon.visible = false;

      const group = new THREE.Group();
      group.position.set(x, 0, z);
      group.add(body, plate, icon);
      scene.add(group);

      keyStates.push({ group, x, z, current: 0, target: 0 });
      pickTargets.push(body, plate);

      loadIconTexture(keyData, tone.icon, maxAnisotropy)
        .then((texture) => {
          if (disposed) {
            texture.dispose();
            return;
          }
          track(texture);
          iconMaterial.map = texture;
          iconMaterial.needsUpdate = true;
          icon.visible = true;
          requestFrame();
        })
        .catch(() => {
          // Si un ícono falla, la tecla queda lisa y el resto sigue funcionando
        });
    });

    // ─── Cámara isométrica ───────────────────────────────────
    const { azimuth, elevation, margin } = cameraConfig;
    const cameraDistance = 30;
    const cameraTarget = new THREE.Vector3(0, 0.2, 0);

    camera.position.set(
      cameraTarget.x + cameraDistance * Math.sin(azimuth) * Math.cos(elevation),
      cameraTarget.y + cameraDistance * Math.sin(elevation),
      cameraTarget.z + cameraDistance * Math.cos(azimuth) * Math.cos(elevation),
    );
    camera.lookAt(cameraTarget);

    const fitCamera = (aspect: number) => {
      const halfWidth =
        (boardWidth * Math.cos(azimuth) + boardDepth * Math.sin(azimuth)) / 2;
      const halfHeight =
        ((boardWidth * Math.sin(azimuth) + boardDepth * Math.cos(azimuth)) / 2) *
          Math.sin(elevation) +
        (height + trayHeight) * Math.cos(elevation) * 0.6;

      const viewHeight = Math.max(2 * halfHeight, (2 * halfWidth) / aspect) * margin;
      camera.left = (-viewHeight * aspect) / 2;
      camera.right = (viewHeight * aspect) / 2;
      camera.top = viewHeight / 2;
      camera.bottom = -viewHeight / 2;
      camera.updateProjectionMatrix();
      camera.updateMatrixWorld();
    };

    // ─── Render solo cuando algo se mueve ────────────────────
    const hoverDepth = keyLayout.hoverDepth;
    const pressDepth = keyLayout.pressDepth;
    let frameId = 0;
    let hoveredIndex = -1;
    let pressedIndex = -1;

    const tick = () => {
      frameId = 0;
      let moving = false;

      for (const key of keyStates) {
        const difference = key.target - key.current;
        if (Math.abs(difference) > 0.0005) {
          key.current = reduceMotion ? key.target : key.current + difference * 0.3;
          moving = true;
        } else {
          key.current = key.target;
        }
        key.group.position.y = -key.current;
      }

      renderer.render(scene, camera);
      if (moving) frameId = requestAnimationFrame(tick);
    };

    function requestFrame() {
      if (!frameId && !disposed) frameId = requestAnimationFrame(tick);
    }

    const resize = () => {
      const { clientWidth, clientHeight } = stage;
      if (!clientWidth || !clientHeight) return;

      renderer.setSize(clientWidth, clientHeight, false);
      fitCamera(clientWidth / clientHeight);
      showTooltip(hoveredIndex);
      requestFrame();
    };

    // ─── Interacción ─────────────────────────────────────────
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const tooltipAnchor = new THREE.Vector3();

    const pickKey = (event: PointerEvent): number => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1,
      );
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(pickTargets, false)[0];
      return hit ? (hit.object.userData.index as number) : -1;
    };

    function showTooltip(index: number) {
      if (index < 0 || !keys[index]) {
        tooltip!.style.opacity = '0';
        return;
      }

      const key = keyStates[index];
      tooltipAnchor.set(key.x, height + 0.3, key.z).project(camera);

      const rect = stage!.getBoundingClientRect();
      tooltip!.textContent = keys[index].name;
      tooltip!.style.transform =
        `translate(${(tooltipAnchor.x * 0.5 + 0.5) * rect.width}px, ` +
        `${(-tooltipAnchor.y * 0.5 + 0.5) * rect.height}px) translate(-50%, -100%)`;
      tooltip!.style.opacity = '1';
    }

    const applyTargets = () => {
      keyStates.forEach((key, index) => {
        if (index === pressedIndex) key.target = pressDepth;
        else if (index === hoveredIndex) key.target = hoverDepth;
        else key.target = 0;
      });
      showTooltip(hoveredIndex);
      requestFrame();
    };

    const handlePointerMove = (event: PointerEvent) => {
      const index = pickKey(event);
      if (index === hoveredIndex) return;
      hoveredIndex = index;
      applyTargets();
    };

    const handlePointerDown = (event: PointerEvent) => {
      hoveredIndex = pickKey(event);
      pressedIndex = hoveredIndex;
      applyTargets();
    };

    const handlePointerUp = () => {
      pressedIndex = -1;
      applyTargets();
    };

    const handlePointerLeave = () => {
      hoveredIndex = -1;
      pressedIndex = -1;
      applyTargets();
    };

    const canvas = renderer.domElement;
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointercancel', handlePointerLeave);
    canvas.addEventListener('pointerleave', handlePointerLeave);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(stage);
    resize();
    setStatus('ready');

    // ─── Limpieza ────────────────────────────────────────────
    return () => {
      disposed = true;
      if (frameId) cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointercancel', handlePointerLeave);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
      disposables.forEach((item) => item.dispose());
      renderer.dispose();
      canvas.remove();
    };
  }, [stageRef, tooltipRef, keys, columns]);

  return status;
}