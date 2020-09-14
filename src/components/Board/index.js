import React, { useRef, useState } from 'react';
import { useFrame, useLoader } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const BOARD = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

BOARD.forEach((row, i) => {
  row.forEach((item, j) => {
    console.log(j * 1 - 4.5);
  });
});

function Board() {
  const mesh = useRef();

  return BOARD.map((row, i) =>
    row.map((item, j) => (
      <mesh position={[j * 1 - 3.5, 0, i * 1 - 3.5]}>
        <boxGeometry attach="geometry" args={[1, 0.1, 1]} />
        <meshBasicMaterial
          attach="material"
          color={i % 2 === 0 ? (j % 2 === 0 ? 'black' : 'white') : j % 2 === 0 ? 'white' : 'black'}
        />
      </mesh>
    )),
  );
}

export default Board;
