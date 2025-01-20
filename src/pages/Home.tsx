import React, { useEffect, useState } from "react";
import {
  BeansGet200ResponseBeansInner,
  CoffeeBeansApi,
  Configuration,
} from "../generated-client";
import { ProfileCard } from "../components/profileCard";

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<BeansGet200ResponseBeansInner | null>(null);
  const [beans, setBeans] = useState<BeansGet200ResponseBeansInner[] | null>(null);

  useEffect(() => {
    const config = new Configuration({
      basePath: "http://localhost:3000",
    });
    const api = new CoffeeBeansApi(config);
    api
      .beansGet()
      .then((response) => {
        if (response.beans) {
          setBeans(response.beans);
        } else {
          setBeans([]);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch beans:", error);
        setBeans([]);
      });
  }, []);

  const originTags = Array.from(new Set(beans?.map((bean) => bean.origin) || []));
  const roastLevelTags = Array.from(new Set(beans?.map((bean) => bean.roastLevel) || []));
  const dynamicTags = [...originTags, ...roastLevelTags];

  const filteredBeans = beans?.filter((bean) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      bean.name?.toLowerCase().includes(query) ||
      bean.origin?.toLowerCase().includes(query) ||
      bean.description?.toLowerCase().includes(query);

    const matchesTags =
      activeTags.length === 0 ||
      activeTags.includes(bean.origin || "") ||
      activeTags.includes(bean.roastLevel || "");

    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setActiveTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setActiveTags([]);
  };

  const closeModal = () => {
    setSelectedProfile(null);
  };

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "modal-background") {
      closeModal();
    }
  };

  return (
    <div className="bg-[#e9ecef] text-[#333] min-h-screen p-4">
      <div className="container mx-auto flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
        {/* Search and Filters Section */}
        <aside className="w-full lg:w-1/4 flex flex-col space-y-6">
          {/* Search Bar */}
          <div>
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
            className="w-full px-4 py-2 rounded-lg bg-[#343a40] text-white"
          >
            Clear
          </button>

          {/* Dynamic Tags */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {dynamicTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag || "")}
                  className={`px-4 py-2 rounded-lg ${
                    activeTags.includes(tag || "")
                      ? "bg-[#333] text-white"
                      : "bg-[#e0e0e0] text-[#333]"
                  } border border-gray-400`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Profile Cards Section */}
        <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBeans?.map((bean) => (
            <ProfileCard
              key={bean.beanId}
              bean={bean}
              onClick={() => setSelectedProfile(bean)}
            />
          ))}
          {filteredBeans && filteredBeans.length === 0 && (
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
              src={selectedProfile.imageUrl || ""}
              alt={selectedProfile.name || ""}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-2xl font-bold mt-4">{selectedProfile.name}</h2>
            <p className="mt-2">{selectedProfile.description}</p>
            <p className="text-sm text-gray-600 mt-2">
              {selectedProfile.origin}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
