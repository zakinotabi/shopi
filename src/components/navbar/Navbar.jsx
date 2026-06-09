import { Outlet, Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">shop</Link>
          </li>
          <li>
            <Link to="/cart">cart</Link>
          </li>
        </ul>
      </nav>
      <hr />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
