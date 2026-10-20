
import SignOutButton from '../components/sign_out_button/SignOutButton';
import { jest } from '@jest/globals';


jest.mock('next-auth/react', () => ({
    useSession: jest.fn().mockReturnValue({ data: null, status: 'unauthenticated' }),
    signIn: jest.fn(),
    signOut: jest.fn(),
}));

import { render, screen } from '@testing-library/react';


describe('SignOutButton Component', () => {
  it('renders the SignOutButton component', () => {
    render(<SignOutButton />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
