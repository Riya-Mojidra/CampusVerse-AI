import { CampusLocation } from '@/types/campus';

export const VJTI_LOCATIONS: CampusLocation[] = [
    {
        id: 'comp-lab-204',
        collegeId: 'vjti-mumbai',
        name: 'Computer Lab 204',
        category: 'laboratory',
        building: 'Degree Block',
        floor: 2,
        roomNumber: '204',
        description: 'High-performance computing & Web Dev Lab',
        position: { x: 12, y: 4, z: -8 },
        cameraFocus: {
            position: { x: 22, y: 12, z: 2 },
            target: { x: 12, y: 4, z: -8 },
        },
    },
    {
        id: 'central-library',
        collegeId: 'vjti-mumbai',
        name: 'Central Library',
        category: 'library',
        building: 'Main Building',
        floor: 1,
        roomNumber: '101',
        description: 'Main academic library and study hall',
        position: { x: -15, y: 2, z: 10 },
        cameraFocus: {
            position: { x: -5, y: 10, z: 22 },
            target: { x: -15, y: 2, z: 10 },
        },
    },
];