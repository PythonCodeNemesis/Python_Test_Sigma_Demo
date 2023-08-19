import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [cartContents, setCartContents] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemToAdd, setItemToAdd] = useState("");
  const [quantityToAdd, setQuantityToAdd] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://pythoncodenemesis.pythonanywhere.com/view_cart"
      );
      setCartContents(response.data.cart_contents);
      setTotalPrice(response.data.total_price);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddToCart = async () => {
    try {
      await axios.post(
        "https://pythoncodenemesis.pythonanywhere.com/add_to_cart",
        {
          item: itemToAdd,
          quantity: quantityToAdd,
        }
      );
      fetchData();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="app">
      <h1>Shopping Cart</h1>
      <div className="cart">
        <h2>Cart Contents:</h2>
        <ul>
          {Object.entries(cartContents).map(([item, quantity]) => (
            <li key={item}>{`${quantity} ${item}(s)`}</li>
          ))}
        </ul>
        <h2>Total Price: ${totalPrice}</h2>
      </div>
      <div className="add-to-cart">
        <h2>Add to Cart:</h2>
        <input
          type="text"
          placeholder="Item"
          value={itemToAdd}
          onChange={(e) => setItemToAdd(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantityToAdd}
          onChange={(e) => setQuantityToAdd(parseInt(e.target.value))}
        />
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
}

export default App;
