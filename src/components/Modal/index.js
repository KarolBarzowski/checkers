import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { database } from 'helpers/firebase';

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 60rem;
  min-height: 60rem;
  max-height: 80vh;
  z-index: 10;
  padding: 2.5rem;
  border-radius: 1.5rem;
  background-color: ${({ theme }) => theme.backgroundSecondary};
  overflow-y: scroll;
`;

const Column = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: ${({ left }) => (left ? 'flex-start' : 'center')};
`;

const Heading = styled.h1`
  font-size: 3.4rem;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  color: ${({ theme }) => theme.text};
`;

const Paragraph = styled.p`
  font-size: 2.1rem;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
  color: ${({ theme, secondary }) => (secondary ? theme.textSecondary : theme.text)};
  margin: 0 0 0.5rem;
`;

const PlayerName = styled.p`
  position: relative;
  font-size: 1.6rem;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
  color: ${({ theme, secondary }) => (secondary ? theme.textSecondary : theme.text)};
  margin: 0 0 0.5rem 1.2rem;

  ::before {
    content: '';
    position: absolute;
    left: -1.2rem;
    top: 50%;
    transform: translateY(-50%);
    height: 0.8rem;
    width: 0.8rem;
    background-color: ${({ theme }) => theme.green};
    border-radius: 50%;
  }
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.blue};
  border-radius: 0.5rem;
  padding: 1rem 1.5rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.6rem;
  font-weight: 500;
  cursor: pointer;

  :hover:not(:disabled) {
    background-color: ${({ theme }) => theme.blueHover};
  }

  :disabled {
    opacity: 0.38;
    cursor: default;
  }
`;

const List = styled.ul`
  padding: 0;
  list-style-type: none;
  width: 100%;
`;

const ListItem = styled.li`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 6.4rem;
  width: 100%;
  padding: 1rem 1.5rem;
  background-color: rgba(255, 255, 255, 0.08);
  border-radius: 0.5rem;
  margin: 1rem 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  ${Button} {
    margin-left: 1rem;
  }
`;

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

function Modal() {
  const [servers, setServers] = useState([]);
  const [isUpdate, setIsUpdate] = useState(0);
  const [id, setId] = useState(0);
  const [isRedirect, setIsRedirect] = useState(false);
  const [key, setKey] = useState(null);

  useEffect(() => {
    const serversRef = database.ref('checkers/servers');

    const results = [];

    serversRef.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const { id, name, players = {} } = childSnapshot.val();
        results.push({
          id,
          name,
          players: Object.keys(players).length,
          key: childSnapshot.key,
        });
      });

      setId(Object.keys(snapshot.val()).length);
    });

    setServers(results);
  }, [isUpdate]);

  useEffect(() => {
    const serversRef = database.ref('checkers/servers');

    serversRef.on('child_added', () => {
      setIsUpdate((prevState) => prevState + 1);
    });

    serversRef.on('child_changed', () => {
      setIsUpdate((prevState) => prevState + 1);
    });

    serversRef.on('child_removed', () => {
      setIsUpdate((prevState) => prevState + 1);
    });
  }, []);

  useEffect(() => {
    if (key) {
      setIsRedirect(true);
    }
  }, [key]);

  const handleCreateServer = () => {
    const serversRef = database.ref('checkers/servers');

    serversRef.push({
      name: 'Gra nr ',
      id: id + 1,
    });
  };

  const handleJoin = (k) => {
    setKey(k);
  };

  if (isRedirect) return <Redirect to={`/${key}`} />;

  return (
    <Wrapper>
      <Column>
        <Heading>Dołącz do gry</Heading>
        <Button type="button" onClick={handleCreateServer}>
          Stwórz nową grę
        </Button>
      </Column>
      <Column left>
        <Paragraph>Wszystkie gry</Paragraph>
        {servers.length ? (
          <List>
            {servers.map(({ id, key, players }) => (
              <ListItem key={key}>
                <Paragraph>Gra nr {id}</Paragraph>
                <Row>
                  <Paragraph>{players}/2</Paragraph>
                  <Button type="button" onClick={() => handleJoin(key)} disabled={players >= 2}>
                    Dołącz
                  </Button>
                </Row>
              </ListItem>
            ))}
          </List>
        ) : (
          <Paragraph secondary>
            Brak serwerów{' '}
            <span role="img" aria-label="Smutna buźka">
              🙁
            </span>
          </Paragraph>
        )}
      </Column>
    </Wrapper>
  );
}

export default Modal;
