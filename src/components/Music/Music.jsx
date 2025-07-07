import React, { useState } from 'react';
import styled from 'styled-components';
import { FiMusic, FiPlus, FiPlay, FiPause } from 'react-icons/fi';
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

const AddMusicSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const InputGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  padding: 0.75rem;
  color: white;
  font-size: 1rem;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: #6366f1;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const PlaylistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const PlaylistCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  }
`;

const SpotifyEmbed = styled.div`
  width: 100%;
  height: 352px;
  border-radius: 0.5rem;
  overflow: hidden;
`;

const PlaylistInfo = styled.div`
  padding: 1.5rem;
`;

const PlaylistName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PlaylistDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`;

const defaultPlaylists = [
  {
    id: 1,
    name: 'Focus & Concentration',
    description: 'Instrumental music for deep work',
    embedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX8NTLI2TtZa6',
  },
  {
    id: 2,
    name: 'Lo-Fi Study Beats',
    description: 'Chill beats for studying and relaxation',
    embedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX8NTLI2TtZa6',
  },
  {
    id: 3,
    name: 'Nature Sounds',
    description: 'Peaceful nature ambience',
    embedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX8NTLI2TtZa6',
  },
];

const Music = () => {
  const [playlists, setPlaylists] = useState(defaultPlaylists);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistUrl, setNewPlaylistUrl] = useState('');

  const addPlaylist = () => {
    if (newPlaylistName && newPlaylistUrl) {
      const newPlaylist = {
        id: Date.now(),
        name: newPlaylistName,
        description: 'Custom playlist',
        embedUrl: newPlaylistUrl,
      };
      setPlaylists([...playlists, newPlaylist]);
      setNewPlaylistName('');
      setNewPlaylistUrl('');
    }
  };

  const extractSpotifyEmbedUrl = (url) => {
    // Convert Spotify share URL to embed URL
    if (url.includes('spotify.com/track/')) {
      return url.replace('spotify.com/track/', 'open.spotify.com/embed/track/');
    }
    if (url.includes('spotify.com/playlist/')) {
      return url.replace('spotify.com/playlist/', 'open.spotify.com/embed/playlist/');
    }
    if (url.includes('spotify.com/album/')) {
      return url.replace('spotify.com/album/', 'open.spotify.com/embed/album/');
    }
    return url;
  };

  return (
    <MusicContainer>
      <MusicHeader>
        <h2>Music & Focus</h2>
        <p>Enhance your productivity with curated playlists</p>
      </MusicHeader>
      
      <AddMusicSection>
        <h3 style={{ marginBottom: '1rem', color: 'white' }}>Add Your Own Playlist</h3>
        <InputGroup>
          <Input
            type="text"
            placeholder="Playlist Name"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
          />
          <Input
            type="url"
            placeholder="Spotify URL or Embed URL"
            value={newPlaylistUrl}
            onChange={(e) => setNewPlaylistUrl(e.target.value)}
          />
          <Button onClick={addPlaylist}>
            <FiPlus />
            Add
          </Button>
        </InputGroup>
        <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)' }}>
           Tip: You can paste any Spotify track, playlist, or album URL
        </p>
      </AddMusicSection>
      
      <PlaylistGrid>
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist.id}>
            <SpotifyEmbed>
              <iframe
                src={extractSpotifyEmbedUrl(playlist.embedUrl)}
                width="100%"
                height="352"
                frameBorder="0"
                allow="encrypted-media"
                title={playlist.name}
              />
            </SpotifyEmbed>
            <PlaylistInfo>
              <PlaylistName>
                <FiMusic />
                {playlist.name}
              </PlaylistName>
              <PlaylistDescription>{playlist.description}</PlaylistDescription>
            </PlaylistInfo>
          </PlaylistCard>
        ))}
      </PlaylistGrid>
    </MusicContainer>
  );
};

export default Music;
