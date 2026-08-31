'use client';

import { useState } from 'react';
import { Vector3D } from '@/types/campus';
import { useCampusStore } from '@/hooks/useCampusStore';
import { BuildingLabel } from './BuildingLabel';
import * as THREE from 'three';

interface BuildingProps {
    id: string;
    name: string;
    position: Vector3D;
    dimensions: Vector3D;
    color?: string;
}

export function BuildingMesh({ id, name, position, dimensions, color = '#1a2e26' }: BuildingProps) {
    const [hovered, setHovered] = useState(false);
    const selectedLocation = useCampusStore((s) => s.selectedLocation);
    const isSelected = selectedLocation?.building === name;

    const activeColor = isSelected ? '#10b981' : hovered ? '#34d399' : color;
    const wireframeColor = isSelected ? '#6ee7b7' : '#059669';

    return (
        <group position={[position.x, position.y, position.z]}>
            <mesh
                onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
                onPointerOut={() => setHovered(false)}
            >
                <boxGeometry args={[dimensions.x, dimensions.y, dimensions.z]} />
                <meshStandardMaterial
                    color={activeColor}
                    roughness={0.3}
                    metalness={0.8}
                    transparent
                    opacity={0.9}
                />
            </mesh>

            {/* Wireframe Edge */}
            <lineSegments>
                <edgesGeometry args={[new THREE.BoxGeometry(dimensions.x, dimensions.y, dimensions.z)]} />
                <lineBasicMaterial color={wireframeColor} linewidth={2} />
            </lineSegments>

            {/* Floating Spatial Label Component */}
            <BuildingLabel
                name={name}
                position={[0, 0, 0]}
                height={dimensions.y}
                isSelected={isSelected}
            />
        </group>
    );
}

export default BuildingMesh;