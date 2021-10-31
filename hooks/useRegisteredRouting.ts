import { useEffect } from 'react';
import useAuth from './useAuth'
import { useRouter } from 'next/router'

const useRegisteredRouting = () => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() =>{
    if(!auth.auth) router.replace('/auth/signin');
    else if(!auth.user.completeAccount)  router.replace('/register')
  }, [auth.auth]);
}

export default useRegisteredRouting;