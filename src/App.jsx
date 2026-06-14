import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';

export default function App() {
  const [cart, setCart] = useState([]);
  const [items, setItems] = useState([]);
  const [counter, setCounter] = useState(0);

  const handleAddToCart = (index) => {
    setCart({
      ...cart,
      [index]: (cart[index] ?? 0) + 1,
    });
    setCounter((prevCounter) => prevCounter + 1);
    console.log(cart);
  };

  const handleRemoveCart = (index) => {
    setCart((prevCart) => {
      if (prevCart[index] > 1) {
        return { ...prevCart, [index]: prevCart[index] - 1 };
      } else {
        const updatedCart = { ...prevCart };
        delete updatedCart[index]; // Completely removes the key from the object
        return updatedCart;
      }
    });
    // setCart({
    //   ...cart,
    //   [index]: cart[index] > 1 ? cart[index] - 1 : undefined,
    // });
    setCounter((prevCounter) => prevCounter - 1);
  };

  const handleRemoveItemCart = (index) => {
    setCounter((prevCounter) => prevCounter - cart[index]);
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      delete updatedCart[index];
      return updatedCart;
    });
  };

  return (
    <div>
      <Navbar counter={counter} />

      <main>
        <Outlet context={{ items, cart, counter, setItems, setCart, setCounter, handleAddToCart, handleRemoveCart, handleRemoveItemCart }} />
      </main>
    </div>
  );
}
