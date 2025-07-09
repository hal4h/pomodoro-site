import React, { useState } from 'react';
import styled from 'styled-components';
import { useApp } from '../../context/AppContext';

const MusicContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem 1rem 1rem;
`;

const MusicHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
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
    color: rgba(60, 60, 60, 0.8);
  }
`;

const AddMusicSection = styled.div`
  background: rgba(255,255,255,0.13);
  border-radius: 1rem;
  padding: 1.2rem 1.5rem 1.2rem 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 8px rgba(99,102,241,0.07);
`;

const InputRow = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  max-width: 500px;
  margin-bottom: 0.5rem;
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

const TrackScrollRow = styled.div`
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
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
  min-width: 320px;
  max-width: 340px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const defaultTracks = [
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
  const [tracks, setTracks] = useState(defaultTracks);
  const [newTrackUrl, setNewTrackUrl] = useState('');
  const [newTrackName, setNewTrackName] = useState('');

  const handleSelect = (track) => {
    dispatch({ type: actions.SET_SELECTED_MUSIC_TRACK, payload: track });
  };

  const handleAddTrack = () => {
    if (!newTrackUrl) return;
    const name = newTrackName || 'Custom Track';
    setTracks([
      ...tracks,
      {
        id: 'custom-' + Date.now(),
        name,
        embedUrl: newTrackUrl,
      },
    ]);
    setNewTrackUrl('');
    setNewTrackName('');
  };

  return (
    <MusicContainer>
      <MusicHeader>
        <h2>Music & Focus</h2>
        <p>Pick a track to play in the background while you study</p>
      </MusicHeader>
      <AddMusicSection>
        <InputRow>
          <Input
            type="text"
            placeholder="Track name (optional)"
            value={newTrackName}
            onChange={e => setNewTrackName(e.target.value)}
          />
          <Input
            type="url"
            placeholder="Paste Spotify embed URL here"
            value={newTrackUrl}
            onChange={e => setNewTrackUrl(e.target.value)}
          />
          <AddButton onClick={handleAddTrack}>Add</AddButton>
        </InputRow>
        <div style={{ fontSize: '0.9rem', color: '#888' }}>
          Paste a Spotify playlist or podcast embed link (click "Share" → "Embed")
        </div>
      </AddMusicSection>
      <TrackScrollRow>
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
      </TrackScrollRow>
    </MusicContainer>
  );
};

export default Music;
