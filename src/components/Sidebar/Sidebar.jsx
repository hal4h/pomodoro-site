import React from 'react';
import styled from 'styled-components';
import { FiClock, FiShoppingBag, FiMusic, FiCheckSquare, FiStar } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';

const SidebarContainer = styled.aside`
  width: 280px;
  background: rgba(42, 42, 42, 0.95);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Logo = styled.div`
  padding: 0 2rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const NavItem = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  background: ${({ active }) => active ? 'rgba(99, 102, 241, 0.2)' : 'transparent'};
  border: none;
  color: ${({ active }) => active ? '#6366f1' : '#ffffff'};
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  text-align: left;
  font-size: 1rem;
  
  &:hover {
    background: rgba(99, 102, 241, 0.1);
    color: #6366f1;
  }
  
  svg {
    font-size: 1.25rem;
  }
`;

const PointsDisplay = styled.div`
  margin-top: auto;
  padding: 1.5rem 2rem;
  background: rgba(99, 102, 241, 0.1);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  .points-label {
    font-size: 0.875rem;
    color: #a1a1aa;
    margin-bottom: 0.5rem;
  }
  
  .points-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #f59e0b;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const Sidebar = () => {
  const { state, dispatch, actions } = useApp();

  const navItems = [
    { id: 'timer', label: 'Timer', icon: FiClock },
    { id: 'shop', label: 'Shop', icon: FiShoppingBag },
    { id: 'music', label: 'Music', icon: FiMusic },
    { id: 'tasks', label: 'Tasks', icon: FiCheckSquare },
  ];

  return (
    <SidebarContainer>
      <Logo>
        <h1>Pomodoro</h1>
      </Logo>
      
      {navItems.map(({ id, label, icon: Icon }) => (
        <NavItem
          key={id}
          active={state.activeSection === id}
          onClick={() => dispatch({ type: actions.SET_ACTIVE_SECTION, payload: id })}
        >
          <Icon />
          {label}
        </NavItem>
      ))}
      
      <PointsDisplay>
        <div className="points-label">Current Points</div>
        <div className="points-value">
          <FiStar />
          {state.points}
        </div>
      </PointsDisplay>
    </SidebarContainer>
  );
};

export default Sidebar;