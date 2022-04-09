import React, { useRef } from 'react';

const BOARD = [
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
];

function Board() {
  const mesh = useRef();

  return BOARD.map((row, i) =>
    row.map((item, j) => (
      <mesh position={[j * 1 - 3.5, 0, i * 1 - 3.5]}>
        <boxGeometry attach="geometry" args={[1, 0.2, 1]} />
        <meshBasicMaterial attach="material" color={item === 0 ? 'white' : 'black'} />
      </mesh>
    )),
  );
}

export default Board;
