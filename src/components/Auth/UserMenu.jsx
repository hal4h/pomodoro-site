import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { auth } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import AuthModal from './AuthModal';
import { useApp } from '../../context/AppContext';

const MenuContainer = styled.div`
  position: fixed;
  top: 1.5rem;
  right: 2.5rem;
  z-index: 1001;
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const UserName = styled.span`
  color: #6366f1;
  font-weight: 600;
  font-size: 1.1rem;
`;

const Points = styled.span`
  background: #f8e1e7;
  color: #f59e0b;
  border-radius: 999px;
  padding: 0.3em 1em;
  font-weight: 600;
  font-size: 1rem;
`;

const Button = styled.button`
  background: #fff;
  color: #6366f1;
  border: 1.5px solid #6366f1;
  border-radius: 999px;
  padding: 0.5em 1.5em;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #6366f1;
    color: #fff;
  }
`;

export default function UserMenu() {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { state } = useApp();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  return (
    <MenuContainer>
      <Points>Points: {state.points}</Points>
      <UserName>
        {user ? `Welcome, ${user.displayName || user.email}` : 'Welcome, Guest'}
      </UserName>
      {user ? (
        <Button onClick={() => signOut(auth)}>Log Out</Button>
      ) : (
        <Button onClick={() => setShowModal(true)}>Log In / Sign Up</Button>
      )}
      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </MenuContainer>
  );
}
