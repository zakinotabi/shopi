import App from './App.jsx';
import Home from './components/home/Home.jsx';
import Shop from './components/shop/Shop.jsx';
import Cart from './components/cart/Cart.jsx';

export const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'shop', element: <Shop /> },
      { path: 'cart', element: <Cart /> },
    ],
  },
];
