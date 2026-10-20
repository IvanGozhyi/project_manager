import TaskCard from '../components/task_card/TaskCard';


import { jest } from '@jest/globals';

jest.mock("../app/actions/tasks/task", () => ({
    deleteTaskAction: jest.fn(),
    updateTaskAction: jest.fn(),
}));

import { render, screen } from '@testing-library/react';

describe('TaskCard Component', () => {
    it('renders the TaskCard component', () => {
        const mockTask = {
            id: '1',
            title: 'Test Task',
            status: 'TODO',
            createdAt: new Date()
        };

        const mockStage = {
            id: 'stage-1',
            title: 'Test Stage',
            createdAt: new Date()
        };

        const mockProject = {
            id: 'proj-1',
            title: 'Test Project',
            status: 'ACTIVE',
            createdAt: new Date()
        };

        render(<TaskCard task={mockTask} stage={mockStage} project={mockProject} />);

        expect(screen.getByText('Test Task')).toBeInTheDocument();
    });
});