import React, { useState } from 'react';
import styled from 'styled-components';
import { auth } from '../../firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 1.2rem;
  padding: 2.5rem 2rem;
  min-width: 320px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
  text-align: center;
`;

const Input = styled.input`
  width: 90%;
  margin: 0.5rem 0;
  padding: 0.7rem;
  border-radius: 0.5rem;
  border: 1px solid #eee;
  font-size: 1rem;
`;

const Button = styled.button`
  background: #6366f1;
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 0.7rem 2rem;
  font-size: 1rem;
  margin: 0.5rem 0.5rem 0.5rem 0;
  cursor: pointer;
  transition: background 0.2s;
  &:hover { background: #8b5cf6; }
`;

const SwitchLink = styled.button`
  background: none;
  border: none;
  color: #6366f1;
  margin-top: 1rem;
  cursor: pointer;
  font-size: 0.95rem;
  text-decoration: underline;
`;

export default function AuthModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <h2 style={{ color: '#6366f1', marginBottom: '1.5rem' }}>
          {isRegister ? 'Sign Up' : 'Sign In'}
        </h2>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Button type="submit">{isRegister ? "Sign Up" : "Sign In"}</Button>
        </form>
        <Button onClick={handleGoogleSignIn}>Sign in with Google</Button>
        <SwitchLink onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Already have an account? Sign In" : "Need an account? Sign Up"}
        </SwitchLink>
        {error && <p style={{ color: "red", marginTop: '1rem' }}>{error}</p>}
      </ModalContent>
    </ModalOverlay>
  );
}
