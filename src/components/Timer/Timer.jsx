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
  const { state, dispatch, actions } = useApp();
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(25);
  const [mode, setMode] = useState('pomodoro');

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')} : ${secs.toString().padStart(2, '0')}`;
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

  const handleMode = (selectedMode) => {
    setMode(selectedMode);
    if (selectedMode === 'pomodoro') {
      dispatch({ type: actions.SET_CUSTOM_TIME, payload: 25 * 60 });
      setCustomMinutes(25);
    } else {
      dispatch({ type: actions.SET_CUSTOM_TIME, payload: 5 * 60 });
      setCustomMinutes(5);
    }
  };

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
        <PillButton onClick={() => setShowCustomInput(!showCustomInput)}>custom</PillButton>
      </ButtonRow>
      {showCustomInput && (
        <CustomTimeInput>
          <label>minutes:</label>
          <input
            type="number"
            min="1"
            max="120"
            value={customMinutes}
            onChange={(e) => setCustomMinutes(parseInt(e.target.value) || 25)}
            onKeyPress={(e) => e.key === 'Enter' && handleCustomTime()}
          />
          <StartButton onClick={handleCustomTime}>set time</StartButton>
        </CustomTimeInput>
      )}
    </TimerContainer>
  );
};

export default Timer;