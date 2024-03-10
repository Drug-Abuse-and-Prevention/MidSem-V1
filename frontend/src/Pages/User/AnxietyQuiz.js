import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AnxietyQuiz() {
  const questions = [
    "Are you experiencing numbness or tingling sensations?",
    "Do you feel hot?",
    "Are you experiencing wobbliness in your legs?",
    "Are you unable to relax?",
    "Do you have a fear of the worst happening?",
    "Are you feeling dizzy or lightheaded?",
    "Is your heart pounding or racing?",
    "Do you feel unsteady?",
    "Are you feeling terrified or afraid?",
    "Are you nervous?",
    "Do you have a feeling of choking?",
    "Are your hands trembling?",
    "Are you feeling shaky or unsteady?",
    "Do you have a fear of losing control?",
    "Are you experiencing difficulty in breathing?",
    "Do you have a fear of dying?",
    "Are you scared?",
    "Do you have indigestion?",
    "Are you feeling faint or lightheaded?",
    "Is your face flushed?",
    "Are you experiencing hot or cold sweats?",
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState(new Array(21).fill(null));
  const [totalScore, setTotalScore] = useState(0);
  const [anxietyLevel, setAnxietyLevel] = useState("low");
  const [submit, setSubmit] = useState(false);
  const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setToken(token);
      fetchUserName(token);
    }
  }, []);
  useEffect(() => {
    if (token) {
      fetchUserName(token);
    }
  }, [token]);

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
        return response.data;
      } else {
        console.error("Failed to fetch user name");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user name:", error);
      return null;
    }
  };

  const handleResponseChange = (value) => {
    const newResponses = [...responses];
    newResponses[currentQuestion] = value;
    setResponses(newResponses);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const score = responses.reduce((acc, val) => acc + val, 0);
      setTotalScore(score);
      let level;

      if (score >= 36) {
        level = "Potentially concerning levels of anxiety";
      } else if (score >= 22) {
        level = "Moderate anxiety";
      } else {
        level = "Low anxiety";
      }
      setAnxietyLevel(level);

      const Data = await fetchUserName(token);
      const username = Data?.name;
      const userId = Data?.userId;
      const email = Data?.email;

      if (!Data) {
        console.error("User details not found");
        return;
      }

      const postData = {
        userId: userId,
        username: username,
        email: email,
        score: score,
        level: level,
      };

      const response = await axios.post(
        "http://localhost:3001/api/anxietyTestResults",
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        console.log("Anxiety test result stored successfully");
      } else {
        console.error("Failed to store anxiety test result");
      }

      navigate("/anxietyresultpage", {
        state: { score: score, anxietyLevel: level },
      });
    } catch (error) {
      console.error("Error storing anxiety test result:", error);
    }
  };

  return (
    <div className="min-h-screen  flex items-start justify-center pt-24  bg-gradient-to-r from-teal-50 to-teal-200">
      <div className="bg-gray-600 p-8 rounded-lg shadow-lg w-1/3">
        <h1 className="font-semibold text-gray-300 tracking-tight text-xl">
          {currentQuestion + 1} / {questions.length}
        </h1>

        <h1 className="font-semibold text-white tracking-tight  text-2xl py-2">
          {questions[currentQuestion]}
        </h1>
        <div className="space-y-4 ">
          <div
            className="block cursor-pointer border-2 border-green-500  w-4/5  p-2 rounded-xl font-thin bg-green-100  "
            onClick={() => handleResponseChange(0)}
          >
            <input
              type="radio"
              checked={responses[currentQuestion] === 0}
              readOnly
            />
            <span className="ml-2 text-green-900 font-medium tracking-wider text-lg">
              Not At All
            </span>
          </div>
          <div
            className="block cursor-pointer border-2 border-blue-400 w-4/5 p-2 rounded-xl font-thin bg-blue-100 "
            onClick={() => handleResponseChange(1)}
          >
            <input
              type="radio"
              checked={responses[currentQuestion] === 1}
              readOnly
            />
            <span className="ml-2 text-green-900 font-medium tracking-wider text-lg">
              Mildly but it didn’t bother me much
            </span>
          </div>
          <div
            className="block cursor-pointer border-2 border-yellow-300 w-4/5 p-2 rounded-xl font-thin bg-yellow-100 "
            onClick={() => handleResponseChange(2)}
          >
            <input
              type="radio"
              checked={responses[currentQuestion] === 2}
              readOnly
            />
            <span className="ml-2 text-green-900 font-medium tracking-wider text-lg">
              Moderately - it wasn’t pleasant at times
            </span>
          </div>
          <div
            className="block cursor-pointer border-2 border-red-400 w-4/5 p-2 rounded-xl font-thin bg-red-100"
            onClick={() => handleResponseChange(3)}
          >
            <input
              type="radio"
              checked={responses[currentQuestion] === 3}
              readOnly
            />
            <span className="ml-2 text-green-900 font-medium tracking-wider text-lg">
              Severely – it bothered me a lot
            </span>
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </button>
          {currentQuestion < questions.length - 1 && (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
              onClick={handleNext}
            >
              Next
            </button>
          )}
          {currentQuestion === questions.length - 1 && (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnxietyQuiz;
