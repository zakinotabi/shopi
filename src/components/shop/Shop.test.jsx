import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from 'vitest'; // Navbar.test.jsx
import { fireEvent, render, screen } from '@testing-library/react';
import Shop from './Shop';

// create a dynamic context state
const { mockContext } = vi.hoisted(() => ({
  mockContext: {
    items: [],
    cart: [],
    setItems: vi.fn(),
    handleAddToCart: vi.fn(),
    handleRemoveCart: vi.fn(),
  },
}));

// we here mock data not making a router like we did in app,test
vi.mock('react-router-dom', async (importRouter) => {
  const actual = await importRouter();
  //                            ↑
  //                     here we CALL it to fill the actual var with whatever
  //                     is inside this func (router in this example)
  //                     it's because we can't change the syntax of mocking

  //                using async/await cause importing some files might take time
  //                my own files like Shop and Routes ect
  //                large third party libraries like { createBrowserRouter } from 'react-router-dom'

  return {
    ...actual,
    //  we keep the router as it is
    useOutletContext: () => mockContext,
    // we override the context (inside actual) with ours
  };
});

describe('test the shopping page', () => {
  const renderPage = () => {
    render(<Shop />);
  };

  it('renders the shop loading page', () => {
    renderPage();
    const loadingPage = screen.getByText(/Loading.../i);
    expect(loadingPage).toBeInTheDocument();
  });

  it('renders product with its buttons', () => {
    mockContext.items = [{ id: 0, title: 'Product A', price: 9.99, image: 'a.jpg', rating: { rate: 4.5 } }];

    renderPage();
    expect(screen.getByTestId('shopping-items')).toBeInTheDocument();
    expect(screen.getByText('Product A')).toBeInTheDocument();
    expect(screen.getByText(/9.99/)).toBeInTheDocument();
    expect(screen.getByAltText('Product A')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
  });

  it('calls handleAddToCart when button is clicked', () => {
    mockContext.items = [{ id: 0, title: 'Product A', price: 9.99, image: 'a.jpg', rating: { rate: 4.5 } }];

    renderPage();
    const addToCart = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addToCart);
    expect(mockContext.handleAddToCart).toHaveBeenCalledWith(0);
  });

  // test 2 — does button change when item is in cart?
  it('shows different elements when item is in cart', () => {
    mockContext.items = [{ id: 0, title: 'Product A', price: 9.99, image: 'a.jpg', rating: { rate: 4.5 } }];
    mockContext.cart = { 0: 1 };

    renderPage();

    expect(screen.getByRole('button', { name: /\+/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /decrement/i })).toBeInTheDocument();
    expect(screen.getByTestId('product-counter')).toBeInTheDocument();
  });
});
