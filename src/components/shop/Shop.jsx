import { useEffect, useState } from 'react';
import styles from './Shop.module.css';
import { useOutletContext } from 'react-router-dom';

export default function Shop() {
  const [items, setItems] = useState([]);
  const { cart, setCart, setCounter } = useOutletContext();

  const handleAddToCart = (item) => {
    setCart({ ...cart, [item.id]: (cart[item.id] ?? 0) + 1 });
    setCounter((prevCounter) => prevCounter + 1);
  };

  const handleRemoveCart = (item) => {
    setCart({ ...cart, [item.id]: (cart[item.id] ?? 0) - 1 });
    setCounter((prevCounter) => prevCounter - 1);
  };

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
          <div key={i} className={styles['item-container']}>
            <div className={styles['item-img']}>
              <img src={item.image} alt={item.title} />
            </div>
            <div className={styles['item-title']}>{item.title.split(' ').slice(0, 5).join(' ')}</div>
            <div className={styles['item-footer']}>
              <div className={styles['item-price']}>{item.price} $</div>

              <div className={styles['item-btns-wrapper']}>
                {cart[item.id] && (
                  <button onClick={() => handleRemoveCart(item)} className={styles['item-btn-plus']}>
                    -1
                  </button>
                )}
                <div className={styles['item-counter']}>{cart[item.id]}</div>

                <button onClick={() => handleAddToCart(item)} className={cart[item.id] && styles['item-btn-plus']}>
                  {cart[item.id] ? '+1' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
