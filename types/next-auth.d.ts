import NextAuth from 'next-auth';

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
     */
    interface Session {
        userid: string,
        createdAt: string,
        expiresAt: string,
        sessionToken: string
    }

    interface User {
        userId: string,
        fullName: string,
        email: string,
        mobileNumber: string,
        accountType: string,
        subscriptionType: string
    }

    interface Profile {
        fullName: string,
        email: string,
        mobileNumber: string,
        accountType: string,
        password: string
    }
}