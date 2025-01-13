interface ProfileCardProps {
    title: string;
    location: string;
    description: string;
    image: string;
  }
  
  const ProfileCard: React.FC<ProfileCardProps> = ({ title, location, description, image }) => {
    return (
      <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg overflow-hidden">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{title}</h2>
          <p className="text-gray-600 dark:text-gray-300">{location}</p>
          <p className="text-gray-600 dark:text-gray-300 mt-2">{description}</p>
        </div>
      </div>
    );
  };
  
  export default ProfileCard;
  