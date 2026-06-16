import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';

export default function App() {
  const [cart, setCart] = useState({});
  const [items, setItems] = useState([]);
  const [counter, setCounter] = useState(0);
  // we need these variables to be in app (the parent)
  // to be able to pass them between the modules navbar included

  const handleAddToCart = (index) => {
    setCart({
      ...cart,
      [index]: (cart[index] ?? 0) + 1,
      // cart gonna look like {0:0+1}/{id of product : how many of it}
      // so each time we keep prevCart and add new prod [index] <= Computed Property Name
      // and if cart{[index]} exist it has to be {0:0} so later we can do {0:0+1} (making it a number 0 to do the math)
      // Right side → evaluates (cart[index] ?? 0) + 1 → gets a value
      // Left side → just slaps a name on it using index
    });
    setCounter((prevCounter) => prevCounter + 1);
    // prevCounter is safer
  };
  console.log(cart);

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
