"use client";

import { ThreeElements } from "@react-three/fiber";

export default function Lamp(props: ThreeElements["group"]) {
    return (
        <group {...props}>
            {/* Pole */}
            <mesh castShadow position={[0, 1, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 2, 16]} />
                <meshStandardMaterial color="#444" />
            </mesh>

            {/* Lamp Head */}
            <mesh position={[0, 2.1, 0]}>
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshStandardMaterial
                    color="#FFF8CC"
                    emissive="#FFF6A5"
                    emissiveIntensity={3}
                />
            </mesh>

            {/* Glow */}
            <pointLight
                intensity={1.8}
                distance={6}
                color="#FFF4C2"
            />
        </group>
    );
}