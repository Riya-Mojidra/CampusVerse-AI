'use client';

import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useCampusStore } from '@/hooks/useCampusStore';
import { MUMBAI_COLLEGES } from '@/data/mumbaiColleges';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

export function Controls() {
    const { camera } = useThree();
    const controlsRef = useRef<OrbitControlsImpl | null>(null);

    const selectedCollegeId = useCampusStore((s) => s.selectedCollegeId);
    const selectedLocation = useCampusStore((s) => s.selectedLocation);
    
    const currentCollege = MUMBAI_COLLEGES.find((c) => c.id === selectedCollegeId);
    const campusBuildings = currentCollege
        ? currentCollege.buildings.map((b) => ({
              ...b,
              position: { x: b.position[0], y: b.position[1], z: b.position[2] },
              dimensions: { x: b.dimensions[0], y: b.dimensions[1], z: b.dimensions[2] },
          }))
        : [];

    const targetCameraPos = useRef<THREE.Vector3>(new THREE.Vector3(25, 20, 25));
    const targetLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
    const isTransitioning = useRef<boolean>(false);

    useEffect(() => {
        if (!selectedLocation) {
            targetCameraPos.current.set(25, 20, 25);
            targetLookAt.current.set(0, 0, 0);
            isTransitioning.current = true;
            return;
        }

        const building = campusBuildings.find(
            (b) => b.name.toLowerCase() === selectedLocation.building.toLowerCase()
        );

        if (building) {
            const { x, y, z } = building.position;
            const height = building.dimensions.y;

            targetCameraPos.current.set(x + 12, y + height + 8, z + 12);
            targetLookAt.current.set(x, y + height / 2, z);
            isTransitioning.current = true;
        }
    }, [selectedLocation, campusBuildings]);

    useFrame(() => {
        if (!isTransitioning.current) return;

        camera.position.lerp(targetCameraPos.current, 0.05);

        if (controlsRef.current) {
            controlsRef.current.target.lerp(targetLookAt.current, 0.05);
            controlsRef.current.update();
        }

        const cameraReached = camera.position.distanceTo(targetCameraPos.current) < 0.1;
        const targetReached = controlsRef.current
            ? controlsRef.current.target.distanceTo(targetLookAt.current) < 0.1
            : true;

        if (cameraReached && targetReached) {
            isTransitioning.current = false;
        }
    });

    return (
        <OrbitControls
            ref={controlsRef}
            enableDamping
            dampingFactor={0.05}
            maxPolarAngle={Math.PI / 2.1}
            minDistance={5}
            maxDistance={70}
            makeDefault
        />
    );
}

export default Controls;