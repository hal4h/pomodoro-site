import React from 'react';
import styled from 'styled-components';
import Sidebar from '../Sidebar/Sidebar';
import Timer from '../Timer/Timer';
import Shop from '../Shop/Shop';
import Music from '../Music/Music';
import Tasks from '../Tasks/Tasks';
import { useApp } from '../../context/AppContext';
import PastelColorPicker from '../BackgroundSelector/PastelColorPicker';
import QuickShopModal from '../BackgroundSelector/QuickShopModal';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100vw;
  background: ${({ backgroundColor, backgroundImage }) =>
    backgroundImage
      ? `url(${backgroundImage})`
      : backgroundColor};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: background 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  @media (max-width: 900px) {
    flex-direction: column;
    width: 100vw;
    min-height: 100vh;
  }
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  position: relative;
  padding-top: 2.5rem;
  @media (max-width: 900px) {
    padding: 1.5rem 0.5rem 1.5rem 0.5rem;
    flex-direction: column;
    min-height: 80vh;
    width: 100vw;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 900px) {
    width: 100vw;
    padding: 0 0.5rem;
  }
`;

const QuickShopButton = styled.button`
  background: #fff;
  color: ${({ accentColor }) => accentColor || '#6366f1'};
  border: none;
  border-radius: 999px;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  margin: 1.5rem 0 0.5rem 0;
  box-shadow: 0 2px 8px rgba(99,102,241,0.07);
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: ${({ hoverColor }) => hoverColor || '#ffe3ec'};
    color: #222;
  }
`;

const MainLayout = () => {
  const { state, dispatch } = useApp();
  const [showQuickShop, setShowQuickShop] = React.useState(false);

  // Function to get darker version of current background color
  const getDarkerAccentColor = (backgroundColor) => {
    // Simple darkening logic - you can make this more sophisticated
    if (backgroundColor.startsWith('#')) {
      const hex = backgroundColor.slice(1);
      const r = Math.max(0, parseInt(hex.substr(0, 2), 16) - 40);
      const g = Math.max(0, parseInt(hex.substr(2, 2), 16) - 40);
      const b = Math.max(0, parseInt(hex.substr(4, 2), 16) - 40);
      return `rgb(${r}, ${g}, ${b})`;
    }
    return '#6366f1'; // fallback
  };

  const getBackgroundImage = () => {
    switch (state.selectedBackground) {
      case 'default':
        return null;
      case 'background1':
        return 'https://ca.pinterest.com/pin/471681760989000148/';
      case 'background2':
        return 'https://ca.pinterest.com/pin/471681760989000170/';
      case 'background3':
        return 'https://ca.pinterest.com/pin/471681760989000152/';
      case 'animated1':
        return 'https://i.pinimg.com/originals/05/e7/89/05e7899ab05dca0994697ee4ad30f105.gif';
      case 'animated2':
        return 'https://i.pinimg.com/originals/74/19/07/74190702dacafb832d8791ddbdbbaf7f.gif';
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (state.activeSection) {
      case 'timer':
        return <>
          <PastelColorPicker />
          <QuickShopButton 
            onClick={() => setShowQuickShop(true)}
            accentColor={getDarkerAccentColor(state.backgroundColor)}
            hoverColor={state.backgroundColor}
          >
            🎨 Quick Shop
          </QuickShopButton>
          {showQuickShop && <QuickShopModal onClose={() => setShowQuickShop(false)} />}
          <Timer />
        </>;
      case 'shop':
        return <Shop />;
      case 'music':
        return <Music />;
      case 'tasks':
        return <Tasks />;
      default:
        return <Timer />;
    }
  };

  return (
    <LayoutContainer backgroundColor={state.backgroundColor} backgroundImage={getBackgroundImage()}>
      <Sidebar />
      <MainContent>
        <ContentWrapper>
          {renderContent()}
        </ContentWrapper>
      </MainContent>
    </LayoutContainer>
  );
};

export default MainLayout;