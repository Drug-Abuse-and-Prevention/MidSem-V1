import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Cookies from "js-cookie";

const AnxietyReport = () => {
  const [results, setResults] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = Cookies.get("token");
        setToken(token);
        const response = await axios.get(
          "http://localhost:3001/api/allResults",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setResults(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
  }, []);

  const formatDate = (dateString) => {
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex flex-col items-center justify-start  bg-gradient-to-r from-teal-50 to-teal-200 p-8 h-screen">
      <h1 className="text-3xl font-bold mb-4 font-serif text-gray-500">
        Anxiety Test Results
      </h1>
      <div className="bg-white shadow-md rounded-lg p-4 ">
        <ResponsiveContainer width={800} height={400}>
          <LineChart data={results}>
            <XAxis dataKey="Date" stroke="#374151" tickFormatter={formatDate} />
            <YAxis stroke="#374151" />
            <Tooltip cursor={{ stroke: "#374151", strokeWidth: 2 }} />
            <Legend />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#3B82F6"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnxietyReport;
