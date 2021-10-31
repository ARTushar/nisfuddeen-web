import React, { useContext, useEffect, useState } from 'react';
import firebase, { signout } from './firebase';

type ContextProps = {
  firebaseUser: firebase.User | null;
  // user: User | null;
  // setUser: any;
};

export const AuthContext = React.createContext<ContextProps>({
  firebaseUser: null,
  // user: null,
  // setUser: null,
});

const useAuthProvider = (): ContextProps => {
  const [firebaseUser, setFirebaseUser] = useState<firebase.User | null>(null);
  // const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      setFirebaseUser(user);
      if (!user) {
        setFirebaseUser(null);
        return;
      } else {
        setFirebaseUser(user);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    // user: user,
    firebaseUser: firebaseUser,
    // setUser: setUser,
  };
};

export const AuthProvider: React.FC<{}> = ({ children }) => {
  const authContext = useAuthProvider();
  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};

export const useAuth = (): ContextProps => {
  return useContext(AuthContext);
};
