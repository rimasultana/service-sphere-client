import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useTitle from "../hooks/useTitle";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [error, setError] = useState("");
  const { createUser, updateUserProfile, isDarkMode } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  useTitle("Register");

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("All fields are required");
      toast.error("All fields are required");
      return;
    }
    setError("");
    createUser(email, password)
      .then(() => {
        updateUserProfile(name, photoURL)
          .then(() => {
            navigate(from);
            toast.success("Registration successful!");
          })
          .catch((error) => {
            console.error("Profile update failed:", error);
            toast.error(error.message || "Profile update failed");
          });
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        toast.error(error.message || "Registration failed");
      });
  };

  const containerClass = isDarkMode
    ? "bg-gray-900 text-gray-200"
    : "bg-gray-100 text-gray-700";
  const cardClass = isDarkMode
    ? "bg-gray-800 text-gray-200"
    : "bg-white text-gray-700";
  const inputClass = isDarkMode
    ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400 focus:ring focus:ring-blue-500"
    : "bg-white border-gray-300 text-gray-700 placeholder-gray-500 focus:ring focus:ring-blue-300";

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${containerClass}`}
    >
      <div className={`shadow-lg rounded-lg p-6 w-full max-w-md ${cardClass}`}>
        <h1 className="text-2xl font-bold text-center mb-4">Register</h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`mt-1 w-full border rounded-lg p-2 ${inputClass}`}
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 w-full border rounded-lg p-2 ${inputClass}`}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 w-full border rounded-lg p-2 ${inputClass}`}
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Photo URL</label>
            <input
              type="url"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className={`mt-1 w-full border rounded-lg p-2 ${inputClass}`}
              placeholder="Enter your photo URL (optional)"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:ring focus:ring-blue-300"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
