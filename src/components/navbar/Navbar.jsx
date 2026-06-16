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
          <NavLink data-testid="home" to="/" className={activeLink}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink data-testid="shop" to="/shop" className={activeLink}>
            Shop
          </NavLink>
        </li>
        <li className={styles.cart}>
          <NavLink data-testid="cart" to="/cart" className={activeLink}>
            Cart
            {counter > 0 && (
              <div data-testid="nav-cart-count" className={styles.cartNumber}>
                {counter}
              </div>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
