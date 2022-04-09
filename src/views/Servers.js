import React from 'react';
import styled from 'styled-components';
import Modal from 'components/Modal';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
`;

function Servers() {
  return (
    <Wrapper>
      <Modal />
    </Wrapper>
  );
}

export default Servers;
