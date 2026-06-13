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
          <div key={i} className={styles.itemContainer}>
            <div className={styles.itemImg}>
              <img src={item.image} alt={item.title} />
            </div>
            <div className={styles.itemTitle}>{item.title.split(' ').slice(0, 5).join(' ')}</div>
            <div className={styles.itemFooter}>
              <div className={styles.itemPrice}>{item.price} $</div>

              <div className={styles.itemBtnsWrapper}>
                {cart[item.id] && (
                  <button onClick={() => handleRemoveCart(item)} className={styles.itemBtnPlus}>
                    -1
                  </button>
                )}
                <div className={styles.itemCounter}>{cart[item.id]}</div>

                <button onClick={() => handleAddToCart(item)} className={cart[item.id] && styles.itemBtnPlus}>
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
