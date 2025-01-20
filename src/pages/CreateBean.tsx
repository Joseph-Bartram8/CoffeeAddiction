import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BeansPostRequest, Configuration, UsersApi } from "../generated-client";

export function CreateBean() {
  const navigate = useNavigate();
  const [req, setReq] = useState<BeansPostRequest>({});

  useEffect(() => {
    if (localStorage.getItem("jwt") === null) {
      navigate("/login");
      return;
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!req) {
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
      .userBeanCreatePost({
        beansPostRequest: req,
      })
      .then(() => {
        navigate("/dashboard");
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Create a new bean</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
            onChange={(e) => setReq({ ...req, name: e.target.value })}
            value={req.name}
          />
        </div>
        <div className="flex flex-col space-y-4">
          <label htmlFor="origin" className="text-sm font-medium text-gray-700">
            Origin
          </label>
          <input
            type="text"
            id="origin"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
            onChange={(e) => setReq({ ...req, origin: e.target.value })}
            value={req.origin}
          />
        </div>
        <div className="flex flex-col space-y-4">
          <label
            htmlFor="roast_level"
            className="text-sm font-medium text-gray-700"
          >
            Roast level
          </label>
          <input
            type="text"
            id="roast_level"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
            onChange={(e) => setReq({ ...req, roastLevel: e.target.value })}
            value={req.roastLevel}
          />
        </div>
        <div className="flex flex-col space-y-4">
          <label
            htmlFor="image_url"
            className="text-sm font-medium text-gray-700"
          >
            Image URL
          </label>
          <input
            type="text"
            id="image_url"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
            onChange={(e) => setReq({ ...req, imageUrl: e.target.value })}
            value={req.imageUrl}
          />
        </div>
        <div className="flex flex-col space-y-4">
          <label
            htmlFor="price_per_kg"
            className="text-sm font-medium text-gray-700"
          >
            Price per kg
          </label>
          <input
            type="number"
            id="price_per_kg"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
            onChange={(e) =>
              setReq({ ...req, pricePerKg: Number(e.target.value) })
            }
            value={req.pricePerKg}
          />
        </div>
        <div className="flex flex-col space-y-4">
          <label
            htmlFor="stock_quantity"
            className="text-sm font-medium text-gray-700"
          >
            Stock quantity
          </label>
          <input
            type="text"
            id="stock_quantity"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
            onChange={(e) =>
              setReq({ ...req, stockQuantity: Number(e.target.value) })
            }
            value={req.stockQuantity}
          />
        </div>
        <div className="flex flex-col space-y-4">
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
            onChange={(e) => setReq({ ...req, description: e.target.value })}
            value={req.description}
          ></textarea>
        </div>
        <button
          type="submit"
          className="mt-4 bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-xl"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
