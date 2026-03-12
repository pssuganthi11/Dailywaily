import React, { useState } from "react";
import toast from "react-hot-toast";
import mockData from "../../mockdata/cart";

function Home() {

  const [product,setProduct] = useState(mockData);


  // useEffect(() => { 
  //   const fetchdata = async () =>{
  //      try { const response = await fetch("https://fakestoreapi.com/products");
  //      const result = await response.json(); setProduct(result); console.log(result); } 
  //      catch (error) { console.log("error while fetch", error); } }; 
  //      fetchdata();
  //      }, []);

  const addToCart = (clickedProduct) => {
    const existingData = JSON.parse(localStorage.getItem("cart")) || [];

    const itemIndex = existingData.findIndex(
      (item) => item.id === clickedProduct.id
    );

    if (itemIndex > -1) {
      existingData[itemIndex].quantity += 1;
    } else {
      existingData.push({ ...clickedProduct, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(existingData));

    window.dispatchEvent(new Event("cartUpdated"));

    toast.success(`${clickedProduct.title} added to cart!`);
  };

  return (
    <div>
      <div className="container mx-auto px-3 2xl:px-30 py-8">
        <h2 className="text-3xl font-semibold mb-8">All Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {product.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 flex flex-col h-full"
            >
              <div className="relative h-64 w-full bg-gray-50">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />

                <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-2 py-1 rounded-full font-bold">
                  stock: {item?.rating.count}
                </span>
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-bold text-gray-900 text-lg mb-1">
                  {item.title}
                </h3>

                <div className="flex justify-between text-gray-400 text-sm mb-2">
                  <span>{item.category}</span>

                  <div className="flex gap-1 text-yellow-400 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 32 32"
                    >
                      <path
                        fill="currentColor"
                        d="M14.655 3.84c.549-1.12 2.144-1.12 2.693 0l3.199 6.52l7.17 1.05c1.228.179 1.72 1.686.834 2.555l-5.195 5.096l1.224 7.183c.21 1.227-1.08 2.16-2.18 1.578l-6.399-3.385l-6.399 3.385c-1.1.582-2.389-.351-2.18-1.578l1.225-7.183l-5.196-5.096c-.885-.87-.394-2.376.834-2.556l7.17-1.048z"
                      />
                    </svg>
                    <span>{item?.rating.rate}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-auto pt-4">
                  <span className="font-bold text-xl text-gray-900">
                    ₹{item.price}
                  </span>
                </div>

                <button
                  className="w-full mt-4 bg-[#1a1f2c] text-white py-3 rounded-md font-semibold hover:bg-black transition-all active:scale-95"
                  onClick={() => addToCart(item)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Home;