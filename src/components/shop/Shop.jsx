import { useEffect } from 'react';
import styles from './Shop.module.css';
import { useOutletContext } from 'react-router-dom';

export default function Shop() {
  const { items, cart, setItems, handleAddToCart, handleRemoveCart } = useOutletContext();

  //api
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {items.map((item, i) => (
          <div key={i} className={styles.itemContainer}>
            <div className={styles.itemImg}>
              <img src={item.image} alt={item.title} />
            </div>
            <div className={styles.itemTitle}>{item.title.split(' ').slice(0, 5).join(' ')}</div>
            <div className={styles.itemFooter}>
              <div className={styles.itemPrice}>${item.price}</div>

              <div className={styles.itemBtnsWrapper}>
                {cart[i] > 0 && (
                  <>
                    <button onClick={() => handleRemoveCart(i)} className={styles.itemBtnPlus}>
                      -
                    </button>
                    <div className={styles.itemCounter}>{cart[i]}</div>
                  </>
                )}

                <button onClick={() => handleAddToCart(i)} className={cart[i] && styles.itemBtnPlus}>
                  {cart[i] ? '+' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
