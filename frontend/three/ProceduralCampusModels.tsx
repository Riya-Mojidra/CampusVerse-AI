'use client';

import React from 'react';
import * as THREE from 'three';
import { useCampusStore, BuildingInfo } from '@/hooks/useCampusStore';
import { Html } from '@react-three/drei';

interface ProceduralCampusProps {
    collegeId: string;
}

export function ProceduralCampusModels({ collegeId }: ProceduralCampusProps) {
    const selectedLocation = useCampusStore((s) => s.selectedLocation);
    const selectedBuilding = useCampusStore((s) => s.selectedBuilding);
    const setSelectedBuilding = useCampusStore((s) => s.setSelectedBuilding);

    const handleBuildingClick = (buildingInfo: BuildingInfo) => {
        setSelectedBuilding(buildingInfo);
    };

    return (
        <group>
            {/* ====================================================================
          1. VJTI MATUNGA: Real Heritage Red-Brick & Sandstone Architecture
         ==================================================================== */}
            {collegeId === 'vjti-mumbai' && (
                <group>
                    <RealisticHeritageBuilding
                        name="Main Academic & Admin Building"
                        isSelected={selectedLocation?.building.includes('Main Academic') || selectedBuilding?.name.includes('Main Academic')}
                        position={[-14, 0, 8]}
                        dimensions={[16, 9, 14]}
                        wallColor="#8C2D19"
                        roofColor="#5C1D11"
                        trimColor="#FEF3C7"
                        floors={3}
                        hasClockTower
                        onClick={() =>
                            handleBuildingClick({
                                id: 'vjti-main',
                                name: 'Main Academic & Admin Building',
                                code: 'HQ-01',
                                totalFloors: 3,
                                departments: ['Central Administration', 'Principal Office', 'Dean Academics', 'Auditorium'],
                                description: 'Historical red-brick heritage wing housing the central administration and core halls.',
                            })
                        }
                    />
                    <RealisticModernBuilding
                        name="Degree Block (Comp/IT/Extc)"
                        isSelected={selectedLocation?.building.includes('Degree Block') || selectedBuilding?.name.includes('Degree Block')}
                        position={[10, 0, -6]}
                        dimensions={[12, 8, 14]}
                        wallColor="#B45309"
                        trimColor="#FEF3C7"
                        floors={4}
                        onClick={() =>
                            handleBuildingClick({
                                id: 'vjti-degree',
                                name: 'Degree Block (Comp/IT/Extc)',
                                code: 'DB-02',
                                totalFloors: 4,
                                departments: ['Computer Engineering', 'Information Technology', 'EXTC', 'AI/Data Science Lab'],
                                description: 'Multi-floor engineering wing with specialized computer laboratories and project hubs.',
                            })
                        }
                    />
                    <RealisticModernBuilding
                        name="Textile, Mech & Production Block"
                        isSelected={selectedLocation?.building.includes('Textile') || selectedBuilding?.name.includes('Textile')}
                        position={[5, 0, 18]}
                        dimensions={[11, 6, 12]}
                        wallColor="#78350F"
                        trimColor="#D97706"
                        floors={2}
                        onClick={() =>
                            handleBuildingClick({
                                id: 'vjti-mech',
                                name: 'Textile, Mech & Production Block',
                                code: 'ME-03',
                                totalFloors: 2,
                                departments: ['Mechanical Engineering', 'Production Engg', 'Textile Dept', 'Robotics Workshop'],
                                description: 'Practical workshops, heavy machine tooling, and textile testing facilities.',
                            })
                        }
                    />
                    <RealisticModernBuilding
                        name="Civil & Structural Engg Wing"
                        isSelected={selectedLocation?.building.includes('Civil') || selectedBuilding?.name.includes('Civil')}
                        position={[-15, 0, -10]}
                        dimensions={[11, 7, 11]}
                        wallColor="#78350F"
                        trimColor="#FEF3C7"
                        floors={3}
                        onClick={() =>
                            handleBuildingClick({
                                id: 'vjti-civil',
                                name: 'Civil & Structural Engg Wing',
                                code: 'CE-04',
                                totalFloors: 3,
                                departments: ['Civil Engineering', 'Structural Analysis Lab', 'Geotech & Surveying'],
                                description: 'Fluid mechanics, surveying facilities, and material testing labs.',
                            })
                        }
                    />
                    <RealisticHeritageBuilding
                        name="Central Library & Quadrangle"
                        isSelected={selectedLocation?.building.includes('Central Library') || selectedBuilding?.name.includes('Central Library')}
                        position={[0, 0, -18]}
                        dimensions={[14, 8, 10]}
                        wallColor="#A16207"
                        roofColor="#7F1D1D"
                        trimColor="#FEF3C7"
                        floors={2}
                        onClick={() =>
                            handleBuildingClick({
                                id: 'vjti-lib',
                                name: 'Central Library & Quadrangle',
                                code: 'LIB-05',
                                totalFloors: 2,
                                departments: ['Central Library', 'Reading Hall', 'Digital Reference Center', 'Archives'],
                                description: 'Extensive technical book reserves and silent reading zones.',
                            })
                        }
                    />

                    {/* Phase 10: Single Draw Call Instanced Trees */}
                    <InstancedCampusTrees
                        positions={[
                            [0, 0, 0],
                            [-4, 0, 2],
                            [4, 0, -2],
                        ]}
                    />
                </group>
            )}

            {/* ====================================================================
          2. SARDAR PATEL (SPIT ANDHERI): Slate Grey & Cyan Glass Campus
         ==================================================================== */}
            {collegeId === 'spit-mumbai' && (
                <group>
                    <RealisticGlassTower
                        name="Main Academic Tower (Comp/DS/AIML)"
                        isSelected={selectedLocation?.building.includes('Main Academic Tower') || selectedBuilding?.name.includes('Main Academic Tower')}
                        position={[0, 0, 0]}
                        dimensions={[14, 16, 12]}
                        floors={7}
                        glassColor="#0284C7"
                        onClick={() =>
                            handleBuildingClick({
                                id: 'spit-tower',
                                name: 'Main Academic Tower (Comp/DS/AIML)',
                                code: 'SPIT-01',
                                totalFloors: 7,
                                departments: ['Computer Science', 'Data Science', 'AIML', 'Dean Office'],
                                description: 'High-tech academic tower housing multi-department computer clusters.',
                            })
                        }
                    />
                    <RealisticModernBuilding
                        name="SPCE & EXTC Wing"
                        isSelected={selectedLocation?.building.includes('SPCE') || selectedBuilding?.name.includes('SPCE')}
                        position={[18, 0, -8]}
                        dimensions={[11, 8, 11]}
                        wallColor="#334155"
                        trimColor="#38BDF8"
                        floors={3}
                        onClick={() =>
                            handleBuildingClick({
                                id: 'spce-wing',
                                name: 'SPCE & EXTC Wing',
                                code: 'SPCE-02',
                                totalFloors: 3,
                                departments: ['EXTC Dept', 'Electrical Engineering', 'VLSI Lab'],
                                description: 'Hardware simulation facilities and core engineering labs.',
                            })
                        }
                    />
                    <RealisticHeritageBuilding
                        name="Central Library & Humanities Block"
                        isSelected={selectedLocation?.building.includes('Central Library') || selectedBuilding?.name.includes('Central Library')}
                        position={[-14, 0, 8]}
                        dimensions={[10, 7, 9]}
                        wallColor="#475569"
                        roofColor="#1E293B"
                        trimColor="#E2E8F0"
                        floors={2}
                        onClick={() =>
                            handleBuildingClick({
                                id: 'spit-lib',
                                name: 'Central Library & Humanities Block',
                                code: 'LIB-03',
                                totalFloors: 2,
                                departments: ['Central Library', 'Humanities', 'Seminar Hall'],
                                description: 'Campus reference archives, journal sections, and seminar areas.',
                            })
                        }
                    />

                    {/* Phase 10: Single Draw Call Instanced Trees */}
                    <InstancedCampusTrees
                        positions={[
                            [-6, 0, -4],
                            [6, 0, 4],
                        ]}
                    />
                </group>
            )}

            {/* ====================================================================
          3. D.J. SANGHVI (VILE PARLE): 10-Story Urban Metallic Glass Tower
         ==================================================================== */}
            {collegeId === 'djsce-mumbai' && (
                <group>
                    <RealisticGlassTower
                        name="Main Academic Tower (10 Floors)"
                        isSelected={selectedLocation?.building.includes('Main Academic Tower') || selectedBuilding?.name.includes('Main Academic Tower')}
                        position={[0, 0, 0]}
                        dimensions={[13, 22, 13]}
                        floors={10}
                        glassColor="#0D9488"
                        hasVerticalLouvers
                        onClick={() =>
                            handleBuildingClick({
                                id: 'djsce-main',
                                name: 'Main Academic Tower (10 Floors)',
                                code: 'DJ-01',
                                totalFloors: 10,
                                departments: ['Computer Engineering', 'IT', 'AI & DS', 'IoT', 'Administration'],
                                description: '10-story urban campus facility with centralized research labs and smart lecture halls.',
                            })
                        }
                    />
                    <RealisticModernBuilding
                        name="Bhagubhai Wing (Mech & Labs)"
                        isSelected={selectedLocation?.building.includes('Bhagubhai') || selectedBuilding?.name.includes('Bhagubhai')}
                        position={[15, 0, -4]}
                        dimensions={[11, 10, 9]}
                        wallColor="#1E293B"
                        trimColor="#14B8A6"
                        floors={4}
                        onClick={() =>
                            handleBuildingClick({
                                id: 'djsce-mech',
                                name: 'Bhagubhai Wing (Mech & Labs)',
                                code: 'DJ-02',
                                totalFloors: 4,
                                departments: ['Mechanical Dept', 'Manufacturing Lab', 'Robotics Center'],
                                description: 'Specialized fabrication labs and heavy engineering infrastructure.',
                            })
                        }
                    />
                </group>
            )}

            {/* ====================================================================
          4. K.J. SOMAIYA (VIDYAVIHAR): Brick Academic Complex & Skybridge
         ==================================================================== */}
            {collegeId === 'kjsce-mumbai' && (
                <group>
                    <RealisticModernBuilding
                        name="Aryabhata Building (Bldg 1 - Comp/IT)"
                        isSelected={selectedLocation?.building.includes('Aryabhata') || selectedBuilding?.name.includes('Aryabhata')}
                        position={[-13, 0, -4]}
                        dimensions={[13, 9, 11]}
                        wallColor="#991B1B"
                        trimColor="#F59E0B"
                        floors={4}
                        onClick={() =>
                            handleBuildingClick({
                                id: 'kjsce-bldg1',
                                name: 'Aryabhata Building (Bldg 1 - Comp/IT)',
                                code: 'AB-01',
                                totalFloors: 4,
                                departments: ['Computer Engineering', 'Information Technology', 'Auditorium'],
                                description: 'Flagship academic building for computer science and emerging software technologies.',
                            })
                        }
                    />
                    <RealisticModernBuilding
                        name="Bhaskaracharya Building (Bldg 2 - EXTC/Mech)"
                        isSelected={selectedLocation?.building.includes('Bhaskaracharya') || selectedBuilding?.name.includes('Bhaskaracharya')}
                        position={[13, 0, 4]}
                        dimensions={[13, 9, 11]}
                        wallColor="#991B1B"
                        trimColor="#F59E0B"
                        floors={4}
                        onClick={() =>
                            handleBuildingClick({
                                id: 'kjsce-bldg2',
                                name: 'Bhaskaracharya Building (Bldg 2 - EXTC/Mech)',
                                code: 'BB-02',
                                totalFloors: 4,
                                departments: ['Electronics Dept', 'Mechanical Dept', 'Maker Space'],
                                description: 'Core hardware engineering, embedded systems, and project lab block.',
                            })
                        }
                    />
                    {/* Connecting Enclosed Skybridge */}
                    <group position={[0, 6, 0]}>
                        <mesh castShadow>
                            <boxGeometry args={[14, 1.6, 2]} />
                            <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.2} />
                        </mesh>
                        <mesh position={[0, 0, 1.05]}>
                            <boxGeometry args={[13.8, 0.8, 0.1]} />
                            <meshStandardMaterial color="#0284C7" metalness={0.9} roughness={0.1} transparent opacity={0.8} />
                        </mesh>
                    </group>
                    <RealisticHeritageBuilding
                        name="Somaiya Central Library & Sports Complex"
                        isSelected={selectedLocation?.building.includes('Somaiya Central Library') || selectedBuilding?.name.includes('Somaiya Central Library')}
                        position={[0, 0, -18]}
                        dimensions={[16, 10, 10]}
                        wallColor="#78350F"
                        roofColor="#0284C7"
                        trimColor="#FEF3C7"
                        floors={3}
                        onClick={() =>
                            handleBuildingClick({
                                id: 'kjsce-lib',
                                name: 'Somaiya Central Library & Sports Complex',
                                code: 'LIB-03',
                                totalFloors: 3,
                                departments: ['Central Library', 'Digital Resource Center', 'Indoor Sports Complex'],
                                description: 'Somaiya knowledge center and recreational indoor stadium facilities.',
                            })
                        }
                    />

                    {/* Phase 10: Single Draw Call Instanced Trees */}
                    <InstancedCampusTrees
                        positions={[
                            [-6, 0, -10],
                            [6, 0, -10],
                        ]}
                    />
                </group>
            )}
        </group>
    );
}

/* ====================================================================
   REUSABLE ARCHITECTURAL & PERFORMANCE COMPONENTS
==================================================================== */

// 1. Instanced Foliage (Single GPU Draw Call)
function InstancedCampusTrees({ positions }: { positions: [number, number, number][] }) {
    const trunkRef = React.useRef<THREE.InstancedMesh>(null);
    const foliageRef = React.useRef<THREE.InstancedMesh>(null);

    React.useLayoutEffect(() => {
        if (!trunkRef.current || !foliageRef.current) return;
        const dummy = new THREE.Object3D();

        positions.forEach((pos, i) => {
            // Trunk transformation
            dummy.position.set(pos[0], pos[1] + 0.8, pos[2]);
            dummy.scale.set(1, 1, 1);
            dummy.updateMatrix();
            trunkRef.current?.setMatrixAt(i, dummy.matrix);

            // Crown transformation
            dummy.position.set(pos[0], pos[1] + 2.2, pos[2]);
            dummy.updateMatrix();
            foliageRef.current?.setMatrixAt(i, dummy.matrix);
        });

        trunkRef.current.instanceMatrix.needsUpdate = true;
        foliageRef.current.instanceMatrix.needsUpdate = true;
    }, [positions]);

    return (
        <group>
            <instancedMesh ref={trunkRef} args={[undefined, undefined, positions.length]} castShadow receiveShadow>
                <cylinderGeometry args={[0.1, 0.15, 1.6, 6]} />
                <meshStandardMaterial color="#451A03" roughness={0.9} />
            </instancedMesh>
            <instancedMesh ref={foliageRef} args={[undefined, undefined, positions.length]} castShadow receiveShadow>
                <dodecahedronGeometry args={[1.2, 1]} />
                <meshStandardMaterial color="#15803D" roughness={0.7} />
            </instancedMesh>
        </group>
    );
}

// 2. Realistic Modern Building
function RealisticModernBuilding({
    name,
    position,
    dimensions,
    isSelected,
    wallColor = '#475569',
    trimColor = '#FEF3C7',
    floors = 3,
    onClick,
}: {
    name: string;
    position: [number, number, number];
    dimensions: [number, number, number];
    isSelected?: boolean;
    wallColor?: string;
    trimColor?: string;
    floors?: number;
    onClick?: () => void;
}) {
    const [w, h, d] = dimensions;
    const activeColor = isSelected ? '#10b981' : wallColor;

    return (
        <group
            position={[position[0], 0, position[2]]}
            onClick={(e) => {
                e.stopPropagation();
                onClick?.();
            }}
            onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
                document.body.style.cursor = 'default';
            }}
        >
            {/* Foundation Steps */}
            <mesh position={[0, 0.2, 0]} receiveShadow>
                <boxGeometry args={[w + 1, 0.4, d + 1]} />
                <meshStandardMaterial color="#334155" roughness={0.8} />
            </mesh>

            {/* Main Structural Core */}
            <mesh position={[0, h / 2 + 0.4, 0]} castShadow receiveShadow>
                <boxGeometry args={[w, h, d]} />
                <meshStandardMaterial
                    color={activeColor}
                    roughness={0.5}
                    emissive={isSelected ? '#059669' : '#000000'}
                    emissiveIntensity={isSelected ? 0.4 : 0}
                />
            </mesh>

            {/* Projecting Floor Slabs */}
            {Array.from({ length: floors + 1 }).map((_, i) => {
                const yPos = 0.4 + (h / floors) * i;
                return (
                    <mesh key={i} position={[0, yPos, 0]} castShadow>
                        <boxGeometry args={[w + 0.4, 0.25, d + 0.4]} />
                        <meshStandardMaterial color={isSelected ? '#6ee7b7' : trimColor} roughness={0.3} />
                    </mesh>
                );
            })}

            {/* Recessed Windows Grid */}
            {Array.from({ length: floors }).map((_, floorIdx) => {
                const floorY = 0.4 + (h / floors) * floorIdx + h / floors / 2;
                return (
                    <group key={floorIdx}>
                        {Array.from({ length: 4 }).map((_, winIdx) => (
                            <mesh
                                key={winIdx}
                                position={[-w / 2 + (w / 5) * (winIdx + 1), floorY, d / 2 + 0.05]}
                            >
                                <boxGeometry args={[w / 7, h / floors / 1.8, 0.1]} />
                                <meshStandardMaterial color="#0f172a" roughness={0.1} metalness={0.9} />
                            </mesh>
                        ))}
                    </group>
                );
            })}

            {/* Roof Parapet */}
            <mesh position={[0, h + 0.8, 0]}>
                <boxGeometry args={[w, 0.6, d]} />
                <meshStandardMaterial color={activeColor} />
            </mesh>

            {/* Roof HVAC Unit */}
            <mesh position={[-w / 4, h + 1.1, -d / 4]} castShadow>
                <boxGeometry args={[1.5, 1, 1.5]} />
                <meshStandardMaterial color="#64748B" metalness={0.8} />
            </mesh>

            <BuildingLabel name={name} isSelected={isSelected} yOffset={h + 2.8} />
        </group>
    );
}

// 3. Realistic Heritage Building
function RealisticHeritageBuilding({
    name,
    position,
    dimensions,
    isSelected,
    wallColor = '#8C2D19',
    roofColor = '#5C1D11',
    trimColor = '#FEF3C7',
    floors = 3,
    hasClockTower,
    onClick,
}: {
    name: string;
    position: [number, number, number];
    dimensions: [number, number, number];
    isSelected?: boolean;
    wallColor?: string;
    roofColor?: string;
    trimColor?: string;
    floors?: number;
    hasClockTower?: boolean;
    onClick?: () => void;
}) {
    const [w, h, d] = dimensions;
    const activeColor = isSelected ? '#10b981' : wallColor;

    return (
        <group
            position={[position[0], 0, position[2]]}
            onClick={(e) => {
                e.stopPropagation();
                onClick?.();
            }}
            onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
                document.body.style.cursor = 'default';
            }}
        >
            <mesh position={[0, h / 2, 0]} castShadow receiveShadow>
                <boxGeometry args={[w, h, d]} />
                <meshStandardMaterial color={activeColor} roughness={0.6} />
            </mesh>

            {/* Sloped Roof */}
            <mesh position={[0, h + 1.2, 0]} castShadow>
                <coneGeometry args={[Math.max(w, d) * 0.58, 2.4, 4]} />
                <meshStandardMaterial color={isSelected ? '#34d399' : roofColor} roughness={0.4} />
            </mesh>

            {/* Entrance Portico */}
            <group position={[0, 0, d / 2 + 1]}>
                <mesh position={[0, 2, 0]} castShadow>
                    <boxGeometry args={[5, 0.4, 2]} />
                    <meshStandardMaterial color={trimColor} />
                </mesh>
                {[-1.8, 1.8].map((xPos, idx) => (
                    <mesh key={idx} position={[xPos, 1, 0.7]}>
                        <cylinderGeometry args={[0.2, 0.25, 2, 12]} />
                        <meshStandardMaterial color={trimColor} />
                    </mesh>
                ))}
            </group>

            {/* Clock Tower */}
            {hasClockTower && (
                <group position={[0, h + 3, 0]}>
                    <mesh castShadow>
                        <boxGeometry args={[3, 5, 3]} />
                        <meshStandardMaterial color={activeColor} />
                    </mesh>
                    <mesh position={[0, 0.8, 1.51]}>
                        <circleGeometry args={[0.8, 32]} />
                        <meshBasicMaterial color="#FFFFFF" />
                    </mesh>
                    <mesh position={[0, 3.5, 0]}>
                        <coneGeometry args={[1.2, 2.5, 4]} />
                        <meshStandardMaterial color={roofColor} />
                    </mesh>
                </group>
            )}

            <BuildingLabel name={name} isSelected={isSelected} yOffset={h + (hasClockTower ? 6.5 : 3.5)} />
        </group>
    );
}

// 4. Realistic Glass Curtain Wall High-Rise Tower
function RealisticGlassTower({
    name,
    position,
    dimensions,
    isSelected,
    floors = 8,
    glassColor = '#0284C7',
    hasVerticalLouvers,
    onClick,
}: {
    name: string;
    position: [number, number, number];
    dimensions: [number, number, number];
    isSelected?: boolean;
    floors?: number;
    glassColor?: string;
    hasVerticalLouvers?: boolean;
    onClick?: () => void;
}) {
    const [w, h, d] = dimensions;

    return (
        <group
            position={[position[0], 0, position[2]]}
            onClick={(e) => {
                e.stopPropagation();
                onClick?.();
            }}
            onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
                document.body.style.cursor = 'default';
            }}
        >
            {/* Structural Steel Frame */}
            <mesh position={[0, h / 2, 0]} castShadow receiveShadow>
                <boxGeometry args={[w, h, d]} />
                <meshStandardMaterial
                    color={isSelected ? '#10b981' : '#1E293B'}
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>

            {/* Tinted Glass Panels */}
            {Array.from({ length: floors }).map((_, i) => (
                <mesh key={i} position={[0, (h / floors) * (i + 0.5), 0]}>
                    <boxGeometry args={[w + 0.15, h / floors - 0.3, d + 0.15]} />
                    <meshStandardMaterial
                        color={isSelected ? '#a7f3d0' : glassColor}
                        roughness={0.1}
                        metalness={0.9}
                        transparent
                        opacity={0.8}
                    />
                </mesh>
            ))}

            {/* Vertical Louver Trim */}
            {hasVerticalLouvers &&
                Array.from({ length: 5 }).map((_, i) => (
                    <mesh key={i} position={[-w / 2 + (w / 4) * i, h / 2, d / 2 + 0.1]}>
                        <boxGeometry args={[0.1, h, 0.1]} />
                        <meshStandardMaterial color="#94A3B8" metalness={0.9} />
                    </mesh>
                ))}

            <BuildingLabel name={name} isSelected={isSelected} yOffset={h + 2.5} />
        </group>
    );
}

// 5. Enlarged 3D Building Label
function BuildingLabel({ name, isSelected, yOffset }: { name: string; isSelected?: boolean; yOffset: number }) {
    return (
        <Html position={[0, yOffset, 0]} center distanceFactor={28}>
            <div
                className={`px-4 py-2 rounded-lg font-mono tracking-wide whitespace-nowrap transition-all border shadow-2xl ${isSelected
                    ? 'bg-[#10b981] text-black font-extrabold text-sm border-white scale-110 shadow-[0_0_25px_rgba(16,185,129,0.9)]'
                    : 'bg-[#070B0A]/95 text-emerald-300 font-bold text-xs border-[#10b981]/50 backdrop-blur-md'
                    }`}
            >
                <span className="flex items-center gap-2">
                    {isSelected && <span className="w-2 h-2 rounded-full bg-black animate-ping" />}
                    {name}
                </span>
            </div>
        </Html>
    );
}