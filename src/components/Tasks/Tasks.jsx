import React, { useState } from 'react';
import styled from 'styled-components';
import { FiPlus, FiTrash2, FiCheck, FiCircle, FiClock, FiTag, FiPaperclip, FiChevronDown, FiChevronUp, FiEdit2, FiPlay } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';

const TasksContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 2.5rem 1rem 1rem 1rem;
`;

const TasksHeader = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
  h2 {
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  p {
    font-size: 1.1rem;
    color: rgba(60, 60, 60, 0.8);
  }
`;

const AddTaskSection = styled.div`
  background: rgba(255,255,255,0.13);
  border-radius: 1rem;
  padding: 1.5rem 1.5rem 1.2rem 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(99,102,241,0.07);
`;

const InputRow = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  margin-bottom: 0.7rem;
`;

const Input = styled.input`
  flex: 1;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 0.5rem;
  padding: 0.75rem;
  color: #222;
  font-size: 1rem;
  &::placeholder {
    color: #bbb;
  }
  &:focus {
    outline: none;
    border-color: #6366f1;
  }
`;

const DateInput = styled(Input)`
  max-width: 180px;
`;

const TagInput = styled(Input)`
  max-width: 120px;
`;

const AddButton = styled.button`
  background: #6366f1;
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #8b5cf6;
  }
`;

const TasksList = styled.div`
  background: rgba(255,255,255,0.13);
  border-radius: 1rem;
  padding: 2rem 1rem;
  box-shadow: 0 2px 8px rgba(99,102,241,0.07);
`;

const TaskItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: rgba(255,255,255,0.07);
  border-radius: 0.7rem;
  margin-bottom: 1.2rem;
  padding: 1.2rem 1rem 1rem 1rem;
  position: relative;
  box-shadow: 0 1px 4px rgba(99,102,241,0.04);
`;

const TaskTopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const TaskText = styled.span`
  flex: 1;
  color: ${({ completed }) => completed ? 'rgba(120,120,120,0.5)' : '#222'};
  text-decoration: ${({ completed }) => completed ? 'line-through' : 'none'};
  font-size: 1.1rem;
  font-weight: 500;
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
      case 'pomodoro':
        return 'linear-gradient(135deg, #6366f1, #8b5cf6)';
      default:
        return 'rgba(255, 255, 255, 0.1)';
    }
  }};
  color: white;
  &:hover {
    transform: scale(1.1);
  }
`;

const TagPill = styled.span`
  background: #f8e1e7;
  color: #6366f1;
  border-radius: 999px;
  padding: 0.2em 0.9em;
  font-size: 0.95rem;
  margin-right: 0.5em;
  display: inline-flex;
  align-items: center;
  gap: 0.3em;
`;

const DueDate = styled.div`
  color: ${({ overdue }) => overdue ? '#ef4444' : '#6366f1'};
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.3em;
`;

const PriorityPill = styled.span`
  background: ${({ priority }) =>
    priority === 'high' ? '#ef4444' : priority === 'low' ? '#10b981' : '#f59e0b'};
  color: #fff;
  border-radius: 999px;
  padding: 0.2em 0.8em;
  font-size: 0.9rem;
  margin-left: 0.5em;
`;

const SubtasksSection = styled.div`
  margin: 0.7em 0 0.2em 2.2em;
`;

const SubtaskItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7em;
  margin-bottom: 0.3em;
`;

const NotesArea = styled.textarea`
  width: 100%;
  min-height: 60px;
  border-radius: 0.5rem;
  border: 1px solid #eee;
  padding: 0.5em;
  font-size: 1rem;
  margin-top: 0.5em;
  background: #fff;
  color: #222;
`;

const AttachmentInput = styled.input`
  margin-top: 0.5em;
`;

const AttachmentLink = styled.a`
  display: inline-block;
  color: #6366f1;
  margin-right: 0.7em;
  font-size: 0.95rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: rgba(120,120,120,0.6);
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  p {
    font-size: 1rem;
  }
`;

const priorities = [
  { value: 'high', label: 'High' },
  { value: 'normal', label: 'Normal' },
  { value: 'low', label: 'Low' },
];

const categories = ['Work', 'Personal', 'School', 'Errand', 'Other'];

function isOverdue(dueDate) {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date();
}

const Tasks = () => {
  const { state, dispatch, setCurrentTask } = useApp();
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);
  const [priority, setPriority] = useState('normal');
  const [category, setCategory] = useState('');
  const [sortByDate, setSortByDate] = useState(false);

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

  const handleSetCurrentTask = (taskId) => {
    setCurrentTask(taskId);
    dispatch({ type: 'SET_ACTIVE_SECTION', payload: 'timer' });
  };

  const handleUnselectCurrentTask = () => {
    dispatch({ type: 'CLEAR_CURRENT_TASK' });
  };

  // Subtask input state
  const [subtaskInput, setSubtaskInput] = useState({});
  // Notes input state
  const [notesInput, setNotesInput] = useState({});
  // Attachment input state
  const [attachmentInput, setAttachmentInput] = useState({});
  // Expand/collapse state
  const [expanded, setExpanded] = useState({});

  // Add new task
  const addTask = () => {
    if (newTask.trim()) {
      dispatch({
        type: 'ADD_TASK',
        payload: {
          text: newTask.trim(),
          dueDate: dueDate || null,
          priority,
        },
      });
      setNewTask('');
      setDueDate('');
      setPriority('normal');
      setCategory('');
    }
  };

  

  // Toggle expand/collapse for a task
  const toggleExpand = (taskId) => {
    setExpanded(prev => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  // Add subtask
  const addSubtask = (taskId) => {
    if (subtaskInput[taskId] && subtaskInput[taskId].trim()) {
      dispatch({ type: 'ADD_SUBTASK', payload: { taskId, text: subtaskInput[taskId].trim() } });
      setSubtaskInput({ ...subtaskInput, [taskId]: '' });
    }
  };

  // Add note
  const saveNotes = (taskId) => {
    dispatch({ type: 'SET_TASK_NOTES', payload: { taskId, notes: notesInput[taskId] || '' } });
  };

  // Add attachment (as link)
  const addAttachment = (taskId) => {
    if (attachmentInput[taskId] && attachmentInput[taskId].trim()) {
      dispatch({ type: 'ADD_ATTACHMENT', payload: { taskId, attachment: attachmentInput[taskId].trim() } });
      setAttachmentInput({ ...attachmentInput, [task.id]: '' });
    }
  };

  // Pomodoro integration (start timer for this task)
  const startPomodoroForTask = (taskId) => {
    // Optionally, you could set a "currentTaskId" in context and use it in the timer
    // For now, just increment pomodoro count for demo
    dispatch({ type: 'INCREMENT_POMODORO_COUNT', payload: taskId });
    // Optionally, switch to timer view
    dispatch({ type: 'SET_ACTIVE_SECTION', payload: 'timer' });
  };

  // Reminder notification (browser notification)
  React.useEffect(() => {
    state.tasks.forEach(task => {
      if (task.reminder && !task.completed) {
        const reminderTime = new Date(task.reminder).getTime();
        const now = Date.now();
        if (reminderTime > now && reminderTime - now < 60000) {
          setTimeout(() => {
            if (Notification.permission === 'granted') {
              new Notification('Task Reminder', { body: task.text });
            }
          }, reminderTime - now);
        }
      }
    });
  }, [state.tasks]);

  React.useEffect(() => {
    if (Notification && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  // Sort tasks by due date if enabled
  const tasks = sortByDate
    ? [...state.tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    : state.tasks;

  return (
    <TasksContainer>
      <TasksHeader>
        <h2>Task Manager</h2>
        <p>Organize your tasks, set due dates, and track your productivity</p>
        <button 
          onClick={() => setSortByDate(s => !s)} 
          style={{
            marginTop: '1rem', 
            background: '#ffe3ec', 
            color: '#6366f1', 
            border: 'none', 
            borderRadius: '999px', 
            padding: '0.5rem 1.5rem', 
            fontWeight: 500, 
            cursor: 'pointer'
          }}
        >
          Sort by Due Date
        </button>
      </TasksHeader>
      <AddTaskSection>
        <InputRow>
          <Input
            type="text"
            placeholder="What do you need to do?"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && addTask()}
          />
          <DateInput
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            title="Due date"
          />
        </InputRow>
        <InputRow>
        
          <select value={category} onChange={e => setCategory(e.target.value)} style={{ borderRadius: '0.5rem', padding: '0.5rem', fontSize: '1rem' }}>
            <option value="">Category</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select value={priority} onChange={e => setPriority(e.target.value)} style={{ borderRadius: '0.5rem', padding: '0.5rem', fontSize: '1rem' }}>
            {priorities.map(p => <option key={p.value} value={p.value}>{p.label} Priority</option>)}
          </select>
          <AddButton onClick={addTask}><FiPlus /> Add Task</AddButton>
        </InputRow>
        <div style={{ marginTop: '0.5em' }}>
          {tags.map(t => (
            <TagPill key={t}>{t} <span style={{ cursor: 'pointer' }} onClick={() => removeTag(t)}>×</span></TagPill>
          ))}
        </div>
      </AddTaskSection>
      <TasksList>
        {tasks.length === 0 ? (
          <EmptyState>
            <h3>No tasks yet</h3>
            <p>Add your first task to get started!</p>
          </EmptyState>
        ) : (
          tasks.map(task => (
            <TaskItem key={task.id}>
              <TaskTopRow>
                <TaskButton variant="complete" onClick={() => dispatch({ type: 'COMPLETE_TASK', payload: task.id })} title="Mark as completed">
                  ✕
                </TaskButton>
                <TaskText completed={task.completed}>{task.text}</TaskText>
                {task.dueDate && (
                  <DueDate overdue={isOverdue(task.dueDate)}>
                    <FiClock /> {task.dueDate}
                  </DueDate>
                )}
                {task.priority && <PriorityPill priority={task.priority}>{task.priority}</PriorityPill>}
                <TaskButton 
                  variant="pomodoro" 
                  onClick={() => handleSetCurrentTask(task.id)} 
                  title="Set as Current Task"
                  style={{
                    background: state.currentTaskId === task.id 
                      ? getDarkerAccentColor(state.backgroundColor) 
                      : 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                  }}
                >
                  {state.currentTaskId === task.id ? 'Current' : 'Set as Current Task'}
                </TaskButton>
                {state.currentTaskId === task.id && (
                  <TaskButton 
                    variant="delete" 
                    onClick={handleUnselectCurrentTask}
                    title="Unselect current task"
                  >
                    Clear
                  </TaskButton>
                )}
                <TaskButton onClick={() => toggleExpand(task.id)}>
                  {expanded[task.id] ? <FiChevronUp /> : <FiChevronDown />}
                </TaskButton>
              </TaskTopRow>
              <div style={{ margin: '0.5em 0 0.2em 2.2em' }}>
                {task.tags && task.tags.map(tag => (
                  <TagPill key={tag}>{tag}</TagPill>
                ))}
                {task.pomodoroCount > 0 && (
                  <span style={{ color: '#f59e0b', fontWeight: 600, marginLeft: '1em' }}>🍅 {task.pomodoroCount} Pomodoros</span>
                )}
              </div>
              {expanded[task.id] && (
                <>
                  {/* Subtasks */}
                  <SubtasksSection>
                    <div style={{ fontWeight: 600, marginBottom: '0.3em' }}>Subtasks</div>
                    {task.subtasks && task.subtasks.length > 0 && task.subtasks.map(st => (
                      <SubtaskItem key={st.id}>
                        <TaskButton variant="complete" onClick={() => dispatch({ type: 'TOGGLE_SUBTASK', payload: { taskId: task.id, subtaskId: st.id } })}>
                          {st.completed ? <FiCheck /> : <FiCircle />}
                        </TaskButton>
                        <span style={{ textDecoration: st.completed ? 'line-through' : 'none', color: st.completed ? '#aaa' : '#222' }}>{st.text}</span>
                        <TaskButton variant="delete" onClick={() => dispatch({ type: 'REMOVE_SUBTASK', payload: { taskId: task.id, subtaskId: st.id } })}><FiTrash2 /></TaskButton>
                      </SubtaskItem>
                    ))}
                    <InputRow>
                      <Input
                        type="text"
                        placeholder="Add subtask"
                        value={subtaskInput[task.id] || ''}
                        onChange={e => setSubtaskInput({ ...subtaskInput, [task.id]: e.target.value })}
                        onKeyPress={e => e.key === 'Enter' && addSubtask(task.id)}
                      />
                      <AddButton onClick={() => addSubtask(task.id)}><FiPlus /> Add</AddButton>
                    </InputRow>
                    {task.subtasks && task.subtasks.length > 0 && (
                      <div style={{ fontSize: '0.95rem', color: '#6366f1', marginTop: '0.2em' }}>
                        {task.subtasks.filter(st => st.completed).length} / {task.subtasks.length} subtasks complete
                      </div>
                    )}
                  </SubtasksSection>
                  {/* Notes */}
                  <div style={{ margin: '0.7em 0 0.2em 2.2em' }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.3em' }}>Notes</div>
                    <NotesArea
                      value={notesInput[task.id] !== undefined ? notesInput[task.id] : task.notes || ''}
                      onChange={e => setNotesInput({ ...notesInput, [task.id]: e.target.value })}
                      onBlur={() => saveNotes(task.id)}
                      placeholder="Add notes for this task..."
                    />
                  </div>
                  {/* Attachments */}
                  <div style={{ margin: '0.7em 0 0.2em 2.2em' }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.3em' }}>Attachments</div>
                    <AttachmentInput
                      type="url"
                      placeholder="Paste link (Google Doc, image, etc.)"
                      value={attachmentInput[task.id] || ''}
                      onChange={e => setAttachmentInput({ ...attachmentInput, [task.id]: e.target.value })}
                      onKeyPress={e => e.key === 'Enter' && addAttachment(task.id)}
                    />
                    <AddButton onClick={() => addAttachment(task.id)}><FiPaperclip /> Add</AddButton>
                    <div style={{ marginTop: '0.5em' }}>
                      {task.attachments && task.attachments.map(att => (
                        <AttachmentLink key={att} href={att} target="_blank" rel="noopener noreferrer">
                          <FiPaperclip /> {att.length > 30 ? att.slice(0, 30) + '...' : att}
                        </AttachmentLink>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </TaskItem>
          ))
        )}
      </TasksList>
    </TasksContainer>
  );
};

export default Tasks;
