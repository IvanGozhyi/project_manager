import { render, screen } from '@testing-library/react';
import Modal from '../components/modal/Modal';

describe('Modal Component', () => {
  it('renders the Modal component', () => {
    render(<Modal isOpen={true} onClose={() => {}}>Test Modal</Modal>);
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
  });
});
