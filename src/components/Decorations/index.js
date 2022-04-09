import React, { useRef } from 'react';
import { colors } from 'theme/mainTheme';
import { Text } from 'drei';

const length = 9;
const width = 0.5;
const depth = 0.2;

function Decorations() {
  return (
    <>
      {/* <Text
        color="#EC2D2D"
        fontSize={0.5}
        font="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap"
        anchorX="center"
        anchorY="middle"
        position={[-4.25, 0.11, 0]}
        rotation={[Math.PI / 2, Math.PI, Math.PI]}
      >
        1
      </Text> */}
      <mesh position={[4.25, 0, 0]}>
        <boxGeometry attach="geometry" args={[width, depth, length]} />
        <meshBasicMaterial attach="material" color={colors.board} />
      </mesh>
      <mesh position={[-4.25, 0, 0]}>
        <boxGeometry attach="geometry" args={[width, depth, length]} />
        <meshBasicMaterial attach="material" color={colors.board} />
      </mesh>
      <mesh position={[0, 0, 4.25]}>
        <boxGeometry attach="geometry" args={[length, depth, width]} />
        <meshBasicMaterial attach="material" color={colors.board} />
      </mesh>
      <mesh position={[0, 0, -4.25]}>
        <boxGeometry attach="geometry" args={[length, depth, width]} />
        <meshBasicMaterial attach="material" color={colors.board} />
      </mesh>
    </>
  );
}

export default Decorations;
