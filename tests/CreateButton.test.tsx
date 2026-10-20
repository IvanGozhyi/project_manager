import { render, screen } from '@testing-library/react';
import CreateButton from '../components/create_button/CreateButton';

describe('CreateButton Component', () => {
    it('renders the CreateButton component', () => {

        render(<CreateButton action={jest.fn()} />);

        expect(screen.getByText('Create')).toBeInTheDocument();
    });
});