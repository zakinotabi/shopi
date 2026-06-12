import { Outlet, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  const activeLink = ({ isActive }) => {
    return isActive ? `${styles.link} ${styles.active}` : styles.link;
  };

  return (
    <div>
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
            </NavLink>
          </li>
        </ul>
      </nav>

      <main className={styles['main-content']}>
        <Outlet />
      </main>
    </div>
  );
}
