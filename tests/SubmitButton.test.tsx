import SubmitButton from '../components/submit/SubmitButton';
import { render, screen } from '@testing-library/react';

describe('SubmitButton Component', () => {
    it('renders the SubmitButton component', () => {

        render(<SubmitButton />);


        expect(screen.getByText('Submit')).toBeInTheDocument();
    });
});