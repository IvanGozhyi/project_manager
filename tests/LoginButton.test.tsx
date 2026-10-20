import LoginButton from '../components/login_button/LoginButton';
import { jest } from '@jest/globals';


jest.mock('next-auth/react', () => ({
    useSession: jest.fn().mockReturnValue({ data: null, status: 'unauthenticated' }),
    signIn: jest.fn(),
    signOut: jest.fn(),
}));

import { render, screen } from '@testing-library/react';

describe('LoginButton Component', () => {
    it('renders the LoginButton component', () => {
        render(<LoginButton />);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });
});
