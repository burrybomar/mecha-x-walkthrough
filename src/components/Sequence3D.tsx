import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, Line } from '@react-three/drei';
import { Vector3 } from 'three';
import * as THREE from 'three';

const SequenceNode = ({ position, color, label, step }: { position: [number, number, number]; color: string; label: string; step: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + step) * 0.1;
    }
  });

  return (
    <group position={position}>
      <Sphere ref={meshRef} args={[0.5, 32, 32]}>
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </Sphere>
      
      <Text
        position={[0, -1, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#000000"
      >
        {label}
      </Text>
      
      <Text
        position={[0, 0, 0]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {step}
      </Text>
    </group>
  );
};

const ConnectionLine = ({ start, end, color }: { start: [number, number, number]; end: [number, number, number]; color: string }) => {
  const points = [new Vector3(...start), new Vector3(...end)];
  
  return (
    <Line
      points={points}
      color={color}
      lineWidth={2}
      dashed={false}
    />
  );
};

const Scene3D = () => {
  const nodes = [
    { position: [-4, 0, 0] as [number, number, number], color: '#3b82f6', label: 'HTF Analysis', step: 1 },
    { position: [-1.5, 0, 0] as [number, number, number], color: '#ec4899', label: 'Session', step: 2 },
    { position: [1.5, 0, 0] as [number, number, number], color: '#10b981', label: 'Sweep+C2', step: 3 },
    { position: [4, 0, 0] as [number, number, number], color: '#f97316', label: 'CISD Entry', step: 4 },
  ];

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
      
      {nodes.map((node, i) => (
        <SequenceNode key={i} {...node} />
      ))}
      
      {nodes.slice(0, -1).map((node, i) => (
        <ConnectionLine
          key={i}
          start={node.position}
          end={nodes[i + 1].position}
          color="#6366f1"
        />
      ))}
      
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={5}
        maxDistance={12}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
};

export const Sequence3D = () => {
  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden border-2 border-primary/20 bg-gradient-to-b from-background to-secondary/20">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <Scene3D />
      </Canvas>
      <div className="text-center text-xs text-muted-foreground mt-2 pb-2">
        Drag to rotate • Scroll to zoom • Auto-rotates
      </div>
    </div>
  );
};
