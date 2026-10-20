import { render, screen } from '@testing-library/react';
import EditButton from '../components/edit_button/EditButton';

describe('EditButton Component', () => {
  it('renders the EditButton component', () => {
      render(
          <EditButton
              action={jest.fn()}
              initialTitle="Test Title"
              hiddenInputs={{ id: "1" }}
          />
      );
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });
});
