import React from 'react';
import styled from 'styled-components';
import { FiLock, FiUnlock, FiCheck } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';

const ShopContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const ShopHeader = styled.div`
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

const BackgroundsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const BackgroundCard = styled.div`
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

const BackgroundPreview = styled.div`
  height: 200px;
  background: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
  }
`;

const BackgroundInfo = styled.div`
  padding: 1.5rem;
`;

const BackgroundName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: white;
`;

const BackgroundDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const UnlockButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${({ unlocked, canAfford }) => {
    if (unlocked) return 'linear-gradient(135deg, #10b981, #059669)';
    if (canAfford) return 'linear-gradient(135deg, #6366f1, #8b5cf6)';
    return 'rgba(255, 255, 255, 0.1)';
  }};
  color: white;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const PriceTag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: #f59e0b;
  margin-bottom: 0.5rem;
`;

const backgrounds = [
  {
    id: 'background1',
    name: 'Mountain Sunset',
    description: 'Peaceful mountain landscape with warm sunset colors',
    imageUrl: 'https://ca.pinterest.com/pin/471681760989000148/',
    price: 50,
  },
  {
    id: 'background2',
    name: 'Ocean Waves',
    description: 'Calming ocean waves with blue gradient',
    imageUrl: 'https://ca.pinterest.com/pin/471681760989000170/',
    price: 75,
  },
  {
    id: 'background3',
    name: 'Forest Path',
    description: 'Serene forest path with natural lighting',
    imageUrl: 'https://ca.pinterest.com/pin/471681760989000152/',
    price: 100,
  },
  {
    id: 'animated1',
    name: 'Animated Galaxy',
    description: 'Dynamic galaxy animation with stars',
    imageUrl: 'https://i.pinimg.com/originals/05/e7/89/05e7899ab05dca0994697ee4ad30f105.gif',
    price: 150,
  },
  {
    id: 'animated2',
    name: 'Animated Ocean',
    description: 'Moving ocean waves animation',
    imageUrl: 'https://i.pinimg.com/originals/74/19/07/74190702dacafb832d8791ddbdbbaf7f.gif',
    price: 200,
  },
];

const Shop = () => {
  const { state, dispatch, actions } = useApp();

  const handleUnlock = (backgroundId) => {
    const background = backgrounds.find(bg => bg.id === backgroundId);
    if (background && state.points >= background.price) {
      dispatch({ type: actions.UNLOCK_BACKGROUND, payload: backgroundId });
      dispatch({ type: actions.ADD_POINTS, payload: -background.price });
    }
  };

  const handleSelect = (backgroundId) => {
    dispatch({ type: actions.SELECT_BACKGROUND, payload: backgroundId });
  };

  return (
    <ShopContainer>
      <ShopHeader>
        <h2>Background Shop</h2>
        <p>Unlock beautiful backgrounds to enhance your focus sessions</p>
      </ShopHeader>
      
      <BackgroundsGrid>
        {backgrounds.map((background) => {
          const isUnlocked = state.unlockedBackgrounds.includes(background.id);
          const isSelected = state.selectedBackground === background.id;
          const canAfford = state.points >= background.price;
          
          return (
            <BackgroundCard key={background.id}>
              <BackgroundPreview imageUrl={background.imageUrl} />
              <BackgroundInfo>
                <BackgroundName>{background.name}</BackgroundName>
                <BackgroundDescription>{background.description}</BackgroundDescription>
                
                {!isUnlocked && (
                  <PriceTag>
                    <span>💰</span>
                    {background.price} points
                  </PriceTag>
                )}
                
                <UnlockButton
                  unlocked={isUnlocked}
                  canAfford={canAfford}
                  disabled={!isUnlocked && !canAfford}
                  onClick={() => isUnlocked ? handleSelect(background.id) : handleUnlock(background.id)}
                >
                  {isUnlocked ? (
                    <>
                      {isSelected ? <FiCheck /> : <FiUnlock />}
                      {isSelected ? 'Selected' : 'Select Background'}
                    </>
                  ) : (
                    <>
                      <FiLock />
                      {canAfford ? 'Unlock' : 'Not Enough Points'}
                    </>
                  )}
                </UnlockButton>
              </BackgroundInfo>
            </BackgroundCard>
          );
        })}
      </BackgroundsGrid>
    </ShopContainer>
  );
};

export default Shop;
