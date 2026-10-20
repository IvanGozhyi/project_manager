import { render, screen } from '@testing-library/react';
import Footer from '../components/footer/Footer';

describe('Footer Component', () => {
  it('renders the Footer component', () => {
    render(<Footer />);
      expect(screen.getByText(/about/i)).toBeInTheDocument();
  });
});
