import NextAuth from 'next-auth';

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
     */
    interface Session {
        userid: string,
        createdAt: string,
        expiredAt: string,
        sessionToken: string
    }
}