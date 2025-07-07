import React from 'react';
import styled from 'styled-components';
import Sidebar from '../Sidebar/Sidebar';
import Timer from '../Timer/Timer';
import Shop from '../Shop/Shop';
import Music from '../Music/Music';
import Tasks from '../Tasks/Tasks';
import { useApp } from '../../context/AppContext';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ backgroundImage }) => 
    backgroundImage ? `url(${backgroundImage})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: background-image 0.5s ease-in-out;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(2px);
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 800px;
`;

const MainLayout = () => {
  const { state } = useApp();

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
        return <Timer />;
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
    <LayoutContainer backgroundImage={getBackgroundImage()}>
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