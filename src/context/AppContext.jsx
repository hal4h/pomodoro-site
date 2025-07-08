import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  timer: {
    isRunning: false,
    time: 25 * 60, // 25 minutes in seconds
    customTime: 25 * 60,
  },
  points: 0,
  unlockedBackgrounds: ['default'],
  selectedBackground: 'default',
  backgroundColor: '#f8e1e7', // default pastel
  tasks: [],
  activeSection: 'timer', // timer, shop, music, tasks
};

// Action types
const ACTIONS = {
  START_TIMER: 'START_TIMER',
  STOP_TIMER: 'STOP_TIMER',
  RESET_TIMER: 'RESET_TIMER',
  UPDATE_TIMER: 'UPDATE_TIMER',
  SET_CUSTOM_TIME: 'SET_CUSTOM_TIME',
  ADD_POINTS: 'ADD_POINTS',
  UNLOCK_BACKGROUND: 'UNLOCK_BACKGROUND',
  SELECT_BACKGROUND: 'SELECT_BACKGROUND',
  ADD_TASK: 'ADD_TASK',
  REMOVE_TASK: 'REMOVE_TASK',
  TOGGLE_TASK: 'TOGGLE_TASK',
  SET_ACTIVE_SECTION: 'SET_ACTIVE_SECTION',
  LOAD_FROM_STORAGE: 'LOAD_FROM_STORAGE',
  SET_BACKGROUND_COLOR: 'SET_BACKGROUND_COLOR',
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.START_TIMER:
      return {
        ...state,
        timer: { ...state.timer, isRunning: true },
      };
    case ACTIONS.STOP_TIMER:
      return {
        ...state,
        timer: { ...state.timer, isRunning: false },
      };
    case ACTIONS.RESET_TIMER:
      return {
        ...state,
        timer: { ...state.timer, time: state.timer.customTime, isRunning: false },
      };
    case ACTIONS.UPDATE_TIMER:
      return {
        ...state,
        timer: { ...state.timer, time: action.payload },
      };
    case ACTIONS.SET_CUSTOM_TIME:
      return {
        ...state,
        timer: { ...state.timer, customTime: action.payload, time: action.payload },
      };
    case ACTIONS.ADD_POINTS:
      return {
        ...state,
        points: state.points + action.payload,
      };
    case ACTIONS.UNLOCK_BACKGROUND:
      return {
        ...state,
        unlockedBackgrounds: [...state.unlockedBackgrounds, action.payload],
      };
    case ACTIONS.SELECT_BACKGROUND:
      return {
        ...state,
        selectedBackground: action.payload,
      };
    case ACTIONS.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, { id: Date.now(), text: action.payload, completed: false }],
      };
    case ACTIONS.REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    case ACTIONS.TOGGLE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload ? { ...task, completed: !task.completed } : task
        ),
      };
    case ACTIONS.SET_ACTIVE_SECTION:
      return {
        ...state,
        activeSection: action.payload,
      };
    case ACTIONS.LOAD_FROM_STORAGE:
      return {
        ...state,
        ...action.payload,
      };
      case ACTIONS.SET_BACKGROUND_COLOR:
    return { ...state, backgroundColor: action.payload };
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('pomodoro-app');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: ACTIONS.LOAD_FROM_STORAGE, payload: parsedData });
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    const dataToSave = {
      points: state.points,
      unlockedBackgrounds: state.unlockedBackgrounds,
      selectedBackground: state.selectedBackground,
      backgroundColor: state.backgroundColor,
      tasks: state.tasks,
    };
    localStorage.setItem('pomodoro-app', JSON.stringify(dataToSave));
  }, [state.points, state.unlockedBackgrounds, state.selectedBackground, state.tasks]);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (state.timer.isRunning && state.timer.time > 0) {
      interval = setInterval(() => {
        dispatch({ type: ACTIONS.UPDATE_TIMER, payload: state.timer.time - 1 });
      }, 1000);
    } else if (state.timer.time === 0 && state.timer.isRunning) {
      dispatch({ type: ACTIONS.STOP_TIMER });
      dispatch({ type: ACTIONS.ADD_POINTS, payload: 10 }); // Award 10 points for completion
    }
    return () => clearInterval(interval);
  }, [state.timer.isRunning, state.timer.time]);

  const value = {
    state,
    dispatch,
    actions: ACTIONS,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};


// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};