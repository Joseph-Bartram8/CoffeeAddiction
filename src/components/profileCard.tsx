import { BeansGet200ResponseBeansInner } from "@/generated-client";

export function ProfileCard({bean} : {bean: BeansGet200ResponseBeansInner}) {
  return (
    <div
      key={bean.beanId}
      // onClick={() => handleCardClick(profile)}
      className="bg-[#c8c8c8] text-[#333] shadow-md rounded-lg overflow-hidden cursor-pointer transition transform hover:scale-105 motion-preset-fade"
    >
      <img
        src={bean.imageUrl}
        alt={bean.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{bean.name}</h2>
        <p className="text-sm">{bean.description}</p>
        <p className="text-sm text-gray-600">{bean.origin}</p>
      </div>
    </div>
  );
}
