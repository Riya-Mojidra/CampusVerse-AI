'use client';

import React, { useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useCampusStore } from '@/hooks/useCampusStore';
import * as THREE from 'three';

interface RealCampusProps {
    modelPath: string;
}

// 1. Component to load GLTF model safely
function ModelRenderer({ modelPath }: { modelPath: string }) {
    const { scene } = useGLTF(modelPath) as any;
    const [hoveredMesh, setHoveredMesh] = useState<string | null>(null);
    const selectedLocation = useCampusStore((s) => s.selectedLocation);

    React.useEffect(() => {
        if (!scene) return;
        scene.traverse((child: THREE.Object3D) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                mesh.castShadow = true;
                mesh.receiveShadow = true;

                const isSelected =
                    selectedLocation &&
                    mesh.name.toLowerCase().includes(selectedLocation.building.toLowerCase());
                const isHovered = hoveredMesh === mesh.name;

                if (isSelected) {
                    mesh.material = new THREE.MeshStandardMaterial({
                        color: new THREE.Color('#10b981'),
                        emissive: new THREE.Color('#059669'),
                        emissiveIntensity: 0.6,
                    });
                } else if (isHovered) {
                    mesh.material = new THREE.MeshStandardMaterial({
                        color: new THREE.Color('#34d399'),
                    });
                }
            }
        });
    }, [scene, selectedLocation, hoveredMesh]);

    return <primitive object={scene} scale={[1, 1, 1]} position={[0, 0, 0]} />;
}

// 2. Procedural Fallback Campus rendered when no valid .glb exists
function ProceduralCampusFallback() {
    const selectedLocation = useCampusStore((s) => s.selectedLocation);

    const buildings = [
        { name: 'Degree Block', pos: [12, 3, -8] as [number, number, number], size: [10, 6, 12] as [number, number, number] },
        { name: 'Main Building', pos: [-15, 4, 10] as [number, number, number], size: [14, 8, 14] as [number, number, number] },
        { name: 'Textile Block', pos: [0, 2.5, 20] as [number, number, number], size: [8, 5, 10] as [number, number, number] },
        { name: 'Library', pos: [-10, 3, -15] as [number, number, number], size: [12, 6, 10] as [number, number, number] },
    ];

    return (
        <group>
            {/* Ground Plane */}
            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#0b1210" roughness={0.8} />
            </mesh>

            {/* Grid Guide */}
            <gridHelper args={[100, 50, '#10b981', '#172e25']} position={[0, 0, 0]} />

            {/* Buildings */}
            {buildings.map((b) => {
                const isSelected = selectedLocation?.building === b.name;
                return (
                    <group key={b.name} position={b.pos}>
                        <mesh castShadow receiveShadow>
                            <boxGeometry args={b.size} />
                            <meshStandardMaterial
                                color={isSelected ? '#10b981' : '#142922'}
                                roughness={0.3}
                                metalness={0.7}
                                wireframe={false}
                            />
                        </mesh>
                        <lineSegments>
                            <edgesGeometry args={[new THREE.BoxGeometry(...b.size)]} />
                            <lineBasicMaterial color={isSelected ? '#6ee7b7' : '#10b981'} linewidth={2} />
                        </lineSegments>
                    </group>
                );
            })}
        </group>
    );
}

// 3. Error Boundary wrapper to catch model load failures
class ModelErrorBoundary extends React.Component<
    { children: React.ReactNode; fallback: React.ReactNode },
    { hasError: boolean }
> {
    constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: any) {
        console.warn('Campus .glb model missing or invalid. Rendering procedural campus fallback.', error);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}

export function RealCampusModel({ modelPath }: RealCampusProps) {
    return (
        <ModelErrorBoundary fallback={<ProceduralCampusFallback />}>
            <ModelRenderer modelPath={modelPath} />
        </ModelErrorBoundary>
    );
}