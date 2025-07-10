import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { ACTIONS, initialState } from './constants';
import { musicService, backgroundService } from '../services/supabaseService';
import { useAuth } from '../components/Auth/AuthProvider';

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
        tasks: [
          ...state.tasks,
          {
            id: Date.now(),
            text: action.payload.text,
            completed: false,
            dueDate: action.payload.dueDate || null,
            reminder: action.payload.reminder || null,
            tags: action.payload.tags || [],
            subtasks: [],
            notes: '',
            attachments: [],
            pomodoroCount: 0,
            priority: action.payload.priority || 'normal',
          },
        ],
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
    case ACTIONS.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? { ...task, ...action.payload.updates } : task
        ),
      };
    case ACTIONS.ADD_SUBTASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId
            ? { ...task, subtasks: [...task.subtasks, { id: Date.now(), text: action.payload.text, completed: false }] }
            : task
        ),
      };
    case ACTIONS.TOGGLE_SUBTASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId
            ? {
                ...task,
                subtasks: task.subtasks.map(st =>
                  st.id === action.payload.subtaskId ? { ...st, completed: !st.completed } : st
                ),
              }
            : task
        ),
      };
    case ACTIONS.REMOVE_SUBTASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId
            ? { ...task, subtasks: task.subtasks.filter(st => st.id !== action.payload.subtaskId) }
            : task
        ),
      };
    case ACTIONS.ADD_TAG:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId
            ? { ...task, tags: [...new Set([...task.tags, action.payload.tag])]} : task
        ),
      };
    case ACTIONS.REMOVE_TAG:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId
            ? { ...task, tags: task.tags.filter(tag => tag !== action.payload.tag) } : task
        ),
      };
    case ACTIONS.SET_TASK_DUE_DATE:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId ? { ...task, dueDate: action.payload.dueDate } : task
        ),
      };
    case ACTIONS.SET_TASK_REMINDER:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId ? { ...task, reminder: action.payload.reminder } : task
        ),
      };
    case ACTIONS.SET_TASK_NOTES:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId ? { ...task, notes: action.payload.notes } : task
        ),
      };
    case ACTIONS.ADD_ATTACHMENT:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId
            ? { ...task, attachments: [...task.attachments, action.payload.attachment] }
            : task
        ),
      };
    case ACTIONS.REMOVE_ATTACHMENT:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId
            ? { ...task, attachments: task.attachments.filter(att => att !== action.payload.attachment) }
            : task
        ),
      };
    case ACTIONS.INCREMENT_POMODORO_COUNT:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload ? { ...task, pomodoroCount: (task.pomodoroCount || 0) + 1 } : task
        ),
      };
    case ACTIONS.SET_TASK_PRIORITY:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId ? { ...task, priority: action.payload.priority } : task
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
    case ACTIONS.SET_SELECTED_MUSIC_TRACK:
      return { ...state, selectedMusicTrack: action.payload };
    case ACTIONS.CLEAR_SELECTED_MUSIC_TRACK:
      return { ...state, selectedMusicTrack: null };
    case ACTIONS.SET_CURRENT_TASK:
      return { ...state, currentTaskId: action.payload };
    case ACTIONS.CLEAR_CURRENT_TASK:
      return { ...state, currentTaskId: null };
    case ACTIONS.COMPLETE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload ? { ...task, completed: true } : task
        ),
      };
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { user } = useAuth();

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
      selectedMusicTrack: state.selectedMusicTrack,
      currentTaskId: state.currentTaskId,
    };
    localStorage.setItem('pomodoro-app', JSON.stringify(dataToSave));
  }, [state.points, state.unlockedBackgrounds, state.selectedBackground, state.backgroundColor, state.tasks, state.selectedMusicTrack, state.currentTaskId]);

  // Sync backgrounds with database when user is authenticated
  useEffect(() => {
    if (user) {
      // Update unlocked backgrounds in database
      backgroundService.updateUnlockedBackgrounds(user.id, state.unlockedBackgrounds);
      // Update selected background in database
      backgroundService.updateSelectedBackground(user.id, state.selectedBackground);
    }
  }, [user, state.unlockedBackgrounds, state.selectedBackground]);

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

  const setCurrentTask = (taskId) => {
    dispatch({ type: ACTIONS.SET_CURRENT_TASK, payload: taskId });
  };
  const clearCurrentTask = () => {
    dispatch({ type: ACTIONS.CLEAR_CURRENT_TASK });
  };

  const value = {
    state,
    dispatch,
    actions: ACTIONS,
    setCurrentTask,
    clearCurrentTask,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};