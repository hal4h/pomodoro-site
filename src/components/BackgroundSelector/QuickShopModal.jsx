import React from 'react';
import styled from 'styled-components';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 1rem;
  padding: 2rem;
  min-width: 320px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
  text-align: center;
`;

const backgrounds = [
  { id: 'background1', url: 'https://ca.pinterest.com/pin/471681760989000148/' },
  { id: 'background2', url: 'https://ca.pinterest.com/pin/471681760989000170/' },
  { id: 'background3', url: 'https://ca.pinterest.com/pin/471681760989000152/' },
  { id: 'animated1', url: 'https://i.pinimg.com/originals/05/e7/89/05e7899ab05dca0994697ee4ad30f105.gif' },
  { id: 'animated2', url: 'https://i.pinimg.com/originals/74/19/07/74190702dacafb832d8791ddbdbbaf7f.gif' },
  { id: 'gif3', url: 'https://i.pinimg.com/originals/f0/cf/30/f0cf30eec1d9d59c4ed229100a3c75d0.gif' },
  { id: 'gif4', url: 'https://i.pinimg.com/originals/30/4c/5d/304c5d998d6ecc3fe0ecbfba8bd2e852.gif' },
  { id: 'gif5', url: 'https://64.media.tumblr.com/51c5de9b2c00fe94e7b826945a32048d/1b04971b7336fa87-67/s640x960/0c98a01a9f681fd6d7121a4d981323a60e5c28c5.gifv' },
  { id: 'gif6', url: 'https://64.media.tumblr.com/d1d5740d7b3a4f76ffbe82a6501ec551/tumblr_pyxzmvNeVX1uxrf48o1_640.gifv' },
  { id: 'gif7', url: 'https://64.media.tumblr.com/9686851d082554b82b1267e08e5ce462/tumblr_pylfncekai1uxrf48o1_640.gifv' },
  { id: 'gif8', url: 'https://64.media.tumblr.com/5d8132706dcd2adbf4957093b37fc267/tumblr_pwe0mm0vhe1uxrf48o1_640.gifv' },
  { id: 'gif9', url: 'https://64.media.tumblr.com/9d6ac393b29122036572c9b901aa707f/1430d8873bb7770a-ad/s640x960/b39876cfe9b528490cab0b4b556a149382f1c657.gifv' },
  { id: 'gif10', url: 'https://44.media.tumblr.com/bc819ef3d117688372cb6c420d43cae8/178387981e008753-43/s640x960_f1/012e0bac1fe0ba32a049cf23e20cc0acaaa6d60e.gifv' },
  { id: 'gif11', url: 'https://i.pinimg.com/originals/c5/ed/de/c5edded5ab81c925e5287d3f01bc7c9a.gif' },
  { id: 'gif12', url: 'https://i.pinimg.com/originals/a4/6f/d3/a46fd3c9ca74d245c72c727f536615d5.gif' },
  { id: 'gif13', url: 'https://64.media.tumblr.com/33b8cecffd69381a6d8485f47fa184d2/e1a196fbbb7e04cd-f3/s640x960/f1896047ef04b9c0dd84b81397cd6ef2efc0e47c.gifv' },
];

const Thumbnails = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
  margin-bottom: 1.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  max-width: 90vw;
`;

const Thumb = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 0.75rem;
  object-fit: cover;
  border: 2px solid ${({ selected }) => (selected ? '#6366f1' : 'transparent')};
  cursor: pointer;
  transition: border 0.2s;
`;

const ShopButton = styled.button`
  margin-top: 1rem;
  background: #6366f1;
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
`;

const QuickShopModal = ({ onClose }) => {
  const { state, dispatch } = useApp();

  const unlockedBackgrounds = backgrounds.filter(bg => state.unlockedBackgrounds.includes(bg.id));

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <h3>Unlocked Backgrounds</h3>
        {unlockedBackgrounds.length === 0 ? (
          <div style={{ color: '#666', marginBottom: '1rem' }}>
            No backgrounds unlocked yet
          </div>
        ) : (
          <Thumbnails>
            {unlockedBackgrounds.map(bg => (
              <Thumb
                key={bg.id}
                src={bg.url}
                selected={state.selectedBackground === bg.id}
                onClick={() => dispatch({ type: 'SELECT_BACKGROUND', payload: bg.id })}
                alt="background preview"
              />
            ))}
          </Thumbnails>
        )}
        <ShopButton onClick={() => { onClose(); dispatch({ type: 'SET_ACTIVE_SECTION', payload: 'shop' }); }}>
          Buy more backgrounds
        </ShopButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default QuickShopModal;
