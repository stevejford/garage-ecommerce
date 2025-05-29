import Image from "next/image";
import Link from "next/link";

export default function Home() {
  // Featured brands for the homepage
  const featuredBrands = [
    { name: "B&D", logo: "/placeholder-brand.svg" },
    { name: "Steel-Line", logo: "/placeholder-brand.svg" },
    { name: "Centurion", logo: "/placeholder-brand.svg" },
    { name: "Taurean", logo: "/placeholder-brand.svg" },
    { name: "Eco Garage Doors", logo: "/placeholder-brand.svg" },
  ];

  // Featured categories for the homepage
  const featuredCategories = [
    { name: "Remote Controls", image: "/placeholder-category.svg", slug: "remote-controls" },
    { name: "Mechanical Parts", image: "/placeholder-category.svg", slug: "mechanical-parts" },
    { name: "Safety Devices", image: "/placeholder-category.svg", slug: "safety-devices" },
    { name: "Tracks & Rollers", image: "/placeholder-category.svg", slug: "tracks-rollers" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                Quality Garage Door Parts for Every Need
              </h1>
              <p className="text-lg md:text-xl text-gray-600">
                Specialized supplier of garage door components in Australia. Find genuine and compatible parts for all major brands.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/shop"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Shop Now
                </Link>
                <Link
                  href="/shop/brands"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  Browse Brands
                </Link>
              </div>
            </div>
            <div className="relative h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Garage Door Image</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Featured Brands</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-center">
            {featuredBrands.map((brand, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg flex items-center justify-center h-24">
                <span className="text-lg font-medium text-gray-800">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((category, index) => (
              <Link 
                href={`/shop/categories/${category.slug}`} 
                key={index}
                className="group"
              >
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center mb-4">
                    <span className="text-gray-500">{category.name}</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Why Choose Geelong Garage Doors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 text-2xl">✓</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Genuine Parts</h3>
              <p className="text-gray-600">Original manufacturer parts with full warranty and support.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 text-2xl">✓</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-600">Specialized knowledge to help you find the right parts for your door.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 text-2xl">✓</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
              <p className="text-gray-600">Quick delivery across Australia to minimize downtime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* End of content sections */}
    </div>
  );
}
