import { useRef } from 'react';
import type { KeyIconData } from '@utils/data';
import { useKeyboardScene } from '@hooks/useKeyboardScene';
import styles from './TechKeyboard.module.css';

interface Props {
  keys: KeyIconData[];
  columns?: number;
}

export default function TechKeyboard({ keys, columns = 4 }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const status = useKeyboardScene(stageRef, tooltipRef, keys, columns);

  return (
    <div className={styles.wrapper} role="group" aria-label="Tecnologías">
      <div ref={stageRef} className={styles.stage} aria-hidden="true">
        <span ref={tooltipRef} className={styles.tooltip} />
      </div>

      <ul className={status === 'error' ? styles.fallbackList : styles.srOnly}>
        {keys.map((key) => (
          <li key={key.name}>{key.name}</li>
        ))}
      </ul>
    </div>
  );
}