import { Outlet, Link } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <div>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li className={styles.cart}>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </nav>

      <main className={styles['main-content']}>
        <Outlet />
      </main>
    </div>
  );
}
