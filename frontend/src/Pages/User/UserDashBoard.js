import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function UserDashboard() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");
  const [weekday, setWeekday] = useState("");

  useEffect(() => {
    setToken(Cookies.get("token")); 
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date().getDay();
    setWeekday(days[today]);
  }, []);

  useEffect(() => {
    if (token) {
      fetchUserName(token); // Call fetchUserName when token changes
    }
  }, [token]); // Add token as a dependency to rerun the effect when token changes

  const fetchUserName = async (token) => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/getUserName",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setUserName(response.data.name);
      } else {
        console.error("Failed to fetch user name");
      }
    } catch (error) {
      console.error("Error fetching user name:", error);
    }
  };

  return (
    <>
      {token ? (
        <div className="flex h-full bg-gradient-to-r from-teal-50 to-teal-200 ">
          <div className="flex flex-col justify-center  items-center p-8 w-1/2 ">
            <h1 className="text-8xl font-bold text-left mb-8 ml-12 text-gray-500">
              Hello, <span className="text-9xl text-teal-500 ">{userName}</span>
            </h1>
            <h2 className="text-6xl text-left mb-8 ml-12 text-gray-500">
              Happy <span className="text-7xl text-indigo-400">{weekday}</span>
            </h2>
          </div>
          <div className="flex flex-col justify-center items-center space-y-8 p-8 w-1/2">
            <div className="w-96 h-56 bg-cover bg-center rounded-md shadow-md cursor-pointer transform transition duration-300 hover:scale-105">
              <div className="w-full h-full rounded-md bg-gradient-to-t from-teal-500 to-teal-300 opacity-80"></div>
              <Link to="/anxietytestdashboard" className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-2xl font-semibold">
                Anxiety Test
              </Link>
            </div>
            <div className="w-96 h-56 bg-cover bg-center rounded-md shadow-md cursor-pointer transform transition duration-300 hover:scale-105">
              <div className="w-full h-full rounded-md bg-gradient-to-t from-indigo-500 to-indigo-300 opacity-80"></div>
              <Link to="/userQuiz" className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-2xl font-semibold">
                Daily Wellness Quiz
              </Link>
            </div>
            <div className="w-96 h-56 bg-cover bg-center rounded-md shadow-md cursor-pointer transform transition duration-300 hover:scale-105">
              <div className="w-full h-full rounded-md bg-gradient-to-t from-teal-500 to-teal-300 opacity-80"></div>
              <Link to="/userReports" className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-2xl font-semibold">
                Get Reports
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-teal-50 to-teal-200">
          <h1 className="text-3xl mb-8 font-semibold">Welcome to Your Dashboard</h1>
          <p className="text-xl mb-12">Please login to access this page</p>
          <Link
            to="/userlogin"
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-md transition duration-300"
          >
            Login
          </Link>
        </div>
      )}
    </>
  );
}