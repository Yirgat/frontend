import React from "react";

const Cart = ({ cart, setCart, handleCheckout }) => {
  const increaseQty = (productId) => {
    setCart(
      cart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (productId) => {
    setCart(
      cart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0) 
    );
  };

  const removeItem = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container">
      <h2 className="mb-4 text-center">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered text-center">
            <thead className="table-light">
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                {/* <th>Actions</th> */}
              </tr>
            </thead>

            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price}</td>

                  <td>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => decreaseQty(item.id)}
                    >
                      -
                    </button>

                    <span className="mx-2">{item.quantity}</span>

                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => increaseQty(item.id)}
                    >
                      +
                    </button>
                  </td>

                  <td>${item.price * item.quantity}</td>

                  {/* <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-end mt-3">
            <h4>Total: ${total}</h4>
            <button className="btn btn-success mt-2" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
