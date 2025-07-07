import React, { useState } from 'react';
import styled from 'styled-components';
import { FiPlus, FiTrash2, FiCheck, FiCircle } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';

const TasksContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
`;

const TasksHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  p {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.8);
  }
`;

const AddTaskSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const InputGroup = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  padding: 0.75rem;
  color: white;
  font-size: 1rem;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: #6366f1;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const TasksList = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const TaskItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const TaskText = styled.span`
  flex: 1;
  color: ${({ completed }) => completed ? 'rgba(255, 255, 255, 0.5)' : 'white'};
  text-decoration: ${({ completed }) => completed ? 'line-through' : 'none'};
  font-size: 1rem;
`;

const TaskButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${({ variant }) => {
    switch (variant) {
      case 'complete':
        return 'linear-gradient(135deg, #10b981, #059669)';
      case 'delete':
        return 'linear-gradient(135deg, #ef4444, #dc2626)';
      default:
        return 'rgba(255, 255, 255, 0.1)';
    }
  }};
  color: white;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: rgba(255, 255, 255, 0.6);
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1rem;
  }
`;

const Tasks = () => {
  const { state, dispatch, actions } = useApp();
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      dispatch({ type: actions.ADD_TASK, payload: newTask.trim() });
      setNewTask('');
    }
  };

  const toggleTask = (taskId) => {
    dispatch({ type: actions.TOGGLE_TASK, payload: taskId });
  };

  const removeTask = (taskId) => {
    dispatch({ type: actions.REMOVE_TASK, payload: taskId });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <TasksContainer>
      <TasksHeader>
        <h2>Task Manager</h2>
        <p>Organize your tasks and stay productive</p>
      </TasksHeader>
      
      <AddTaskSection>
        <InputGroup>
          <Input
            type="text"
            placeholder="What do you need to do?"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button onClick={addTask}>
            <FiPlus />
            Add Task
          </Button>
        </InputGroup>
      </AddTaskSection>
      
      <TasksList>
        {state.tasks.length === 0 ? (
          <EmptyState>
            <h3>No tasks yet</h3>
            <p>Add your first task to get started!</p>
          </EmptyState>
        ) : (
          state.tasks.map((task) => (
            <TaskItem key={task.id}>
              <TaskButton
                variant="complete"
                onClick={() => toggleTask(task.id)}
              >
                {task.completed ? <FiCheck /> : <FiCircle />}
              </TaskButton>
              
              <TaskText completed={task.completed}>
                {task.text}
              </TaskText>
              
              <TaskButton
                variant="delete"
                onClick={() => removeTask(task.id)}
              >
                <FiTrash2 />
              </TaskButton>
            </TaskItem>
          ))
        )}
      </TasksList>
    </TasksContainer>
  );
};

export default Tasks;
