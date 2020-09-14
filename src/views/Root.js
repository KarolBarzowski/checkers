import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Canvas } from 'react-three-fiber';
import Board from 'components/Board';
import CameraControls from 'utils/CameraControls';
import GlobalStyle from 'theme/GlobalStyle';

const ButtonsWrapper = styled.div`
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 1;
`;

const Button = styled.button``;

function Root() {
  const [isReset, setIsReset] = useState(0);
  const [isMoved, setIsMoved] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const handleReset = () => {
    setIsReset((prevState) => prevState + 1);
  };

  const handleLock = () => {
    setIsLocked((prevState) => !prevState);
  };

  return (
    <>
      <Helmet>
        <title>Warcaby</title>
        <meta name="title" content="Warcaby" data-react-helmet="true" />
        <meta name="description" content="Warcaby w 3d" />
      </Helmet>
      <GlobalStyle />
      <ButtonsWrapper>
        {isMoved ? (
          <Button type="button" onClick={handleReset}>
            Reset
          </Button>
        ) : null}

        <Button type="button" onClick={handleLock}>
          {isLocked ? 'Unlock' : 'Lock'}
        </Button>
      </ButtonsWrapper>
      <Canvas
        style={{ height: '100vh', width: '100%' }}
        camera={{
          position: [0, Math.PI / 2, Math.PI],
        }}
      >
        <CameraControls isReset={isReset} setIsMoved={setIsMoved} isLocked={isLocked} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Board />
      </Canvas>
    </>
  );
}

export default Root;
