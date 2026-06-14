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
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* Cart Items  */}
        <section className={styles.cartSection}>
          <h2 className={styles.sectionTitle}>Your Cart ({counter})</h2>

          <div className={styles.itemList}>
            {Object.keys(cart).map((key) => (
              <div className={styles.cartItem}>
                <img className={styles.itemImage} src={items[key].image} alt={items[key].title} />

                <div className={styles.itemDetails}>
                  <div className={styles.itemName}>{items[key].title}</div>
                  <span className={styles.itemVariant}>{items[key].category}</span>

                  <div className={styles.itemActions}>
                    <div className={styles.qtyControl}>
                      <button onClick={() => handleRemoveCart(key)} className={styles.qtyBtn}>
                        −
                      </button>
                      <span className={styles.qtyValue}>{cart[key]}</span>
                      <button onClick={() => handleAddToCart(key)} className={styles.qtyBtn}>
                        +
                      </button>
                    </div>
                    <button onClick={() => handleRemoveItemCart(key)} className={styles.removeBtn}>
                      Remove
                    </button>
                  </div>
                </div>
                <div className={styles.itemPriceWrapper}>
                  <span className={styles.itemTotalPrice}>${items[key].price * cart[key]}</span>
                  <span className={styles.itemPrice}>${items[key].price}</span>
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
                <span>${subTotal.toFixed(2)}</span>
              </span>
            </div>
            <div className={styles.line}>
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className={styles.line}>
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className={styles.divider} />
            <div className={styles.lineTotal}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button className={styles.checkoutBtn}>Proceed to Checkout</button>
        </aside>
      </div>
    </div>
  );
}
