import React, { useContext, useEffect, useState } from "react";
import { AppState } from "../../App";
import { Link } from "react-router-dom";
import axios from "../../axiosconfig";

function Home() {
  const { user } = useContext(AppState);

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("/questions/all-questions");
        setQuestions(res.data);
        // console.log(res.data);
      } catch (err) {
        console.error("Failed to fetch questions:", err);
      }
    };
    fetchQuestions();
  }, []);
  
  return (
    <div>
      <h2>All Questions</h2>
      <Link to="/ask">Ask a Question</Link>
      {Array.isArray(questions) &&
        questions.map((q) => (
          <Link key={q.questionid} to={`/question/${q.questionid}`}>
            <div>
              <h4>{q.title}</h4>
              <p>{q.username}</p>
            </div>
          </Link>
        ))}
      <h2>Hello{user?.username}</h2>
    </div>
  );
}

export default Home;
