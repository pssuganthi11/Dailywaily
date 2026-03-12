import React, { useEffect, useMemo, useState } from "react";

function Cart() {
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState("");
  const [showQrCode, setShowQrCode] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setProducts(savedCart);
  }, []);

 const updateCart = (newCart) => {
  setProducts(newCart);
  localStorage.setItem("cart", JSON.stringify(newCart));

  // notify navbar to update badge
  window.dispatchEvent(new Event("cartUpdated"));
};
  const subtotal = useMemo(() => {
    return products.reduce((acc, item) => {
      return acc + (item.price || 0) * (item.quantity || 1);
    }, 0);
  }, [products]);

  const deliveryFee = 40;
  const total = Math.round(subtotal + deliveryFee);

  const handlePlaceOrder = () => {
    if (products.length === 0) return alert("Your cart is empty!");
    setShowQrCode(true);
  };

  const changeQuantity = (id, delta) => {
    const updated = products.map((p) =>
      p.id === id
        ? { ...p, quantity: Math.max(1, (p.quantity || 1) + delta) }
        : p,
    );
    updateCart(updated);
  };

  const removeItem = (id) => {
    const updated = products.filter((p) => p.id !== id);
    updateCart(updated);
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Total Amount: ₹${total}`;

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-black text-gray-900 mb-8">
          Your <span className="text-yellow-500">Cart</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {products.length === 0 ? (
              <div className="bg-white p-8 rounded-xl text-center shadow-sm">
                <p className="text-gray-500">
                  Your cart is empty. Start shopping!
                </p>
              </div>
            ) : (
              products.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 rounded-lg object-contain bg-gray-100"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      ₹{item.price} per unit
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => changeQuantity(item.id, -1)}
                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="font-medium">{item.quantity}</span>
                      <button
                        onClick={() => changeQuantity(item.id, 1)}
                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-gray-900">
                      ₹{Math.round(item.price * item.quantity)}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 text-sm hover:underline mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* address*/}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                📍 Delivery Address
              </h2>
              <textarea
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none text-sm"
                rows="3"
                placeholder="Enter address..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="font-bold text-lg mb-4">Order Summary</h2>
              <div className="space-y-3 border-b border-gray-100 pb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{Math.round(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 mb-6">
                <span className="font-bold text-gray-900">Total Amount</span>
                <span className="font-black text-2xl text-gray-900">
                  ₹{total}
                </span>
              </div>
              <div className="space-y-2">
                <button
                  disabled={products.length === 0}
                  className="w-full bg-gray-900 text-white py-4  rounded-xl font-bold hover:bg-black transition-all shadow-lg active:scale-95 disabled:bg-gray-300"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QR Genaration */}
      {showQrCode && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-3xl text-center max-w-xs w-full">
            <h2 className="text-xl font-black mb-2">Scan to Pay</h2>

            <img
              src={qrCodeUrl}
              alt="QR Code"
              className="mx-auto my-4 w-48 h-48"
            />
            <p className="mb-6">
              Total: <b>₹{total}</b>
            </p>
            <button
              onClick={() => setShowQrCode(false)}
              className="w-full bg-yellow-500 py-3 rounded-xl font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
