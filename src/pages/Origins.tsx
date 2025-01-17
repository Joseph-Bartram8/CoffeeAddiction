import React from "react";

// Define the type for origin profiles
type OriginProfile = {
  id: number;
  farmerName: string;
  farmName: string;
  location: string;
  description: string;
  image: string;
};

const origins: OriginProfile[] = [
  {
    id: 1,
    farmerName: "John Doe",
    farmName: "Sunrise Valley Farm",
    location: "Brazil",
    description: "A picturesque farm known for its rich, chocolatey beans.",
    image: "/profile2.png",
  },
  {
    id: 2,
    farmerName: "Maria Gonzalez",
    farmName: "Mountain Peaks Estate",
    location: "Colombia",
    description: "High-altitude coffee farm with smooth, fruity notes.",
    image: "/profile1.png",
  },
  {
    id: 3,
    farmerName: "Ahmed Hassan",
    farmName: "Sunset Plantation",
    location: "Ethiopia",
    description: "Home to bold, smoky roasts with deep heritage.",
    image: "/profile3.png",
  },
];

const Origins: React.FC = () => {
  return (
    <div className="bg-[#e9ecef] text-[#333] min-h-screen p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Our Origins</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {origins.map((origin) => (
            <div
              key={origin.id}
              className="bg-[#c8c8c8] shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={origin.image}
                alt={origin.farmerName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{origin.farmName}</h2>
                <p className="text-sm font-medium text-gray-600">
                  Farmer: {origin.farmerName}
                </p>
                <p className="text-sm font-medium text-gray-600">
                  Location: {origin.location}
                </p>
                <p className="text-sm mt-2">{origin.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Origins;
