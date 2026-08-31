"use client";

export default function Lights() {
    return (
        <>
            {/* Soft ambient light */}
            <ambientLight intensity={1.4} />

            {/* Main sunlight */}
            <directionalLight
                castShadow
                intensity={2.3}
                position={[12, 20, 10]}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />

            {/* Fill light */}
            <directionalLight
                intensity={0.5}
                position={[-10, 10, -10]}
            />

            {/* Warm campus glow */}
            <pointLight
                intensity={0.6}
                color="#FFF2D5"
                position={[0, 5, 5]}
            />
        </>
    );
}