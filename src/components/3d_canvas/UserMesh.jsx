import React, { useRef, useEffect } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useSpring, a } from '@react-spring/three';
import { Vector3 } from 'three';

function UserMesh({ userPosition}) {
  const meshRef = useRef();
  const gltf = useLoader(GLTFLoader, `https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/duck/model.gltf`);
  const [spring, api] = useSpring(() => ({ position: [0, 0, 0], config: { mass: 5, tension: 100, friction: 50, precision: 0.0001 } }));
  
  // 사용자 위치를 이전 위치로 설정하기 위한 ref
  const prevPositionRef = useRef(new Vector3());

  useEffect(() => {
    const [x, y, z] = userPosition;
    const newPosition = new Vector3(x, y, z);

    // 오브젝트의 위치를 업데이트
    api.start({ position: [x, y, z] });
    
    // 이전 위치 업데이트
    prevPositionRef.current = newPosition;
  }, [userPosition, api]);

  useFrame(() => {
    if (meshRef.current) {
      // 매 프레임마다 사용자의 위치를 바라보도록 오브젝트 업데이트
      const [x, y, z] = userPosition;
      const userPositionVec = new Vector3(x, y, z);
      meshRef.current.lookAt(userPositionVec);
    }
  });

  return (
    <a.group ref={meshRef} {...spring}>
      <primitive object={gltf.scene} scale={[0.7, 0.7, 0.7]} />
    </a.group>
  );
}

export default UserMesh;
