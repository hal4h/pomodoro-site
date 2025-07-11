import React from 'react';
import styled from 'styled-components';
import { FiClock, FiShoppingBag, FiMusic, FiCheckSquare, FiStar } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { getDarkerShade } from '../../utils/colorUtils';

const SidebarContainer = styled.aside`
  width: ${({ isShopPage }) => isShopPage ? '120px' : '100px'};
  background: rgba(255,255,255,0.5);
  backdrop-filter: blur(8px);
  border-right: none;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  @media (max-width: 700px) {
    width: ${({ isShopPage }) => isShopPage ? '80px' : '56px'};
    padding: 1rem 0;
    gap: 1.2rem;
  }
`;

const Logo = styled.div`
  margin-bottom: 2rem;
  h1 {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.03em;
    color: #6366f1;
    background: none;
    -webkit-background-clip: unset;
    -webkit-text-fill-color: unset;
    background-clip: unset;
  }
`;

const NavItem = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  background: ${({ active }) => active ? '#ffe3ec' : 'transparent'};
  border: none;
  color: ${({ active }) => active ? '#6366f1' : '#222'};
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  width: 100%;
  text-align: center;
  font-size: 0.95rem;
  border-radius: 999px;
  padding: 0.5rem 0;
  margin-bottom: 1.5rem;
  @media (max-width: 700px) {
    font-size: 0.8rem;
    padding: 0.3rem 0;
  }
  span, svg {
    display: block;
  }
  @media (max-width: 700px) {
    span {
      display: none;
    }
  }
  &:hover {
    background: #f8e1e7;
    color: #6366f1;
  }
  svg {
    font-size: 1.5rem;
  }
`;

const PointsDisplay = styled.div`
  margin-top: auto;
  padding: 1rem 0;
  background: none;
  border-top: none;
  text-align: center;
  .points-label {
    font-size: 0.8rem;
    color: #aaa;
    margin-bottom: 0.2rem;
  }
  .points-value {
    font-size: 1.1rem;
    font-weight: 700;
    color: #d97706;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    justify-content: center;
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
    <SidebarContainer isShopPage={state.activeSection === 'shop'}>
      <Logo>
      <h1>pomoverse</h1>
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