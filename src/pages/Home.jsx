import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    console.log("HOME PAGE MOUNTED");
}, []);
useEffect(() => {
    console.trace("HOME MOUNTED");
}, []);
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: "$99",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: "$149",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    },
    {
      id: 3,
      name: "Gaming Mouse",
      price: "$49",
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db",
    },
    {
      id: 4,
      name: "Laptop Backpack",
      price: "$79",
      image: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
        
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold mb-4">
              Shop the Latest Trends
            </h1>
            <p className="text-lg mb-6">
              Discover amazing products at unbeatable prices.
            </p>
            <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Shop Now
            </button>
          </div>

          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
            alt="Hero"
            className="w-96 rounded-xl shadow-lg mt-10 md:mt-0"
          />
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Shop by Category
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {["Electronics", "Fashion", "Accessories", "Home"].map(
            (category, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition cursor-pointer text-center"
              >
                <h3 className="text-xl font-semibold">{category}</h3>
              </div>
            )
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-56 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-indigo-600 font-bold mt-2">
                  {product.price}
                </p>

                <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Offer Banner */}
      <section className="bg-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-4">
            Summer Sale Up To 50% Off
          </h2>
          <p className="mb-6">
            Grab your favorite products before the offer ends.
          </p>
          <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Explore Deals
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-xl font-bold">ShopEase</h3>
          <p className="text-gray-400 mt-2">
            © 2026 ShopEase. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;