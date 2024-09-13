// fakeApi.js
export const classesApi = async () => {
    return [
        { id: 1, name: 'Class A' },
        { id: 2, name: 'Class B' },
        { id: 3, name: 'Class C' }
    ];
};

export const sectionsApi = async () => {
    return [
        { id: 1, name: 'Section 1', class_id: 1 },
        { id: 2, name: 'Section 2', class_id: 1 },
        { id: 3, name: 'Section 3', class_id: 2 },
        { id: 4, name: 'Section 4', class_id: 2 },
        { id: 5, name: 'Section 5', class_id: 3 }
    ];
};
