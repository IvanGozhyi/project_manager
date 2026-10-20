import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

Object.assign(global, { TextDecoder, TextEncoder });

Object.assign(global, {
    Request: globalThis.Request || class Request {},
    Response: globalThis.Response || class Response {},
    fetch: globalThis.fetch,
});

jest.mock('next-auth/react', () => {
    return {
        useSession: jest.fn(() => ({ data: null, status: 'unauthenticated' })),
        signIn: jest.fn(),
        signOut: jest.fn(),
    };
});

jest.mock('next-auth', () => {
    return jest.fn().mockReturnValue({
        auth: jest.fn(),
        signIn: jest.fn(),
        signOut: jest.fn(),
        handlers: { GET: jest.fn(), POST: jest.fn() },
    });
});

jest.mock('next-auth/providers/cognito', () => {
    return jest.fn().mockReturnValue({});
});

jest.mock('@auth/prisma-adapter', () => {
    return {
        PrismaAdapter: jest.fn().mockReturnValue({}),
    };
});