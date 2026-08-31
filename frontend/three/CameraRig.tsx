'use client';

import { useFrame } from '@react-three/fiber';
import { useCampusStore } from '@/hooks/useCampusStore';
import * as THREE from 'three';

export function CameraRig({ controlsRef }: { controlsRef?: React.RefObject<any> }) {
    const targetCamera = useCampusStore((state) => state.targetCamera);

    useFrame((state, delta) => {
        if (!targetCamera || !controlsRef?.current) return;

        const { position, target } = targetCamera;
        const lerpSpeed = 3 * delta;

        state.camera.position.lerp(
            new THREE.Vector3(position.x, position.y, position.z),
            lerpSpeed
        );

        controlsRef.current.target.lerp(
            new THREE.Vector3(target.x, target.y, target.z),
            lerpSpeed
        );

        controlsRef.current.update();
    });

    return null;
}