import React from 'react';
import { useCart } from './cartContext';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdb-react-ui-kit';

const CartPage = () => {
    const { cartItems, removeFromCart, updateQuantity } = useCart();

    return (
        
        <MDBContainer>
            <h2 className="my-5 text-center">Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <div className="text-center"><p>The cart is empty</p></div>
            ) : (
                cartItems.map((item) => (
                    <MDBRow key={item.id} className="mb-4 d-flex align-items-center">
                        <MDBCol md="5" lg="3" xl="3">
                            <div className="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                                <img className="img-fluid w-100"
                                    src={item.thumbnail} alt={item.title} />
                            </div>
                        </MDBCol>
                        <MDBCol md="7" lg="9" xl="9">
                            <div>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <h5>{item.title}</h5>
                                        <p className="mb-3 text-muted text-uppercase small">Price: ${item.price}</p>
                                        <p className="mb-2 text-muted text-uppercase small">Quantity:</p>
                                        <MDBInput type="number" value={item.quantity} onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))} min="1" size="sm"/>
                                    </div>
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