import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest'; // Navbar.test.jsx
import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryRouter, MemoryRouter, RouterProvider } from 'react-router-dom';
import Navbar from './Navbar';
import App from '../../App';
import Home from '../home/Home';
import Shop from '../shop/Shop';
import Cart from '../cart/Cart';

describe('Navbar', () => {
  const renderNavbar = () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );
  };

  it('renders the Home link', () => {
    renderNavbar();
    // const homeLink = screen.getByRole('link', { name: 'Home' });
    const homeLink = screen.getByTestId('home');
    expect(homeLink).toBeInTheDocument();
  });

  it('renders shop link', () => {
    renderNavbar();
    const shopLink = screen.getByTestId('shop');
    expect(shopLink).toBeInTheDocument();
  });

  it('renders shop link', () => {
    renderNavbar();
    const cartLink = screen.getByTestId('cart');
    expect(cartLink).toBeInTheDocument();
  });
});
describe('Navbar link behavior', () => {
  const renderApp = () => {
    // 1. Define the routes using an array of objects
    const routes = [
      {
        path: '/',
        element: <App />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: 'shop',
            element: <Shop />,
          },
          {
            path: 'cart',
            element: <Cart />,
          },
        ],
      },
    ];

    // 2. Create the memory router with your configuration
    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
    });

    // 3. Render using RouterProvider
    render(<RouterProvider router={router} />);
  };

  it('test if home page loads at home page', async () => {
    renderApp();

    const logo = await screen.findByTestId('logo');

    expect(logo).toBeInTheDocument();
  });

  it('test if home page loads on click', () => {
    renderApp();
    const homeLink = screen.getByTestId('home');
    fireEvent.click(homeLink);
    const logo = screen.getByTestId('logo');
    expect(logo).toBeInTheDocument();
  });
  it('test if shop page loads on click', () => {
    renderApp();
    const shopLink = screen.getByTestId('shop');
    fireEvent.click(shopLink);
    const loading = screen.getByTestId('loading-shop');
    expect(loading).toBeInTheDocument();
  });
  it('test if shop page loads on click', () => {
    renderApp();
    const cartLink = screen.getByTestId('cart');
    fireEvent.click(cartLink);
    const cart = screen.getByTestId('cart-page');
    expect(cart).toBeInTheDocument();
  });
});
