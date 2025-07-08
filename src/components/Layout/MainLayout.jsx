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
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  min-width: 100vw;
  background: ${({ backgroundColor, backgroundImage }) =>
    backgroundImage
      ? `url(${backgroundImage})`
      : backgroundColor};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: background 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  position: relative;
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
`;

const QuickShopButton = styled.button`
  background: #fff;
  color: #6366f1;
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
    background: #ffe3ec;
    color: #222;
  }
`;

const MainLayout = () => {
  const { state } = useApp();
  const [showQuickShop, setShowQuickShop] = React.useState(false);

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
          <QuickShopButton onClick={() => setShowQuickShop(true)}>
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