import Link from 'next/link';
import Layout from '../components/Layout';

const Home: React.FC = () => {
  return (
    <>
      <Layout>
        <div className="m-8">
          hello world
          <Link href="/langtest">
            <a className="underline text-blue-600"> test lang</a>
          </Link>
        </div>
      </Layout>
    </>
  );
};

export default Home;
