import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  BeansGet200ResponseBeansInner,
  Configuration,
  UsersApi,
} from "../generated-client";

export function Dashboard() {
  const navigate = useNavigate();
  const [beans, setBeans] = useState<BeansGet200ResponseBeansInner[]>();

  useEffect(() => {
    if (localStorage.getItem("jwt") === null) {
      navigate("/login");
    }
    const api = new UsersApi(
      new Configuration({
        basePath: "http://localhost:3000",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt")!,
        },
      })
    );
    api.userBeansGet().then((response) => {
      setBeans(response.beans as BeansGet200ResponseBeansInner[]);
    });
  }, []);

  if (!beans) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-3">
      <h2 className="text-2xl font-bold mb-6">My Coffee Beans</h2>
      <a
        href="/dashboard/create"
        className="text-white p-2 bg-slate-500 rounded-md"
      >
        Create bean
      </a>
      <CoffeeBeansDisplay beans={beans} />
    </div>
  );
}

function CoffeeBeansDisplay({
  beans,
}: {
  beans: BeansGet200ResponseBeansInner[];
}) {
  const navigate = useNavigate();
  function DeleteBean(beanID: number | undefined) {
    if (!beanID) {
      return;
    }

    const api = new UsersApi(
      new Configuration({
        basePath: "http://localhost:3000",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt")!,
        },
      })
    );

    api
      .beanIdDelete({
        id: beanID,
      })
      .then(() => {
        navigate(0);
      });
  }
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
            <div className="flex flex-row gap-1">
              <a
                onClick={() => DeleteBean(bean.beanId)}
                className="text-white p-2 bg-slate-500 rounded-md cursor-pointer"
              >
                Delete
              </a>
            </div>
          </div>
        ))}
      {!beans ||
        (beans.length == 0 && (
          <div className="text-center">
            <h3 className="text-lg font-semibold">No beans found</h3>
          </div>
        ))}
    </div>
  );
}
