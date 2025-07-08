import React from 'react';
import styled from 'styled-components';
import { useApp } from '../../context/AppContext';

const pastelColors = [
  '#f8e1e7', // pink
  '#e0f7fa', // light blue
  '#f9fbe7', // light yellow
  '#e1f5e7', // mint
  '#f3e5f5', // lavender
  '#fffde7', // cream
];

const ColorRow = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin: 2rem 0;
`;

const ColorCircle = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid ${({ selected }) => (selected ? '#6366f1' : 'transparent')};
  background: ${({ color }) => color};
  cursor: pointer;
  outline: none;
  transition: border 0.2s;
`;

const PastelColorPicker = () => {
  const { state, dispatch, actions } = useApp();

  return (
    <ColorRow>
      {pastelColors.map((color) => (
        <ColorCircle
          key={color}
          color={color}
          selected={state.backgroundColor === color}
          onClick={() => dispatch({ type: actions.SET_BACKGROUND_COLOR, payload: color })}
          aria-label={`Select background color ${color}`}
        />
      ))}
    </ColorRow>
  );
};

export default PastelColorPicker;
