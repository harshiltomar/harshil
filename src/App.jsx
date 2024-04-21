import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import "./App.css";
import Card from "./Card";
import InfiniteScroll from "react-infinite-scroll-component";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(2);

  const fetchData = useCallback(async () => {
    if (loading)
      return (
        <div className="h-full flex justify-center items-center bg-blue-950 text-white">
          <ReactLoading type="bars" color="white" height={100} width={150} />
        </div>
      );

    setLoading(true);

    axios
      .get(
        `https://api.javascripttutorial.net/v1/quotes/?page=${index}&limit=10`
      )
      .then((res) => {
        setQuotes((prevQoutes) => [...prevQoutes, ...res.data.data]);
      })
      .catch((err) => console.log(err));
    setIndex((prevIndex) => prevIndex + 1);

    setLoading(false);
  }, [index, loading]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get(
          `https://api.javascripttutorial.net/v1/quotes/?page=1&limit=10`
        );
        setQuotes(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quotes:", error);
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        fetchData();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchData]);

  console.log(quotes);

  if (loading) {
    return (
      <div className="h-full flex p-80 justify-center items-center bg-blue-950 text-white">
        <ReactLoading type="bars" color="white" height={100} width={150} />
      </div>
    );
  }

  if (quotes.length === 0) {
    return (
      <div className="h-full bg-blue-950 w-screen justify-items-center text-white">
        <p>No quotes available</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-blue-950 w-screen justify-items-center">
      <div className="py-4">
        {quotes.map((quote) => (
          <Card key={quote.id} quote={quote} />
        ))}
      </div>
    </div>
  );
}

export default App;
