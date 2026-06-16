import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Cart from './Cart';

// create a dynamic context state
const { mockContext } = vi.hoisted(() => ({
  mockContext: {
    items: [],
    cart: {},
    counter: 0,
    handleAddToCart: vi.fn(),
    handleRemoveCart: vi.fn(),
    handleRemoveItemCart: vi.fn(),
  },
}));

vi.mock('react-router-dom', async (importRouter) => {
  const actual = await importRouter();
  //                            ↑
  //                     explained in shop.test
  return {
    ...actual,
    useOutletContext: () => mockContext,
  };
});

describe('test the Cart page', () => {
  const renderPage = () => {
    render(<Cart />);
  };

  it('renders the Cart page', () => {
    renderPage();
    expect(screen.getByText(/Your Cart/i)).toBeInTheDocument();
    expect(screen.getByText(/Order Summary/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Promo code/i)).toBeInTheDocument();
  });

  it('renders product with its buttons', () => {
    mockContext.items = [
      { id: 0, title: 'Product A', price: 9.99, image: 'a.jpg', rating: { rate: 4.5 } },
      { id: 1, title: 'Product B', price: 24.99, image: 'b.jpg', rating: { rate: 4.2 } },
      { id: 2, title: 'Product C', price: 14.5, image: 'c.jpg', rating: { rate: 4.8 } },
    ];
    // 3 products so length will almost always be 3

    mockContext.cart = { 0: 1, 1: 1, 2: 2 };

    renderPage();
    const products = screen.getAllByTestId('product');
    const productImages = screen.getAllByLabelText('product-image');

    // 2. Expect exactly 3 product containers
    expect(products).toHaveLength(3);
    expect(productImages).toHaveLength(3);

    // 3. Expect all product titles, images, and prices to be visible
    mockContext.items.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(`$${item.price}`)).toBeInTheDocument();
      // Combines $ and the price into a single exact string (e.g., "$9.99")
    });

    // 4. Expect calculated price for item 2 to reflect quantity of 2 ($14.50 * 2 = 29.00)
    const expectedTotalPriceForProductC = (mockContext.items[2].price * 2).toFixed(2); // "29.00"
    expect(screen.getByText(`$${expectedTotalPriceForProductC}`)).toBeInTheDocument();

    // 5. Expect control buttons and quantity labels to be present
    // (Using getAllBy or querying specific ones depending on your exact UI layout)
    expect(screen.getAllByRole('button', { name: 'decrement' })).toHaveLength(3);
    expect(screen.getAllByRole('button', { name: 'increment' })).toHaveLength(3);
    expect(screen.getAllByRole('button', { name: 'remove-item' })).toHaveLength(3);

    // 6. "how-many-products" is not a button (e.g., a div or span text wrapper)
    expect(screen.getAllByLabelText('how-many-products')).toHaveLength(3);

    // 7. quantity should be 2
    expect(screen.getAllByLabelText('how-many-products')[2]).toHaveTextContent('2');
    // 8. single price show up
    expect(screen.getAllByLabelText('single-product-price')[0]).toBeInTheDocument();
  });

  it('renders correct order summary calculations', () => {
    mockContext.items = [
      { id: 0, title: 'Product A', price: 9.99, image: 'a.jpg', rating: { rate: 4.5 } },
      { id: 1, title: 'Product B', price: 24.99, image: 'b.jpg', rating: { rate: 4.2 } },
      { id: 2, title: 'Product C', price: 14.5, image: 'c.jpg', rating: { rate: 4.8 } },
    ];
    mockContext.cart = { 0: 1, 1: 1, 2: 2 };

    renderPage();

    // replicate the same calculations from the component
    const subTotal = 9.99 * 1 + 24.99 * 1 + 14.5 * 2; // 63.98
    const shipping = (subTotal / 100) * 5;
    const tax = (subTotal / 100) * 8;
    const total = subTotal + shipping + tax;

    expect(screen.getByLabelText('subtotal-cost')).toHaveTextContent(`$${subTotal.toFixed(2)}`);
    expect(screen.getByLabelText('shipping-cost')).toHaveTextContent(`$${shipping.toFixed(2)}`);
    expect(screen.getByLabelText('tax-cost')).toHaveTextContent(`$${tax.toFixed(2)}`);
    expect(screen.getByLabelText('final-total')).toHaveTextContent(`$${total.toFixed(2)}`);
  });
});
// other tests require integration but this covers the most
// cause the use the same fn
