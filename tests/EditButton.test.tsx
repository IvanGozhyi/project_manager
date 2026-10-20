import { render, screen } from '@testing-library/react';
import EditButton from '../components/edit_button/EditButton';

describe('EditButton Component', () => {
  it('renders the EditButton component', () => {
    render(<EditButton>Edit</EditButton>);
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });
});
