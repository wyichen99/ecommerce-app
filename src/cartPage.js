import React from 'react';
import { useCart } from './cartContext';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdb-react-ui-kit';

const CartPage = () => {
    // Access cartItems, removeFromCart, and updateQuantity from the cart context
    const { cartItems, removeFromCart, updateQuantity } = useCart();

    return (
        <MDBContainer>
            {/* Heading for the Shopping Cart page */}
            <h2 className="my-5 text-center">Shopping Cart</h2>
            {/* Display a message if the cart is empty */}
            {cartItems.length === 0 ? (
                <div className="text-center"><p>The cart is empty</p></div>
            ) : (
                // Map over cartItems to display each item in the cart
                cartItems.map((item) => (
                    <MDBRow key={item.id} className="mb-4 d-flex align-items-center">
                        {/* Column for the item image */}
                        <MDBCol md="5" lg="3" xl="3">
                            <div className="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                                <img className="img-fluid w-100"
                                    src={item.thumbnail} alt={item.title} />
                            </div>
                        </MDBCol>
                        {/* Column for the item details */}
                        <MDBCol md="7" lg="9" xl="9">
                            <div>
                                {/* Flex container for the title, price, quantity input, and remove button */}
                                <div className="d-flex justify-content-between">
                                    <div>
                                        {/* Item title */}
                                        <h5>{item.title}</h5>
                                        {/* Item price */}
                                        <p className="mb-3 text-muted text-uppercase small">Price: ${item.price}</p>
                                        {/* Quantity input */}
                                        <p className="mb-2 text-muted text-uppercase small">Quantity:</p>
                                        <MDBInput type="number" value={item.quantity} 
                                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                            min="1" size="sm"/>
                                    </div>
                                    {/* Remove button */}
                                    <div>
                                        <MDBBtn color="danger" size="sm" onClick={() => removeFromCart(item.id)}>
                                            Remove
                                        </MDBBtn>
                                    </div>
                                </div>
                            </div>
                        </MDBCol>
                    </MDBRow>
                ))
            )}
        </MDBContainer>
    );
};

export default CartPage;