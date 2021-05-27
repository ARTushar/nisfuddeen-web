import useAuth from '../../hooks/useAuth';
import Layout from '../../components/Layout';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function SignInPage() {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth.auth) {
      if (auth.user.completeAccount) {
        router.replace('/');
      } else router.replace('/register');
    }
  }, [auth.auth]);

  return (
    <Layout>
      {!auth.auth && (
        <div className="flex flex-col min-w-full justify-center mt-10">
          <button
            onClick={() => auth.signIn('google')}
            className="text-lg bg-gray-100 m-auto mb-2 py-2 w-full md:w-80 rounded-md text-gray-50"
            style={{ backgroundImage: `linear-gradient(to right, #ad5389, #3c1053)` }}
          >
            Sign in with Google
          </button>
          <button
            onClick={() => auth.signIn('facebook')}
            className="text-lg bg-gray-100 m-auto py-2 w-full md:w-80 rounded-md text-gray-50"
            style={{ backgroundImage: `linear-gradient(to right, #ad5389, #3c1053)` }}
          >
            Sign in with Facebook
          </button>
        </div>
      )}
    </Layout>
  );
}
