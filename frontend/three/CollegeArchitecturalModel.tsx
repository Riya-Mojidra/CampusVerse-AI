'use client';

import React from 'react';
import { useCampusStore } from '@/hooks/useCampusStore';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface CollegeArchitecturalProps {
    collegeId: string;
}

export function CollegeArchitecturalModel({ collegeId }: CollegeArchitecturalProps) {
    const selectedLocation = useCampusStore((s) => s.selectedLocation);

    return (
        <group>
            {/* =========================================================
          1. VJTI MATUNGA: Colonial Heritage Architecture & Quad
         ========================================================= */}
            {collegeId === 'vjti-mumbai' && (
                <group>
                    {/* Main Academic & Clock Tower Building */}
                    <BuildingBlock
                        name="Main Academic & Admin Building"
                        isSelected={selectedLocation?.building.includes('Main Academic')}
                        position={[-12, 0, 8]}
                        size={[14, 8, 14]}
                        color="#1e2923"
                        roofType="heritage"
                    />
                    {/* Degree Block */}
                    <BuildingBlock
                        name="Degree Block (Comp/IT/Extc)"
                        isSelected={selectedLocation?.building.includes('Degree Block')}
                        position={[8, 0, -6]}
                        size={[10, 6, 12]}
                        color="#162e25"
                        roofType="flat"
                    />
                    {/* Textile & Mech Block */}
                    <BuildingBlock
                        name="Textile, Mech & Production Block"
                        isSelected={selectedLocation?.building.includes('Textile')}
                        position={[4, 0, 16]}
                        size={[10, 5, 10]}
                        color="#13241d"
                        roofType="flat"
                    />
                    {/* Civil Wing */}
                    <BuildingBlock
                        name="Civil & Structural Engg Wing"
                        isSelected={selectedLocation?.building.includes('Civil')}
                        position={[-14, 0, -10]}
                        size={[10, 6, 10]}
                        color="#162e25"
                        roofType="flat"
                    />
                    {/* Central Library & Quadrangle */}
                    <BuildingBlock
                        name="Central Library & Quadrangle"
                        isSelected={selectedLocation?.building.includes('Central Library')}
                        position={[0, 0, -16]}
                        size={[12, 7, 8]}
                        color="#1b382d"
                        roofType="pitched"
                    />
                </group>
            )}

            {/* =========================================================
          2. SARDAR PATEL (SPIT ANDHERI): Modern Tower & Bhavan's Campus
         ========================================================= */}
            {collegeId === 'spit-mumbai' && (
                <group>
                    {/* Main Academic Tower */}
                    <BuildingBlock
                        name="Main Academic Tower (Comp/DS/AIML)"
                        isSelected={selectedLocation?.building.includes('Main Academic Tower')}
                        position={[0, 0, 0]}
                        size={[14, 10, 12]}
                        color="#0f2b22"
                        glassFacade
                        floors={5}
                    />
                    {/* SPCE & EXTC Wing */}
                    <BuildingBlock
                        name="SPCE & EXTC Wing"
                        isSelected={selectedLocation?.building.includes('SPCE')}
                        position={[16, 0, -8]}
                        size={[10, 7, 10]}
                        color="#172e25"
                        floors={3}
                    />
                    {/* Bhavan's Central Library */}
                    <BuildingBlock
                        name="Central Library & Humanities Block"
                        isSelected={selectedLocation?.building.includes('Central Library')}
                        position={[-12, 0, 8]}
                        size={[8, 6, 8]}
                        color="#13261f"
                        roofType="pitched"
                    />
                </group>
            )}

            {/* =========================================================
          3. D.J. SANGHVI (VILE PARLE): Urban High-Rise Glass Tower
         ========================================================= */}
            {collegeId === 'djsce-mumbai' && (
                <group>
                    {/* 10-Story Main Tower */}
                    <BuildingBlock
                        name="Main Academic Tower (10 Floors)"
                        isSelected={selectedLocation?.building.includes('Main Academic Tower')}
                        position={[0, 0, 0]}
                        size={[12, 14, 12]}
                        color="#09241b"
                        glassFacade
                        floors={10}
                    />
                    {/* Bhagubhai Wing */}
                    <BuildingBlock
                        name="Bhagubhai Wing (Mech & Labs)"
                        isSelected={selectedLocation?.building.includes('Bhagubhai')}
                        position={[14, 0, -4]}
                        size={[10, 8, 8]}
                        color="#142b22"
                        floors={4}
                    />
                </group>
            )}

            {/* =========================================================
          4. K.J. SOMAIYA (VIDYAVIHAR): Multi-Building Campus Complex
         ========================================================= */}
            {collegeId === 'kjsce-mumbai' && (
                <group>
                    {/* Aryabhata Building (Bldg 1) */}
                    <BuildingBlock
                        name="Aryabhata Building (Bldg 1 - Comp/IT)"
                        isSelected={selectedLocation?.building.includes('Aryabhata')}
                        position={[-12, 0, -4]}
                        size={[12, 8, 10]}
                        color="#122d23"
                        floors={4}
                    />
                    {/* Bhaskaracharya Building (Bldg 2) */}
                    <BuildingBlock
                        name="Bhaskaracharya Building (Bldg 2 - EXTC/Mech)"
                        isSelected={selectedLocation?.building.includes('Bhaskaracharya')}
                        position={[12, 0, 4]}
                        size={[12, 8, 10]}
                        color="#122d23"
                        floors={4}
                    />
                    {/* Somaiya Complex & Sports Arena */}
                    <BuildingBlock
                        name="Somaiya Central Library & Sports Complex"
                        isSelected={selectedLocation?.building.includes('Somaiya Central Library')}
                        position={[0, 0, -16]}
                        size={[14, 9, 8]}
                        color="#1a3d30"
                        roofType="pitched"
                    />
                </group>
            )}
        </group>
    );
}

// Sub-component for rendering individual realistic building structures
function BuildingBlock({
    name,
    position,
    size,
    color,
    isSelected,
    roofType = 'flat',
    glassFacade = false,
    floors = 3,
}: {
    name: string;
    position: [number, number, number];
    size: [number, number, number];
    color: string;
    isSelected?: boolean;
    roofType?: 'flat' | 'pitched' | 'heritage';
    glassFacade?: boolean;
    floors?: number;
}) {
    const [w, h, d] = size;
    const posY = h / 2;

    const activeColor = isSelected ? '#10b981' : color;
    const emissiveColor = isSelected ? '#059669' : '#000000';

    return (
        <group position={[position[0], posY, position[2]]}>
            {/* Main Building Frame */}
            <mesh castShadow receiveShadow>
                <boxGeometry args={[w, h, d]} />
                <meshStandardMaterial
                    color={activeColor}
                    emissive={emissiveColor}
                    emissiveIntensity={isSelected ? 0.5 : 0}
                    roughness={0.3}
                    metalness={0.7}
                />
            </mesh>

            {/* Wireframe Outline */}
            <lineSegments>
                <edgesGeometry args={[new THREE.BoxGeometry(w, h, d)]} />
                <lineBasicMaterial color={isSelected ? '#6ee7b7' : '#10b981'} linewidth={2} />
            </lineSegments>

            {/* Floor Cutouts & Window Stripes */}
            {Array.from({ length: floors }).map((_, i) => {
                const floorY = -h / 2 + (h / (floors + 1)) * (i + 1);
                return (
                    <mesh key={i} position={[0, floorY, 0]}>
                        <boxGeometry args={[w + 0.1, 0.2, d + 0.1]} />
                        <meshStandardMaterial
                            color={isSelected ? '#34d399' : '#10b981'}
                            emissive="#10b981"
                            emissiveIntensity={0.3}
                        />
                    </mesh>
                );
            })}

            {/* Pitched Roof Layer */}
            {roofType === 'pitched' && (
                <mesh position={[0, h / 2 + 1, 0]} castShadow>
                    <coneGeometry args={[Math.max(w, d) * 0.6, 2, 4]} />
                    <meshStandardMaterial color={isSelected ? '#10b981' : '#064e3b'} roughness={0.2} />
                </mesh>
            )}

            {/* Floating Building Title */}
            <Html position={[0, h / 2 + 1.2, 0]} center distanceFactor={25}>
                <div
                    className={`px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider whitespace-nowrap transition-all border ${isSelected
                            ? 'bg-[#10b981] text-black font-bold border-[#10b981] shadow-[0_0_15px_rgba(16,185,129,0.8)]'
                            : 'bg-[#070B0A]/80 text-emerald-400 border-[#10b981]/30'
                        }`}
                >
                    {name}
                </div>
            </Html>
        </group>
    );
}