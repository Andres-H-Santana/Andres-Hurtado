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
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}