import { Outlet, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useState } from 'react';

export default function Navbar() {
  const [cart, setCart] = useState({});
  const [counter, setCounter] = useState(0);

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
              {counter > 0 && <div className={styles.cartNumber}>{counter}</div>}
            </NavLink>
          </li>
        </ul>
      </nav>

      <main className={styles.mainContent}>
        <Outlet context={{ cart, setCart, setCounter }} />
      </main>
    </div>
  );
}
