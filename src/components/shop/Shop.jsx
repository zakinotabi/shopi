import { useEffect, useState } from 'react';
import styles from './Shop.module.css';

export default function Shop() {
  const [items, setItems] = useState([]);

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
              <button className={styles['item-btn']}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
