import React from 'react';
import { useLocation } from 'react-router-dom';
import './styles/Result.css'; 

const Result = () => {
  const location = useLocation();
  const { username, score = 0, questions = [], selectedAnswers = [] } = location.state || {};

  
  const correctAnswers = selectedAnswers.filter((answer) => answer?.is_correct).length;
  const incorrectAnswers = selectedAnswers.length - correctAnswers;

  return (
    <div className="result-container">
      <h1 className="result-title">Quiz Results</h1>

      <div className="result-details">
        <h2>{username}, here's your result:</h2>
        <p>Score: {score} / {questions.length}</p>
        <p>Correct Answers: {correctAnswers}</p>
        <p>Incorrect Answers: {incorrectAnswers}</p>
      </div>

      <div className="answer-breakdown">
        <h3>Answer Breakdown:</h3>
        {questions.map((question, index) => {
          const userAnswer = selectedAnswers[index];
          const isCorrect = userAnswer?.is_correct;
          const correctAnswer = question.options.find(option => option.is_correct);

          return (
            <div key={index} className="answer-item">
              <h4>{`Q${index + 1}: ${question.description}`}</h4>
              <p className={isCorrect ? "correct-answer-text" : "incorrect-answer-text"}>
                Your Answer: {userAnswer ? userAnswer.description : "No answer"}
                {isCorrect ? (
                  <span className="correct"> (Correct)</span>
                ) : (
                  <span className="incorrect"> (Incorrect)</span>
                )}
              </p>
              {!isCorrect && correctAnswer && (
                <p className="correct-answer">Correct Answer: <strong>{correctAnswer.description}</strong></p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Result;
