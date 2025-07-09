import React from 'react';
import styled from 'styled-components';
import { useApp } from '../../context/AppContext';

const PlayerContainer = styled.div`
  position: fixed;
  right: 2vw;
  bottom: 2vw;
  z-index: 200;
  background: rgba(255,255,255,0.97);
  border-radius: 1.2rem;
  box-shadow: 0 2px 16px rgba(99,102,241,0.13);
  padding: 0.4em 0em 0.4em 0.4em;
  display: flex;
  align-items: center;
  width: 300px;
  @media (max-width: 600px) {
    width: 95vw;
    right: 2vw;
    left: 2vw;
    bottom: 2vw;
    padding: 0.4em 0.2em 0.4em 0.2em;
  }
`;

const Iframe = styled.iframe`
  border-radius: 12px;
  width:260px;
  height: 152px;
  border: none;
  background: #fff;
  @media (max-width: 600px) {
    width: 70vw;
    min-width: 120px;
    height: 100px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #888;
  font-size: 0.8rem;
  cursor: pointer;
  &:hover {
    color: #ef4444;
  }
`;

const ActiveMusicPlayer = () => {
  const { state, dispatch, actions } = useApp();
  if (!state.selectedMusicTrack) return null;
  return (
    <PlayerContainer>
      <Iframe
        src={state.selectedMusicTrack.embedUrl}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title={state.selectedMusicTrack.name}
      />
            <CloseButton onClick={() => dispatch({ type: actions.CLEAR_SELECTED_MUSIC_TRACK })} title="Close">×</CloseButton>
    </PlayerContainer>
  );
};

export default ActiveMusicPlayer; 