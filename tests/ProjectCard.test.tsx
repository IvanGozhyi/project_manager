
import ProjectCard from '../components/project_card/ProjectCard';

import { jest } from '@jest/globals';

jest.mock("../app/actions/projects/projects", () => ({
    deleteProjectAction: jest.fn(),
    updateProjectAction: jest.fn(),
}));
import { render, screen } from '@testing-library/react';

describe('ProjectCard Component', () => {
    it('renders the ProjectCard component', () => {
        const mockProject = {
            id: '1',
            title: 'Test Project',
            desc: 'Description',
            status: 'TODO',
            createdAt: new Date()
        };

        render(<ProjectCard project={mockProject} />);

        expect(screen.getByText('Test Project')).toBeInTheDocument();
    });
});