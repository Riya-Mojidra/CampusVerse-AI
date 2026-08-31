"use client";

import { ThreeElements } from "@react-three/fiber";

export default function Tree(props: ThreeElements["group"]) {
    return (
        <group {...props}>
            {/* Trunk */}
            <mesh castShadow position={[0, 0.7, 0]}>
                <cylinderGeometry args={[0.12, 0.16, 1.4, 12]} />
                <meshStandardMaterial color="#7A5230" />
            </mesh>

            {/* Leaves Bottom */}
            <mesh castShadow position={[0, 1.6, 0]}>
                <sphereGeometry args={[0.7, 24, 24]} />
                <meshStandardMaterial color="#57B85C" />
            </mesh>

            {/* Leaves Middle */}
            <mesh castShadow position={[0, 2.1, 0]}>
                <sphereGeometry args={[0.55, 24, 24]} />
                <meshStandardMaterial color="#4CAF50" />
            </mesh>

            {/* Leaves Top */}
            <mesh castShadow position={[0, 2.55, 0]}>
                <sphereGeometry args={[0.4, 24, 24]} />
                <meshStandardMaterial color="#43A047" />
            </mesh>
        </group>
    );
}