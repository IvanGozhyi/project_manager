export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE' | string;

export const statusStyles: Record<Status, string> = {
    TODO: 'bg-gray-200 text-gray-800',
    IN_PROGRESS: 'bg-blue-200 text-dark-gray-800',
    DONE: 'bg-green-200 text-green-800',
}