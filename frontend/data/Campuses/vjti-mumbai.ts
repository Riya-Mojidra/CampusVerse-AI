import { Vector3D } from '@/types/campus';

export interface CampusModelConfig {
    id: string;
    name: string;
    modelPath: string;
    initialCamera: { position: Vector3D; target: Vector3D };
    buildingMeshMap: Record<string, string>; // Maps mesh node name in .glb to display location
}

export const vjtiCampusConfig: CampusModelConfig = {
    id: 'vjti-mumbai',
    name: 'Veermata Jijabai Technological Institute (VJTI)',
    modelPath: '/models/campuses/vjti-mumbai.glb',
    initialCamera: {
        position: { x: 45, y: 30, z: 50 },
        target: { x: 0, y: 0, z: 0 },
    },
    buildingMeshMap: {
        'Mesh_MainBuilding': 'Main Building & Administration',
        'Mesh_DegreeBlock': 'Degree Block (Comp / IT / Extc)',
        'Mesh_TextileDept': 'Textile & Chemical Block',
        'Mesh_HostelQuad': 'Hostel Blocks A-D',
        'Mesh_Auditorium': 'VJTI Quadrangle & Quad',
    },
};