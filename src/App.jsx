import { useState, useEffect } from "react";
import axios from "axios";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Card from "./Card";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get(
          "https://api.javascripttutorial.net/v1/quotes/?page=1&limit=10"
        );
        setQuotes(response.data.data); // Set quotes data array
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching quotes:", error);
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchQuotes();
  }, []);

  console.log(quotes);
  // If loading, render loading message
  if (loading) {
    return (
      <div className="h-full bg-blue-950 w-screen justify-items-center text-white">
        <p>Loading...</p>
      </div>
    );
  }

  // If quotes array is empty, render "No quotes available" message
  if (quotes.length === 0) {
    return (
      <div className="h-full bg-blue-950 w-screen justify-items-center text-white">
        <p>No quotes available</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-blue-950 w-screen justify-items-center">
      <div className="py-12">
        {quotes.map((quote) => (
          <Card key={quote.id} quote={quote} /> // Pass quote data as props
        ))}
      </div>
    </div>
  );
}

export default App;
