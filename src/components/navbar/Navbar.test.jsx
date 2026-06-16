import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest'; // Navbar.test.jsx
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

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

  it('test if link is active when clicked', () => {
    renderNavbar();
    const homeLink = screen.getByTestId('home');
    fireEvent.click(homeLink);
    expect(homeLink).toHaveClass(/_active_/);
  });
  it('test if link is active when clicked', () => {
    renderNavbar();
    const shopLink = screen.getByTestId('shop');
    fireEvent.click(shopLink);
    expect(shopLink).toHaveClass(/_active_/);
  });
  it('test if link is active when clicked', () => {
    renderNavbar();
    const cartLink = screen.getByTestId('cart');
    fireEvent.click(cartLink);
    expect(cartLink).toHaveClass(/_active_/);
  });
});

describe('test cart counter in navbar', () => {
  const renderNavbar = (counter = 0) => {
    render(
      <MemoryRouter>
        <Navbar counter={counter} />
      </MemoryRouter>,
    );
  };
  it('hides cart count when counter is 0', () => {
    renderNavbar(); // counter = 0 (default)
    expect(screen.queryByTestId('nav-cart-count')).not.toBeInTheDocument();
  });

  it('shows cart count when counter is greater than 0', () => {
    renderNavbar(5); // counter = 5
    expect(screen.getByTestId('nav-cart-count')).toBeInTheDocument();
  });

  it('displays the correct counter number', () => {
    renderNavbar(5); // counter = 5
    expect(screen.getByTestId('nav-cart-count')).toHaveTextContent('5');
  });
});
