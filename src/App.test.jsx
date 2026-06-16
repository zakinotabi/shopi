import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';

describe('browsing App / Navbar behavior', () => {
  const renderApp = (path = '/') => {
    // This is not mocking this is creating a real router that works in memory instead of the browser:
    const router = createMemoryRouter(routes, {
      //                        we imported the routes so we don't rewrite everything
      initialEntries: [path],
    });
    render(<RouterProvider router={router} />);
  };

  // What createMemoryRouter does behind the scenes
  // Instead of reading from window.location it creates a fake history stack in memory:

  // Real browser has this:
  // window.location.pathname = '/shop' (when you click shop)

  // Memory router creates this instead: (when you fire event click shop)
  // memoryHistory = ['/shop']  // just an array in memory
  // currentIndex = 0           // pointing to current page

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
  it('test if cart page loads on click', () => {
    renderApp();
    const cartLink = screen.getByTestId('cart');
    fireEvent.click(cartLink);
    const cart = screen.getByTestId('cart-page');
    expect(cart).toBeInTheDocument();
  });
});

describe('navbar counter behavior', () => {
  const renderShop = async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve([
              { id: 1, title: 'Product A', price: 9.99, image: 'a.jpg', rating: { rate: 4.5 } },
              { id: 2, title: 'Product B', price: 1.99, image: 'b.jpg', rating: { rate: 4.0 } },
            ]),
        }),
      ),
    );
    const router = createMemoryRouter(routes, { initialEntries: ['/shop'] });
    render(<RouterProvider router={router} />);
    await screen.findByText('Product A'); // wait for products to load
    await screen.findByText('Product B');
  };
  // we need to mock the API behavior ro test the shop buttons
  // that requires creating a router and waiting for the API to load every time

  it('increments counter when add to cart clicked', async () => {
    await renderShop();
    expect(await screen.findByText('Product A')).toBeInTheDocument();
    const addBtn_1 = screen.getAllByRole('button', { name: /add to cart/i })[0];
    const addBtn_2 = screen.getAllByRole('button', { name: /add to cart/i })[1];
    // we have to get the buttons first thing

    fireEvent.click(addBtn_1);
    // checking if the navbar counter changes correctly and also the product counter
    const minBtn = screen.getByRole('button', { name: /decrement/i });
    expect(screen.getByTestId('nav-cart-count')).toHaveTextContent('1');
    expect(screen.getByTestId('product-counter')).toHaveTextContent('1');
    fireEvent.click(addBtn_1);
    expect(screen.getByTestId('nav-cart-count')).toHaveTextContent('2');
    expect(screen.getByTestId('product-counter')).toHaveTextContent('2');

    // decrements counter when minus clicked
    fireEvent.click(minBtn);
    expect(screen.getByTestId('nav-cart-count')).toHaveTextContent('1');

    // checking if the navbar counter changes correctly and also the product counter
    // when clicking the second product buttons B
    fireEvent.click(addBtn_2);
    expect(screen.getByTestId('nav-cart-count')).toHaveTextContent('2');
    expect(screen.getAllByTestId('product-counter')[1]).toHaveTextContent('1');
  });
});
