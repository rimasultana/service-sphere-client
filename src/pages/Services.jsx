import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSort, FaSortUp, FaSortDown, FaSearch } from "react-icons/fa";
import ServiceCard from "../components/ServiceCard";
import LoadingSpinner from "../components/Loading";
import useAuth from "../hooks/useAuth";

const Services = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("none");
  const [searchQuery, setSearchQuery] = useState("");
  const { isDarkMode } = useAuth();

  // Theme-based styling
  const containerClass = isDarkMode
    ? "bg-gray-900 text-gray-200"
    : "bg-gradient-to-b from-blue-50 via-white to-blue-50";
  const buttonClass = isDarkMode
    ? "bg-gray-800 hover:bg-gray-700 text-gray-200"
    : "bg-white hover:bg-blue-50 text-gray-700";
  const inputClass = isDarkMode
    ? "bg-gray-800 text-gray-200 border-gray-700 focus:border-blue-500"
    : "bg-white text-gray-700 border-gray-300 focus:border-blue-500";
  const headerBgClass = isDarkMode
    ? "bg-gradient-to-r from-gray-900 to-gray-800"
    : "bg-gradient-to-r from-blue-600 to-blue-500";

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [services, searchQuery]);

  const fetchServices = async () => {
    try {
      const response = await fetch(
        "https://a11-b10-server-side.vercel.app/service"
      );
      const data = await response.json();
      setServices(data);
      setFilteredServices(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch services:", error);
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredServices(services);
      return;
    }

    const filtered = services.filter(
      (service) =>
        service.serviceName.toLowerCase().includes(query.toLowerCase()) ||
        service.description.toLowerCase().includes(query.toLowerCase()) ||
        service.serviceArea.toLowerCase().includes(query.toLowerCase()) ||
        service.serviceProvider.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredServices(filtered);
  };

  const handleSort = () => {
    let newOrder;
    switch (sortOrder) {
      case "none":
        newOrder = "asc";
        break;
      case "asc":
        newOrder = "desc";
        break;
      default:
        newOrder = "none";
    }
    setSortOrder(newOrder);

    let sortedServices = [...filteredServices];
    if (newOrder === "asc") {
      sortedServices.sort((a, b) => a.price - b.price);
    } else if (newOrder === "desc") {
      sortedServices.sort((a, b) => b.price - a.price);
    } else {
      handleSearch(searchQuery);
      return;
    }
    setFilteredServices(sortedServices);
  };

  const getSortIcon = () => {
    switch (sortOrder) {
      case "asc":
        return <FaSortUp className="ml-2" />;
      case "desc":
        return <FaSortDown className="ml-2" />;
      default:
        return <FaSort className="ml-2" />;
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <section className={`min-h-screen ${containerClass}`}>
      {/* Hero Section */}
      <div className={`${headerBgClass} pt-24 pb-16`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Explore Our Services
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
              Discover our comprehensive range of professional services tailored
              to meet your needs
            </p>
          </motion.div>

          {/* Search and Sort Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="relative w-full md:w-2/3">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search services..."
                    className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 ${inputClass} transition-all duration-300 focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                  />
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                </div>
                <button
                  onClick={handleSort}
                  className={`${buttonClass} px-6 py-3 rounded-xl shadow-lg flex items-center justify-center transition-all duration-300 w-full md:w-auto hover:scale-105 active:scale-95 border-2 border-transparent hover:border-blue-300`}
                >
                  Sort by Price {getSortIcon()}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={sortOrder + searchQuery}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredServices.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="transform hover:scale-105 transition-all duration-300"
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredServices.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 max-w-2xl mx-auto shadow-xl">
              <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                No Services Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                We couldn&#39;t find any services matching your search criteria.
              </p>
              <p className="text-gray-500 dark:text-gray-500">
              Try adjusting  your search terms or browse all services.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Services;
