'use client';

import React from 'react';
import { useCampusStore } from '@/hooks/useCampusStore';
import { ProceduralCampusModels } from './ProceduralCampusModels';
import { Controls } from './Controls';
import { Html, Environment, ContactShadows, Sky } from '@react-three/drei';
import { NavigationLine } from './NavigationLine';

export default function CampusScene({ controlsRef }: { controlsRef?: React.RefObject<any> }) {
    const selectedCollegeId = useCampusStore((s) => s.selectedCollegeId);
    const selectedLocation = useCampusStore((s) => s.selectedLocation);

    return (
        <>
            {/* 1. CAMERA & ORBIT CONTROLS WITH 3D FOCUS */}
            <Controls />

            {/* 2. REALISTIC SUNLIGHT & SKY ENVIRONMENT */}
            <Sky sunPosition={[100, 40, 100]} inclination={0.6} azimuth={0.25} />
            <ambientLight intensity={0.55} />

            {/* Main Directional Sun Light */}
            <directionalLight
                position={[40, 60, 20]}
                intensity={2.2}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-far={150}
                shadow-camera-left={-50}
                shadow-camera-right={50}
                shadow-camera-top={50}
                shadow-camera-bottom={-50}
                shadow-bias={-0.0001}
            />

            {/* HDRI Environment Reflections */}
            <Environment preset="city" environmentIntensity={0.8} />

            {/* Ground Plane */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
                <planeGeometry args={[300, 300]} />
                <meshStandardMaterial color="#1e293b" roughness={0.8} metalness={0.2} />
            </mesh>

            {/* Contact Shadows Under Buildings */}
            <ContactShadows
                position={[0, 0, 0]}
                opacity={0.7}
                scale={150}
                blur={2}
                far={15}
                color="#0f172a"
            />

            {/* 3. 3D CAMPUS ARCHITECTURE & NAVIGATION */}
            <ProceduralCampusModels collegeId={selectedCollegeId} />
            <NavigationLine />

            {/* 4. TARGET LOCATION BEACON & HIGH-CONTRAST 3D PIN */}
            {selectedLocation && selectedLocation.position && (
                <group
                    position={[
                        selectedLocation.position.x,
                        selectedLocation.position.y,
                        selectedLocation.position.z,
                    ]}
                >
                    <mesh position={[0, 3, 0]}>
                        <cylinderGeometry args={[0.1, 0.1, 6, 16]} />
                        <meshBasicMaterial color="#34d399" transparent opacity={0.9} />
                    </mesh>

                    <Html
                        position={[0, 6.8, 0]}
                        center
                        distanceFactor={24}
                        style={{
                            pointerEvents: 'none',
                            userSelect: 'none',
                        }}
                    >
                        <div className="bg-black/95 border-2 border-emerald-400 px-4 py-2.5 rounded-xl shadow-[0_0_30px_rgba(52,211,153,0.9)] flex items-center gap-3 whitespace-nowrap backdrop-blur-md">
                            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                            <div className="flex flex-col">
                                <p className="text-sm font-extrabold text-white uppercase tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                                    {selectedLocation.name}
                                </p>
                                <p className="text-xs text-emerald-300 font-mono font-semibold">
                                    Floor {selectedLocation.floor} • Room {selectedLocation.roomNumber || selectedLocation.roomNumber}
                                </p>
                            </div>
                        </div>
                    </Html>
                </group>
            )}
        </>
    );
}