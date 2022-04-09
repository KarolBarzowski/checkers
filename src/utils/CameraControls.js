import React, { useRef, useEffect } from 'react';
import { extend, useFrame, useThree, useUpdate } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

extend({ OrbitControls });

const CameraControls = ({ isReset, setIsMoved, isLocked, isRotate }) => {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  const controls = useRef();

  useFrame(() => controls.current.update());

  useEffect(() => {
    controls.current.reset();
    setIsMoved(false);
  }, [isReset]);

  useEffect(() => {
    const handleChange = () => {
      setIsMoved(true);
    };

    controls.current.addEventListener('end', handleChange);

    return () => {
      controls.current.removeEventListener('end', handleChange);
    };
  }, []);

  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      minPolarAngle={0}
      maxPolarAngle={Math.PI / 2}
      minDistance={8}
      //   minDistance={0}
      autoRotate={isRotate}
      maxDistance={12}
      enableKeys={false}
      enableDamping
      enablePan={false}
      dampingFactor={0.1}
      enabled={!isLocked}
    />
  );
};

export default CameraControls;
