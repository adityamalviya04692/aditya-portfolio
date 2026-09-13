import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float, RoundedBox, useTexture } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useMotionPreference } from "./MotionSystem";

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;

function limb(
  length: number,
  color: string,
  radius = 0.105,
) {
  return (
    <mesh position={[0, -length / 2, 0]} castShadow>
      <capsuleGeometry args={[radius, length - radius * 2, 8, 12]} />
      <meshStandardMaterial color={color} roughness={0.72} />
    </mesh>
  );
}

function CodeScreen() {
  const bars = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!bars.current) return;
    bars.current.children.forEach((bar, index) => {
      bar.scale.x = 0.55 + Math.sin(clock.elapsedTime * 2.2 + index * 1.7) * 0.22;
    });
  });
  return (
    <group position={[0, 0, 0.031]}>
      <mesh>
        <planeGeometry args={[1.46, 0.84]} />
        <meshStandardMaterial color="#061f31" emissive="#063851" emissiveIntensity={1.1} />
      </mesh>
      <group ref={bars} position={[-0.48, 0.27, 0.01]}>
        {["#5fe7ff", "#ffe579", "#78f5ac", "#a6b8ff", "#5fe7ff"].map((color, i) => (
          <mesh key={color + i} position={[0, -i * 0.13, 0]}>
            <planeGeometry args={[0.72 - i * 0.07, 0.035]} />
            <meshBasicMaterial color={color} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Computer() {
  return (
    <group position={[-0.55, 1.61, -0.25]} rotation={[-0.04, 0.04, 0]}>
      <RoundedBox args={[1.62, 1, 0.1]} radius={0.06} smoothness={3} castShadow>
        <meshStandardMaterial color="#102735" metalness={0.25} roughness={0.4} />
      </RoundedBox>
      <CodeScreen />
      <mesh position={[0, -0.73, -0.03]} castShadow>
        <boxGeometry args={[0.1, 0.52, 0.09]} />
        <meshStandardMaterial color="#213c49" metalness={0.45} />
      </mesh>
      <mesh position={[0, -0.98, 0]} castShadow>
        <boxGeometry args={[0.72, 0.06, 0.34]} />
        <meshStandardMaterial color="#213c49" metalness={0.45} />
      </mesh>
    </group>
  );
}

function Desk() {
  return (
    <group position={[-0.55, 0, 0]}>
      <RoundedBox args={[2.75, 0.16, 1.05]} radius={0.07} smoothness={3} position={[0, 0.82, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#e9b35e" roughness={0.58} />
      </RoundedBox>
      {[-1.15, 1.15].map((x) => (
        <mesh key={x} position={[x, 0.38, 0]} castShadow>
          <boxGeometry args={[0.11, 0.78, 0.7]} />
          <meshStandardMaterial color="#163541" />
        </mesh>
      ))}
      <Computer />
      <group position={[0.12, 0.93, 0.28]} rotation={[-0.25, 0, 0]}>
        <RoundedBox args={[1.12, 0.035, 0.36]} radius={0.025} smoothness={2} castShadow>
          <meshStandardMaterial color="#d9e8e6" />
        </RoundedBox>
        {[-0.38, -0.13, 0.12, 0.37].map((x, i) => (
          <mesh key={x} position={[x, 0.025, 0]}>
            <boxGeometry args={[0.15, 0.015, 0.16]} />
            <meshStandardMaterial color={i % 2 ? "#5b7180" : "#78e6f8"} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Chair({ progress }: { progress: number }) {
  const chair = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!chair.current) return;
    chair.current.position.x = THREE.MathUtils.lerp(0.9, 1.52, Math.min(1, progress * 1.7));
    chair.current.rotation.y = THREE.MathUtils.lerp(-0.12, -0.42, progress);
  });
  return (
    <group ref={chair} position={[0.9, 0, 0.38]} rotation={[0, -0.12, 0]}>
      <RoundedBox args={[0.8, 1.15, 0.16]} radius={0.16} smoothness={3} position={[0, 0.96, 0.28]} castShadow>
        <meshStandardMaterial color="#174c59" roughness={0.62} />
      </RoundedBox>
      <RoundedBox args={[0.76, 0.14, 0.72]} radius={0.1} smoothness={3} position={[0, 0.53, 0]} castShadow>
        <meshStandardMaterial color="#123e49" />
      </RoundedBox>
      <mesh position={[0, 0.2, 0]}><cylinderGeometry args={[0.06, 0.08, 0.62]} /><meshStandardMaterial color="#17313c" /></mesh>
      <mesh position={[0, -0.08, 0]}><cylinderGeometry args={[0.05, 0.05, 0.9]} /><meshStandardMaterial color="#17313c" /></mesh>
    </group>
  );
}

function Character({ progress, paused }: { progress: number; paused: boolean }) {
  const root = useRef<THREE.Group>(null);
  const torso = useRef<THREE.Group>(null);
  const leftArm = useRef<THREE.Group>(null);
  const rightArm = useRef<THREE.Group>(null);
  const leftForearm = useRef<THREE.Group>(null);
  const rightForearm = useRef<THREE.Group>(null);
  const leftThigh = useRef<THREE.Group>(null);
  const rightThigh = useRef<THREE.Group>(null);
  const portrait = useTexture(asset("aditya-portrait.png"));
  useEffect(() => {
    portrait.colorSpace = THREE.SRGBColorSpace;
    portrait.wrapS = portrait.wrapT = THREE.ClampToEdgeWrapping;
    portrait.repeat.set(0.42, 0.42);
    portrait.offset.set(0.29, 0.4);
    portrait.needsUpdate = true;
  }, [portrait]);
  useFrame(({ clock }, delta) => {
    if (!root.current || !torso.current) return;
    const t = clock.elapsedTime;
    const stand = THREE.MathUtils.smoothstep(progress, 0.22, 0.67);
    const wave = THREE.MathUtils.smoothstep(progress, 0.67, 0.92);
    const breathing = paused ? 0 : Math.sin(t * 1.7) * 0.018;
    root.current.position.x = THREE.MathUtils.damp(root.current.position.x, THREE.MathUtils.lerp(0.62, 1.42, stand), 6, delta);
    root.current.position.y = THREE.MathUtils.damp(root.current.position.y, THREE.MathUtils.lerp(0.13, 0.05, stand), 6, delta);
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, THREE.MathUtils.lerp(-0.28, -0.72, stand), 6, delta);
    torso.current.scale.y = 1 + breathing;
    torso.current.position.y = THREE.MathUtils.lerp(1.28, 1.58, stand);
    if (leftThigh.current && rightThigh.current) {
      leftThigh.current.rotation.x = THREE.MathUtils.lerp(-1.35, -0.05, stand);
      rightThigh.current.rotation.x = THREE.MathUtils.lerp(-1.35, -0.05, stand);
    }
    const typing = paused ? 0 : Math.sin(t * 9);
    if (leftArm.current && rightArm.current && leftForearm.current && rightForearm.current) {
      leftArm.current.rotation.x = THREE.MathUtils.lerp(-1.18 + typing * 0.035, -0.08, stand);
      leftArm.current.rotation.z = THREE.MathUtils.lerp(-0.22, 0.05, stand);
      leftForearm.current.rotation.x = THREE.MathUtils.lerp(-0.42 + typing * 0.08, -0.05, stand);
      rightArm.current.rotation.x = THREE.MathUtils.lerp(-1.2 - typing * 0.04, -0.15, stand);
      rightArm.current.rotation.z = THREE.MathUtils.lerp(0.2, -2.45, wave);
      rightForearm.current.rotation.x = THREE.MathUtils.lerp(-0.4 - typing * 0.08, -0.2, stand);
      rightForearm.current.rotation.z = wave * (0.35 + Math.sin(t * 5.2) * 0.38);
    }
  });
  const skin = "#b97a55", shirt = "#dcecf0", trousers = "#172d43";
  return (
    <group ref={root} position={[0.62, 0.13, 0.35]} rotation={[0, -0.28, 0]}>
      <group ref={torso} position={[0, 1.28, 0]}>
        <RoundedBox args={[0.78, 0.92, 0.4]} radius={0.2} smoothness={3} castShadow>
          <meshStandardMaterial color={shirt} roughness={0.75} />
        </RoundedBox>
        <mesh position={[0, 0.7, 0]} castShadow><sphereGeometry args={[0.32, 24, 24]} /><meshStandardMaterial color={skin} roughness={0.72} /></mesh>
        <mesh position={[0, 0.72, 0.29]}>
          <circleGeometry args={[0.245, 36]} />
          <meshBasicMaterial map={portrait} toneMapped={false} />
        </mesh>
        <mesh position={[0, 0.94, 0.01]} scale={[1.03, 0.55, 1.03]} castShadow><sphereGeometry args={[0.32, 20, 14, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshStandardMaterial color="#17191d" roughness={0.9} /></mesh>
        <group ref={leftArm} position={[-0.47, 0.31, 0]} rotation={[-1.18, 0, -0.22]}>
          {limb(0.58, shirt, 0.12)}
          <group ref={leftForearm} position={[0, -0.54, 0]} rotation={[-0.42, 0, 0]}>{limb(0.55, skin, 0.09)}</group>
        </group>
        <group ref={rightArm} position={[0.47, 0.31, 0]} rotation={[-1.2, 0, 0.2]}>
          {limb(0.58, shirt, 0.12)}
          <group ref={rightForearm} position={[0, -0.54, 0]} rotation={[-0.4, 0, 0]}>{limb(0.55, skin, 0.09)}</group>
        </group>
      </group>
      <group ref={leftThigh} position={[-0.21, 0.95, 0]} rotation={[-1.35, 0, 0]}>{limb(0.78, trousers, 0.145)}</group>
      <group ref={rightThigh} position={[0.21, 0.95, 0]} rotation={[-1.35, 0, 0]}>{limb(0.78, trousers, 0.145)}</group>
    </group>
  );
}

function Scene({ progress, paused }: { progress: number; paused: boolean }) {
  return (
    <>
      <color attach="background" args={["#f3c64e"]} />
      <ambientLight intensity={1.5} />
      <directionalLight position={[3, 6, 4]} intensity={3.2} castShadow shadow-mapSize={[1024, 1024]} />
      <Float speed={paused ? 0 : 1.4} rotationIntensity={0.035} floatIntensity={0.06}>
        <group position={[0, -0.1, 0]}>
          <Desk />
          <Chair progress={progress} />
          <Character progress={progress} paused={paused} />
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.12, 0]} receiveShadow>
            <circleGeometry args={[3.5, 64]} />
            <meshStandardMaterial color="#e6a942" roughness={0.92} />
          </mesh>
        </group>
      </Float>
      <ContactShadows position={[0, -0.18, 0]} opacity={0.38} scale={7} blur={2.4} far={4} />
      <Environment preset="city" />
    </>
  );
}

export default function Workspace3D() {
  const { reduced } = useMotionPreference();
  const [progress, setProgress] = useState(0);
  const observer = useMemo(() => ({ ticking: false }), []);
  useEffect(() => {
    const update = () => {
      observer.ticking = false;
      setProgress(Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 1.35))));
    };
    const scroll = () => {
      if (!observer.ticking) {
        observer.ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, [observer]);
  return (
    <div className="workspace-3d" role="img" aria-label="Animated 3D scene of Aditya typing, standing and waving as the page scrolls">
      <Canvas dpr={[1, 1.5]} shadows camera={{ position: [3.8, 2.8, 5.6], fov: 40 }} gl={{ antialias: true, powerPreference: "high-performance" }}>
        <Suspense fallback={null}><Scene progress={reduced ? 0 : progress} paused={reduced} /></Suspense>
      </Canvas>
      <span className="scene-3d-label">LIVE 3D · SCROLL TO MOVE</span>
    </div>
  );
}
