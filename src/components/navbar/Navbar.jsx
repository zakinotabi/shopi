import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar({ counter }) {
  const activeLink = ({ isActive }) => {
    return isActive ? `${styles.link} ${styles.active}` : styles.link;
  };

  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <NavLink to="/" className={activeLink}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/shop" className={activeLink}>
            Shop
          </NavLink>
        </li>
        <li className={styles.cart}>
          <NavLink to="/cart" className={activeLink}>
            Cart
            {counter > 0 && <div className={styles.cartNumber}>{counter}</div>}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
