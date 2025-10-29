import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box, Cone } from '@react-three/drei';
import { Vector3 } from 'three';
import * as THREE from 'three';

// Trading-themed 3D nodes that look like chart elements
const TradingNode = ({ position, color, label, step }: { position: [number, number, number]; color: string; label: string; step: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const candleGroupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5 + step) * 0.15;
    }
    if (candleGroupRef.current) {
      candleGroupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Candlestick-style visualization */}
      <group ref={candleGroupRef}>
        {/* Main candle body */}
        <Box args={[0.4, 0.8, 0.4]}>
          <meshStandardMaterial 
            color={color} 
            metalness={0.3} 
            roughness={0.4}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </Box>
        
        {/* Wick (top) */}
        <Box args={[0.08, 0.5, 0.08]} position={[0, 0.65, 0]}>
          <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} />
        </Box>
        
        {/* Wick (bottom) */}
        <Box args={[0.08, 0.5, 0.08]} position={[0, -0.65, 0]}>
          <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} />
        </Box>
        
        {/* Arrow indicator on top */}
        <Cone args={[0.2, 0.3, 4]} position={[0, 1.2, 0]} rotation={[0, 0, 0]}>
          <meshStandardMaterial 
            color={color}
            emissive={color}
            emissiveIntensity={0.4}
          />
        </Cone>
      </group>
      
      {/* Label */}
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.25}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor="#000000"
      >
        {label}
      </Text>
      
      {/* Step number badge */}
      <group position={[0, 0, 0.6]}>
        <Box args={[0.5, 0.5, 0.1]}>
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </Box>
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.3}
          color="#00ff88"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          {step}
        </Text>
      </group>
    </group>
  );
};

// Connection lines that look like trend lines on a chart
const TrendLine = ({ start, end, color }: { start: [number, number, number]; end: [number, number, number]; color: string }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  return (
    <mesh ref={ref}>
      <tubeGeometry args={[new THREE.LineCurve3(new Vector3(...start), new Vector3(...end)), 20, 0.02, 8, false]} />
      <meshStandardMaterial color={color} transparent opacity={0.8} emissive={color} emissiveIntensity={0.3} />
    </mesh>
  );
};

const Scene3D = () => {
  const nodes = [
    { position: [-4.5, 0, 0] as [number, number, number], color: '#3b82f6', label: 'HTF', step: 1 },
    { position: [-1.5, 0, 0] as [number, number, number], color: '#ec4899', label: 'Session', step: 2 },
    { position: [1.5, 0, 0] as [number, number, number], color: '#10b981', label: 'Sweep', step: 3 },
    { position: [4.5, 0, 0] as [number, number, number], color: '#f97316', label: 'Entry', step: 4 },
  ];

  return (
    <>
      {/* Chart-like lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-10, 5, -10]} intensity={0.4} color="#3b82f6" />
      <spotLight position={[0, 10, 0]} intensity={0.5} angle={0.6} penumbra={1} color="#00ff88" />
      
      {/* Grid floor like a chart */}
      <gridHelper args={[20, 20, '#333333', '#1a1a1a']} position={[0, -2, 0]} />
      
      {nodes.map((node, i) => (
        <TradingNode key={i} {...node} />
      ))}
      
      {nodes.slice(0, -1).map((node, i) => (
        <TrendLine
          key={i}
          start={node.position}
          end={nodes[i + 1].position}
          color="#00ff88"
        />
      ))}
      
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={6}
        maxDistance={14}
        autoRotate
        autoRotateSpeed={1}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={Math.PI / 4}
      />
    </>
  );
};

export const Sequence3D = () => {
  return (
    <div className="w-full h-[450px] rounded-xl overflow-hidden border-2 border-primary/20 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f1a] to-[#0a0a0a]">
      <Canvas camera={{ position: [0, 2, 10], fov: 50 }}>
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
