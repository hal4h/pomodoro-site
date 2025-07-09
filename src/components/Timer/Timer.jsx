import React, { useState } from 'react';
import styled from 'styled-components';
import { FiPlay, FiPause, FiRotateCcw, FiSettings } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import PastelColorPicker from '../BackgroundSelector/PastelColorPicker';
import QuickShopModal from '../BackgroundSelector/QuickShopModal';

const TimerContainer = styled.div`
  text-align: center;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
`;

const TimerDisplay = styled.div`
  font-size: 7rem;
  font-weight: 200;
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  margin: 2rem 0 2.5rem 0;
  letter-spacing: 0.1em;
  color: rgb(127, 120, 120);
  text-shadow: none;
  @media (max-width: 768px) {
    font-size: 4rem;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const PillButton = styled.button`
  background: #f1f1f1;
  color: #222;
  border: none;
  border-radius: 999px;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  margin: 0 0.5rem;
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: none;
  &:hover {
    background: #ffe3ec;
  }
`;

const StartButton = styled(PillButton)`
  background: #fff;
  color: #222;
  font-size: 1.1rem;
  margin-top: 2rem;
`;

const CustomTimeInput = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  input {
    background: #fff;
    border: 1px solid #eee;
    border-radius: 0.5rem;
    padding: 0.75rem;
    color: #222;
    font-size: 1rem;
    width: 80px;
    text-align: center;
    &::placeholder {
      color: #bbb;
    }
    &:focus {
      outline: none;
      border-color: #6366f1;
    }
  }
  label {
    color: #6366f1;
    font-size: 0.95rem;
  }
`;

const ModeRow = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const ModeButton = styled(PillButton)`
  background: ${({ active }) => (active ? '#ffe3ec' : '#f1f1f1')};
  color: ${({ active }) => (active ? '#6366f1' : '#222')};
  font-weight: 600;
`;

const Timer = () => {
  const { state, setCurrentTask, dispatch } = useApp();
  const [customMinutes, setCustomMinutes] = useState(25);
  const [mode, setMode] = useState('pomodoro');

  // Function to get darker version of current background color
  const getDarkerAccentColor = (backgroundColor) => {
    if (backgroundColor.startsWith('#')) {
      const hex = backgroundColor.slice(1);
      const r = Math.max(0, parseInt(hex.substr(0, 2), 16) - 40);
      const g = Math.max(0, parseInt(hex.substr(2, 2), 16) - 40);
      const b = Math.max(0, parseInt(hex.substr(4, 2), 16) - 40);
      return `rgb(${r}, ${g}, ${b})`;
    }
    return '#6366f1';
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')} : ${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    dispatch({ type: 'START_TIMER' });
  };

  const handleStop = () => {
    dispatch({ type: 'STOP_TIMER' });
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_TIMER' });
  };

  const handleCustomTime = () => {
    const newTime = customMinutes * 60;
    dispatch({ type: 'SET_CUSTOM_TIME', payload: newTime });
  };

  const handleMode = (selectedMode) => {
    setMode(selectedMode);
    if (selectedMode === 'pomodoro') {
      dispatch({ type: 'SET_CUSTOM_TIME', payload: 25 * 60 });
      setCustomMinutes(25);
    } else {
      dispatch({ type: 'SET_CUSTOM_TIME', payload: 5 * 60 });
      setCustomMinutes(5);
    }
  };

  const currentTask = state.tasks.find(t => t.id === state.currentTaskId);

  return (
    <TimerContainer>
      <ModeRow>
        <ModeButton active={mode === 'pomodoro'} onClick={() => handleMode('pomodoro')}>pomodoro</ModeButton>
        <ModeButton active={mode === 'break'} onClick={() => handleMode('break')}>break</ModeButton>
      </ModeRow>
      <TimerDisplay>
        {formatTime(state.timer.time)}
      </TimerDisplay>
      <ButtonRow>
        {state.timer.isRunning ? (
          <PillButton onClick={handleStop}>pause</PillButton>
        ) : (
          <StartButton onClick={handleStart}>start</StartButton>
        )}
        <PillButton onClick={handleReset}>reset</PillButton>
      </ButtonRow>
     
      {/* Current Task Display */}
      <div style={{ marginTop: '2rem', width: '100%', textAlign: 'center' }}>
        {currentTask ? (
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 500, color: '#6366f1' }}>Current Task:</div>
            <div style={{ fontSize: '1.1rem', margin: '0.5rem 0' }}>{currentTask.title || currentTask.text}</div>
            <div style={{ color: '#aaa', fontSize: '0.95rem' }}>Due: {currentTask.dueDate ? new Date(currentTask.dueDate).toLocaleDateString() : 'No due date'}</div>
          </div>
        ) : (
          <div>
            <div style={{ color: '#aaa', fontSize: '1.1rem', marginBottom: '0.5rem' }}>No current task</div>
            <button
              style={{
                background: '#ffe3ec',
                color: getDarkerAccentColor(state.backgroundColor),
                border: 'none',
                borderRadius: '999px',
                padding: '0.5rem 1.5rem',
                fontSize: '1rem',
                fontWeight: 500,
                cursor: 'pointer',
                marginRight: '0.5rem',
              }}
              onClick={() => dispatch({ type: 'SET_ACTIVE_SECTION', payload: 'tasks' })}
            >
              Go to Tasks
            </button>
          </div>
        )}
      </div>
    </TimerContainer>
  );
};

export default Timer;