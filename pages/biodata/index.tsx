import Link from 'next/link';
import React from 'react';
import Layout from '../../components/Layout';
import useAuth from '../../hooks/useAuth';

const BiodataPage = (props) => {
  const auth = useAuth();

  return (
    <>
      <Layout auth={!auth.auth}>
        {auth?.user?.biodataSubmitted ? (
          'here is biodata'
        ) : (
          <div>
            <div>You have not submitted your biodata</div>
            <Link href="/biodata/create">
              <a className="underline">Create Now</a>
            </Link>
          </div>
        )}
      </Layout>
    </>
  );
};

export default BiodataPage;
