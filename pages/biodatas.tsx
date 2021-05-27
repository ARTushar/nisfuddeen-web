import React from 'react';
import BiodataCard from '../components/BiodataCard';
import Layout from '../components/Layout';

const BiodatasPage = () => {
  return (
    <>
      <Layout>
        <BiodataCard
          gender="male"
          id="120"
          status="unmarried"
          birthyear={1997}
          occupation="business"
        />
      </Layout>
    </>
  );
};

export default BiodatasPage;
