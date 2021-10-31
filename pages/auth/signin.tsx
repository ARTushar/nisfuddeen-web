import { useAuth } from '../../hooks/useAuth';
import Layout from '../../components/Layout';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { authenticate } from '../../hooks/firebase';
import Link from 'next/link';

export default function SignInPage() {
  const { firebaseUser } = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   if (auth.auth) {
  //     if (auth.user.completeAccount) {
  //       router.replace('/');
  //     } else router.replace('/register');
  //   }
  // }, [auth.auth]);

  return (
    <div className="flex min-h-screen justify-center items-center">
      {!firebaseUser && (
        <div className="flex justify-center min-w-full items-start mt-10">
          <div className="flex flex-col items-center">
            <div className="mb-20 w-full">
              <Link href="/">
                <a>
                  <img src="/images/logo.svg" alt="Nisfuddeen-logo" className="w-full" />
                </a>
              </Link>
            </div>
            <button
              onClick={authenticate}
              className="text-lg bg-gray-700 m-auto mb-5 py-3 min-w-full px-3 md:w-64 rounded-xl text-gray-50"
            >
              Sign in with Google
            </button>
            <button
              onClick={authenticate}
              className="text-lg bg-gray-700 m-auto py-3 min-w-full px-3 md:w-64 rounded-xl text-gray-50"
            >
              Sign in with Facebook
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
