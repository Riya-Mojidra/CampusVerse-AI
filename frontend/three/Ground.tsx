"use client";

export default function Ground() {
    return (
        <group>
            {/* ========================= */}
            {/* Main Grass */}
            {/* ========================= */}

            <mesh receiveShadow position={[0, -0.05, 0]}>
                <boxGeometry args={[28, 0.1, 28]} />
                <meshStandardMaterial color="#BFE6A8" />
            </mesh>

            {/* ========================= */}
            {/* Central Walkway */}
            {/* ========================= */}

            <mesh receiveShadow position={[0, 0.01, 4]}>
                <boxGeometry args={[3.2, 0.02, 10]} />
                <meshStandardMaterial color="#E8E8E8" />
            </mesh>

            {/* ========================= */}
            {/* Horizontal Walkway */}
            {/* ========================= */}

            <mesh receiveShadow position={[0, 0.01, 0]}>
                <boxGeometry args={[18, 0.02, 2.5]} />
                <meshStandardMaterial color="#ECECEC" />
            </mesh>

            {/* ========================= */}
            {/* Garden Left */}
            {/* ========================= */}

            <mesh receiveShadow position={[-7, 0.02, 5]}>
                <cylinderGeometry args={[2.2, 2.2, 0.05, 40]} />
                <meshStandardMaterial color="#8FD67A" />
            </mesh>

            {/* ========================= */}
            {/* Garden Right */}
            {/* ========================= */}

            <mesh receiveShadow position={[7, 0.02, 5]}>
                <cylinderGeometry args={[2.2, 2.2, 0.05, 40]} />
                <meshStandardMaterial color="#8FD67A" />
            </mesh>

            {/* ========================= */}
            {/* Fountain Base */}
            {/* ========================= */}

            <mesh receiveShadow position={[0, 0.04, 5]}>
                <cylinderGeometry args={[1.2, 1.2, 0.12, 40]} />
                <meshStandardMaterial color="#D7D7D7" />
            </mesh>

            {/* Water */}
            <mesh position={[0, 0.1, 5]}>
                <cylinderGeometry args={[0.9, 0.9, 0.05, 40]} />
                <meshStandardMaterial
                    color="#7FD3FF"
                    transparent
                    opacity={0.85}
                />
            </mesh>
        </group>
    );
}