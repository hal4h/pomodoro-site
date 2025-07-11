import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from './AuthProvider';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 1rem;
  padding: 2rem;
  min-width: 320px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #eee;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #6366f1;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
`;

const Button = styled.button`
  background: #6366f1;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #8b5cf6;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #6366f1;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 1rem;
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const SuccessMessage = styled.div`
  color: #10b981;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const LoginModal = ({ onClose }) => {
  const { signIn, signUp } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { data, error } = isSignUp 
        ? await signUp(email, password)
        : await signIn(email, password);

      if (error) {
        setError(error.message);
      } else if (isSignUp) {
        setSuccess('Check your email to confirm your account!');
      } else {
        onClose();
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center', color: '#333' }}>
          {isSignUp ? 'Create Account' : 'Welcome to Pomoverse'}
        </h2>
        
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <IconWrapper>
              <FiMail />
            </IconWrapper>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ paddingLeft: '2.5rem' }}
            />
          </InputGroup>

          <InputGroup>
            <IconWrapper>
              <FiLock />
            </IconWrapper>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </PasswordToggle>
          </InputGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}

          <Button type="submit" disabled={loading}>
            {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </Button>
        </Form>

        <ToggleButton
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
        </ToggleButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default LoginModal; 