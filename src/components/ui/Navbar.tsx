import type { NavItem } from '@utils/data';
import styles from './Navbar.module.css';

interface Props {
  items: NavItem[];
}

export default function Navbar({ items }: Props) {
  return (
    <nav className={styles.navbar} aria-label="Navegación principal">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="nav-button"
          aria-label={item.label}
          data-tooltip={item.label}
        >
          <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
            {item.id === 'hero' ? (
              <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9M9 20v-6h6v6" /></>
            ) : item.id === 'projects' ? (
              <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18M9 10v10" /></>
            ) : (
              <><path d="M6 3h9l4 4v14H6z" /><path d="M14 3v5h5M9 13h7M9 17h7" /></>
            )}
          </svg>
        </a>
      ))}
    </nav>
  );
}