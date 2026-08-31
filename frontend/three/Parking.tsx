"use client";

export default function Parking() {
    return (
        <group position={[0, 0.02, -8]}>
            {/* Parking Base */}
            <mesh receiveShadow>
                <boxGeometry args={[10, 0.03, 4]} />
                <meshStandardMaterial color="#606060" />
            </mesh>

            {/* Parking Lines */}
            {[-4, -2, 0, 2, 4].map((x) => (
                <mesh key={x} position={[x, 0.02, 0]}>
                    <boxGeometry args={[0.05, 0.01, 4]} />
                    <meshStandardMaterial color="#ffffff" />
                </mesh>
            ))}
        </group>
    );
}