import React from 'react';
import styled from 'styled-components';
import { useApp } from '../../context/AppContext';

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin: 2.5rem 0 1rem 0;
  color: #6366f1;
  letter-spacing: 0.05em;
`;

const ScrollRow = styled.div`
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
`;

const BackgroundCard = styled.div`
  min-width: 220px;
  max-width: 220px;
  background: rgba(255,255,255,0.12);
  border-radius: 1rem;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 8px rgba(99,102,241,0.07);
`;

const BackgroundPreview = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 1rem 1rem 0 0;
`;

const BackgroundInfo = styled.div`
  padding: 1rem;
  text-align: center;
`;

const UnlockButton = styled.button`
  margin-top: 0.5rem;
  background: #6366f1;
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
`;

const ShopContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0.2rem 0rem 1rem  1rem;
  box-sizing: border-box;
  @media (max-width: 600px) {
    padding: 2.5rem 0.5rem 1rem 0.5rem;
  }
`;

const pixelArtBackgrounds = [
  { id: 'background1', name: 'Mountain Sunset', description: 'Peaceful mountain landscape', imageUrl: 'https://ca.pinterest.com/pin/471681760989000148/', price: 50 },
  { id: 'background2', name: 'Ocean Waves', description: 'Calming ocean waves', imageUrl: 'https://ca.pinterest.com/pin/471681760989000170/', price: 75 },
  { id: 'background3', name: 'Forest Path', description: 'Serene forest path', imageUrl: 'https://ca.pinterest.com/pin/471681760989000152/', price: 100 },
  { id: 'animated1', name: 'Animated Galaxy', description: 'Dynamic galaxy animation', imageUrl: 'https://i.pinimg.com/originals/05/e7/89/05e7899ab05dca0994697ee4ad30f105.gif', price: 150 },
  { id: 'animated2', name: 'Animated Ocean', description: 'Moving ocean waves animation', imageUrl: 'https://i.pinimg.com/originals/74/19/07/74190702dacafb832d8791ddbdbbaf7f.gif', price: 200 },
  { id: 'gif3', name: 'Pastel Library', description: 'Animated pastel library', imageUrl: 'https://i.pinimg.com/originals/f0/cf/30/f0cf30eec1d9d59c4ed229100a3c75d0.gif', price: 120 },
  { id: 'gif4', name: 'Pink Room', description: 'Animated pink room', imageUrl: 'https://i.pinimg.com/originals/30/4c/5d/304c5d998d6ecc3fe0ecbfba8bd2e852.gif', price: 120 },
  { id: 'gif5', name: 'Cozy Desk', description: 'Cozy animated desk', imageUrl: 'https://64.media.tumblr.com/51c5de9b2c00fe94e7b826945a32048d/1b04971b7336fa87-67/s640x960/0c98a01a9f681fd6d7121a4d981323a60e5c28c5.gifv', price: 120 },
  { id: 'gif6', name: 'Night Library', description: 'Nighttime library animation', imageUrl: 'https://64.media.tumblr.com/d1d5740d7b3a4f76ffbe82a6501ec551/tumblr_pyxzmvNeVX1uxrf48o1_640.gifv', price: 120 },
  { id: 'gif7', name: 'Lavender Study', description: 'Lavender themed study animation', imageUrl: 'https://64.media.tumblr.com/9686851d082554b82b1267e08e5ce462/tumblr_pylfncekai1uxrf48o1_640.gifv', price: 120 },
  { id: 'gif8', name: 'Window Desk', description: 'Desk by the window animation', imageUrl: 'https://64.media.tumblr.com/5d8132706dcd2adbf4957093b37fc267/tumblr_pwe0mm0vhe1uxrf48o1_640.gifv', price: 120 },
  { id: 'gif9', name: 'Pink Night', description: 'Pink night animated background', imageUrl: 'https://64.media.tumblr.com/9d6ac393b29122036572c9b901aa707f/1430d8873bb7770a-ad/s640x960/b39876cfe9b528490cab0b4b556a149382f1c657.gifv', price: 120 },
  { id: 'gif10', name: 'Blue Night', description: 'Blue night animated background', imageUrl: 'https://44.media.tumblr.com/bc819ef3d117688372cb6c420d43cae8/178387981e008753-43/s640x960_f1/012e0bac1fe0ba32a049cf23e20cc0acaaa6d60e.gifv', price: 120 },
  { id: 'gif11', name: 'Cozy Cat', description: 'Cozy cat animation', imageUrl: 'https://i.pinimg.com/originals/c5/ed/de/c5edded5ab81c925e5287d3f01bc7c9a.gif', price: 120 },
  { id: 'gif12', name: 'Dreamy Desk', description: 'Dreamy desk animation', imageUrl: 'https://i.pinimg.com/originals/a4/6f/d3/a46fd3c9ca74d245c72c727f536615d5.gif', price: 120 },
  { id: 'gif13', name: 'Purple Night', description: 'Purple night animated background', imageUrl: 'https://64.media.tumblr.com/33b8cecffd69381a6d8485f47fa184d2/e1a196fbbb7e04cd-f3/s640x960/f1896047ef04b9c0dd84b81397cd6ef2efc0e47c.gifv', price: 120 },
];

const persianRugBackgrounds = [
  { id: 'rug1', name: 'Persian Rug 1', description: 'Classic Persian rug', imageUrl: 'https://i.pinimg.com/736x/13/19/b5/1319b57cecad2eb780e413f851c1eff1.jpg', price: 80 },
  { id: 'rug2', name: 'Persian Rug 2', description: 'Elegant Persian rug', imageUrl: 'https://i.pinimg.com/736x/74/50/a7/7450a7a4ec496b819e2be7d7cfe7f000.jpg', price: 80 },
  { id: 'rug3', name: 'Persian Rug 3', description: 'Red Persian rug', imageUrl: 'https://i.pinimg.com/736x/1f/af/af/1fafaf8d3d4e673a9c6ecf3dfc56b4c9.jpg', price: 80 },
  { id: 'rug4', name: 'Persian Rug 4', description: 'Blue Persian rug', imageUrl: 'https://i.pinimg.com/736x/c7/5d/45/c75d4556532d65664f7b36356c219878.jpg', price: 80 },
  { id: 'rug5', name: 'Persian Rug 5', description: 'Green Persian rug', imageUrl: 'https://i.pinimg.com/736x/b8/1a/fd/b81afda3c9426976561344e61a701d2b.jpg', price: 80 },
  { id: 'rug6', name: 'Persian Rug 6', description: 'Vintage Persian rug', imageUrl: 'https://i.pinimg.com/736x/86/6b/56/866b560bc3540177fcdfdd0fbd064d3a.jpg', price: 80 },
];

const Shop = () => {
  const { state, dispatch, actions } = useApp();

  const handleUnlock = (backgroundId, price) => {
    if (state.points >= price) {
      dispatch({ type: actions.UNLOCK_BACKGROUND, payload: backgroundId });
      dispatch({ type: actions.ADD_POINTS, payload: -price });
    }
  };

  const handleSelect = (backgroundId) => {
    dispatch({ type: actions.SELECT_BACKGROUND, payload: backgroundId });
  };

  const renderRow = (backgrounds) => (
    <ScrollRow>
      {backgrounds.map((bg) => {
        const isUnlocked = state.unlockedBackgrounds.includes(bg.id);
        const isSelected = state.selectedBackground === bg.id;
        const canAfford = state.points >= bg.price;
        return (
          <BackgroundCard key={bg.id}>
            <BackgroundPreview src={bg.imageUrl} alt={bg.name} />
            <BackgroundInfo>
              <div style={{ fontWeight: 600 }}>{bg.name}</div>
              <div style={{ fontSize: '0.9rem', color: '#888', margin: '0.5rem 0' }}>{bg.description}</div>
              <div style={{ color: '#f59e0b', fontSize: '0.95rem' }}>{bg.price} points</div>
              {isUnlocked ? (
                <UnlockButton onClick={() => handleSelect(bg.id)} style={{ background: isSelected ? '#10b981' : '#6366f1' }}>
                  {isSelected ? 'Selected' : 'Select'}
                </UnlockButton>
              ) : (
                <UnlockButton onClick={() => handleUnlock(bg.id, bg.price)} disabled={!canAfford}>
                  {canAfford ? 'Unlock' : 'Not enough points'}
                </UnlockButton>
              )}
            </BackgroundInfo>
          </BackgroundCard>
        );
      })}
    </ScrollRow>
  );

  return (
    <ShopContainer>
      <SectionTitle>Pixel Art Backgrounds</SectionTitle>
      {renderRow(pixelArtBackgrounds)}
      <SectionTitle>Persian Rug Backgrounds</SectionTitle>
      {renderRow(persianRugBackgrounds)}
    </ShopContainer>
  );
};

export default Shop;
