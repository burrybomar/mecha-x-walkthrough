import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere } from '@react-three/drei';
import { Vector3 } from 'three';
import * as THREE from 'three';

// Trading level visualization - horizontal plane representing price levels
const TradingLevel = ({ position, color, label, step, subtitle }: { 
  position: [number, number, number]; 
  color: string; 
  label: string; 
  step: number;
  subtitle: string;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + step) * 0.1;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3 + step) * 0.1);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Main level platform */}
      <Box args={[2, 0.08, 1.5]}>
        <meshStandardMaterial 
          color={color}
          metalness={0.7}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.9}
        />
      </Box>
      
      {/* Glowing sphere marker */}
      <Sphere ref={glowRef} args={[0.15, 32, 32]} position={[0, 0.2, 0]}>
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          toneMapped={false}
        />
      </Sphere>
      
      {/* Vertical beam */}
      <Box args={[0.05, 1.5, 0.05]} position={[0, 0.75, 0]}>
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          transparent
          opacity={0.6}
        />
      </Box>
      
      {/* Step indicator */}
      <Text
        position={[0, 1.6, 0]}
        fontSize={0.35}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
        fontWeight="bold"
      >
        {step}
      </Text>
      
      {/* Label */}
      <Text
        position={[0, -0.4, 0]}
        fontSize={0.22}
        color="#e9f2fa"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.015}
        outlineColor="#10212c"
        fontWeight="bold"
      >
        {label}
      </Text>
      
      {/* Subtitle */}
      <Text
        position={[0, -0.7, 0]}
        fontSize={0.14}
        color="#abdbd6"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#10212c"
      >
        {subtitle}
      </Text>
    </group>
  );
};

// Connection flow between levels
const FlowConnection = ({ start, end, color }: { start: [number, number, number]; end: [number, number, number]; color: string }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current && ref.current.material instanceof THREE.MeshStandardMaterial) {
      ref.current.material.opacity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });
  
  return (
    <mesh ref={ref}>
      <tubeGeometry args={[new THREE.LineCurve3(new Vector3(...start), new Vector3(...end)), 20, 0.04, 8, false]} />
      <meshStandardMaterial 
        color={color} 
        transparent 
        opacity={0.6} 
        emissive={color} 
        emissiveIntensity={0.5}
      />
    </mesh>
  );
};

const Scene3D = () => {
  const levels = [
    { 
      position: [-5, 0, 0] as [number, number, number], 
      color: '#6bb0dd', // primary blue
      label: 'HTF Analysis', 
      subtitle: '4H/Daily Levels',
      step: 1 
    },
    { 
      position: [-1.5, 0.5, 0] as [number, number, number], 
      color: '#abdbd6', // accent teal
      label: 'Session Window', 
      subtitle: 'H2 Silver Bullet',
      step: 2 
    },
    { 
      position: [1.5, 0.2, 0] as [number, number, number], 
      color: '#5289AD', // primary dark blue
      label: 'Sweep + C2', 
      subtitle: 'Reversal Signal',
      step: 3 
    },
    { 
      position: [5, 0.8, 0] as [number, number, number], 
      color: '#698696', // muted blue
      label: 'CISD Entry', 
      subtitle: 'Target H3/H4',
      step: 4 
    },
  ];

  return (
    <>
      {/* Professional trading platform lighting */}
      <ambientLight intensity={0.4} color="#e9f2fa" />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#6bb0dd" />
      <directionalLight position={[-10, 5, -5]} intensity={0.5} color="#abdbd6" />
      <pointLight position={[0, 15, 0]} intensity={0.6} color="#5289AD" />
      
      {/* Grid representing chart structure */}
      <gridHelper args={[24, 24, '#698696', '#3a647f']} position={[0, -1.5, 0]} />
      
      {/* Subtle background plane */}
      <mesh position={[0, -1.51, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 20]} />
        <meshStandardMaterial 
          color="#10212c" 
          transparent 
          opacity={0.8}
        />
      </mesh>
      
      {levels.map((level, i) => (
        <TradingLevel key={i} {...level} />
      ))}
      
      {levels.slice(0, -1).map((level, i) => (
        <FlowConnection
          key={i}
          start={[level.position[0] + 1, level.position[1], level.position[2]]}
          end={[levels[i + 1].position[0] - 1, levels[i + 1].position[1], levels[i + 1].position[2]]}
          color="#abdbd6"
        />
      ))}
      
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={8}
        maxDistance={16}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2.1}
        minPolarAngle={Math.PI / 6}
      />
    </>
  );
};

export const Sequence3D = () => {
  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden border-2 border-primary/30 bg-gradient-to-b from-background via-card to-background shadow-lg">
      <Canvas camera={{ position: [0, 3, 12], fov: 45 }}>
        <Scene3D />
      </Canvas>
      <div className="text-center text-xs text-muted-foreground mt-2 pb-3 flex items-center justify-center gap-4">
        <span>🖱️ Drag to rotate</span>
        <span>•</span>
        <span>🔍 Scroll to zoom</span>
        <span>•</span>
        <span>🔄 Auto-rotates</span>
      </div>
    </div>
  );
};
