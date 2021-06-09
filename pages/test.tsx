import React, { FC, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import firebase, { authenticate, signout } from '../hooks/firebase';
import { useAuth } from '../hooks/AuthProvider';

// const getIdToken = () => {
//   const user = firebase.auth().currentUser;
//   user.getIdToken(). then(e => {
//     return e;
//   })
// }

const test = (props) => {
  const [token, setToken] = useState<string>();
  const auth = useAuth();

  const handleToken = async () => {
    const user = firebase.auth().currentUser;
    const token = await user.getIdToken();
    setToken(token);
    // console.log('token', token);
    // console.log('user', user);
    // user?.getIdToken().then((e) => {
    //   setToken(token);
    // });
  };

  return (
    <Layout>
      {auth.firebaseUser ? (
        <>
          <button onClick={signout}>SignOut</button> <br />
          <pre>{JSON.stringify(auth.firebaseUser, null, 2)}</pre>
          <pre>x-firebasetoken {token}</pre>
        </>
      ) : (
        <>
          <button onClick={authenticate}>SignIn</button>
        </>
      )}
      <br />
      <button onClick={handleToken}>getToken</button>
    </Layout>
  );
};

export default test;
