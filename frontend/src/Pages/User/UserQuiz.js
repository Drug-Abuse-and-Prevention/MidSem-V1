import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

export default function UserQuiz() {
  const navigate = useNavigate();
  const [quizResponses, setQuizResponses] = useState({
    Meditation: "",
    Exercise: "",
    Sleep: "",
    Sober: "",
  });

  const handleInputChange = (category, value) => {
    setQuizResponses({ ...quizResponses, [category]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Send quiz responses with token in headers
      await axios
        .post("http://localhost:3001/api/quiz", quizResponses, config)
        .then((response) => {
          console.log("Quiz submitted successfully:", response.data);
          
        });

      alert("Quiz submitted successfully!");
      navigate("/userdashboard");
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-start h-screen bg-gradient-to-r from-teal-50 to-teal-200">
      <h1 className="text-3xl font-bold mt-10 text-gray-700 mb-12 tracking-tight ">
        Daily Wellness Quiz
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-8 items-center"
      >
        <div className="w-full bg-gradient-to-r from-teal-500 to-teal-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
          <div className="p-4 flex flex-col justify-center items-center">
            <label
              htmlFor="Meditation"
              className="block font-semibold mb-2 text-white text-3xl"
            >
              How many minutes did you meditate today?
            </label>
            <input
              type="number"
              id="Meditation"
              className="border rounded-2xl  w-1/5 px-3 py-2  bg-teal-100 focus:outline-none focus:border-teal-500"
              value={quizResponses.Meditation}
              onChange={(e) => handleInputChange("Meditation", e.target.value)}
              placeholder="10 mins"
            />
          </div>
        </div>

        <div className="w-full bg-gradient-to-r from-teal-500 to-teal-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
          <div className="p-4 flex flex-col justify-center items-center">
            <label
              htmlFor="Exercise"
              className="block font-semibold mb-2 text-white text-3xl"
            >
              How many minutes did you exercise today?
            </label>
            <input
              type="number"
              id="Exercise"
              className="border rounded-2xl  w-1/5 px-3 py-2 bg-teal-100 focus:outline-none focus:border-teal-500"
              value={quizResponses.Exercise}
              onChange={(e) => handleInputChange("Exercise", e.target.value)}
              placeholder="20 mins"
            />
          </div>
        </div>

        <div className="w-full bg-gradient-to-r from-indigo-500 to-indigo-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
          <div className="p-4 flex flex-col justify-center items-center">
            <label
              htmlFor="Sleep"
              className="block font-semibold mb-2 text-white text-3xl"
            >
              How many hours did you sleep last night?
            </label>
            <input
              type="number"
              id="Sleep"
              className="border rounded-2xl  w-1/5 px-3 py-2 bg-teal-100 focus:outline-none focus:border-teal-500"
              value={quizResponses.Sleep}
              onChange={(e) => handleInputChange("Sleep", e.target.value)}
              placeholder="8 Hours"
            />
          </div>
        </div>

        <div className="w-full bg-gradient-to-r from-indigo-500 to-indigo-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
          <div className="p-4 flex flex-col justify-center items-center">
            <label
              htmlFor="Sober"
              className="block font-semibold mb-2 text-white text-3xl"
            >
              Were you sober today?
            </label>
            <select
              id="Sober"
              className="border rounded-2xl  w-1/5 px-3 py-2 bg-teal-100 focus:outline-none focus:border-teal-500"
              value={quizResponses.Sober}
              onChange={(e) => handleInputChange("Sober", e.target.value)}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
