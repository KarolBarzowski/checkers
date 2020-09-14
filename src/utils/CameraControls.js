import React, { useRef, useEffect } from 'react';
import { extend, useFrame, useThree, useUpdate } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

extend({ OrbitControls });

const CameraControls = ({ isReset, setIsMoved, isLocked }) => {
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
    const handleChange = (e) => {
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
      maxDistance={12}
      enableKeys={false}
      enableDamping
      dampingFactor={0.1}
      enabled={!isLocked}
    />
  );
};

export default CameraControls;
