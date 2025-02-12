import { useState } from "react";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import useTitle from "../hooks/useTitle";

const AddService = () => {
  const { user, isDarkMode } = useAuth();
  const [serviceName, setServiceName] = useState("");
  const [price, setPrice] = useState("");
  const [serviceArea, setServiceArea] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  useTitle("Add-Service");

  const handleAddService = (e) => {
    e.preventDefault();

    if (!serviceName || !price || !serviceArea || !description || !imageUrl) {
      toast.error("All fields are required!");
      return;
    }

    const serviceData = {
      serviceName,
      price,
      serviceArea,
      description,
      imageUrl,
      serviceProvider: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
    };

    fetch("https://a11-b10-server-side.vercel.app/service", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(serviceData),
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.insertedId) {
          toast.success("Service added successfully!");
          setServiceName("");
          setPrice("");
          setServiceArea("");
          setDescription("");
          setImageUrl("");
        }
      })
      .catch((error) => {
        console.error("Error adding service:", error);
        toast.error("Failed to add service");
      });
  };

  // Dynamic theme classes
  const containerClass = isDarkMode
    ? "bg-gray-900 text-gray-200"
    : "bg-gray-200 text-gray-700";
  const cardClass = isDarkMode ? "bg-gray-800 shadow-md" : "bg-white shadow-lg";
  const inputClass = isDarkMode
    ? "bg-gray-700 border-gray-600 text-gray-200 focus:ring-indigo-500"
    : "border-gray-300 focus:ring-indigo-300";

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${containerClass}`}
    >
      <div className={`${cardClass} rounded-lg p-6 w-full max-w-lg`}>
        <h1 className="text-2xl font-bold text-center mb-4">Add New Service</h1>
        <form onSubmit={handleAddService} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Image URL</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className={`mt-1 w-full border rounded-lg p-2 ${inputClass}`}
              placeholder="Enter image URL"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Service Name</label>
            <input
              type="text"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className={`mt-1 w-full border rounded-lg p-2 ${inputClass}`}
              placeholder="service name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={`mt-1 w-full border rounded-lg p-2 ${inputClass}`}
              placeholder="Enter service price"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Service Area</label>
            <input
              type="text"
              value={serviceArea}
              onChange={(e) => setServiceArea(e.target.value)}
              className={`mt-1 w-full border rounded-lg p-2 ${inputClass}`}
              placeholder="Enter service area"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`mt-1 w-full border rounded-lg p-2 ${inputClass}`}
              placeholder="Enter service description"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 focus:ring focus:ring-indigo-300"
          >
            Add Service
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddService;
