import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";

/**
 * Hero 3D — formas geométricas abstratas (anéis, cubos, partículas)
 * em metal escuro + emissivo roxo. Abstrato e sofisticado,
 * reagindo suavemente ao mouse via MotionValues de parallax.
 */

function Particles({ count = 220 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.2 + Math.random() * 1.7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      arr[i * 3 + 2] = r * Math.cos(phi) * 0.8;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.045;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color="#8A00FF"
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Sculpture({
  px,
  py,
}: {
  px: MotionValue<number>;
  py: MotionValue<number>;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const targetY = px.get() * 0.5 + t * 0.08;
    const targetX = -py.get() * 0.32;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetY, 0.035);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetX, 0.05);
  });

  const metal = (
    <meshStandardMaterial
      color="#0D0D13"
      metalness={0.95}
      roughness={0.22}
      emissive="#6500FF"
      emissiveIntensity={0.3}
    />
  );

  return (
    <group ref={group}>
      {/* Anel principal */}
      <Float speed={1.3} rotationIntensity={0.35} floatIntensity={0.9}>
        <mesh rotation={[Math.PI / 2.6, 0.35, 0]}>{metal}
          <torusGeometry args={[1.55, 0.05, 32, 160]} />
        </mesh>
      </Float>

      {/* Octaedro metálico */}
      <Float speed={1.8} rotationIntensity={0.55} floatIntensity={1.2}>
        <mesh position={[-1.7, 0.95, -0.6]}>
          <octahedronGeometry args={[0.44, 0]} />
          <meshStandardMaterial
            color="#0B0B0F"
            metalness={0.9}
            roughness={0.3}
            emissive="#7800FF"
            emissiveIntensity={0.28}
            flatShading
          />
        </mesh>
      </Float>

      {/* Cubo escuro */}
      <Float speed={1.1} rotationIntensity={0.45} floatIntensity={0.85}>
        <mesh position={[1.55, -0.95, 0.35]} rotation={[0.6, 0.4, 0.2]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial
            color="#0B0B0F"
            metalness={0.92}
            roughness={0.24}
            emissive="#4A0099"
            emissiveIntensity={0.35}
          />
        </mesh>
      </Float>

      {/* Anel neon pequeno */}
      <Float speed={1.6} rotationIntensity={0.6} floatIntensity={1}>
        <mesh position={[1.15, 1.2, -0.9]} rotation={[1.1, 0, 0.5]}>
          <torusGeometry args={[0.55, 0.026, 24, 96]} />
          <meshStandardMaterial
            color="#8A00FF"
            metalness={0.55}
            roughness={0.35}
            emissive="#7800FF"
            emissiveIntensity={1.1}
          />
        </mesh>
      </Float>

      {/* Linha orbital fina */}
      <mesh rotation={[Math.PI / 3.4, -0.5, 0.4]}>
        <torusGeometry args={[2.35, 0.008, 8, 200]} />
        <meshBasicMaterial color="#6500FF" transparent opacity={0.35} />
      </mesh>

      <Particles />
    </group>
  );
}

export default function HeroScene({
  px,
  py,
}: {
  px: MotionValue<number>;
  py: MotionValue<number>;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.4], fov: 42 }}
      dpr={[1, 1.8]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.12} />
      <directionalLight position={[5, 6, 4]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-6, -2, 2]} intensity={30} color="#7800FF" distance={18} />
      <pointLight position={[4, -3, -2]} intensity={14} color="#6500FF" distance={16} />
      <Sculpture px={px} py={py} />
    </Canvas>
  );
}
