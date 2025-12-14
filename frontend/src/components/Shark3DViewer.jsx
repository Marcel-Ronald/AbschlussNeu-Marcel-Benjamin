import React, { useState, Suspense, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  Stars,
  useGLTF,
  Html,
} from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLanguage } from "../context/LanguageContext";

// Lädt echtes 3D-Modell (GLTF/GLB)
const LoadedSharkModel = ({ modelPath, color }) => {
  const meshRef = useRef();

  // Lade das GLTF-Modell
  const gltf = useGLTF(modelPath);

  useFrame((state) => {
    if (meshRef.current) {
      // Sanfte Rotation und Schwimm-Bewegung
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
      meshRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.4;
      meshRef.current.position.x =
        Math.cos(state.clock.elapsedTime * 0.2) * 0.6;
    }
  });

  // Clone das Modell damit wir es manipulieren können
  const scene = React.useMemo(() => gltf.scene.clone(), [gltf.scene]);

  // Optimiere Materialien
  React.useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.metalness = 0.3;
          child.material.roughness = 0.4;
        }
      }
    });
  }, [scene]);

  return (
    <primitive
      ref={meshRef}
      object={scene}
      scale={0.8}
      position={[0, 0, 0]}
      rotation={[0, Math.PI / 2, 0]}
    />
  );
};

// 3D Hai-Modell Komponente mit Fallback
const SharkModel = ({ sharkType, color }) => {
  const meshRef = useRef();
  const [useGeometric, setUseGeometric] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.position.x =
        Math.cos(state.clock.elapsedTime * 0.3) * 0.5;
    }
  });

  // Versuche GLTF/GLB-Modell zu laden (GLTF bevorzugt für bessere Qualität)
  const modelPaths = {
    white: "/models/great_white_shark.gltf",
    whale: "/models/great_white_shark.gltf", // Verwende gleichen Hai erstmal
    hammerhead: "/models/great_white_shark.gltf", // Verwende gleichen Hai erstmal
  };

  // Fallback zu geometrischem Modell
  const getGeometricShark = () => {
    switch (sharkType) {
      case "white":
        return <WhiteShark ref={meshRef} color={color} />;
      case "whale":
        return <WhaleShark ref={meshRef} color={color} />;
      case "hammerhead":
        return <HammerheadShark ref={meshRef} color={color} />;
      default:
        return <WhiteShark ref={meshRef} color={color} />;
    }
  };

  // Wenn Model-Loading fehlschlägt, zeige geometrisches Modell
  return (
    (
      <Suspense fallback={getGeometricShark()}>
        <LoadedSharkModel modelPath={modelPaths[sharkType]} color={color} />
      </Suspense>
    ) || getGeometricShark()
  );
};

// Weißer Hai Modell - Realistischer
const WhiteShark = React.forwardRef(({ color }, ref) => {
  return (
    <group ref={ref} rotation={[0, Math.PI / 2, 0]}>
      {/* Hauptkörper - stromlinienförmig */}
      <mesh position={[0, 0, 0]} castShadow>
        <capsuleGeometry args={[0.6, 3, 32, 32]} />
        <meshStandardMaterial
          color={color}
          metalness={0.4}
          roughness={0.3}
          envMapIntensity={0.5}
        />
      </mesh>

      {/* Kopf - spitz zulaufend */}
      <mesh position={[0, 0, 2.2]} castShadow>
        <coneGeometry args={[0.65, 1.2, 32]} />
        <meshStandardMaterial color={color} metalness={0.4} roughness={0.3} />
      </mesh>

      {/* Bauch - heller */}
      <mesh position={[0, -0.5, 0]} scale={[0.9, 0.7, 1]}>
        <capsuleGeometry args={[0.5, 2.5, 32, 32]} />
        <meshStandardMaterial color="#dfe8eb" metalness={0.3} roughness={0.4} />
      </mesh>

      {/* Rückenflosse - groß und markant */}
      <mesh position={[0, 0.9, 0.3]} rotation={[0.1, 0, 0]} castShadow>
        <coneGeometry args={[0.7, 1.8, 4]} />
        <meshStandardMaterial
          color={color}
          metalness={0.4}
          roughness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Schwanzflosse - sichelförmig */}
      <group position={[0, 0, -2]}>
        {/* Oberer Teil */}
        <mesh position={[0, 0.4, 0]} rotation={[0, 0, 0.3]} castShadow>
          <coneGeometry args={[0.5, 2, 4]} />
          <meshStandardMaterial
            color={color}
            metalness={0.4}
            roughness={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Unterer Teil */}
        <mesh position={[0, -0.4, 0]} rotation={[0, 0, -0.3]} castShadow>
          <coneGeometry args={[0.4, 1.5, 4]} />
          <meshStandardMaterial
            color={color}
            metalness={0.4}
            roughness={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Brustflossen - seitlich */}
      <mesh position={[0.6, -0.2, 0.8]} rotation={[0, 0.3, 0.5]} castShadow>
        <coneGeometry args={[0.5, 1.2, 4]} />
        <meshStandardMaterial
          color={color}
          metalness={0.4}
          roughness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[-0.6, -0.2, 0.8]} rotation={[0, -0.3, -0.5]} castShadow>
        <coneGeometry args={[0.5, 1.2, 4]} />
        <meshStandardMaterial
          color={color}
          metalness={0.4}
          roughness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Beckenflosse */}
      <mesh position={[0, -0.6, -0.5]} rotation={[-0.3, 0, 0]} castShadow>
        <coneGeometry args={[0.3, 0.8, 4]} />
        <meshStandardMaterial
          color={color}
          metalness={0.4}
          roughness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Augen */}
      <mesh position={[0.35, 0.3, 2.3]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color="#000000"
          emissive="#333333"
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh position={[-0.35, 0.3, 2.3]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color="#000000"
          emissive="#333333"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Kiemen */}
      {[0, 1, 2, 3, 4].map((i) => (
        <React.Fragment key={i}>
          <mesh position={[0.55, 0.1 - i * 0.12, 1.2 - i * 0.15]}>
            <boxGeometry args={[0.05, 0.08, 0.02]} />
            <meshStandardMaterial color="#333333" />
          </mesh>
          <mesh position={[-0.55, 0.1 - i * 0.12, 1.2 - i * 0.15]}>
            <boxGeometry args={[0.05, 0.08, 0.02]} />
            <meshStandardMaterial color="#333333" />
          </mesh>
        </React.Fragment>
      ))}

      {/* Maul */}
      <mesh position={[0, -0.2, 2.6]}>
        <boxGeometry args={[0.4, 0.15, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
});

// Walhai Modell (größer und breiter)
const WhaleShark = React.forwardRef(({ color }, ref) => {
  return (
    <group ref={ref} scale={1.4} rotation={[0, Math.PI / 2, 0]}>
      {/* Hauptkörper - massiv und rund */}
      <mesh position={[0, 0, 0]} castShadow>
        <capsuleGeometry args={[0.9, 4, 32, 32]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4}>
          <primitive attach="map" object={createSpotPattern()} />
        </meshStandardMaterial>
      </mesh>

      {/* Kopf - breit und flach */}
      <mesh position={[0, 0, 2.5]} castShadow scale={[1.1, 0.9, 1]}>
        <sphereGeometry args={[0.95, 32, 32]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4}>
          <primitive attach="map" object={createSpotPattern()} />
        </meshStandardMaterial>
      </mesh>

      {/* Bauch - heller */}
      <mesh position={[0, -0.7, 0]} scale={[0.85, 0.6, 1.05]}>
        <capsuleGeometry args={[0.8, 3.5, 32, 32]} />
        <meshStandardMaterial color="#e8f4f8" metalness={0.2} roughness={0.5} />
      </mesh>

      {/* Rückenflosse - klein beim Walhai */}
      <mesh position={[0, 1.1, -0.3]} rotation={[0.2, 0, 0]} castShadow>
        <coneGeometry args={[0.5, 1.2, 4]} />
        <meshStandardMaterial
          color={color}
          metalness={0.3}
          roughness={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Schwanzflosse - groß und kräftig */}
      <group position={[0, 0, -2.5]}>
        <mesh position={[0, 0.5, 0]} rotation={[0, 0, 0.2]} castShadow>
          <coneGeometry args={[0.6, 2.2, 4]} />
          <meshStandardMaterial
            color={color}
            metalness={0.3}
            roughness={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[0, -0.4, 0]} rotation={[0, 0, -0.2]} castShadow>
          <coneGeometry args={[0.5, 1.8, 4]} />
          <meshStandardMaterial
            color={color}
            metalness={0.3}
            roughness={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Brustflossen - groß */}
      <mesh position={[0.8, -0.3, 1]} rotation={[0, 0.2, 0.6]} castShadow>
        <coneGeometry args={[0.6, 1.5, 4]} />
        <meshStandardMaterial
          color={color}
          metalness={0.3}
          roughness={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[-0.8, -0.3, 1]} rotation={[0, -0.2, -0.6]} castShadow>
        <coneGeometry args={[0.6, 1.5, 4]} />
        <meshStandardMaterial
          color={color}
          metalness={0.3}
          roughness={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Augen - klein */}
      <mesh position={[0.5, 0.3, 2.8]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[-0.5, 0.3, 2.8]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Großes Maul */}
      <mesh position={[0, -0.4, 3.2]} scale={[1.2, 0.8, 1]}>
        <cylinderGeometry args={[0.4, 0.5, 0.6, 32]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Kiemenspalten */}
      {[0, 1, 2, 3].map((i) => (
        <React.Fragment key={i}>
          <mesh position={[0.85, 0 - i * 0.15, 1.5 - i * 0.2]}>
            <boxGeometry args={[0.08, 0.12, 0.03]} />
            <meshStandardMaterial color="#2a2a2a" />
          </mesh>
          <mesh position={[-0.85, 0 - i * 0.15, 1.5 - i * 0.2]}>
            <boxGeometry args={[0.08, 0.12, 0.03]} />
            <meshStandardMaterial color="#2a2a2a" />
          </mesh>
        </React.Fragment>
      ))}
    </group>
  );
});

// Hammerhai Modell (mit charakteristischem Hammerkopf)
const HammerheadShark = React.forwardRef(({ color }, ref) => {
  return (
    <group ref={ref} rotation={[0, Math.PI / 2, 0]}>
      {/* Körper */}
      <mesh position={[0, 0, 0]} castShadow>
        <capsuleGeometry args={[0.6, 3.2, 32, 32]} />
        <meshStandardMaterial color={color} metalness={0.4} roughness={0.3} />
      </mesh>

      {/* Bauch heller */}
      <mesh position={[0, -0.5, 0]} scale={[0.9, 0.7, 1]}>
        <capsuleGeometry args={[0.5, 2.8, 32, 32]} />
        <meshStandardMaterial color="#c8d8e0" metalness={0.3} roughness={0.4} />
      </mesh>

      {/* Hammerkopf - das Markenzeichen! */}
      <group position={[0, 0, 2]}>
        {/* Horizontaler Hammer */}
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <capsuleGeometry args={[0.25, 2.5, 16, 16]} />
          <meshStandardMaterial color={color} metalness={0.4} roughness={0.3} />
        </mesh>

        {/* Vordere Kante */}
        <mesh position={[0, 0, 0.3]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.22, 2.4, 16, 16]} />
          <meshStandardMaterial
            color="#c8d8e0"
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>

        {/* Augen an den Enden des Hammers */}
        <mesh position={[1.3, 0.1, 0.2]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color="#000000"
            emissive="#222222"
            emissiveIntensity={0.3}
          />
        </mesh>
        <mesh position={[-1.3, 0.1, 0.2]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color="#000000"
            emissive="#222222"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Nasenlöcher */}
        <mesh position={[1.1, -0.1, 0.3]}>
          <cylinderGeometry args={[0.05, 0.05, 0.1, 16]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[-1.1, -0.1, 0.3]}>
          <cylinderGeometry args={[0.05, 0.05, 0.1, 16]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      </group>

      {/* Rückenflosse - groß */}
      <mesh position={[0, 0.95, 0.2]} rotation={[0.15, 0, 0]} castShadow>
        <coneGeometry args={[0.65, 1.6, 4]} />
        <meshStandardMaterial
          color={color}
          metalness={0.4}
          roughness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Zweite Rückenflosse - klein */}
      <mesh position={[0, 0.4, -1.2]} rotation={[0.1, 0, 0]} castShadow>
        <coneGeometry args={[0.25, 0.6, 4]} />
        <meshStandardMaterial
          color={color}
          metalness={0.4}
          roughness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Schwanzflosse - sichelförmig */}
      <group position={[0, 0, -2]}>
        <mesh position={[0, 0.4, 0]} rotation={[0, 0, 0.25]} castShadow>
          <coneGeometry args={[0.5, 1.8, 4]} />
          <meshStandardMaterial
            color={color}
            metalness={0.4}
            roughness={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[0, -0.35, 0]} rotation={[0, 0, -0.25]} castShadow>
          <coneGeometry args={[0.4, 1.4, 4]} />
          <meshStandardMaterial
            color={color}
            metalness={0.4}
            roughness={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Brustflossen - lang und gebogen */}
      <mesh position={[0.6, -0.25, 0.7]} rotation={[0, 0.25, 0.55]} castShadow>
        <coneGeometry args={[0.5, 1.4, 4]} />
        <meshStandardMaterial
          color={color}
          metalness={0.4}
          roughness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh
        position={[-0.6, -0.25, 0.7]}
        rotation={[0, -0.25, -0.55]}
        castShadow
      >
        <coneGeometry args={[0.5, 1.4, 4]} />
        <meshStandardMaterial
          color={color}
          metalness={0.4}
          roughness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Beckenflosse */}
      <mesh position={[0, -0.55, -0.6]} rotation={[-0.35, 0, 0]} castShadow>
        <coneGeometry args={[0.3, 0.9, 4]} />
        <meshStandardMaterial
          color={color}
          metalness={0.4}
          roughness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Kiemen */}
      {[0, 1, 2, 3, 4].map((i) => (
        <React.Fragment key={i}>
          <mesh position={[0.55, 0.05 - i * 0.11, 1 - i * 0.13]}>
            <boxGeometry args={[0.05, 0.08, 0.02]} />
            <meshStandardMaterial color="#2a2a2a" />
          </mesh>
          <mesh position={[-0.55, 0.05 - i * 0.11, 1 - i * 0.13]}>
            <boxGeometry args={[0.05, 0.08, 0.02]} />
            <meshStandardMaterial color="#2a2a2a" />
          </mesh>
        </React.Fragment>
      ))}

      {/* Maul */}
      <mesh position={[0, -0.3, 2.2]}>
        <boxGeometry args={[0.35, 0.18, 0.25]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
});

// Hilfsfunktion für Walhai-Muster
const createSpotPattern = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#5a8ba8";
  ctx.fillRect(0, 0, 256, 256);
  ctx.fillStyle = "#ffffff";
  for (let i = 0; i < 50; i++) {
    ctx.beginPath();
    ctx.arc(
      Math.random() * 256,
      Math.random() * 256,
      Math.random() * 8 + 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
};

const Shark3DViewer = () => {
  const [selectedShark, setSelectedShark] = useState("white");

  const sharks3D = [
    {
      id: "white",
      name: "Weißer Hai",
      scientificName: "Carcharodon carcharias",
      description:
        "Der berühmteste Hai der Welt - erkunde seine beeindruckende Anatomie in 3D!",
      size: "6m Länge",
      weight: "2000kg",
      color: "#8ba3b0",
    },
  ];

  const currentShark = sharks3D.find((s) => s.id === selectedShark);

  return (
    <div className="shark-3d-viewer-page">
      <div className="viewer-header">
        <h1 className="viewer-title">🎮 {t("Haie in 3D", "Sharks in 3D")}</h1>
        <p className="viewer-subtitle">
          {t(
            "Erkunde Haie in 360° - Rotiere, Zoome und entdecke ihre Anatomie interaktiv!",
            "Explore sharks in 360° - Rotate, zoom and discover their anatomy interactively!"
          )}
        </p>
      </div>

      {/* 3D Viewer Container */}
      <div className="viewer-container">
        <div className="viewer-main">
          {/* 3D Model Canvas */}
          <div className="model-frame">
            <Canvas
              shadows
              className="threejs-canvas"
              style={{ height: "610px", width: "100%" }}
            >
              <PerspectiveCamera makeDefault position={[0, 2, 8]} />
              <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                minDistance={3}
                maxDistance={15}
                autoRotate={false}
              />

              {/* Beleuchtung */}
              <ambientLight intensity={0.4} />
              <directionalLight
                position={[10, 10, 5]}
                intensity={1}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
              />
              <pointLight
                position={[-10, 10, -10]}
                intensity={0.5}
                color="#00aaff"
              />
              <pointLight
                position={[10, -10, 10]}
                intensity={0.3}
                color="#0077cc"
              />

              {/* Unterwasser-Atmosphäre */}
              <fog attach="fog" args={["#003366", 5, 20]} />
              <Stars
                radius={100}
                depth={50}
                count={1000}
                factor={4}
                saturation={0}
                fade
                speed={0.5}
              />

              {/* Hai Modell */}
              <Suspense fallback={null}>
                <SharkModel
                  sharkType={selectedShark}
                  color={currentShark.color}
                />
              </Suspense>

              {/* Umgebung */}
              <Environment preset="night" />

              {/* Boden (Ozean) */}
              <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -3, 0]}
                receiveShadow
              >
                <planeGeometry args={[50, 50]} />
                <meshStandardMaterial
                  color="#001f3f"
                  metalness={0.8}
                  roughness={0.2}
                />
              </mesh>
            </Canvas>

            <div className="model-controls-hint">
              <span>🖱️ Linke Maustaste: Rotieren</span>
              <span>🔍 Mausrad: Zoomen</span>
              <span>🖱️ Rechte Maustaste: Verschieben</span>
            </div>
          </div>

          {/* Info Panel */}
          <div className="viewer-info-panel">
            <div className="info-header">
              <h2>{currentShark.name}</h2>
              <span className="scientific-name">
                {currentShark.scientificName}
              </span>
            </div>

            <p className="info-description">{currentShark.description}</p>

            <div className="info-stats">
              <div className="stat-item">
                <span className="stat-icon">📏</span>
                <div>
                  <strong>Länge</strong>
                  <p>{currentShark.size}</p>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">⚖️</span>
                <div>
                  <strong>Gewicht</strong>
                  <p>{currentShark.weight}</p>
                </div>
              </div>
            </div>

            <div className="interaction-tips">
              <h3>💡 {t("Interaktions-Tipps", "Interaction Tips")}</h3>
              <ul>
                <li>
                  {t(
                    "Klicke und ziehe mit der Maus, um das Modell zu rotieren",
                    "Click and drag with the mouse to rotate the model"
                  )}
                </li>
                <li>
                  {t(
                    "Benutze das Mausrad zum Zoomen",
                    "Use the mouse wheel to zoom"
                  )}
                </li>
                <li>
                  {t(
                    "Rechtsklick + Ziehen zum Verschieben der Ansicht",
                    "Right-click + drag to move the view"
                  )}
                </li>
                <li>
                  {t(
                    "Doppelklick zum Zurücksetzen der Kamera",
                    "Double-click to reset the camera"
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="viewer-features">
        <div className="feature-card">
          <span className="feature-icon">🔄</span>
          <h3>{t("360° Rotation", "360° Rotation")}</h3>
          <p>
            {t(
              "Betrachte den Hai aus allen Winkeln",
              "View the shark from all angles"
            )}
          </p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🔍</span>
          <h3>{t("Zoom & Detail", "Zoom & Detail")}</h3>
          <p>
            {t(
              "Erkunde jedes anatomische Detail",
              "Explore every anatomical detail"
            )}
          </p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">📱</span>
          <h3>{t("VR-Ready", "VR-Ready")}</h3>
          <p>{t("Funktioniert mit VR-Headsets", "Works with VR headsets")}</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🎮</span>
          <h3>{t("Interaktiv", "Interactive")}</h3>
          <p>
            {t(
              "Echtzeit 3D-Rendering im Browser",
              "Real-time 3D rendering in the browser"
            )}
          </p>
        </div>
      </div>

      {/* Technology Info */}
      <div className="tech-info">
        <h3>Powered by Sketchfab</h3>
        <p>
          {t(
            "Diese 3D-Modelle werden von Sketchfab bereitgestellt und nutzen WebGL für hardwarebeschleunigtes Rendering direkt in deinem Browser.",
            "These 3D models are provided by Sketchfab and use WebGL for hardware-accelerated rendering directly in your browser."
          )}
        </p>
      </div>
    </div>
  );
};

export default Shark3DViewer;
