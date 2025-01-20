import {
  BeansGet200ResponseBeansInner,
  CoffeeBeansApi,
  Configuration,
} from "../generated-client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const navigate = useNavigate();
  const [beans, setBeans] = useState<BeansGet200ResponseBeansInner[]>();

  useEffect(() => {
    const api = new CoffeeBeansApi(
      new Configuration({ basePath: "http://localhost:3000" })
    );
    api.beansGet().then((response) => {
      setBeans(response.beans as BeansGet200ResponseBeansInner[]);
    });
  }, []);

  if (!localStorage.getItem("jwt")) {
    navigate("/login");
  }

  if (!beans) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Coffee Beans</h2>
      <CoffeeBeansDisplay beans={beans} />
    </div>
  );
}

function CoffeeBeansDisplay({
  beans,
}: {
  beans: BeansGet200ResponseBeansInner[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {beans &&
        beans.map((bean, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <img
              src={bean.imageUrl}
              alt={bean.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-lg font-semibold">{bean.name}</h3>
            <p className="text-gray-600">Origin: {bean.origin}</p>
            <p className="text-gray-600">Description: {bean.description}</p>
            <p className="text-gray-600">Price per KG: {bean.pricePerKg}</p>
          </div>
        ))}
    </div>
  );
}
