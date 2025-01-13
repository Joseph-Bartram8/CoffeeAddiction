import React from 'react';

const Home: React.FC = () => {
  return (
    <div>
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center my-6">
        Welcome to Coffee Addiction
      </h1>

      {/* Introduction */}
      <p className="text-lg text-center mb-6">
        Explore our curated collection of premium coffee beans from around the globe.
      </p>

      {/* Main Content - Example Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Example Card 1 */}
        <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg overflow-hidden">
          <img
            src="/images/coffee1.png"
            alt="Sunrise Valley Coffee"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Sunrise Valley
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              A rich blend with hints of caramel and chocolate, sourced from Brazil.
            </p>
          </div>
        </div>

        {/* Example Card 2 */}
        <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg overflow-hidden">
          <img
            src="/images/coffee2.png"
            alt="Mountain Peaks Coffee"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Mountain Peaks
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Experience the smooth, fruity notes of Colombia's finest coffee.
            </p>
          </div>
        </div>

        {/* Example Card 3 */}
        <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg overflow-hidden">
          <img
            src="/images/coffee3.png"
            alt="Sunset Roast Coffee"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Sunset Roast
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              A bold, dark roast with smoky undertones, sourced from Ethiopia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
