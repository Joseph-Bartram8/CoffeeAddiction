import React, { useState, useEffect } from 'react';

const coffeeProfiles = [
  { id: 1, name: 'Sunrise Valley', location: 'Brazil', description: 'A rich blend with hints of caramel and chocolate.', image: '/images/coffee1.png', tag: 'Brazil' },
  { id: 2, name: 'Mountain Peaks', location: 'Colombia', description: 'Smooth, fruity notes of Colombia’s finest coffee.', image: '/images/coffee2.png', tag: 'Colombia' },
  { id: 3, name: 'Sunset Roast', location: 'Ethiopia', description: 'A bold, dark roast with smoky undertones.', image: '/images/coffee3.png', tag: 'Ethiopia' },
];

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [filteredProfiles, setFilteredProfiles] = useState(coffeeProfiles);

  useEffect(() => {
    let filtered = coffeeProfiles;

    if (searchQuery) {
      filtered = filtered.filter((profile) =>
        profile.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (activeTag) {
      filtered = filtered.filter((profile) => profile.tag === activeTag);
    }

    setFilteredProfiles(filtered);
  }, [searchQuery, activeTag]);

  return (
    <div className="container mx-auto flex space-x-6 mt-6">
      {/* Sidebar */}
      <aside className="w-1/4">
        <input
          type="text"
          placeholder="Search Coffee..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />
        <div className="mt-4 space-y-4">
          <button
            className={`px-4 py-2 rounded-lg ${
              !activeTag
                ? 'bg-gray-800 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}
            onClick={() => setActiveTag(null)}
          >
            All
          </button>
          {['Brazil', 'Colombia', 'Ethiopia'].map((tag) => (
            <button
              key={tag}
              className={`px-4 py-2 rounded-lg ${
                activeTag === tag
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </aside>

      {/* Coffee Profiles */}
      <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile) => (
            <div
              key={profile.id}
              className="bg-white dark:bg-gray-700 shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={profile.image}
                alt={profile.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {profile.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {profile.description}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 dark:text-gray-300">
            No profiles found.
          </p>
        )}
      </main>
    </div>
  );
};

export default Home;
