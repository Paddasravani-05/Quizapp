import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/start.css'; 

const Start = () => {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleStartQuiz = () => {
    if (name.trim() === '') {
      alert('Please enter your name');
      return;
    }

    setShowModal(true);
    
    
    setTimeout(() => {
      navigate('/quiz', { state: { userName: name } }); 
    }, 2000);
  };

  return (
    <div className="start-container">
      <h1>Please, Enter Your Name:</h1>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Enter your name" 
      />
      <button onClick={handleStartQuiz}>Start Quiz</button>

      {}
      {showModal && (
        <div className="modal">
          <p>{name}, let's start the quiz!</p>
        </div>
      )}
    </div>
  );
};

export default Start;