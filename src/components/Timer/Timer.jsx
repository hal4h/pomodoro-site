import React, { useState } from 'react';
import styled from 'styled-components';
import { FiPlay, FiPause, FiRotateCcw, FiSettings } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';

const TimerContainer = styled.div`
  text-align: center;
  color: white;
`;

const TimerDisplay = styled.div`
  font-size: 8rem;
  font-weight: 300;
  font-family: 'Inter', monospace;
  margin-bottom: 2rem;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 4rem;
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return 'linear-gradient(135deg, #6366f1, #8b5cf6)';
      case 'secondary':
        return 'rgba(255, 255, 255, 0.1)';
      default:
        return 'rgba(255, 255, 255, 0.1)';
    }
  }};
  color: white;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const CustomTimeInput = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  
  input {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 0.5rem;
    padding: 0.75rem;
    color: white;
    font-size: 1rem;
    width: 80px;
    text-align: center;
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
    
    &:focus {
      outline: none;
      border-color: #6366f1;
    }
  }
  
  label {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.875rem;
  }
`;

const Timer = () => {
  const { state, dispatch, actions } = useApp();
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(25);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    dispatch({ type: actions.START_TIMER });
  };

  const handleStop = () => {
    dispatch({ type: actions.STOP_TIMER });
  };

  const handleReset = () => {
    dispatch({ type: actions.RESET_TIMER });
  };

  const handleCustomTime = () => {
    const newTime = customMinutes * 60;
    dispatch({ type: actions.SET_CUSTOM_TIME, payload: newTime });
    setShowCustomInput(false);
  };

  return (
    <TimerContainer>
      <TimerDisplay>
        {formatTime(state.timer.time)}
      </TimerDisplay>
      
      <ControlsContainer>
        {state.timer.isRunning ? (
          <Button variant="secondary" onClick={handleStop}>
            <FiPause />
            Pause
          </Button>
        ) : (
          <Button variant="primary" onClick={handleStart}>
            <FiPlay />
            Start
          </Button>
        )}
        
        <Button variant="secondary" onClick={handleReset}>
          <FiRotateCcw />
          Reset
        </Button>
        
        <Button variant="secondary" onClick={() => setShowCustomInput(!showCustomInput)}>
          <FiSettings />
          Custom
        </Button>
      </ControlsContainer>
      
      {showCustomInput && (
        <CustomTimeInput>
          <label>Minutes:</label>
          <input
            type="number"
            min="1"
            max="120"
            value={customMinutes}
            onChange={(e) => setCustomMinutes(parseInt(e.target.value) || 25)}
            onKeyPress={(e) => e.key === 'Enter' && handleCustomTime()}
          />
          <Button variant="primary" onClick={handleCustomTime}>
            Set Time
          </Button>
        </CustomTimeInput>
      )}
    </TimerContainer>
  );
};

export default Timer;