"use client";

export default function Road() {
    return (
        <group>
            {/* Main Road */}
            <mesh receiveShadow position={[0, 0.02, -2]}>
                <boxGeometry args={[18, 0.03, 3]} />
                <meshStandardMaterial color="#575757" />
            </mesh>

            {/* Parking Road */}
            <mesh receiveShadow position={[0, 0.02, -7]}>
                <boxGeometry args={[10, 0.03, 2]} />
                <meshStandardMaterial color="#666666" />
            </mesh>

            {/* Center Line */}
            <mesh position={[0, 0.04, -2]}>
                <boxGeometry args={[16, 0.01, 0.08]} />
                <meshStandardMaterial color="#FFD84D" />
            </mesh>
        </group>
    );
}