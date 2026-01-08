import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axiosconfig";
import { RxAvatar } from "react-icons/rx";
import style from "./questiondetails.module.css"
import Loader from "../../components/Loader/Loader";
import { FaArrowCircleRight } from "react-icons/fa";

function QuestionDetails() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const answerRef = useRef();

  console.log(style);

  useEffect(() => {
    async function fetchQuestion() {
      try {
        const res = await axios.get(`/questions/${id}`);
        const data = res.data || {};
        setQuestion(data.question || null);
        setAnswers(data.answers || []);
      } catch (error) {
        console.error("Failed to fetch question:", error);
        setQuestion(null);
        setAnswers([]);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestion();
  }, [id]);

  const submitAnswer = async (e) => {
    e.preventDefault();

    const answerText = answerRef.current.value.trim();
    if (!answerText) return;

    try {
      const res = await axios.post("/answers", {
        questionid: id,
        answer: answerText,
      });

      // Add the new answer to the existing answers state
      setAnswers((prev) => [...prev, res.data.answer]);

      // Clear textarea
      answerRef.current.value = "";
    } catch (error) {
      console.error("Failed to submit answer:", error);
    }
  };

  return (
    <section className={style.questionDetails}>
      {loading ? (
        <Loader/>
        // <p className={style.loadingText}>Loading...</p>
      ) : question ? (
        <div className={style.questionSection}>
          <p className={style.question}>Question</p>
          <h2 className={style.questionTitle}>
             <FaArrowCircleRight />
            {question.title}</h2>
          <p className={style.questionDescripition}>{question.description}</p>
          <small className={style.questionAskedby}>
            Asked by {question.username}
          </small>
        </div>
      ) : (
        <p className={style.notFoundText}>Question not found</p>
      )}

      <hr className={style.hrLine} />

      <h2 className={style.community}>Answer From The Community</h2>
      <div className={style.answerSection}>
        {Array.isArray(answers) && answers.length > 0 ? (
          answers.map((a) =>
            a ? (
              <div key={a.answerid} className={style.answerCard}>
                <div className={style.answerUser}>
                  <RxAvatar className={style.avatar}/>
                  <p>{a.username}</p>
                </div>
                <p className={style.answerText}>{a.answer}</p>
              </div>
            ) : null
          )
        ) : (
          <p>No previous answers posted from Evangadi community.</p>
        )}
      </div>

      <form onSubmit={submitAnswer} className={style.answerForm}>
        <textarea ref={answerRef} placeholder="Your answer..." />
        <button>Post Answer</button>
      </form>
    </section>
  );
}

export default QuestionDetails;
