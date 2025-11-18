import React, { useEffect, useState } from "react";

const Products = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);

  // Hard-coded fallback products
  const fallbackProducts = [
    { id: 1, name: "Lipstick", price: 15, image: "https://images.unsplash.com/photo-1626895872564-b691b6877b83?q=80&w=400&auto=format" },
    { id: 2, name: "Foundation", price: 25, image: "https://images.unsplash.com/photo-1557205465-f3762edea6d3?w=400&auto=format" },
    { id: 3, name: "Eyeliner", price: 12, image: "https://images.unsplash.com/photo-1668255446079-b15fd061735d?q=80&w=400&auto=format" },
    { id: 4, name: "Mascara", price: 20, image: "https://images.unsplash.com/photo-1650664370914-f026578ec2a4?w=400&auto=format" },
    { id: 5, name: "Blush", price: 18, image: "https://images.unsplash.com/photo-1625093525885-282384697917?w=400&auto=format" },
    { id: 6, name: "Highlighter", price: 22, image: "https://images.unsplash.com/photo-1501728636520-11c972bd5e2e?w=400&auto=format" },
    { id: 7, name: "Eyeshadow Palette", price: 30, image: "https://images.unsplash.com/photo-1547934659-7fa699ef3ce0?w=400&auto=format" },
    { id: 8, name: "Makeup Brushes Set", price: 35, image: "https://images.unsplash.com/photo-1712637008759-0ccb48880a38?w=400&auto=format" },
    { id: 9, name: "Concealer", price: 14, image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=400&auto=format" },
    { id: 10, name: "Setting Spray", price: 18, image: "https://images.unsplash.com/photo-1636708112636-546f80cf7094?w=400&auto=format" }
  ];

  useEffect(() => {
    // Try to fetch products from backend
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Fetch failed, using fallback products:", error);
        setProducts(fallbackProducts); 
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div>
      <h2 className="text-center mb-4">Our Products</h2>

      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-3 mb-4">
            <div className="card h-25-2 text-center">
              <img
                src={product.image}
                alt={product.name}
                className="card-img-top"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  margin: "auto",
                  paddingTop: "10px",
                }}
              />

              <div className="card-body">
                <h5 style={{ fontSize: "16px", fontWeight: "bold" }}>{product.name}</h5>
                <p style={{ fontSize: "14px", fontWeight: "500" }}>${product.price}</p>

                <button className="btn btn-primary btn-sm" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
