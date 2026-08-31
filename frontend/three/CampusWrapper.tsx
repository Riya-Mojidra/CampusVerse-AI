// File: components/three/CampusWrapper.tsx
"use client";

import dynamic from "next/dynamic";

const CampusCanvas = dynamic(() => import("@/three/CampusCanvas"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full bg-[#0B0F12] flex flex-col items-center justify-center text-[#00FFA3] font-mono text-xs gap-3">
            <div className="w-6 h-6 border-2 border-[#00FFA3] border-t-transparent rounded-full animate-spin" />
            <span>INITIALIZING_3D_DIGITAL_TWIN...</span>
        </div>
    ),
});

interface CampusWrapperProps {
    collegeId?: string;
    selectedLocation?: any;
    isNavigating?: boolean;
}

export default function CampusWrapper({
    collegeId,
    selectedLocation,
    isNavigating,
}: CampusWrapperProps) {
    return (
        <div className="w-full h-full bg-[#0B0F12] relative overflow-hidden">
            <CampusCanvas />
        </div>
    );
}