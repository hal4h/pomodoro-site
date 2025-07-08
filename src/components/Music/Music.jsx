import React from 'react';
import styled from 'styled-components';
import { useApp } from '../../context/AppContext';

const MusicContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const MusicHeader = styled.div`
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

const TrackGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
`;

const TrackCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(99,102,241,0.07);
  position: relative;
  outline: ${({ selected }) => (selected ? '2.5px solid #6366f1' : 'none')};
`;

const SelectButton = styled.button`
  margin: 1rem auto 1rem auto;
  display: block;
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

const tracks = [
  {
    id: 'track1',
    name: 'Study Podcast 1',
    embedUrl: 'https://open.spotify.com/embed/episode/5vGcCCUIifZu9SNwbCV32M?utm_source=generator&theme=0',
  },
  {
    id: 'track2',
    name: 'Study Podcast 2',
    embedUrl: 'https://open.spotify.com/embed/episode/2hoxwSlc4S52rsgSnUPjcv?utm_source=generator&theme=0',
  },
  {
    id: 'track3',
    name: 'Study Podcast 3',
    embedUrl: 'https://open.spotify.com/embed/episode/1tP0wXxX5P2i9RdpD0N47w?utm_source=generator',
  },
  {
    id: 'track4',
    name: 'Study Podcast 4',
    embedUrl: 'https://open.spotify.com/embed/episode/2dutRgYkiKDXBFbLleaCnf?utm_source=generator&theme=0',
  },
];

const Music = () => {
  const { state, dispatch, actions } = useApp();

  const handleSelect = (track) => {
    dispatch({ type: actions.SET_SELECTED_MUSIC_TRACK, payload: track });
  };

  return (
    <MusicContainer>
      <MusicHeader>
        <h2>Music & Focus</h2>
        <p>Pick a track to play in the background while you study</p>
      </MusicHeader>
      <TrackGrid>
        {tracks.map((track) => (
          <TrackCard key={track.id} selected={state.selectedMusicTrack && state.selectedMusicTrack.id === track.id}>
            <iframe
              style={{ borderRadius: '12px', width: '100%', minHeight: 152, border: 0 }}
              src={track.embedUrl}
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title={track.name}
            />
            <SelectButton onClick={() => handleSelect(track)}>
              {state.selectedMusicTrack && state.selectedMusicTrack.id === track.id ? 'Selected' : 'Select'}
            </SelectButton>
          </TrackCard>
        ))}
      </TrackGrid>
    </MusicContainer>
  );
};

export default Music;
