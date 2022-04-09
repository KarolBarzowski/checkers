import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { database } from 'helpers/firebase';
import { Canvas } from 'react-three-fiber';
import Board from 'components/Board';
import Decorations from 'components/Decorations';
import CameraControls from 'utils/CameraControls';

const ButtonsWrapper = styled.div`
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 1;
`;

const Button = styled.button``;

const StyledCanvas = styled(Canvas)`
  filter: blur(0.5rem);
`;

function Game({ match }) {
  const [isReset, setIsReset] = useState(0);
  const [isMoved, setIsMoved] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isGame, setIsGame] = useState(false);
  const [isRedirect, setIsRedirect] = useState(false);

  useEffect(() => {
    const { key } = match.params;

    const serverRef = database.ref(`checkers/servers/${key}`);

    serverRef.once('value', (snapshot) => {
      if (snapshot.val()) {
        serverRef.child('players').push({
          name: 'Karol', // CHANGE
        });
      } else {
        setIsRedirect(true);
      }
    });
  }, [match]);

  const handleReset = () => {
    setIsReset((prevState) => prevState + 1);
  };

  const handleLock = () => {
    setIsLocked((prevState) => !prevState);
  };

  if (isRedirect) return <Redirect to="/" />;

  return (
    <>
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
      <StyledCanvas
        style={{ height: '100vh', width: '100%' }}
        camera={{
          position: [0, Math.PI / 2, Math.PI],
        }}
      >
        <CameraControls
          isReset={isReset}
          setIsMoved={setIsMoved}
          isLocked={isLocked}
          isRotate={!isGame}
        />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Board />
        <Decorations />
      </StyledCanvas>
    </>
  );
}

export default Game;
