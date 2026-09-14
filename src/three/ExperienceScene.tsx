import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Float } from "@react-three/drei";
import * as THREE from "three";

function Dumbbell3D() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Otimização Extrema: Interação direta via GPU pointer, sem passar pelo React State/Framer Motion
      const targetX = state.pointer.x * 0.8;
      const targetY = state.pointer.y * 0.8;
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.1);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.1);
    }
  });

  return (
    // Rotação inicial inclinada estilosa
    <group ref={groupRef} rotation={[0.4, 0.8, 0.5]}>
      
      {/* BARRA CENTRAL (Pegada Cromada) - 16 segmentos (metade do anterior, super leve) */}
      <mesh>
        <cylinderGeometry args={[0.13, 0.13, 3.2, 16]} />
        <meshStandardMaterial 
          color="#e4e4e7" 
          metalness={0.9} 
          roughness={0.15} 
        />
      </mesh>

      {/* ANILHAS ESQUERDAS */}
      <group position={[0, -1.1, 0]}>
        {/* Presilha */}
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
          <meshStandardMaterial color="#27272a" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Anilha Roxa Neon UpCore */}
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.68, 0.68, 0.15, 16]} />
          <meshStandardMaterial color="#7c3aed" emissive="#6d28d9" emissiveIntensity={0.6} roughness={0.3} />
        </mesh>
        {/* Anilha Média */}
        <mesh position={[0, -0.32, 0]}>
          <cylinderGeometry args={[0.88, 0.88, 0.18, 16]} />
          <meshStandardMaterial color="#18181b" metalness={0.5} roughness={0.5} />
        </mesh>
        {/* Anilha Maior */}
        <mesh position={[0, -0.52, 0]}>
          <cylinderGeometry args={[1.08, 1.08, 0.22, 16]} />
          <meshStandardMaterial color="#09090b" metalness={0.6} roughness={0.6} />
        </mesh>
      </group>

      {/* ANILHAS DIREITAS */}
      <group position={[0, 1.1, 0]}>
        {/* Presilha */}
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
          <meshStandardMaterial color="#27272a" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Anilha Roxa Neon UpCore */}
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.68, 0.68, 0.15, 16]} />
          <meshStandardMaterial color="#7c3aed" emissive="#6d28d9" emissiveIntensity={0.6} roughness={0.3} />
        </mesh>
        {/* Anilha Média */}
        <mesh position={[0, 0.32, 0]}>
          <cylinderGeometry args={[0.88, 0.88, 0.18, 16]} />
          <meshStandardMaterial color="#18181b" metalness={0.5} roughness={0.5} />
        </mesh>
        {/* Anilha Maior */}
        <mesh position={[0, 0.52, 0]}>
          <cylinderGeometry args={[1.08, 1.08, 0.22, 16]} />
          <meshStandardMaterial color="#09090b" metalness={0.6} roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
}

export default function ExperienceScene() {
  return (
    <Canvas 
      camera={{ position: [0, 0, 5.2], fov: 45 }} 
      className="w-full h-full pointer-events-none"
      // Otimização crucial: Limita a resolução em telas Retina para não travar
      dpr={[1, 1.5]} 
      gl={{ 
        powerPreference: "high-performance", 
        antialias: true, 
        alpha: true 
      }}
    >
      <ambientLight intensity={0.5} />
      
      {/* Luzes simples e baratas para a GPU, sem sombras computadas */}
      <directionalLight position={[4, 5, 3]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-4, 3, -2]} intensity={0.8} color="#8b5cf6" />
      <pointLight position={[0, -2, 2]} intensity={0.6} color="#7c3aed" />

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <Center>
          <Dumbbell3D />
        </Center>
      </Float>
    </Canvas>
  );
}