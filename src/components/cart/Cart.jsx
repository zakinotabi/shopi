import { useOutletContext } from 'react-router-dom';
import styles from './Cart.module.css';

export default function Cart() {
  const { items, cart, counter, handleAddToCart, handleRemoveCart, handleRemoveItemCart } = useOutletContext();

  const calcul = () => Object.keys(cart).reduce((prev, current) => prev + items[current].price * cart[current], 0);

  const percentage = (sub, percent) => {
    const results = (sub / 100) * percent;
    return results;
  };

  const subTotal = calcul();
  const shipping = percentage(subTotal, 5);
  const tax = percentage(subTotal, 8);
  const total = +subTotal + +shipping + +tax;

  return (
    <div data-testid="cart-page" className={styles.wrapper}>
      <div className={styles.container}>
        {/* Cart Items  */}
        <section className={styles.cartSection}>
          <h2 className={styles.sectionTitle}>Your Cart ({counter})</h2>

          <div className={styles.itemList}>
            {Object.keys(cart).map((key) => (
              <div data-testid="product" className={styles.cartItem}>
                <img aria-label="product-image" className={styles.itemImage} src={items[key].image} alt={items[key].title} />

                <div className={styles.itemDetails}>
                  <div aria-label="product-title" className={styles.itemName}>
                    {items[key].title}
                  </div>
                  <span className={styles.itemVariant}>{items[key].category}</span>

                  <div className={styles.itemActions}>
                    <div className={styles.qtyControl}>
                      <button aria-label="decrement" onClick={() => handleRemoveCart(key)} className={styles.qtyBtn}>
                        −
                      </button>
                      <span aria-label="how-many-products" className={styles.qtyValue}>
                        {cart[key]}
                      </span>
                      <button aria-label="increment" onClick={() => handleAddToCart(key)} className={styles.qtyBtn}>
                        +
                      </button>
                    </div>
                    <button aria-label="remove-item" onClick={() => handleRemoveItemCart(key)} className={styles.removeBtn}>
                      Remove
                    </button>
                  </div>
                </div>
                <div className={styles.itemPriceWrapper}>
                  <span aria-label="product-price" className={styles.itemTotalPrice}>
                    ${(items[key].price * cart[key]).toFixed(2)}
                  </span>
                  {cart[key] > 1 && (
                    <span aria-label="single-product-price" className={styles.itemPrice}>
                      ${items[key].price}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* Promo */}
          <div className={styles.promoRow}>
            <input className={styles.promoInput} type="text" placeholder="Promo code" />
            <button className={styles.promoBtn}>Apply</button>
          </div>
        </section>

        {/* pay */}
        <aside className={styles.summary}>
          <h2 className={styles.sectionTitle}>Order Summary</h2>

          <div className={styles.summaryLines}>
            <div className={styles.line}>
              <span>Subtotal</span>
              <span>
                <span aria-label="subtotal-cost">${subTotal.toFixed(2)}</span>
              </span>
            </div>
            <div className={styles.line}>
              <span>Shipping</span>
              <span aria-label="shipping-cost">${shipping.toFixed(2)}</span>
            </div>
            <div className={styles.line}>
              <span>Tax (8%)</span>
              <span aria-label="tax-cost">${tax.toFixed(2)}</span>
            </div>
            <div className={styles.divider} />
            <div className={styles.lineTotal}>
              <span>Total</span>
              <span aria-label="final-total">${total.toFixed(2)}</span>
            </div>
          </div>

          <button aria-label="checkout" className={styles.checkoutBtn}>
            Proceed to Checkout
          </button>
        </aside>
      </div>
    </div>
  );
}
