'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useCampusStore } from '@/hooks/useCampusStore';
import * as THREE from 'three';

export function NavigationLine() {
    const selectedLocation = useCampusStore((s) => s.selectedLocation);
    const isNavigating = useCampusStore((s) => s.isNavigating);

    const particleRef = useRef<THREE.Mesh>(null);
    const pulseRef = useRef<THREE.MeshBasicMaterial>(null);
    const progress = useRef(0);

    // Generate a multi-segment CatmullRom path avoiding building obstacles
    const { curve, tubeGeometry } = useMemo(() => {
        if (!selectedLocation?.position) return { curve: null, tubeGeometry: null };

        const start = new THREE.Vector3(0, 0.25, 24); // Campus Main Gate
        const dest = new THREE.Vector3(
            selectedLocation.position.x,
            0.25,
            selectedLocation.position.z
        );

        // Realistic campus roadway midpoints
        const mid1 = new THREE.Vector3(0, 0.25, dest.z * 0.6);
        const mid2 = new THREE.Vector3(dest.x * 0.4, 0.25, dest.z);

        const generatedCurve = new THREE.CatmullRomCurve3([start, mid1, mid2, dest]);
        const geom = new THREE.TubeGeometry(generatedCurve, 64, 0.12, 8, false);

        return { curve: generatedCurve, tubeGeometry: geom };
    }, [selectedLocation]);

    // Animate pulse brightness and moving waypoint particle
    useFrame((_, delta) => {
        if (!isNavigating || !curve) return;

        // Advance traveling energy bead
        progress.current = (progress.current + delta * 0.35) % 1;
        if (particleRef.current) {
            const pos = curve.getPointAt(progress.current);
            particleRef.current.position.copy(pos);
        }
    });

    if (!isNavigating || !tubeGeometry || !selectedLocation?.position) return null;

    return (
        <group>
            {/* 1. Neon Glowing Outer Tube Path */}
            <mesh geometry={tubeGeometry}>
                <meshStandardMaterial
                    ref={pulseRef}
                    color="#10b981"
                    emissive="#34d399"
                    emissiveIntensity={2.5}
                    roughness={0.1}
                    metalness={0.8}
                    transparent
                    opacity={0.85}
                />
            </mesh>

            {/* 2. Traveling Energy Particle */}
            <mesh ref={particleRef}>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshBasicMaterial color="#a7f3d0" />
                <pointLight color="#34d399" intensity={3} distance={5} />
            </mesh>

            {/* 3. Entrance Origin Radar Pulse */}
            <group position={[0, 0.05, 24]}>
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[0.6, 0.85, 32]} />
                    <meshBasicMaterial color="#10b981" side={THREE.DoubleSide} transparent opacity={0.8} />
                </mesh>
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[0.3, 32]} />
                    <meshBasicMaterial color="#34d399" side={THREE.DoubleSide} />
                </mesh>
            </group>

            {/* 4. Target Destination Landing Circle */}
            <group position={[selectedLocation.position.x, 0.05, selectedLocation.position.z]}>
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[1.2, 1.4, 32]} />
                    <meshBasicMaterial color="#10b981" side={THREE.DoubleSide} transparent opacity={0.6} />
                </mesh>
            </group>
        </group>
    );
}

export default NavigationLine;