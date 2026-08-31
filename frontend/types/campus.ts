export interface Vector3D {
    x: number;
    y: number;
    z: number;
}

export interface CampusLocation {
    id: string;
    collegeId: string;
    name: string;
    category: 'department' | 'classroom' | 'laboratory' | 'library' | 'washroom' | 'facility';
    building: string;
    floor: number;
    roomNumber: string;
    description: string;
    position: Vector3D;
    cameraFocus: {
        position: Vector3D;
        target: Vector3D;
    };
}