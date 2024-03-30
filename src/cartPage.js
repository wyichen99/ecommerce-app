import React from 'react';
import { useCart } from './cartContext';

const CartPage = () => {
    const { cartItems, removeFromCart, updateQuantity } = useCart();

    return (
        <div>
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 && <div>The cart is empty</div>}
            {cartItems.map((item) => (
                <div key={item.id}>
                    <h5>{item.title}</h5>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: 
                        <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                            min="1"
                        />
                    </p>
                    <button onClick={() => removeFromCart(item.id)}>Remove from cart</button>
                </div>
            ))}
        </div>
    );
};

export default CartPage;