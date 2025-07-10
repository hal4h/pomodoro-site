import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../Auth/AuthProvider';
import { musicService } from '../../services/supabaseService';

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

const ErrorText = styled.div`
  color: #ef4444;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: center;
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
    embedUrl: 'https://open.spotify.com/embed/episode/1tP0wXxX5P2i9RdpD0N47w?utm_source=generator&theme=0',
  },
  {
    id: 'track4',
    name: 'Study Podcast 4',
    embedUrl: 'https://open.spotify.com/embed/episode/2dutRgYkiKDXBFbLleaCnf?utm_source=generator&theme=0',
  },
];

const Music = () => {
  const { state, dispatch } = useApp();
  const { user } = useAuth();
  const [tracks, setTracks] = useState(defaultTracks);
  const [newTrackUrl, setNewTrackUrl] = useState('');
  const [newTrackName, setNewTrackName] = useState('');
  const [urlError, setUrlError] = useState('');

  // Load tracks from database when user is authenticated
  useEffect(() => {
    if (user) {
      const loadTracks = async () => {
        const { data, error } = await musicService.getUserMusic(user.id);
        if (!error && data) {
          const dbTracks = data.map(track => ({
            id: track.id,
            name: track.track_name,
            embedUrl: track.embed_url
          }));
          setTracks(dbTracks.length > 0 ? dbTracks : defaultTracks);
        }
      };
      loadTracks();
    }
  }, [user]);

  const extractSpotifyEmbedUrl = (url) => {
    try {
      // Handle different Spotify URL formats
      let trackId = '';
      
      if (url.includes('open.spotify.com/embed/')) {
        // Already an embed URL, return as is
        return url.includes('?utm_source=generator&theme=0') ? url : url + '?utm_source=generator&theme=0';
      }
      
      if (url.includes('open.spotify.com/track/')) {
        // Regular track URL
        trackId = url.split('open.spotify.com/track/')[1].split('?')[0];
        return `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`;
      }
      
      if (url.includes('open.spotify.com/playlist/')) {
        // Playlist URL
        trackId = url.split('open.spotify.com/playlist/')[1].split('?')[0];
        return `https://open.spotify.com/embed/playlist/${trackId}?utm_source=generator&theme=0`;
      }
      
      if (url.includes('open.spotify.com/episode/')) {
        // Episode URL
        trackId = url.split('open.spotify.com/episode/')[1].split('?')[0];
        return `https://open.spotify.com/embed/episode/${trackId}?utm_source=generator&theme=0`;
      }
      
      if (url.includes('open.spotify.com/album/')) {
        // Album URL
        trackId = url.split('open.spotify.com/album/')[1].split('?')[0];
        return `https://open.spotify.com/embed/album/${trackId}?utm_source=generator&theme=0`;
      }
      
      // If no pattern matches, return null to indicate error
      return null;
    } catch (error) {
      console.error('Error parsing Spotify URL:', error);
      return null; // Return null if parsing fails
    }
  };

  const handleSelect = (track) => {
    dispatch({ type: 'SET_SELECTED_MUSIC_TRACK', payload: track });
  };

  const handleAddTrack = () => {
    if (!newTrackUrl) {
      setUrlError('Please enter a Spotify URL');
      return;
    }

    const embedUrl = extractSpotifyEmbedUrl(newTrackUrl);
    
    if (!embedUrl) {
      setUrlError('Please enter a valid Spotify URL (track, playlist, album, or episode)');
      return;
    }

    // Clear any previous errors
    setUrlError('');
    
    const name = newTrackName || 'Custom Track';
    const newTrack = {
      id: 'custom-' + Date.now(),
      name,
      embedUrl,
    };
    
    // Add new track to the beginning of the list
    const updatedTracks = [newTrack, ...tracks];
    setTracks(updatedTracks);
    
    // Save to database if user is authenticated
    if (user) {
      musicService.addMusicTrack(user.id, {
        name: newTrack.name,
        embedUrl: newTrack.embedUrl
      });
    }
    
    setNewTrackUrl('');
    setNewTrackName('');
  };

  const handleUrlChange = (e) => {
    setNewTrackUrl(e.target.value);
    // Clear error when user starts typing
    if (urlError) {
      setUrlError('');
    }
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
            placeholder="Paste any Spotify URL here"
            value={newTrackUrl}
            onChange={handleUrlChange}
          />
          <AddButton onClick={handleAddTrack}>Add</AddButton>
        </InputRow>
        <div style={{ fontSize: '0.9rem', color: '#888' }}>
          Paste any Spotify URL (track, playlist, album, or episode) and we'll convert it to an embed
        </div>
        {urlError && <ErrorText>{urlError}</ErrorText>}
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
