import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './styles/Quiz.css';

const Quiz = ({ question, onAnswerClick }) => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [username, setUsername] = useState("User");
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://api.allorigins.win/raw?url=https://api.jsonserve.com/Uw5CrX');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json = await response.json();
        setQuestions(json.questions || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleOptionSelect = (option) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = option;
    setSelectedAnswers(updatedAnswers);
  };

  const calculateScore = () => {
    let correctAnswersCount = 0;
    questions.forEach((question, index) => {
      const selectedAnswer = selectedAnswers[index];
      if (selectedAnswer && selectedAnswer.is_correct) {
        correctAnswersCount++;
      }
    });

    setScore(correctAnswersCount);
    navigate('/result', {
      state: {
        username,
        score: correctAnswersCount,
        questions,
        selectedAnswers
      }
    });
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  return (
    <div className="app-container">
      <h1 className="app-title">Quiz a Challenge To You</h1>
      {loading && <p className="loading-text">Loading...</p>}
      {error && <p className="error-text">Error: {error}</p>}

      {!loading && !error && currentQuestion ? (
        <div className="question-container">
          <h2 className="question-heading">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h2>
          <p className="question-text">
            <strong>{currentQuestion.description}</strong>
          </p>
          {currentQuestion.options && currentQuestion.options.length > 0 ? (
            <ul className="options-list">
              {currentQuestion.options.map((option, idx) => (
                <li
                  key={idx}
                  className={`option-item ${selectedAnswers[currentQuestionIndex] === option ? 'selected' : ''}`}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option.description}
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-options">No options available.</p>
          )}
          <div className="navigation-buttons">
            <button className="nav-button" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
              Previous
            </button>
            <button className="nav-button" onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
              Next
            </button>
          </div>
        </div>
      ) : (
        !loading && !error && <p className="no-questions">No questions available.</p>
      )}

      {!loading && !error && questions.length > 0 && currentQuestionIndex === questions.length - 1 && (
        <div className="submit-container">
          <button className="submit-button" onClick={calculateScore}>
            Submit
          </button>
        </div>
      )}

      <div className="progress-bar-container">
        <div className="progress-bar-background">
          <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
        </div>
        <p className="progress-text">{progressPercentage}% Completed</p>
      </div>
    </div>
  );
};

export default Quiz;
