import React, { useEffect, useState } from "react";
import {
  BeansGet200ResponseBeansInner,
  CoffeeBeansApi,
  Configuration,
} from "../generated-client";
import { ProfileCard } from "../components/profileCard";
// Define the type for coffee profiles
type CoffeeProfile = {
  id: number;
  name: string;
  location: string;
  description: string;
  image: string;
};

const coffeeProfiles: CoffeeProfile[] = [
  {
    id: 1,
    name: "Sunrise Valley",
    location: "Brazil",
    description: "A rich blend with hints of caramel and chocolate.",
    image: "coffee_pouch1.png",
  },
  {
    id: 2,
    name: "Mountain Peaks",
    location: "Colombia",
    description: "Smooth, fruity notes of Colombia’s finest coffee.",
    image: "coffee_pouch2.png",
  },
  {
    id: 3,
    name: "Sunset Roast",
    location: "Ethiopia",
    description: "A bold, dark roast with smoky undertones.",
    image: "coffee_pouch3.png",
  },
];

const tags = ["All", "Brazil", "Colombia", "Ethiopia"];

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [selectedProfile, setSelectedProfile] = useState<CoffeeProfile | null>(
    null
  );

  const [beans, setBeans] = useState<
    BeansGet200ResponseBeansInner[] | null | undefined
  >(null);

  useEffect(() => {
    const config = new Configuration({
      basePath: "http://localhost:3000",
    });
    const api = new CoffeeBeansApi(config);
    api.beansGet().then((response) => {
      setBeans(response.beans);
    });
  }, []);

  // Filter profiles based on search query and active tag
  const filteredProfiles = coffeeProfiles.filter((profile) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      profile.name.toLowerCase().includes(query) ||
      profile.location.toLowerCase().includes(query) ||
      profile.description.toLowerCase().includes(query);
    const matchesTag = activeTag === "All" || profile.location === activeTag;
    return matchesSearch && matchesTag;
  });

  const handleCardClick = (profile: CoffeeProfile) => {
    setSelectedProfile(profile);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setActiveTag("All");
  };

  const closeModal = () => {
    setSelectedProfile(null);
  };

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Ensure the click is on the background and not on the modal itself
    if ((e.target as HTMLElement).id === "modal-background") {
      closeModal();
    }
  };

  return (
    <div className="bg-[#e9ecef] text-[#333] min-h-screen p-4">
      <div className="container mx-auto flex space-x-6">
        {/* Sidebar: Search and Tags */}
        <aside className="w-1/4">
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search coffee..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 border rounded-lg bg-white border-gray-400"
            />
          </div>

          {/* Clear Button */}
          <button
            onClick={clearFilters}
            className="w-full px-4 py-2 mb-6 rounded-lg bg-[#343a40] text-white"
          >
            Clear
          </button>

          {/* Tags */}
          <div className="mb-6 space-y-4">
          <h2 className="text-lg font-semibold mb-2">Category</h2>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`w-full px-4 py-2 rounded-lg ${
                  activeTag === tag
                    ? "bg-[#333] text-white"
                    : "bg-[#e0e0e0] text-[#333]"
                } border border-gray-400`}
              >
                {tag}
              </button>
            ))}
          </div>
        </aside>

        {/* Profile Cards */}
        <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {beans && (
            <>
              {beans.map((bean, index) => (
                <ProfileCard bean={bean} key={index} />
              ))}
            </>
          )}
          {filteredProfiles.map((profile) => (
            <div
              key={profile.id}
              onClick={() => handleCardClick(profile)}
              className="bg-[#c8c8c8] text-[#333] shadow-md rounded-lg overflow-hidden cursor-pointer transition transform hover:scale-105"
            >
              <img
                src={profile.image}
                alt={profile.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{profile.name}</h2>
                <p className="text-sm">{profile.description}</p>
                <p className="text-sm text-gray-600">{profile.location}</p>
              </div>
            </div>
          ))}

          {filteredProfiles.length === 0 && (
            <p className="col-span-full text-center text-gray-600">
              No profiles match your search or filter.
            </p>
          )}
        </main>
      </div>

      {/* Modal Popup */}
      {selectedProfile && (
        <div
          id="modal-background"
          onClick={handleBackgroundClick}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              &times;
            </button>
            <img
              src={selectedProfile.image}
              alt={selectedProfile.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-2xl font-bold mt-4">{selectedProfile.name}</h2>
            <p className="mt-2">{selectedProfile.description}</p>
            <p className="text-sm text-gray-600 mt-2">
              {selectedProfile.location}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
