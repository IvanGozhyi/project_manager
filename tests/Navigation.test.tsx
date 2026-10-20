
import Navigation from '../components/navbar/Navigation';

import { jest } from '@jest/globals';


jest.mock('next-auth/react', () => ({
    useSession: jest.fn().mockReturnValue({ data: null, status: 'unauthenticated' }),
    signIn: jest.fn(),
    signOut: jest.fn(),
}));

import { render, screen } from '@testing-library/react';


describe('Navigation Component', () => {
  it('renders the Navigation component', () => {
    render(<Navigation />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
