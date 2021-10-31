import { useSession, signIn, signOut } from 'next-auth/client'

type User = {
  id: string,
  name: string,
  email: string,
  completeAccount: boolean,
  subscriptionType: 'free' | 'premium',
  biodataSubmitted: boolean,
  gender?: 'male' | 'female',
}

const useAuth = () => {
  const [session] = useSession();
  return {
    auth: !!session,
    user: session?.user as (User | undefined),
    signIn,
    signOut,
  };
}

export default useAuth;   